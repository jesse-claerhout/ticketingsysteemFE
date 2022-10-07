import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import LetterAvatar from "../Avatar/letterAvatar";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentService from "../../services/comment.service";
import EditIcon from "@mui/icons-material/Edit";
import { Form } from "../Form/form";
import { FormInput } from "../Form/FormInputs/formTextInput";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import updateLocale from "dayjs/plugin/updateLocale";

type CommentCardProps = {
  commentId: string;
  content: string;
  date: Date;
  ticketTicketId: number;
  ticketTitle: string;
  accountFirstName: string;
  accountLastName: string;
  accountRole: string;
  created: boolean;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditCommentFields = {
  content: string;
};

function CommentCard(props: CommentCardProps) {
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const [edit, setEdit] = useState(false);

  const [isHandyman] = useState(props.accountRole === "HANDYMAN");
  const { userInfo } = useContext(UserContext);

  const handleCommentDelete = () => {
    CommentService.deleteComment(props.commentId)
      .then((response) => {
        handleDialogClose();
        props.refresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCommentEdit = () => {
    setEdit(!edit);
  };

  const onSubmit = (data: EditCommentFields) => {
    CommentService.editComment(props.commentId, data)
      .then((response) => {
        setEdit(false);
        props.refresh(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card
      sx={{
        p: 1,
        mx: 1,
        mt: 1,
        boxShadow: isHandyman ? "0 2px 6px #3d8fb8" : "0 2px 6px #d0efef",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 1 }}
      >
        <Box display="flex" alignItems="baseline">
          <LetterAvatar
            size={"small"}
            userName={props.accountFirstName + " " + props.accountLastName}
          />
          <Typography
            variant="caption"
            sx={{ mx: 1, color: isHandyman ? "#3d8fb8" : "fff" }}
          >
            {props.accountFirstName + " " + props.accountLastName}
          </Typography>
          <Typography variant="caption" sx={{ ml: 1 }}>
            {dayjs(props.date).local().fromNow()}
          </Typography>
        </Box>
        {props.created || userInfo.isHandyman ? (
          <div>
            <Tooltip title="Bewerk" sx={{}}>
              <EditIcon fontSize="small" onClick={handleCommentEdit} />
            </Tooltip>
            <Tooltip title="Delete" sx={{ ml: 2 }}>
              <DeleteIcon fontSize="small" onClick={handleDialogOpen} />
            </Tooltip>
          </div>
        ) : (
          <></>
        )}
      </Box>
      <Divider />
      <Box sx={{ width: "100%" }}>
        {edit ? (
          <Form onSubmit={onSubmit}>
            <FormInput<EditCommentFields>
              name="content"
              type="text"
              label="Bewerk je reactie"
              id="content"
              defaultValue={props.content}
              multiline
              minRows={1}
              maxRows={4}
              rules={{ required: "Een reactie mag niet leeg zijn" }}
              sx={{ mt: 1 }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ float: "right", mb: 1 }}
            >
              Bewerk
            </Button>
          </Form>
        ) : (
          <Typography
            style={{ overflowWrap: "anywhere", whiteSpace: "pre-line" }}
            sx={{ ml: 1, py: 1 }}
          >
            {props.content}
          </Typography>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Je reactie verwijderen?</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={handleCommentDelete}>
            Verwijderen
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default CommentCard;
