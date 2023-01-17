import React from "react";
import { useOutletContext, Link } from "react-router-dom";

import { BtnPencil } from "../../components";
import {
  TCommentApiResponse,
  TUserApiResponseWithToken,
} from "../../types/type";
import { creationDateGen, updateDateGen } from "../../utility/date";
import { cleanHtml } from "../../utility/strings";

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
    <div className="flex flex-col w-full lg:w-fit lg:min-w-[50%] mx-3">
      <div className="ml-auto flex gap-2 items-center mx-3 mb-2">
        <Link
          to={`/profile/${comment.user_id}`}
          className="text-xs text-slate-500 font-sans hover:cursor-pointer hover:text-slate-800 transition"
        >
          Comment by{" "}
          {comment.author === user.user.username ? "me" : comment.author}
        </Link>
        {user.user.id === comment.user_id && (
          <BtnPencil handleClick={() => setIsEditingComment(true)} size="sm" />
        )}
      </div>
      <div className="flex h-fit flex-col justify-start bg-slate-50 shadow-md hover:shadow-lg transition rounded-xl lg:rounded-2xl p-3 lg:p-4 gap-2 lg:gap-3">
        {/* <!-- Body --> */}
        {/* <div className="font-sans text-md text-slate-600">
          {comment.content}
        </div> */}
        <div dangerouslySetInnerHTML={{ __html: cleanHtml(comment.content) }} />
      </div>

      {/* <!-- Comment status --> */}
      <div className="flex flex-row flex-nowrap items-center justify-between mx-3 mt-2">
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
