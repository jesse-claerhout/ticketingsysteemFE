import { Grid, Typography, Tooltip, Button, Divider } from "@mui/material";
import { TicketDetailModel } from "../../types/ticketDetailModel";
import { EditTicketDialogUser } from "../EditTicket/editTicketDialogUser";
import PositionedSnackbar from "../Snackbar/positionedSnackbar";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import TicketService from "../../services/ticket.service";
import { EditTicketDialogHandyman } from "../EditTicket/editTicketDialogHandyman";

type TicketDetailHeaderProps = {
  data: TicketDetailModel;
  pageId: string | undefined;
  fetchDetailCallback: () => void;
};

function TicketDetailHeader({
  data,
  pageId,
  fetchDetailCallback,
}: TicketDetailHeaderProps) {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  //edit dialog
  const [dialogHandymanOpen, setDialogHandymanOpen] = useState(false);
  const handleDialogHandymanOpen = () => setDialogHandymanOpen(true);
  const handleDialogHandymanClose = () => setDialogHandymanOpen(false);
  const [dialogUserOpen, setDialogUserOpen] = useState(false);
  const handleDialogUserOpen = () => setDialogUserOpen(true);
  const handleDialogUserClose = () => setDialogUserOpen(false);

  //(un)follow ticket
  const [unfollowButtonAvailable, setUnfollowButtonAvailable] = useState(
    data.follows
  );
  const [followButtonHidden] = useState(data.created);

  const handleVolgTicket = (event: React.MouseEvent<HTMLElement>) => {
    if (unfollowButtonAvailable) {
      TicketService.postUnfollowTicket(pageId)
        .then((response) => {
          handleClickSnackbar("Ticket ontvolgd");
          setUnfollowButtonAvailable(!unfollowButtonAvailable);
          fetchDetailCallback();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      TicketService.postFollowTicket(pageId)
        .then((response) => {
          handleClickSnackbar("Ticket gevolgd");
          setUnfollowButtonAvailable(!unfollowButtonAvailable);
          fetchDetailCallback();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //handyman subscribe
  const [appointedToHandyman, setAppointedToHandyman] = useState(
    data.appointed
  );

  const checkIfSubscribeCan = () => {
    return data?.state === "Open";
  };

  const handleSubscribeTicket = (event: React.MouseEvent<HTMLElement>) => {
    TicketService.handymanSubscribe(pageId)
      .then((response) => {
        handleClickSnackbar("Ticket toegewezen aan klusjesman");
        setAppointedToHandyman(true);
        fetchDetailCallback();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{ height:{xs: "120px", md: "100px"}, px: {xs: 1, md: 4}, pt: 2 }}
      >
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography component={"div"} variant="h6" sx={{ pl: 1 }}>
            #{data.ticketId}: {data.title}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Keer Terug" sx={{ pl: 1 }}>
            <ArrowBackIosNewIcon
              fontSize="medium"
              sx={{cursor: "pointer"}}
              onClick={() => navigate(-1)}
            />
          </Tooltip>
        </Grid>
        <Grid item xs={10} container justifyContent="flex-end">
        {userInfo.isHandyman ? (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<EditIcon />}
              sx={{ mr: 1 }}
              onClick={handleDialogHandymanOpen}
            >
              Bewerk
            </Button>
          ) : ( data.created ? (
            <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<EditIcon />}
            sx={{ mr: 1 }}
            onClick={handleDialogUserOpen}
            >
              Bewerk
            </Button>
          ) : 
            <></>
          )}
          {!userInfo.isHandyman ? null : appointedToHandyman ? null : !checkIfSubscribeCan() ? null : (
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={(event) => handleSubscribeTicket(event)}
              sx={{ width: 140, mr: 1 }}
            >
              Abonneren
            </Button>
          )}
          {userInfo.isHandyman ? null : followButtonHidden ? null : (
            <Button
              hidden={!data.visibleToAll}
              color="secondary"
              size="small"
              variant="contained"
              onClick={(event) => handleVolgTicket(event)}
              sx={{ width: 140, mr: 1 }}
            >
              {unfollowButtonAvailable ? "Ontvolg Ticket" : "Volg Ticket"}
            </Button>
          )}
          <PositionedSnackbar
            originHorizontal="right"
            originVertical="bottom"
            severity="info"
            onClose={handleCloseSnackbar}
            open={showSnackbar}
            message={snackbarMessage}
          />
        </Grid>
        <EditTicketDialogUser
          dialogOpen={dialogUserOpen}
          handleDialogClose={handleDialogUserClose}
          ticketId={data.ticketId}
          ticketValues={{
            title: data.title,
            location: data.ticketLocationBuildingAddress,
            specificLocation: data.ticketLocationSpace,
            priority: data.priority,
            description: data.description,
            visibleToAll: data.visibleToAll,
            images: data.media,
          }}
          fetchTicket={fetchDetailCallback}
        />
        <EditTicketDialogHandyman
          dialogOpen={dialogHandymanOpen}
          handleDialogClose={handleDialogHandymanClose}
          ticketId={data.ticketId}
          ticketValues={{
            title: data.title,
            location: data.ticketLocationBuildingAddress,
            specificLocation: data.ticketLocationSpace,
            priority: data.priority,
            description: data.description,
            state: data.state,
            deliveryDate: data.deliveryDate,
            visibleToAll: data.visibleToAll,
            images: data.media,
          }}
          fetchTicket={fetchDetailCallback}
        />
      </Grid>
      <Divider sx={{mx: 4 }} />
    </>
  );
}

export default TicketDetailHeader;