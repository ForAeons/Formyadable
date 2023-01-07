import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

import { updatePost } from "../../utility/postApi";
import { category, TPostApiResponse, TPost } from "../../types/type";

interface Props {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  posts: TPostApiResponse[];
  setPosts: React.Dispatch<React.SetStateAction<TPostApiResponse[]>>;
  thisPost: TPost;
}

const PostEdit: React.FC<Props> = ({
  setIsEditing,
  posts,
  setPosts,
  thisPost,
}) => {
  const [title, setTitle] = useState(thisPost.title);
  const [content, setContent] = useState(thisPost.content);
  const [category, setCategory] = useState(thisPost.category);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    updatePost({
      title: title,
      content: content,
      category: category,
      id: thisPost.id,
    })
      .then((result: TPostApiResponse) => {
        setMessage("Post edited!");
        setPosts([result, ...posts]);
        setIsEditing(false);
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
      className="flex flex-col w-full m-3 bg-slate-200 rounded-3xl p-6 shadow-lg  hover:shadow-xl gap-3"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between">
        {/* <!-- title section --> */}
        <label
          htmlFor="newPost"
          className="text-2xl px-6  font-bold text-slate-700 font-Raleway tracking-wide"
        >
          Your Title
        </label>
        {/* Close button */}
        <button onClick={() => setIsEditing(false)}>
          <XCircleIcon className="h-9 w-9  hover:text-slate-500 text-slate-600 self-center " />
        </button>
      </div>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-md bg-slate-50">
        <textarea
          id="newPost"
          className="text-2xl font-bold text-slate-700 font-Raleway tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          placeholder="An interesting title"
          maxLength={300}
          rows={3}
          onChange={(e) => setTitle(e.target.value)}
        >
          {title}
        </textarea>
      </div>
      {/* <!-- Post status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">
        {`${title.length}/300`}
      </h4>
      <label
        htmlFor="body"
        className="text-2xl px-6  font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Body
      </label>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-md bg-slate-50">
        <textarea
          id="body"
          className="text-lg text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          maxLength={5000}
          placeholder="Text (optional)"
          rows={9}
          onChange={(e) => setContent(e.target.value)}
        >
          {content}
        </textarea>
      </div>
      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-transparent" />
      <div className="flex flex-row justify-between">
        <input
          type="submit"
          className="rounded-md bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-slate-200"
          value="Post"
        ></input>
        {/* Renders a error message depending when necessary */}
        {message && <p>{message}</p>}
        {/* <!-- Post status --> */}
        <h4 className="font-sans font-bold text-xs text-slate-500">{`${content.length}/5000`}</h4>
      </div>
    </form>
  );
};

export default PostEdit;
