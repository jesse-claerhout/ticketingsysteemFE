import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CommentService from "../../services/comment.service";
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";

export type CommentModel = {
  commentId: string;
  content: string;
  date: Date;
  ticketTicketId: number;
  ticketTitle: string;
  accountFirstName: string;
  accountLastName: string;
  accountRole: string;
  created: boolean;
};

type CommentListProps = {
  ticketId: string | undefined;
  follows: boolean;
  created: boolean;
  ticketState: string;
};

function CommentBox(props: CommentListProps) {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState("nog geen reacties op dit ticket");

  const changeMessages = (data: any) => {
    if( data.length === 0 ) {
      setMessage("Nog geen reacties op dit ticket!");
    }
    else {
    setMessage("")
      }
  }

  useEffect(() => {
    CommentService.getComments(props.ticketId)
      .then((response) => {
        setComments(response.data);
        changeMessages(response.data);
      })
      .catch((error) => {
        setComments([]);
        console.log(error)
      });
    setRefresh(false);
  }, [refresh, props.ticketId]);

  return (
    <Box
    sx={{px: {md: 50}, pb: 2}}
    >
      <CreateComment
        ticketId={props.ticketId}
        refresh={setRefresh}
        follows={props.follows}
        created={props.created}
        ticketState={props.ticketState}
      />
      {message ? (
        <Box display="flex" justifyContent="center" sx={{ p: 2 }}>
          <Typography>{message}</Typography>
        </Box>
      ) : (
        <></>
      )}
      <CommentList comments={comments} refresh={setRefresh} />
    </Box>
  );
}

export default CommentBox;
