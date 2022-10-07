import { Box, Button, Divider, Fab, Grid, Tooltip, Typography } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TicketList from "../components/Ticket/ticketList";
import { TicketModel } from "../types/ticketModel";
import TicketService from "../services/ticket.service";
import "../assets/styles/backgroundImage.css";
import TicketFilter from "../components/Filter/ticketFilter";
import FilterDialog from "../components/Filter/filterDialog";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import CreateTicketForm from "../components/CreateTicket/createTicketDialog";
import { optisTheme } from "../assets/styles/theme";

export default function OpenTickets() {
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [tickets, setTickets] = useState<TicketModel[]>();

  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const handleFilterDialogOpen = () => setFilterDialogOpen(true);
  const handleFilterDialogClose = () => setFilterDialogOpen(false);

  const fetchTickets = useCallback((stateParams?: string[], buildingParams?: string[], sortParams?: string, searchParam?: string) => {
    TicketService.getOpenTickets(buildingParams, sortParams, searchParam)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  useEffect(() => {
    fetchTickets();
    document.title = "Opticket | Openstaande Tickets";
  }, [navigate, fetchTickets]);

  return (
    <>
      <Grid container spacing={2} sx={{ height: "calc(100vh - 64px)"}}>
        <Grid item md={3} display={{ xs: "none", md: "block" }}>
          <TicketFilter
          statusNodesHidden
          prioritiesNodesHidden
          fetchTickets={fetchTickets}
          />
        </Grid>
        <Grid item xs={12} md={9}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{height: "58px"}}
          >
          <Typography variant="h5" sx={{ p: 1 }}>
            Openstaande Tickets
          </Typography>
          <Button
              color="secondary"
              variant="contained"
              onClick={handleDialogOpen}
              sx={{ mr: 1, display: { xs: "none", md: "block"} }}
            >
              Ticket Aanmaken
            </Button>
          <Tooltip title="Filters" sx={{mr: 2, display: {xs: "block", md: "none"}}} >
            <FilterListIcon fontSize="large" onClick={handleFilterDialogOpen} />
          </Tooltip>
          <FilterDialog
            dialogOpen={filterDialogOpen}
            handleClose={handleFilterDialogClose}
            fetchTickets={fetchTickets}
          />
           </Box>
           <Divider light sx={{ml: 1, mr: 2}}/>
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
          sx={{ position: "fixed", bottom: 24, right: 24 }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
}
