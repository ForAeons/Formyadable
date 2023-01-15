import React from "react";
import { useOutletContext, Link } from "react-router-dom";

import { BtnPencil, ProfileIcon } from "../../components";
import {
  TCommentApiResponse,
  TUserApiResponseWithToken,
} from "../../types/type";
import { creationDateGen, updateDateGen } from "../../utility/date";

interface Props {
  comment: TCommentApiResponse;
  comments: TCommentApiResponse[];
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
  setIsEditingComment: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Context {
  user: TUserApiResponseWithToken;
}

/**
 * Displays a single comment.
 * Ability to delete comment or enter edit mode for creator of the comment
 */

const Comment: React.FC<Props> = ({ comment, setIsEditingComment }) => {
  const { user }: Context = useOutletContext();

  return (
    <div className="flex flex-col w-full lg:min-w-[50%] mx-3">
      <div className="flex h-fit flex-col justify-start bg-slate-50 shadow-md hover:shadow-lg transition-shadow rounded-xl lg:rounded-2xl p-4 lg:p-6 gap-2 lg:gap-3">
        {/* <!-- title section --> */}
        <div className="justify-left flex flex-row items-center gap-4">
          <Link to={`/profile/${comment.author}`}>
            <ProfileIcon username={comment.author} size="sm" />
          </Link>

          <h3 className="text-md sm:text-lg font-bold text-slate-500 font-Raleway tracking-wide mr-auto">
            by {comment.author}
          </h3>

          {/* reveals edit btn to comment owner */}
          {user.user.id === comment.user_id && (
            <BtnPencil handleClick={() => setIsEditingComment(true)} />
          )}
        </div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-300" />

        {/* <!-- Body --> */}
        <div className="w-f font-sans text-lg text-slate-600">
          {comment.content}
        </div>
      </div>

      {/* <!-- Comment status --> */}
      <div className="w-f flex flex-row flex-nowrap items-center justify-between mx-6 my-3">
        {/* Creation date */}
        <h4 className="font-sans text-xs text-slate-500">
          {creationDateGen(comment.created_at, "Posted")}
        </h4>

        {/* Update date, only displayed if updated */}
        {comment.created_at !== comment.updated_at && (
          <h4 className="font-sans text-xs text-slate-500 text-right">
            {updateDateGen(comment.updated_at, "Edited")}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Comment;
