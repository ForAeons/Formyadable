import React, { useState } from "react";

import { createComment, updateComment } from "../../utility/commentApi";
import { TCommentApiResponse } from "../../types/type";
import { BtnClose, BtnEdit, BtnPost } from "../../components";

interface Props {
  postID: number;
  thisComment: TCommentApiResponse;
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
  comments: TCommentApiResponse[];
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentForm: React.FC<Props> = ({
  postID,
  thisComment,
  comments,
  setComments,
  isEditing,
  setIsEditing,
}) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    console.log("Close btn clicked");

    // checks for undefined
    if (setIsEditing) setIsEditing(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Edit btn clicked");

    updateComment(
      { content: content, post_id: thisComment.post_id },
      thisComment.id
    )
      .then((result: TCommentApiResponse) => {
        setMessage("Post edited!");
        setComments([
          result,
          ...comments.filter(
            (eachComment) => eachComment.id !== thisComment.id
          ),
        ]);
        if (setIsEditing) setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.request.statusText === "Unauthorized") {
          setMessage("Please login first!");
          return;
        }
        if (err.message) {
          setMessage(err.message);
        }
      });
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    // const target = (e.target as Element).closest(".btn__post");
    // // Guard clause
    // if (!target) return;

    console.log("Post btn clicked");
    createComment({ content: content, post_id: postID })
      .then((result: TCommentApiResponse) => {
        setMessage("Comment posted!");
        setComments([result, ...comments]);
      })
      .catch((err) => {
        console.log(err);
        if (err.request.statusText === "Unauthorized") {
          setMessage("Please login first!");
          return;
        }
        if (err.message) {
          setMessage(err.message);
        }
      });
  };

  return (
    <form className="flex flex-col w-full mx-3 bg-slate-200 rounded-3xl p-6 shadow-lg  hover:shadow-xl gap-3">
      <div className="flex flex-row justify-between">
        <label
          htmlFor="body"
          className="text-2xl px-6 font-bold text-slate-700 font-Raleway tracking-wide"
        >
          {/* Display different prompt text based on mode */}
          {`${isEditing ? "Edit your comment" : "New comment"}`}
        </label>
        {/* only displays close btn when in edit mode */}
        {isEditing && <BtnClose handleClick={handleClose} />}
      </div>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-md bg-slate-50">
        <textarea
          id="body"
          className="text-lg text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          maxLength={5000}
          placeholder=""
          rows={9}
          onChange={(e) => setContent(e.target.value)}
        >
          {thisComment.content}
        </textarea>
      </div>
      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-transparent" />
      <div className="flex flex-row justify-between">
        {/* displays different button based whether creating new comment or editing existing one */}
        {isEditing ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}
        {/* Renders a message depending when necessary */}
        {message && <p>{message}</p>}
        {/* <!-- Post status --> */}
        <h4 className="font-sans font-bold text-xs text-slate-500">{`${content.length}/3000`}</h4>
      </div>
    </form>
  );
};

export default CommentForm;
