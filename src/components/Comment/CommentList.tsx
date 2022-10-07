import { CommentModel } from "./CommentBox";
import CommentCard from "./CommentCard";

type CommentListProps = {
  comments: CommentModel[];
  refresh: React.Dispatch<React.SetStateAction<boolean>>;
};

function CommentList({ comments, refresh }: CommentListProps) {
  return (
    <>
      {comments.map((c) => (
        <CommentCard
          key={c.commentId}
          commentId={c.commentId}
          content={c.content}
          date={c.date}
          ticketTicketId={c.ticketTicketId}
          ticketTitle={c.ticketTitle}
          accountFirstName={c.accountFirstName}
          accountLastName={c.accountLastName}
          accountRole={c.accountRole}
          created={c.created}
          refresh={refresh}
        />
      ))}
    </>
  );
}

export default CommentList;
