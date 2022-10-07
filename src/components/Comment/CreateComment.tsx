import { Box, Button, Card, Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import CommentService from "../../services/comment.service";
import { Form } from "../Form/form";
import { FormInput } from "../Form/FormInputs/formTextInput";

export type CreateCommentFields = {
    content: string;
};

type CreateCommentProps = {
  ticketId: string | undefined;
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
  follows: boolean;
  created: boolean;
  ticketState: string;
};

function CreateComment(props: CreateCommentProps) {

  const { userInfo } = useContext(UserContext);

  const textfieldDisabled = () => {
    if(userInfo.isHandyman && props.ticketState !== ("Gesloten" || "Verwijderd")){
      return true;
    }
    return (props.follows || props.created) && props.ticketState !== ("Gesloten" || "Verwijderd")
  }
    
  const onSubmit = (data: CreateCommentFields, e: any) => {
    CommentService.postComment(props.ticketId, data)
      .then((response) => {
        e.target.reset();
        props.refresh(true);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <Card sx={{ p: 1, mx: 1, boxShadow: '0 2px 6px #d0efef'}}>
            <Box sx={{p: 1}}>
        <Typography variant="body1" fontWeight="bold" sx={{px: 1, py: 1}}>
          Plaats een reactie
        </Typography>
        <Form onSubmit={onSubmit}>

          <FormInput<CreateCommentFields>
            name="content"
            type="text"
            label={textfieldDisabled() ? "Reactie" : "Abbonneer om een reactie te plaatsen"}
            id="content"
            rules={{ required: "Een reactie mag niet leeg zijn" }}
            multiline
            minRows={2}
            maxRows={3}
            disabled={!textfieldDisabled()}
            characterCounter={200}
          />
          <Button
          variant="contained"
          type="submit"
          sx={{ float: "right", mb: 1 }}
        >
          Plaats
        </Button>

        </Form>
        </Box>
    </Card>
  );
}

export default CreateComment;
