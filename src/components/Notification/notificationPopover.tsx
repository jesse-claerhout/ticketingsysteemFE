import { Popover, Box, Typography } from "@mui/material";
import NotificationList from "./notificationList";
import { optisTheme } from "../../assets/styles/theme";

export default function NotificationPopover(props: {
  open: boolean;
  handleClose: () => void;
  anchorElement: HTMLButtonElement | null;
}) {
  return (
    <Popover
      open={props.open}
      onClose={props.handleClose}
      anchorEl={props.anchorElement}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      sx={{
        mx: 1,
      }}
    >
      <Box
        sx={{
          px: 0,
          [optisTheme.breakpoints.down("sm")]: {
            minWidth: "300px",
          },
          [optisTheme.breakpoints.up("sm")]: {
            minWidth: "400px",
          },
        }}
      >
        <Box
          sx={{
            m: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Notificaties</Typography>
        </Box>
          <NotificationList closePopover={props.handleClose} />
      </Box>
    </Popover>
  );
}
