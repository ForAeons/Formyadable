import React, { useState } from "react";
import { Comment, CommentForm } from "../components";

import { TCommentApiResponse } from "../types/type";

interface Props {
  comment: TCommentApiResponse;
  comments: TCommentApiResponse[];
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
}

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
        isEditingComment={isEditingComment}
        setIsEditingComment={setIsEditingComment}
      />
    );
};

export default CommentContainer;
