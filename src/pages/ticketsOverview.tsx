import {
  Button,
  Grid,
  Fab,
  Box,
  Typography,
  Tooltip,
  Divider,
  TextField,
  debounce,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect, useContext, useCallback, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import TicketList from "../components/Ticket/ticketList";
import { TicketModel } from "../types/ticketModel";
import TicketService from "../services/ticket.service";
import CreateTicketForm from "../components/CreateTicket/createTicketDialog";
import "../assets/styles/backgroundImage.css";
import { UserContext } from "../context/userContext";
import TicketFilter from "../components/Filter/ticketFilter";
import FilterDialog from "../components/Filter/filterDialog";
import FilterListIcon from "@mui/icons-material/FilterList";
import { optisTheme } from "../assets/styles/theme";

export default function TicketsOverview(props: { showAll: boolean }) {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const handleFilterDialogOpen = () => setFilterDialogOpen(true);
  const handleFilterDialogClose = () => setFilterDialogOpen(false);

  const [tickets, setTickets] = useState<TicketModel[]>();

  const [searchParam, setSearchParam] = useState<string>();

  const fetchTickets = useCallback((stateParams?: string[], buildingParams?: string[], sortParams?: string, searchParam?: string) => {
    if (props.showAll) {
      TicketService.getAllTickets(stateParams, buildingParams, sortParams, searchParam)
        .then((res) => {
          setTickets(res.data);
        })
        .catch((error) => {
          console.log(error)
        });
    } else {
      TicketService.getMyTickets(stateParams, buildingParams, sortParams, searchParam)
        .then((res) => {
          setTickets(res.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [props.showAll]);

  const handleSearch = debounce((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchParam(event.target.value)
  }, 500)

  useEffect(() => {
    fetchTickets();

    document.title = props.showAll
      ? "Opticket | Alle Tickets"
      : "Opticket | Mijn Tickets";
  }, [navigate, fetchTickets, props.showAll, searchParam]);

  return (
    <>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 64px)"}}>
        <Grid item lg={3} md={4} display={{ xs: "none", md: "inline" }}>
          <TicketFilter fetchTickets={fetchTickets} prioritiesNodesHidden />
        </Grid>

        <Grid item xs={12} md={8} lg={9} sx={{pr: {xs: 0, md: 3}}}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "58px", px: 1 }}
          >
            <Typography variant="h5" sx={{ p: 1 }}>
              {props.showAll
                ? "Alle Tickets"
                : userInfo.isHandyman
                ? "Toegewezen Tickets"
                : "Mijn Tickets"}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleDialogOpen}
              sx={{ mr: 2, display: { xs: "none", md: "block" } }}
            >
              Ticket Aanmaken
            </Button>
            <Tooltip
              title="Filters"
              sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            >
              <FilterListIcon
                fontSize="large"
                onClick={handleFilterDialogOpen}
              />
            </Tooltip>
            <FilterDialog
              dialogOpen={filterDialogOpen}
              handleClose={handleFilterDialogClose}
              fetchTickets={fetchTickets}
              prioritiesNodesHidden
            />
          </Box>
          <Divider light sx={{ ml: 2, mr: 3 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            sx={{ height: "58px", display: { xs: "flex", md: "none" }, px: 2 }}
          >
            <TextField
              variant="standard"
              type="search"
              placeholder="Zoeken op titel"
              onChange={handleSearch}
              sx={{ ml: 1, mr: 2, pb: 1, width: "100%" }}
            />
          </Box>
          <Box
            component="div"
            sx={{
              scrollbarWidth: "thin",
              scrollbarColor: `${optisTheme.palette.secondary.main} #fff`,
              overflow: "auto",
              height: {xs: "calc(100vh - 64px - 58px - 1px - 58px)", md: "calc(100vh - 64px - 58px - 1px)"},
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: optisTheme.palette.secondary.main,
                outline: "0px solid slategrey",
                borderRadius: 0.5,
              },
            }}
          >
            <TicketList tickets={tickets} />
          </Box>
        </Grid>
        <CreateTicketForm
          dialogOpen={dialogOpen}
          handleDialogClose={handleDialogClose}
          fetchTickets={fetchTickets}
        />
      </Grid>
      <Box>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleDialogOpen}
          sx={{
            alignItems: "center",
            position: "fixed",
            bottom: 24,
            right: 24,
            display: { xs: "flex", md: "none" },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
}
