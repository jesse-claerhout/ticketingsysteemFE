import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TicketService from "../../services/ticket.service";
import { Form } from "../Form/form";
import { FormCheckbox } from "../Form/FormInputs/formCheckbox";
import { FormDateInput } from "../Form/FormInputs/formDateInput";
import { FormSelect } from "../Form/FormInputs/formSelect";
import { FormInput } from "../Form/FormInputs/formTextInput";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { optisTheme } from "../../assets/styles/theme";
import { FormUpload } from "../Form/FormInputs/formUpload";
import AwsS3Service from "../../services/awsS3.service";
import ImageService from "../../services/image.service";
import { v4 as uuidv4 } from "uuid";
import PositionedSnackbar from "../Snackbar/positionedSnackbar";

export type EditTicketHandymanFields = {
  title: string;
  location: string;
  specificLocation: string;
  priority: string;
  description: string;
  state: string;
  deliveryDate: Date;
  visibleToAll: boolean;
  images: File[];
};

type EditTicketDialogHandymanProps = {
  dialogOpen: boolean;
  handleDialogClose(): void;
  ticketId: number;
  ticketValues: EditTicketHandymanFields;
  fetchTicket: () => void;
};

export function EditTicketDialogHandyman(props: EditTicketDialogHandymanProps) {
  const navigate = useNavigate();

  const [buildings, setBuildings] = useState<string[]>();
  const [priorities, setPriorities] = useState<string[]>();
  const [states, setStates] = useState<string[]>();
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

  function generateFileNames(data: EditTicketHandymanFields) {
    var fileNames: string[];
    fileNames = [];

    for (let i = 0; i < data.images.length; i++) {
      var fileExt = data.images[i].name.split(".").pop();
      fileNames.push((uuidv4() + "." + fileExt).toLocaleLowerCase());
    }
    return fileNames;
  }

  function imagesFormData(data: EditTicketHandymanFields, fileNames: string[]) {
    let formData = new FormData();
    for (let i = 0; i < data.images.length; i++) {
      formData.append("files", data.images[i], fileNames[i]);
    }
    return formData;
  }

  useEffect(() => {
    TicketService.getBuildings()
      .then((res) => {
        setBuildings(res.data);
      })
      .catch((error) => console.log(error));
    TicketService.getPriorities()
      .then((res) => {
        setPriorities(res.data);
      })
      .catch((error) => console.log(error));
    TicketService.getStates()
      .then((res) => {
        setStates(res.data);
      })
      .catch((error) => console.log(error));
  }, [navigate, setBuildings, setPriorities, setStates]);

  const onSubmit = (data: EditTicketHandymanFields) => {
    var fileNames = generateFileNames(data);
    setLoading(true);
    TicketService.putTicketHandyman(props.ticketId, data)
      .then(() => {
        if (!(data.images.length == 0)) {
          AwsS3Service.UploadImagesToS3(imagesFormData(data, fileNames))
            .then((response) => {
              ImageService.postImage(fileNames, props.ticketId)
                .then((response) => {
                  setLoading(false);
                  props.fetchTicket();
                  props.handleDialogClose();
                })
                .catch((error) => {
                  // if imageService fails then...
                  handleClickSnackbar(
                    "Uploaden van foto's mislukt, probeer opnieuw"
                  );
                  TicketService.deleteTicket(props.ticketId);
                  setLoading(false);
                });
            })
            .catch((error) => {
              // if aws fails then...
              handleClickSnackbar(
                "Uploaden van foto's mislukt, probeer opnieuw"
              );
              TicketService.deleteTicket(props.ticketId);
              setLoading(false);
            });
        } else {
          setLoading(false);
          props.fetchTicket();
          props.handleDialogClose();
        }
      })
      .catch((error) => console.log(error));
  };

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
        Ticket Bewerken
        <Tooltip title="Sluit">
          <CloseIcon fontSize="medium" onClick={props.handleDialogClose} />
        </Tooltip>
      </DialogTitle>
      <DialogContent
        sx={{
          pb: 1,
          pt: 1,
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
        }}
      >
        <Form onSubmit={onSubmit} id="editTicketForm">
          <FormInput<EditTicketHandymanFields>
            sx={{ mt: 1 }}
            name="title"
            type="text"
            label="Titel"
            id="title"
            defaultValue={props.ticketValues.title}
            rules={{ required: "Titel moet ingevuld zijn" }}
            characterCounter={50}
          />
          <FormSelect<EditTicketHandymanFields>
            name="location"
            label="Gebouw"
            id="location"
            selectData={buildings}
            defaultValue={props.ticketValues.location}
            rules={{ required: "Gebouw is een verplichte keuze" }}
          />
          <FormInput<EditTicketHandymanFields>
            name="specificLocation"
            type="text"
            label="Specifieke Locatie"
            id="specificLocation"
            defaultValue={props.ticketValues.specificLocation}
            rules={{ required: "Locatie moet ingevuld zijn" }}
            characterCounter={50}
          />
          <FormSelect<EditTicketHandymanFields>
            name="priority"
            label="Prioriteit"
            id="priority"
            selectData={priorities}
            defaultValue={props.ticketValues.priority}
            rules={{ required: "Prioriteit is een verplichte keuze" }}
          />
          <FormSelect<EditTicketHandymanFields>
            name="state"
            label="Status"
            id="state"
            selectData={states}
            defaultValue={props.ticketValues.state}
            rules={{ required: "Status is een verplichte keuze" }}
          />
          <FormInput<EditTicketHandymanFields>
            name="description"
            type="text"
            label="Beschrijving"
            id="description"
            defaultValue={props.ticketValues.description}
            rules={{ required: "Beschrijving moet ingevuld zijn" }}
            multiline
            minRows={3}
            maxRows={3}
            characterCounter={500}
          />
          <FormDateInput<EditTicketHandymanFields>
            id="deliveryDate"
            name="deliveryDate"
            label="Verwachte opleverdatum"
            defaultValue={
              props.ticketValues.deliveryDate
                ? new Date(props.ticketValues.deliveryDate)
                    .toISOString()
                    .split("T")[0]
                : undefined
            }
          />
          <FormCheckbox<EditTicketHandymanFields>
            id="visibleToAll"
            name="visibleToAll"
            label="Zichtbaar voor iedereen?"
            defaultChecked={props.ticketValues.visibleToAll}
          />
          <FormUpload<EditTicketHandymanFields> name={"images"} />
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
        {loading && <CircularProgress sx={{ mx: 2 }} />}
        <Button variant="contained" type="submit" form="editTicketForm">
          Bewerken
        </Button>
      </DialogActions>
    </Dialog>
  );
}
