import {
  ListItemButton,
  ListItemText,
  IconButton,
  ListItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotificationType } from "../../types/notificationType";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { optisTheme } from "../../assets/styles/theme";
import updateLocale from "dayjs/plugin/updateLocale";

export default function NotificationItem(props: {
  notification: NotificationType;
  deleteNotification: (id: number) => void;
  closePopover: () => void;
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

  const navigate = useNavigate();

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="verwijderen"
            onClick={() =>
              props.deleteNotification(props.notification.notificationId)
            }
          >
            <CloseIcon />
          </IconButton>
        }
      >
        <ListItemButton
          onClick={() => {
            navigate(`/tickets/${props.notification.ticketId}`);
            props.closePopover();
          }}
        >
          <ListItemText
            primary={
              <Typography
                variant="body1"
                fontWeight={props.notification.seen ? "regular" : "bold"}
              >
                {props.notification.text}
              </Typography>
            }
            secondary={
              <Typography variant="body2" sx={{ pt: 0.5, color: optisTheme.palette.primary.main }}>
                {dayjs(props.notification.dateTime).local().fromNow()}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
