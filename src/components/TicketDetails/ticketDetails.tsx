import { Card, Grid } from "@mui/material";
import { renderStateIcon, renderPriorityIcon } from "../Ticket/ticketCard";
import { TextDetailInformation } from "../TextInformation/textDetailInformation";
import { TicketDetailModel } from "../../types/ticketDetailModel";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import { optisTheme } from "../../assets/styles/theme";

export type TicketDetailsProps = {
  data: TicketDetailModel;
  pageId: string | undefined;
  imageURLs: string[];
  fetchDetailCallback: () => void;
};

export default function TicketDetails({ data, imageURLs }: TicketDetailsProps) {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(updateLocale);

  dayjs.updateLocale("en", {
    relativeTime: {
      future: "binnen %s",
      past: "%s geleden",
      s: "enkele seconden",
      m: "een minuut",
      mm: "%d minuten",
      h: "een uur",
      hh: "%d uur",
      d: "een dag",
      dd: "%d dagen",
      M: "een maand",
      MM: "%d maanden",
      y: "een jaar",
      yy: "%d jaar",
    },
  });

  return (
    <>
      <Grid container direction="row" alignItems="flex-start">
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{ mx: {xs: 1, md: 4},p: 1, boxShadow: '0 2px 6px #d0efef', height: {md: 448,
              scrollbarWidth: "thin",
              scrollbarColor: `${optisTheme.palette.secondary.light} #fff`,
              overflow: "auto",
              height: {
                xs: "calc(100vh - 64px - 60px - 126px)",
                md: "calc(100vh - 64px - 101px)",
              },
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: optisTheme.palette.secondary.light,
                outline: "0px solid slategrey",
                borderRadius: 0.5,
              },
            }}}
          >
            <Grid container>
              <Grid item xs={12}>
                <TextDetailInformation
                  label="Status"
                  textInformation={data.state}
                  icon={renderStateIcon(data.state)}
                />
                <TextDetailInformation
                  label="Prioriteit"
                  textInformation={data.priority}
                  icon={renderPriorityIcon(data.priority)}
                />
                <TextDetailInformation
                  label="Locatie"
                  textInformation={
                    data.ticketLocationBuildingAddress +
                    " - " +
                    data.ticketLocationSpace
                  }
                />
                <TextDetailInformation
                  label="Aangemaakt"
                  textInformation={dayjs(data.date).local().fromNow()}
                />
                {data.deliveryDate && (
                  <TextDetailInformation
                    label="Verwachte oplevering"
                    textInformation={dayjs(data.deliveryDate).local().fromNow()}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextDetailInformation
                  label="Beschrijving"
                  textInformation={data.description}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
