import { Box } from "@mui/material";
import { HistoryEntry } from "../../types/historyEntryType";
import { TicketDetailModel } from "../../types/ticketDetailModel";
import CommentBox from "../Comment/CommentBox";
import History from "../History/history";
import { TabComponent } from "../Tab/tabComponent";
import TicketDetailCarousel from "./ticketDetailCarousel";
import TicketDetails from "./ticketDetails";

type ticketDetailMobileProps = {
  data: TicketDetailModel;
  pageId: string | undefined;
  imageURLs: string[];
  history: HistoryEntry[];
  fetchDetailCallback: () => void;
};

function TicketDetailMobile({
  data,
  pageId,
  imageURLs,
  history,
  fetchDetailCallback,
}: ticketDetailMobileProps) {

  const tabs = [
    {
      label: "Ticket Details",
      component: (
        <Box sx={{ pt: 2 }}>
              <TicketDetails
                data={data}
                pageId={pageId}
                imageURLs={imageURLs}
                fetchDetailCallback={fetchDetailCallback}
              />
              <TicketDetailCarousel imageURLs={imageURLs} />
        </Box>
      ),
    },
    {
      label: "Reacties",
      component: (
          <Box sx={{ pt: 2 }}>
            <CommentBox
              ticketId={pageId}
              follows={data.follows}
              created={data.created}
              ticketState={data.state}
            />
          </Box>
      ),
    },
    {
      label: "Geschiedenis",
      component: (
          <Box sx={{ pt: 2 }}>
            <History history={history}/>
          </Box>
          ),
    },
  ];

  return <TabComponent tabs={tabs} data={data} pageId={pageId} fetchDetailCallback={fetchDetailCallback}/>;
}

export default TicketDetailMobile;
