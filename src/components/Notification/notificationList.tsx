import {
  List,
  Typography,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import AccountService from "../../services/account.service";
import { NotificationType } from "../../types/notificationType";
import NotificationItem from "./notificationItem";
import emptyInbox from "../../assets/images/emptyinbox.png";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { optisTheme } from "../../assets/styles/theme";

export default function NotificationList(props: {closePopover: () => void}) {
  const [notifications, setNotifications] = useState<
    NotificationType[] | null
  >();

  useEffect(() => {
    AccountService.getInbox().then((response) => {
      setNotifications(response.data);
    });
  }, [setNotifications]);

  function fetchNotifications() {
    AccountService.getInbox().then((response) => {
      setNotifications(response.data);
    });
  }

  function deleteNotification(id: number) {
    AccountService.deleteNotification(id).then(() => {
      fetchNotifications();
    });
  }

  function clearInbox() {
    AccountService.clearInbox().then(() => {
      fetchNotifications();
    });
  }

  if (notifications != null) {
    if (notifications.length === 0) {
      return (
        <Box
          sx={{
            height: "550px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={emptyInbox} alt="" height="220" width="220" />
        </Box>
      );
    } else {
      return (
        <>
          <List disablePadding>
            <ListItemButton onClick={clearInbox}>
              <ListItemIcon>
                <DeleteSweepIcon />
              </ListItemIcon>
              <ListItemText primary="Alles wissen" />
            </ListItemButton>
            <Divider />
            <Box
            sx={{
              maxHeight: "550px",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: optisTheme.palette.secondary.main,
                outline: "0px solid slategrey",
                borderRadius: 0.5,
              },
              [optisTheme.breakpoints.down("sm")]: {
                minHeight: "400px",
              },
              [optisTheme.breakpoints.up("sm")]: {
                minHeight: "550px",
              },
            }}
            >
            {notifications.map((notification, i) => (
              <NotificationItem
                key={i}
                notification={notification}
                deleteNotification={deleteNotification}
                closePopover={props.closePopover}
              />
            ))}
            </Box>
          </List>
        </>
      );
    }
  } else {
    return (
      <Typography sx={{ m: 1 }}>Notificaties aan het ophalen...</Typography>
    );
  }
}
