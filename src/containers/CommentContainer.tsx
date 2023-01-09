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
  const [isEditing, setIsEditing] = useState(false);

  // renders different component based on editing status
  if (isEditing)
    return (
      <CommentForm
        postID={comment.post_id}
        thisComment={comment}
        comments={comments}
        setComments={setComments}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    );
  else
    return (
      <Comment
        comment={comment}
        comments={comments}
        setComments={setComments}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    );
};

export default CommentContainer;
