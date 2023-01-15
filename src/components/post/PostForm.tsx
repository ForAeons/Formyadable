import React, { useState, useRef } from "react";

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

  const textareaTitleRef = useRef<HTMLTextAreaElement>(null);
  const textareaBodyRef = useRef<HTMLTextAreaElement>(null);

  // Allows textfields to expand upon reaching its size limit
  const handleOnInput = (Ref: React.RefObject<HTMLTextAreaElement>) => {
    if (Ref.current) {
      Ref.current.style.height = "auto";
      Ref.current.style.height = Ref.current.scrollHeight + "px";
    }
  };

  return (
    <form className="flex flex-col w-full mx-3 bg-slate-200 shadow-lg hover:shadow-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 gap-2 lg:gap-3">
      <div className="flex justify-between items-center">
        {/* <!-- title section --> */}
        <label
          htmlFor="newPost"
          className="text-xl px-4 lg:px-6 font-bold text-slate-700 font-Raleway tracking-wide"
        >
          Your Title
        </label>

        {/* Close button */}
        <BtnClose handleClick={handleClose} />
      </div>
      <div className="justify-left flex flex-row justify-between items-center gap-4 px-4 lg:px-6 py-1 lg:py-3 rounded-xl lg:rounded-2xl shadow-inner bg-white">
        <textarea
          id="newPost"
          className="text-lg text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1"
          placeholder="An interesting title"
          maxLength={300}
          rows={2}
          onChange={(e) => setTitle(e.target.value)}
          ref={textareaTitleRef}
          onInput={() => handleOnInput(textareaTitleRef)}
          defaultValue={title}
        />
      </div>

      {/* <!-- title length status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">
        {`${title.length}/300`}
      </h4>

      <label
        htmlFor="body"
        className="text-xl px-4 lg:px-6 font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Body
      </label>
      <div className="flex flex-row justify-between items-center gap-4 px-4 lg:px-6 py-1 lg:py-3 rounded-xl lg:rounded-2xl shadow-inner bg-white">
        <textarea
          id="body"
          className="text-lg text-slate-700 tracking-wide font-sans flex-grow bg-transparent my-1"
          maxLength={5000}
          placeholder="Text (optional)"
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          ref={textareaBodyRef}
          onInput={() => handleOnInput(textareaBodyRef)}
          defaultValue={content}
        />
      </div>

      {/* <!-- body length status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">{`${content.length}/5000`}</h4>

      <label
        htmlFor="category"
        className="text-xl px-6 font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Category
      </label>
      <div className="flex flex-row flex-wrap justify-start items-center gap-4 px-4 py-3  rounded-xl lg:rounded-2xl shadow-inner bg-white">
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
      <hr className="rounded-full border-t-2 border-transparent" />
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
