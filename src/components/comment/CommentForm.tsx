import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { stripHtml } from "string-strip-html";

import {
  submitCommentFn,
  editCommentFn,
  deleteCommentFn,
  closeCommentFn,
} from "../../utility/commentApi";
import { Comment } from "../../store/type";
import {
  BtnClose,
  BtnDelete,
  BtnEdit,
  BtnPost,
  QuillEditor,
} from "../../components";
import { editComment } from "../../store/action";

interface Props {
  comment: Comment;
}

/**
 * Displays a single comment form.
 * Ability to post new comment.
 * Ability edit existing comment for creator of the comment.
 * Ability leave edit mode for creator of the comment.
 */
const CommentForm: React.FC<Props> = ({ comment }) => {
  const dispatch = useDispatch();
  const handleClose = closeCommentFn(comment);
  const handleEdit = editCommentFn(comment);
  const handleSubmit = submitCommentFn(comment);
  const handleDelete = deleteCommentFn(comment);

  return (
    <form className="flex flex-col w-full bg-slate-200 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl gap-2 lg:gap-3 transition mt-2">
      <div className="flex flex-row justify-between">
        <label
          htmlFor="body"
          className="text-xl px-4 lg:px-6 font-bold text-slate-700 font-Raleway tracking-wide"
        >
          {/* Display different prompt text based on mode */}
          {`${comment.isEditingComment ? "Edit your comment" : "New comment"}`}
        </label>
        {/* only displays close btn when in edit mode */}
        {comment.isEditingComment && <BtnClose handleClick={handleClose} />}
      </div>

      <div className="bg-white w-full">
        <QuillEditor
          value={comment.content}
          onChange={(content: string) =>
            dispatch(
              editComment({
                ...comment,
                content: content,
              })
            )
          }
        />
      </div>

      <h4 className="font-sans font-bold text-xs text-slate-500 ml-auto">{`${
        stripHtml(comment.content).result.length
      }/3000`}</h4>

      <div className="flex flex-row justify-between">
        {/* displays different button based whether creating new comment or editing existing one */}
        {comment.isEditingComment ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}
        {comment.isEditingComment && <BtnDelete handleClick={handleDelete} />}
      </div>
    </form>
  );
};

export default CommentForm;
