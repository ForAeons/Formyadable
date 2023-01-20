import React, { useState } from "react";
import { stripHtml } from "string-strip-html";

import { TCommentApiResponse, alert } from "../../types/type";
import {
  BtnClose,
  BtnDelete,
  BtnEdit,
  BtnPost,
  QuillEditor,
} from "../../components";
import {
  handleCloseFn,
  handleDeleteFn,
  handleEditFn,
  handleSubmitFn,
} from "./handler";

interface Props {
  thisComment: TCommentApiResponse;
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
  comments: TCommentApiResponse[];
  isEditingComment?: boolean;
  setIsEditingComment?: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<alert>>;
}

/**
 * Displays a single comment form.
 * Ability to post new comment.
 * Ability edit existing comment for creator of the comment.
 * Ability leave edit mode for creator of the comment.
 */

const CommentForm: React.FC<Props> = ({
  thisComment,
  comments,
  setComments,
  isEditingComment,
  setIsEditingComment,
  setAlert,
}) => {
  const [content, setContent] = useState(thisComment.content);

  const handleClose = handleCloseFn(setIsEditingComment);

  const handleSubmit = handleSubmitFn(
    thisComment,
    comments,
    content,
    setContent,
    setComments,
    setAlert
  );

  const handleEdit = handleEditFn(
    thisComment,
    comments,
    content,
    setComments,
    setIsEditingComment,
    setAlert
  );

  // DELETE comment
  const handleDeleteComment = handleDeleteFn(
    thisComment,
    comments,
    setComments,
    setAlert
  );

  return (
    <form className="flex flex-col w-full bg-slate-200 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl gap-2 lg:gap-3 transition mt-2">
      <div className="flex flex-row justify-between">
        <label
          htmlFor="body"
          className="text-xl px-4 lg:px-6 font-bold text-slate-700 font-Raleway tracking-wide"
        >
          {/* Display different prompt text based on mode */}
          {`${isEditingComment ? "Edit your comment" : "New comment"}`}
        </label>
        {/* only displays close btn when in edit mode */}
        {isEditingComment && <BtnClose handleClick={handleClose} />}
      </div>

      <div className="bg-white w-full">
        <QuillEditor value={content} onChange={setContent} />
      </div>
      {/* <div className="justify-left flex flex-row justify-between items-center gap-4 px-4 lg:px-6 py-3 rounded-xl lg:rounded-2xl shadow-inner bg-white">
        <textarea
          id="body"
          className="text-md text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1"
          maxLength={5000}
          placeholder=""
          rows={4}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaCommentRef}
          onInput={handleOnInput}
          value={content}
        />
      </div> */}

      <h4 className="font-sans font-bold text-xs text-slate-500 ml-auto">{`${
        stripHtml(content).result.length
      }/3000`}</h4>

      <div className="flex flex-row justify-between">
        {/* displays different button based whether creating new comment or editing existing one */}
        {isEditingComment ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}
        {isEditingComment && <BtnDelete handleClick={handleDeleteComment} />}
      </div>
    </form>
  );
};

export default CommentForm;
