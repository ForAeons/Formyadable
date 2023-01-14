import React, { useState, useRef } from "react";

import { createComment, updateComment } from "../../utility/commentApi";
import {
  TCommentApiResponse,
  alert,
  severityLevel,
  IAxiosError,
} from "../../types/type";
import { BtnClose, BtnEdit, BtnPost } from "../../components";

interface Props {
  postID: number;
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
  postID,
  thisComment,
  comments,
  setComments,
  isEditingComment,
  setIsEditingComment,
  setAlert,
}) => {
  const [content, setContent] = useState("");

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    console.log("Close btn clicked");

    // checks for undefined
    if (setIsEditingComment) setIsEditingComment(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Edit btn clicked");

    updateComment(
      { content: content, post_id: thisComment.post_id },
      thisComment.id
    )
      .then((result: TCommentApiResponse) => {
        setComments([
          result,
          ...comments.filter(
            (eachComment) => eachComment.id !== thisComment.id
          ),
        ]);
        if (setIsEditingComment) setIsEditingComment(false);
      })
      .catch((err: IAxiosError) => {
        console.log(err);
        if (err.request.statusText === "Unauthorized") {
          setAlert({
            message: "You may not edit comments from others!",
            severity: severityLevel.medium,
          });
          return;
        }
        if (err.response.statusText) {
          setAlert({
            message: err.response.statusText,
            severity: severityLevel.high,
          });
          return;
        }
        if (err.message) {
          setAlert({
            message: err.message,
            severity: severityLevel.high,
          });
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
        setComments([result, ...comments]);
      })
      .catch((err) => {
        console.log(err);
        if (err.request.statusText === "Unauthorized") {
          setAlert({
            message: "Please login first!",
            severity: severityLevel.medium,
          });
          return;
        }
        if (err.response.statusText) {
          setAlert({
            message: err.response.statusText,
            severity: severityLevel.high,
          });
          return;
        }
        if (err.message) {
          setAlert({
            message: err.message,
            severity: severityLevel.high,
          });
        }
      });
  };

  const textareaCommentRef = useRef<HTMLTextAreaElement>(null);

  // Allows textfields to expand upon reaching its size limit
  const handleOnInput = () => {
    if (textareaCommentRef.current) {
      textareaCommentRef.current.style.height = "auto";
      textareaCommentRef.current.style.height =
        textareaCommentRef.current.scrollHeight + "px";
    }
  };

  return (
    <form className="flex flex-col w-full mx-3 bg-slate-200 rounded-3xl p-6 shadow-lg  hover:shadow-xl gap-3">
      <div className="flex flex-row justify-between">
        <label
          htmlFor="body"
          className="text-2xl px-6 font-bold text-slate-700 font-Raleway tracking-wide"
        >
          {/* Display different prompt text based on mode */}
          {`${isEditingComment ? "Edit your comment" : "New comment"}`}
        </label>
        {/* only displays close btn when in edit mode */}
        {isEditingComment && <BtnClose handleClick={handleClose} />}
      </div>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-inner bg-white">
        <textarea
          id="body"
          className="text-lg text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          maxLength={5000}
          placeholder=""
          rows={4}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaCommentRef}
          onInput={handleOnInput}
          defaultValue={thisComment.content}
        />
      </div>
      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-transparent" />
      <div className="flex flex-row justify-between gap-4">
        {/* displays different button based whether creating new comment or editing existing one */}
        {isEditingComment ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}
        {/* <!-- Post status --> */}
        <h4 className="font-sans font-bold text-xs text-slate-500">{`${content.length}/3000`}</h4>
      </div>
    </form>
  );
};

export default CommentForm;
