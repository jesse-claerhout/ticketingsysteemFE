import { EditCommentFields } from "../components/Comment/CommentCard";
import { CreateCommentFields } from "../components/Comment/CreateComment";
import interceptors from "./interceptors";

const postComment = (id: string | undefined, data: CreateCommentFields) => {
    return interceptors.post(`/comments/${id}`, data);
  };

const getComments = (id: string | undefined) => {
    return interceptors.get(`/comments/${id}`);
}

const deleteComment = (id: string | undefined) => {
  return interceptors.delete(`/comments/${id}`);
}

const editComment = (id: string | undefined, data: EditCommentFields) => {
  return interceptors.put(`/comments/${id}`, data)
}

const CommentService = {
  postComment,
  getComments,
  deleteComment,
  editComment,
};
export default CommentService;