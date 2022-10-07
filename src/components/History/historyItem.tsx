import {
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { optisTheme } from "../../assets/styles/theme";
import { HistoryEntry } from "../../types/historyEntryType";

import PendingIcon from "@mui/icons-material/Pending";
import BuildIcon from "@mui/icons-material/Build";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CheckIcon from "@mui/icons-material/Check";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import updateLocale from "dayjs/plugin/updateLocale";

export default function HistoryItem(props: {
  entry: HistoryEntry; 
  isLast: boolean;
}) {
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
    <TimelineItem>
      <TimelineOppositeContent
        align="right"
        variant="body2"
        color="text.secondary"
        sx={{ mt: "12px" }}
      >
        {dayjs(props.entry.dateTime).local().fromNow()}
      </TimelineOppositeContent>
      <TimelineSeparator sx={{ height: "max" }}>
        <TimelineDot sx={{ bgcolor: getColor(props.entry) }}>
          {getIcon(props.entry)}
        </TimelineDot>
        {props.isLast ? <></> : <TimelineConnector sx={{ height: "24px" }} />}
      </TimelineSeparator>
      <TimelineContent sx={{ mt: "12px" }}>
        {getText(props.entry)}
      </TimelineContent>
    </TimelineItem>
  );
}

function getText(entry: HistoryEntry): string {
  switch (entry.type) {
    case "STATE_CHANGE":
      return `Status veranderd naar ${entry.newState}`;
    case "CREATED":
      return "Ticket aangemaakt";
    case "HANDYMAN_COMMENT":
      return `${entry.handyman} heeft een reactie geplaatst`;
  }
  return "?";
}

// Color helper functions

function getColor(entry: HistoryEntry): string {
  switch (entry.type) {
    case "STATE_CHANGE":
      return getStateColor(entry.newState!!);
    case "CREATED":
      return optisTheme.palette.error.main;
    case "HANDYMAN_COMMENT":
    default:
      return optisTheme.palette.primary.main;
  }
}

function getStateColor(state: string): string {
  switch (state) {
    case "Bezig":
    case "Wachten op materiaal":
    case "Wachten op goedkeuring":
      return optisTheme.palette.warning.main;
    case "Gesloten":
      return optisTheme.palette.success.main;
    case "Verwijderd":
      return optisTheme.palette.error.main;
    case "Werkman aangesteld":
    default:
      return optisTheme.palette.primary.main;
  }
}

// Icon helper functions

function getIcon(entry: HistoryEntry) {
  switch (entry.type) {
    case "STATE_CHANGE":
      return getStateIcon(entry.newState!!);
    case "CREATED":
      return <BookmarkIcon />;
    case "HANDYMAN_COMMENT":
    default:
      return <CommentIcon />;
  }
}

function getStateIcon(state: string) {
  switch (state) {
    case "Bezig":
      return <BuildIcon />;
    case "Wachten op materiaal":
    case "Wachten op goedkeuring":
      return <PendingIcon />;
    case "Gesloten":
      return <CheckIcon />;
    case "Werkman aangesteld":
      return <ArrowDropUpIcon />;
    case "Verwijderd":
      return <DeleteIcon />;
    default:
      return <></>;
  }
}
