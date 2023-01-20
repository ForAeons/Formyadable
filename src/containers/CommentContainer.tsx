import React, { useState } from "react";
import { Alert, Comment, CommentForm } from "../components";

import { TCommentApiResponse, alert, nullAlert } from "../types/type";

interface Props {
  comment: TCommentApiResponse;
  comments: TCommentApiResponse[];
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
}

/**
 * Container for a comment, which holds the state of the comment.
 * A comment is either in edit or view mode. It defaults to view mode.
 * edit mode is only accessible by creator of the comment.
 */

const CommentContainer: React.FC<Props> = ({
  comment,
  comments,
  setComments,
}) => {
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [alert, setAlert] = useState<alert>(nullAlert);

  // renders different component based on editingComment status
  return (
    <>
      {isEditingComment ? (
        <CommentForm
          thisComment={comment}
          comments={comments}
          setComments={setComments}
          isEditingComment={isEditingComment}
          setIsEditingComment={setIsEditingComment}
          setAlert={setAlert}
        />
      ) : (
        <Comment
          comment={comment}
          comments={comments}
          setComments={setComments}
          setIsEditingComment={setIsEditingComment}
        />
      )}
      {alert.message && <Alert alert={alert} />}
    </>
  );
};

export default CommentContainer;
