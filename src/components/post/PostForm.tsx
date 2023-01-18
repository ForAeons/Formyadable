import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { stripHtml } from "string-strip-html";

import {
  Store,
  TPost,
  TPostApiResponse,
  categories,
  alert,
  Post,
} from "../../store/type";
import {
  BtnClose,
  BtnPost,
  BtnEdit,
  BtnDelete,
  BtnCategory,
  QuillEditor,
} from "../../components";
import { snakeCase } from "../../utility/strings";
import { SubmitPostFn, EditPostFn, DeletePostFn } from "../../utility/postApi";
import { editPost } from "../../store/action";

interface Props {
  post: Post;
}

/**
 * Displays a single post form.
 * Ability to post new post.
 * Ability edit existing post for creator of the post.
 * Ability leave edit mode for creator of the post.
 */

const PostForm: React.FC<Props> = ({ post }) => {
  const store = useSelector((state: Store) => state);
  const dispatch = useDispatch();

  const handleClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    dispatch(
      editPost({
        ...post,
        isEditingPost: false,
      })
    );
  };

  const handleSubmit = SubmitPostFn(post, dispatch);
  const handleEdit = EditPostFn(post, dispatch);
  const handleDelete = DeletePostFn(post, dispatch);

  // Allows textfields to expand upon reaching its size limit
  const textareaTitleRef = useRef<HTMLTextAreaElement>(null);
  const handleOnInput = (Ref: React.RefObject<HTMLTextAreaElement>) => {
    if (Ref.current) {
      Ref.current.style.height = "auto";
      Ref.current.style.height = Ref.current.scrollHeight + "px";
    }
  };

  return (
    <form className="flex flex-col w-full mx-3 bg-slate-200 shadow-lg hover:shadow-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 gap-2 lg:gap-3 transition">
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
      <div className="justify-left flex flex-row justify-between items-center gap-4 p-4 shadow-inner bg-white border border-slate-300">
        <textarea
          id="newPost"
          className="text-md text-slate-700 font-sans flex-grow bg-transparent"
          placeholder="An interesting title"
          maxLength={300}
          rows={2}
          onChange={(e) =>
            dispatch(
              editPost({
                ...post,
                title: e.target.value,
              })
            )
          }
          ref={textareaTitleRef}
          onInput={() => handleOnInput(textareaTitleRef)}
          value={post.title}
        />
      </div>

      {/* <!-- title length status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">
        {`${post.title.length}/300`}
      </h4>

      <label
        htmlFor="body"
        className="text-xl px-4 lg:px-6 font-bold text-slate-700 font-Raleway tracking-wide"
      >
        Body
      </label>

      <div className="bg-white w-full">
        <QuillEditor
          value={post.content}
          onChange={(content: string) =>
            dispatch(
              editPost({
                ...post,
                content: content,
              })
            )
          }
        />
      </div>

      {/* <!-- body length status --> */}
      <h4 className="font-sans font-bold text-xs text-slate-500 self-end">
        {`${stripHtml(post.content).result.length}/5000`}
      </h4>

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
            curCategory={post.category}
            setCategory={(category: string) =>
              dispatch(
                editPost({
                  ...post,
                  category: category,
                })
              )
            }
          />
        ))}
      </div>

      {/* <!-- Hr --> */}
      <hr className="rounded-full border-t-2 border-transparent" />
      <div className="flex flex-row justify-between">
        {/* displays different button based whether creating new post or editing existing one */}
        {post.isEditingPost ? (
          <BtnEdit handleClick={handleEdit} />
        ) : (
          <BtnPost handleClick={handleSubmit} />
        )}
        {post.isEditingPost && <BtnDelete handleClick={handleDelete} />}
      </div>
    </form>
  );
};

export default PostForm;
