import React, { useState } from "react";

import { createComment } from "../../utility/commentApi";
import { TCommentApiResponse } from "../../types/type";

interface Props {
  postID: number;
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
  comments: TCommentApiResponse[];
}

const CommentForm: React.FC<Props> = ({ postID, setComments, comments }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
    <form
      className="flex flex-col w-full mx-3 bg-slate-200 rounded-3xl p-6 shadow-lg  hover:shadow-xl gap-3"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="body"
        className="text-2xl px-6  font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Your comment
      </label>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-md bg-slate-50">
        <textarea
          id="body"
          className="text-lg text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          maxLength={5000}
          placeholder=""
          rows={9}
          onChange={(e) => setContent(e.target.value)}
        >
          {""}
        </textarea>
      </div>
      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-transparent" />
      <div className="flex flex-row justify-between">
        <button className="rounded-md bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-slate-200">
          Post
        </button>
        {/* Renders a error message depending when necessary */}
        {message && <p>{message}</p>}
        {/* <!-- Post status --> */}
        <h4 className="font-sans font-bold text-xs text-slate-500">{`${content.length}/3000`}</h4>
      </div>
    </form>
  );
};

export default CommentForm;
