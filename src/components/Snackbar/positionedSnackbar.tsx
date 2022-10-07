import { Alert, AlertColor, IconButton } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { Fragment, SyntheticEvent } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type SnackbarProps = {
  onClose(event: Event | SyntheticEvent<any, Event>): void;
  open: boolean;
  message: string;
  originVertical: "top" | "bottom";
  originHorizontal: "left" | "center" | "right";
  severity: AlertColor | undefined;
}

export default function PositionedSnackbar(
  {onClose, open, message, originVertical, originHorizontal, severity}: SnackbarProps) {

  return (
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{vertical: originVertical, horizontal: originHorizontal }}
        open={open}
        onClose={onClose}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>}
      >
        <Alert onClose={onClose} severity={severity}>{message}</Alert>
      </Snackbar>
  );
}