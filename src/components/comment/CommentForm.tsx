import React, { useState, useRef } from "react";

import {
  createComment,
  updateComment,
  deleteComment,
} from "../../utility/commentApi";
import {
  TCommentApiResponse,
  alert,
  severityLevel,
  IAxiosError,
  nullAlert,
} from "../../types/type";
import {
  BtnClose,
  BtnDelete,
  BtnEdit,
  BtnPost,
  QuillEditor,
} from "../../components";
import { handleError } from "../../utility/error";
import { cleanHtml } from "../../utility/strings";

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
  const [content, setContent] = useState(thisComment.content);

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    // checks for undefined
    if (setIsEditingComment) setIsEditingComment(false);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (content === "") {
      setAlert({
        message: "Your comment cannot be empty",
        severity: severityLevel.low,
      });
      return;
    }

    if (content.length > 3000) {
      setAlert({
        message: "Your comment have exceeded the maximum character limit.",
        severity: severityLevel.medium,
      });
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(content);

    updateComment(
      { content: santiziedContent, post_id: thisComment.post_id },
      thisComment.id
    )
      .then((result: TCommentApiResponse) => {
        setComments(
          comments.map((eachComment) =>
            eachComment.id !== thisComment.id ? eachComment : result
          )
        );
        setAlert(nullAlert);
        if (setIsEditingComment) setIsEditingComment(false);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unauthorized",
          responseMessage: "You may not edit comments from others!",
          severity: severityLevel.medium,
        });
      });
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (content.trim() === "") {
      setAlert({
        message: "Your comment cannot be empty",
        severity: severityLevel.low,
      });
      return;
    }

    if (content.length > 3000) {
      setAlert({
        message: "Your comment have exceeded the maximum character limit.",
        severity: severityLevel.medium,
      });
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(content);
    createComment({ content: santiziedContent, post_id: postID })
      .then((result: TCommentApiResponse) => {
        setComments([result, ...comments]);

        // clears the input field
        setContent("");
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unprocessable Entity",
          responseMessage:
            "Please check that your comment does not exceed maximum length!",
          severity: severityLevel.medium,
        });
      });
  };

  // DELETE post
  const handleDeleteComment = (commentID: number) => {
    return () => {
      deleteComment(commentID)
        .then(() => {
          setComments(
            comments.filter((eachcomment) => eachcomment.id !== thisComment.id)
          );
          setAlert(nullAlert);
        })
        .catch((err) => {
          handleError(err, setAlert);
        });
    };
  };

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

      <h4 className="font-sans font-bold text-xs text-slate-500 ml-auto">{`${content.length}/3000`}</h4>

      <div className="flex flex-row justify-between">
        {/* displays different button based whether creating new comment or editing existing one */}
        {isEditingComment ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}
        {isEditingComment && (
          <BtnDelete handleClick={() => handleDeleteComment(thisComment.id)} />
        )}
        {/* <!-- Post status --> */}
      </div>
    </form>
  );
};

export default CommentForm;
