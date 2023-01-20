import React from "react";
import { useOutletContext, Link } from "react-router-dom";

import { BtnComment, BtnPencil, ProfileIcon } from "../../components";
import { titleCase, cleanHtml } from "../../utility/strings";
import { creationDateGen, updateDateGen } from "../../utility/date";
import { TUserApiResponseWithToken, TPostApiResponse } from "../../types/type";

interface Context {
  user: TUserApiResponseWithToken;
}

interface Props {
  showComments: boolean;
  post: TPostApiResponse;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetComments: () => void;
}

/**
 * Displays a single post.
 * Ability to delete post or enter edit mode for creator of the post.
 * Ability to fetch comments belong to this post.
 */

const Post: React.FC<Props> = ({
  showComments,
  post,
  setIsEditing,
  handleGetComments,
}) => {
  const { user }: Context = useOutletContext();

  return (
    <div className="flex flex-col w-full lg:min-w-[50%]">
      {/* <!-- title section --> */}
      <div className="justify-left flex flex-row content-center gap-4 mx-3 mb-3">
        <Link to={`/profile/${post.user_id}`}>
          <ProfileIcon username={post.author} size="sm" />
        </Link>

        <h3 className=" text-md sm:text-xl font-bold text-slate-600 mr-auto font-Raleway tracking-wide">
          {post.author === user.user.username ? "me" : post.author}
        </h3>
        <h3 className=" text-md sm:text-xl font-bold text-slate-600 font-Raleway tracking-wide">
          {"Post on " + titleCase(post.category)}
        </h3>
      </div>

      {/* Content card */}
      <div className="flex min-h-[20%] min-w-[40%] flex-col justify-start bg-slate-200 shadow-lg hover:shadow-xl transition rounded-xl lg:rounded-2xl p-4 lg:p-6 gap-2 lg:gap-3">
        <div className="flex justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-slate-700 font-Raleway tracking-wide">
            {post.title}
          </h3>

          {user.user.id === post.user_id && (
            <BtnPencil handleClick={() => setIsEditing(true)} />
          )}
        </div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-300" />

        {/* <!-- Body --> */}
        {/* <div className="w-f font-sans text-lg text-slate-600">
          {post.content}
        </div> */}

        <div dangerouslySetInnerHTML={{ __html: cleanHtml(post.content) }} />
      </div>

      {/* <!-- Post status --> */}
      <div className="mx-3 mt-3 gap-2 grid grid-cols-3 justify-center items-center">
        {/* Creation date */}
        <h4 className="font-sans text-xs text-slate-500 row-span-1">
          {creationDateGen(post.created_at, "Posted")}
        </h4>

        <BtnComment
          handleClick={handleGetComments}
          showComments={showComments}
        />

        {/* Update date, only displayed if updated */}
        {post.created_at !== post.updated_at && (
          <h4 className="font-sans text-xs text-slate-500 text-right row-span-1">
            {updateDateGen(post.updated_at, "Edited")}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Post;
