import React, { useState } from "react";
import { Comment, CommentForm } from "../components";

import { TCommentApiResponse } from "../types/type";

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

  // renders different component based on editingComment status
  if (isEditingComment)
    return (
      <CommentForm
        postID={comment.post_id}
        thisComment={comment}
        comments={comments}
        setComments={setComments}
        isEditingComment={isEditingComment}
        setIsEditingComment={setIsEditingComment}
      />
    );
  else
    return (
      <Comment
        comment={comment}
        comments={comments}
        setComments={setComments}
        setIsEditingComment={setIsEditingComment}
      />
    );
};

export default CommentContainer;
