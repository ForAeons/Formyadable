import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { BtnComment, BtnEdit, BtnDelete } from "../../components";
import iconTextGenerator from "../../utility/iconTextGeneator";
import { creationDateGen, updateDateGen } from "../../utility/date";
import { TUserApiResponse, TPostApiResponse } from "../../types/type";

interface Context {
  user: TUserApiResponse;
}

interface Props {
  showComments: boolean;
  post: TPostApiResponse;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetComments: () => void;
  handleDeletePost: (postID: number) => () => void;
}

const Post: React.FC<Props> = ({
  showComments,
  post,
  setIsEditing,
  handleGetComments,
  handleDeletePost,
}) => {
  const { user }: Context = useOutletContext();

  return (
    <div className="flex flex-col">
      {/* <!-- title section --> */}
      <div className="justify-left flex flex-row items-center gap-4 px-6 py-3">
        <div className="rounded-full bg-slate-300 flex justify-center items-center h-8 w-8 flex-shrink-0">
          <h2 className="font-Raleway text-md font-extrabold text-slate-500">
            {iconTextGenerator(post.author)}
          </h2>
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-slate-700 font-Raleway tracking-wide">
          {post.title}
        </h3>
        <h3 className=" text-xs sm:text-sm font-light text-slate-500 ml-auto self-end font-Raleway tracking-wide">
          by {post.author}
        </h3>
      </div>

      <div className="flex min-h-[20%] min-w-[40%] flex-col justify-start gap-3 rounded-2xl bg-slate-200 p-6 shadow-lg hover:shadow-xl">
        {/* <!-- Body --> */}
        <div className="w-f font-sans text-lg text-slate-600">
          {post.content}
        </div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-300" />

        {/* <!-- utilities --> */}
        <div className="flex flex-row justify-between gap-4">
          {/* only shows edit button if current user is the author of the post */}
          {post.user_id === user.user.id && (
            <BtnEdit handleClick={() => setIsEditing(true)} />
          )}
          <BtnComment
            handleClick={handleGetComments}
            showComments={showComments}
          />
          {/* only shows delete button if current user is the author of the post */}
          {post.user_id === user.user.id && (
            <BtnDelete handleClick={handleDeletePost(post.id)} />
          )}
        </div>
      </div>

      {/* <!-- Post status --> */}
      <div className="w-f flex flex-row flex-nowrap items-center justify-between mx-6 my-3">
        {/* Creation date */}
        <h4 className="font-sans text-xs text-slate-500">
          {creationDateGen(post.created_at, "Posted")}
        </h4>

        {/* Update date, only displayed if updated */}
        {post.created_at !== post.updated_at && (
          <h4 className="font-sans text-xs text-slate-500">
            {updateDateGen(post.updated_at, "Edited")}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Post;
