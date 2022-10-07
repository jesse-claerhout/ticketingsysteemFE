import TicketCard from "./ticketCard";
import { TicketModel } from "../../types/ticketModel";
import { Box, Grid, Typography } from "@mui/material";
import emptyState from "../../assets/images/emptystate.png";

export default function TicketList(props: {
  tickets: TicketModel[] | undefined;
}) {
  if (props.tickets != null) {
    if (props.tickets.length === 0) {
      return (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={emptyState} alt="" height="340" width="340" />
          <Typography variant="h4" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            Nog niks te zien hier
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            align="center"
            sx={{ align: "center" }}
          >
            Wanneer je een nieuw ticket aanmaakt zal deze hier terechtkomen.
          </Typography>
        </Box>
      );
    } else {
      return (
        <Grid container>
          {props.tickets.map((t) => (
            <Grid item xs={12} sm={6} md={12} lg={6} xl={4} key={t.ticketId} sx={{p: 1}}>
            <TicketCard
              key={t.ticketId}
              ticketId={t.ticketId}
              title={t.title}
              state={t.state}
              priority={t.priority}
              ticketLocationBuildingAddress={t.ticketLocationBuildingAddress}
              thumbnailURL={t.thumbnailURL}
              created={t.created}
              follows={t.follows}
              appointed={t.appointed}
            />
            </Grid>
          ))}
        </Grid>
      );
    }
  } else {
    return <Typography>Tickets aan het ophalen...</Typography>;
  }
}
