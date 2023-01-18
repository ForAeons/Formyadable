import React from "react";
import { Alert, CommentCard, CommentForm } from "../components";

import { Comment } from "../store/type";

interface Props {
  comment: Comment;
}

/**
 * Container for a comment, which holds the state of the comment.
 * A comment is either in edit or view mode. It defaults to view mode.
 * edit mode is only accessible by creator of the comment.
 */
const CommentContainer: React.FC<Props> = ({ comment }) => {
  // renders different component based on editingComment status
  return (
    <>
      {comment.isEditingComment ? (
        <CommentForm comment={comment} />
      ) : (
        <CommentCard comment={comment} />
      )}
      {comment.alert.message && <Alert alert={comment.alert} />}
    </>
  );
};

export default CommentContainer;
