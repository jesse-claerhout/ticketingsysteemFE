import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TicketService from "../services/ticket.service";
import { TicketDetailModel } from "../types/ticketDetailModel";
import ImageService from "../services/image.service";
import TicketDetailMobile from "../components/TicketDetails/ticketDetailMobile";
import { HistoryEntry } from "../types/historyEntryType";
import TicketDetailsWideScreen from "../components/TicketDetails/ticketDetailsWideScreen";

export default function TicketDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState<TicketDetailModel>();
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const [history, setHistory] = useState<HistoryEntry[]>();

  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 800;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  const fetchTicketDetail = useCallback(() => {
    TicketService.getTicketDetail(id)
      .then((res) => {
        setData(res.data);
        ImageService.getImageURLs(id)
          .then((response) => {
            setImageURLs(response.data);
          })
          .catch((error) => {});
        document.title = `Opticket | ${res.data.title}`;
      })
      .catch((error) => {
        console.log(error);
      });

    TicketService.getHistory(id)
      .then((res) => setHistory(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    fetchTicketDetail();
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [navigate, fetchTicketDetail]);

  return (
    <>
      {data && history ? (
        <div>
          {isMobile ? (
            <TicketDetailMobile
              data={data}
              pageId={id}
              imageURLs={imageURLs}
              history={history}
              fetchDetailCallback={fetchTicketDetail}
            />
          ) : (
            <TicketDetailsWideScreen
              data={data}
              pageId={id}
              imageURLs={imageURLs}
              history={history}
              fetchDetailCallback={fetchTicketDetail}
            />
          )}
        </div>
      ) : (
        <p>Ticketdetails aan het laden...</p>
      )}
    </>
  );
}
