import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import TicketService from "../../services/ticket.service";
import { Form } from "../Form/form";
import { FormInput } from "../Form/FormInputs/formTextInput";
import { FormCheckbox } from "../Form/FormInputs/formCheckbox";
import { FormSelect } from "../Form/FormInputs/formSelect";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AwsS3Service from "../../services/awsS3.service";
import { FormUpload } from "../Form/FormInputs/formUpload";
import ImageService from "../../services/image.service";
import { v4 as uuidv4 } from "uuid";
import { optisTheme } from "../../assets/styles/theme";
import PositionedSnackbar from "../Snackbar/positionedSnackbar";

type CreateTicketFields = {
  title: string;
  location: string;
  specificLocation: string;
  priority: string;
  description: string;
  visibleToAll: boolean;
  images: File[];
};

type CreateTicketFormProps = {
  dialogOpen: boolean;
  handleDialogClose(): void;
  fetchTickets(): void;
};

export default function CreateTicketForm(props: CreateTicketFormProps) {

  const [buildings, setBuildings] = useState<string[]>();
  const [priorities, setPriorities] = useState<string[]>();

  const [loading, setLoading] = useState(false);

    //snackbar
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("Opticket pop-up");

    const handleClickSnackbar = (message: string) => {
      setShowSnackbar(true);
      setSnackbarMessage(message);
    };
  
    const handleCloseSnackbar = (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setShowSnackbar(false);
    };

  function fetchPriorities() {
    TicketService.getPriorities()
      .then((res) => {
        setPriorities(res.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function fetchBuildings() {
    TicketService.getBuildings()
      .then((res) => {
        setBuildings(res.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  function generateFileNames(data: CreateTicketFields) {
    var fileNames: string[];
    fileNames = [];

    for (let i = 0; i < data.images.length; i++) {
      var fileExt = data.images[i].name.split(".").pop();
      fileNames.push((uuidv4() + "." + fileExt).toLocaleLowerCase());
    }
    return fileNames;
  }

  function imagesFormData(data: CreateTicketFields, fileNames: string[]) {
    let formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("files", data.images[i], fileNames[i]);
    }
    return formData;
  }

  const onSubmit = (data: CreateTicketFields) => {
    var fileNames = generateFileNames(data);
    var ticketId = 0;
    
    setLoading(true);

    TicketService.postTicket(data)
      .then((response) => {
          ticketId = response.data;
          if(!(data.images.length === 0)) {
          AwsS3Service.UploadImagesToS3(imagesFormData(data, fileNames))
            .then((response) => {
              ImageService.postImage(fileNames, ticketId)
                .then((response) => {
                  setLoading(false);
                  props.fetchTickets();
                  props.handleDialogClose();
                })
                .catch((error) => {
                  // if imageService fails then...
                  handleClickSnackbar("Uploaden van foto's mislukt, probeer opnieuw")
                  TicketService.deleteTicket(ticketId);
                  setLoading(false);
                });
            })
            .catch((error) => {
              // if aws fails then...
              handleClickSnackbar("Uploaden van foto's mislukt, probeer opnieuw")
              TicketService.deleteTicket(ticketId);
              setLoading(false);
            });
        }
        else {
          setLoading(false);
          props.fetchTickets();
          props.handleDialogClose();
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
      ticketId = 0;
  };

  useEffect(() => {
    fetchBuildings();
    fetchPriorities();
    setLoading(false);
  }, []);

  return (
    <Dialog
      open={props.dialogOpen}
      onClose={props.handleDialogClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Ticket Aanmaken
        <Tooltip title="Sluit">
          <CloseIcon fontSize="medium" onClick={props.handleDialogClose} />
        </Tooltip>
      </DialogTitle>
      <DialogContent sx={{ pb: 1, pt: 1,
      scrollbarWidth: "thin",
      scrollbarColor: `${optisTheme.palette.secondary.light} #fff`,
              overflow: "auto",
              maxHeight: "calc(100vh - 64px - 59px)",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: optisTheme.palette.secondary.light,
                outline: "0px solid slategrey",
                borderRadius: 0.5,
              },
            }}>
        <Form onSubmit={onSubmit} id="createTicketForm">
          <FormInput<CreateTicketFields>
            sx={{ mt: 1 }}
            name="title"
            type="text"
            label="Titel"
            id="title"
            rules={{ required: "Titel moet ingevuld zijn" }}
            characterCounter={50}
          />
          <FormSelect<CreateTicketFields>
            name="location"
            label="Gebouw"
            id="location"
            selectData={buildings}
            rules={{ required: "Gebouw is een verplichte keuze" }}
          />
          <FormInput<CreateTicketFields>
            name="specificLocation"
            type="text"
            label="Specifieke Locatie"
            id="specificLocation"
            rules={{ required: "Locatie moet ingevuld zijn" }}
            characterCounter={50}
          />
          <FormSelect<CreateTicketFields>
            name="priority"
            label="Prioriteit"
            id="priority"
            selectData={priorities}
            rules={{ required: "Prioriteit is een verplichte keuze" }}
          />
          <FormInput<CreateTicketFields>
            name="description"
            type="text"
            label="Beschrijving"
            id="description"
            rules={{ required: "Beschrijving moet ingevuld zijn"}}
            multiline
            minRows={3}
            maxRows={3}
            characterCounter={500}
          />
          <FormCheckbox<CreateTicketFields>
            id="visibleToAll"
            name="visibleToAll"
            label="Zichtbaar voor iedereen?"
            defaultChecked={true}
          />
          <FormUpload<CreateTicketFields> name="images" />
        </Form>
        <PositionedSnackbar
            originHorizontal="center"
            originVertical="top"
            severity="error"
            onClose={handleCloseSnackbar}
            open={showSnackbar}
            message={snackbarMessage}
          />
      </DialogContent>
      <DialogActions>
        {loading && (<CircularProgress size="30px" sx={{mx: 2}}/>)}
        <Button form="createTicketForm" variant="contained" type="submit">
          Aanmaken
        </Button>
      </DialogActions>
    </Dialog>
  );
}
