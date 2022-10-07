import { Box, Grid } from "@mui/material";
import { optisTheme } from "../../assets/styles/theme";
import { HistoryEntry } from "../../types/historyEntryType";
import { TicketDetailModel } from "../../types/ticketDetailModel";
import CommentBox from "../Comment/CommentBox";
import History from "../History/history";
import TicketDetailCarousel from "./ticketDetailCarousel";
import TicketDetailHeader from "./ticketDetailHeader";
import TicketDetails from "./ticketDetails";

type TicketDetailsWideScreenProps = {
  data: TicketDetailModel;
  pageId: string | undefined;
  imageURLs: string[];
  history: HistoryEntry[];
  fetchDetailCallback: () => void;
};

function TicketDetailsWideScreen({
  data,
  pageId,
  imageURLs,
  history,
  fetchDetailCallback,
}: TicketDetailsWideScreenProps) {
  const noImages = () => {
    return imageURLs.length === 0;
  };

  return (
    <>
      <TicketDetailHeader
        data={data}
        pageId={pageId}
        fetchDetailCallback={fetchDetailCallback}
      />
      <Box
        component="div"
        sx={{
          scrollbarWidth: "thin",
          scrollbarColor: `${optisTheme.palette.secondary.main} #fff`,
          overflow: "auto",
          height: {
            xs: "calc(100vh - 64px - 60px - 126px)",
            md: "calc(100vh - 64px - 101px)",
          },
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
        {noImages() ? (
          <Grid container sx={{ pt: 5 }}>
            <Grid item xs={5} sm={6}>
              <History history={history} />
            </Grid>
            <Grid item xs={7} sm={6}>
              <TicketDetails
                data={data}
                pageId={pageId}
                imageURLs={imageURLs}
                fetchDetailCallback={fetchDetailCallback}
              />
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <CommentBox
                ticketId={pageId}
                follows={data.follows}
                created={data.created}
                ticketState={data.state}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container sx={{ pt: 5 }}>
            <Grid item xs={4}>
              <TicketDetailCarousel imageURLs={imageURLs} />
            </Grid>
            <Grid item xs={3} sm={4}>
              <History history={history} />
            </Grid>
            <Grid item xs={5} sm={4}>
              <TicketDetails
                data={data}
                pageId={pageId}
                imageURLs={imageURLs}
                fetchDetailCallback={fetchDetailCallback}
              />
            </Grid>
            <Grid item xs={12} sx={{ pt: 3 }}>
              <CommentBox
                ticketId={pageId}
                follows={data.follows}
                created={data.created}
                ticketState={data.state}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}

export default TicketDetailsWideScreen;
