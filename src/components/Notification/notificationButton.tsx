import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useEffect, useState } from "react";
import AccountService from "../../services/account.service";
import NotificationsPopover from "./notificationPopover";

export default function NotificationButton() {
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );

  useEffect(() => {
    getNewNotificationsCount();
    const interval = setInterval(() => {
      getNewNotificationsCount();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function getNewNotificationsCount() {
    AccountService.countNewNotifications().then((response) =>
      setNewNotificationsCount(response.data)
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
    setPopoverOpen(true);
    setNewNotificationsCount(0);
  };

  function handleClose() {
    setPopoverOpen(false);
  }

  return (
    <>
      <IconButton
        aria-label="notifications"
        sx={{ mr: 2 }}
        onClick={handleClick}
      >
        <Badge badgeContent={newNotificationsCount} color="primary">
          <NotificationsIcon sx={{ color: "#ffffff" }} />
        </Badge>
      </IconButton>
      <NotificationsPopover
        open={popoverOpen}
        handleClose={handleClose}
        anchorElement={anchorElement}
      />
    </>
  );
}
