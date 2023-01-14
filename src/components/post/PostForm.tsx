import React, { useState } from "react";

import {
  TPostApiResponse,
  TPost,
  categories,
  alert,
  IAxiosError,
  severityLevel,
} from "../../types/type";
import { BtnClose, BtnPost, BtnEdit, BtnCategory } from "../../components";
import { createPost, updatePost } from "../../utility/postApi";
import { snakeCase } from "../../utility/strings";

interface Props {
  thisPost: TPost;
  posts: TPostApiResponse[];
  setPosts: React.Dispatch<React.SetStateAction<TPostApiResponse[]>>;
  isEditingPost: boolean;
  setForumStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: React.Dispatch<React.SetStateAction<alert>>;
}

/**
 * Displays a single post form.
 * Ability to post new post.
 * Ability edit existing post for creator of the post.
 * Ability leave edit mode for creator of the post.
 */

const PostForm: React.FC<Props> = ({
  thisPost,
  posts,
  setPosts,
  isEditingPost,
  setForumStatus,
  setAlert,
}) => {
  const [title, setTitle] = useState(thisPost.title);
  const [content, setContent] = useState(thisPost.content);
  const [category, setCategory] = useState(thisPost.category);
  const [message, setMessage] = useState("");

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setForumStatus(false);
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    createPost({ title: title, content: content, category: category })
      .then((result: TPostApiResponse) => {
        setPosts([result, ...posts]);
        setForumStatus(false);
      })
      .catch((err: IAxiosError) => {
        console.log(err);
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

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    updatePost({
      title: title,
      content: content,
      category: category,
      id: thisPost.id,
    })
      .then((result: TPostApiResponse) => {
        setMessage("Post edited!");
        setPosts([
          result,
          ...posts.filter((eachPost) => eachPost.id !== thisPost.id),
        ]);
        setForumStatus(false);
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
    <form className="flex flex-col w-full m-3 bg-slate-200 rounded-3xl p-6 shadow-lg  hover:shadow-xl gap-3">
      <div className="flex justify-between">
        {/* <!-- title section --> */}
        <label
          htmlFor="newPost"
          className="text-2xl px-6  font-bold text-slate-700 font-Raleway tracking-wide"
        >
          Your Title
        </label>

        {/* Close button */}
        <BtnClose handleClick={handleClose} />
      </div>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-inner bg-white">
        <textarea
          id="newPost"
          className="text-2xl font-bold text-slate-700 font-Raleway tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          placeholder="An interesting title"
          maxLength={300}
          rows={3}
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
        />
      </div>

      {/* <!-- title length status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">
        {`${title.length}/300`}
      </h4>

      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-slate-300" />

      <label
        htmlFor="body"
        className="text-2xl px-6 font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Body
      </label>
      <div className="flex flex-row justify-between items-center gap-4 px-6 py-3 rounded-2xl shadow-inner bg-white">
        <textarea
          id="body"
          className="text-lg text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
          maxLength={5000}
          placeholder="Text (optional)"
          rows={9}
          onChange={(e) => setContent(e.target.value)}
          defaultValue={content}
        />
      </div>

      {/* <!-- body length status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">{`${content.length}/5000`}</h4>

      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-slate-300" />

      {/* <!-- Hr --> */}
      {/* <hr className="rounded-full border-t-2 border-transparent" /> */}
      <label
        htmlFor="body"
        className="text-2xl px-6 font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Category
      </label>
      <div className="flex flex-row flex-wrap justify-start items-center gap-4 px-4 py-3 rounded-2xl shadow-inner bg-white">
        {categories.map((cat, i) => (
          <BtnCategory
            key={i}
            category={snakeCase(cat)}
            curCategory={category}
            setCategory={setCategory}
          />
        ))}
      </div>

      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-slate-300" />

      <div className="flex flex-row justify-between">
        {/* displays different button based whether creating new post or editing existing one */}
        {isEditingPost ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}

        {/* Renders a error message depending when necessary */}
        {message && <p className="text-lg font-bold text-red-500">{message}</p>}
      </div>
    </form>
  );
};

export default PostForm;
