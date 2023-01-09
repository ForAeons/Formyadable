import React from "react";
import { useOutletContext } from "react-router-dom";

import { BtnDelete, BtnEdit } from "../../components";
import { TCommentApiResponse, TUserApiResponse } from "../../types/type";
import iconTextGenerator from "../../utility/iconTextGeneator";
import { creationDateGen, updateDateGen } from "../../utility/date";
import { deleteComment } from "../../utility/commentApi";

interface Props {
  comment: TCommentApiResponse;
  comments: TCommentApiResponse[];
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>;
  isEditingComment: boolean;
  setIsEditingComment: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Context {
  user: TUserApiResponse;
}

const Comment: React.FC<Props> = ({
  comment,
  comments,
  setComments,
  isEditingComment,
  setIsEditingComment,
}) => {
  const { user }: Context = useOutletContext();

  // DELETE post
  const handleDeleteComment = (commentID: number) => {
    return () => {
      console.log("Delete Btn clicked");
      deleteComment(commentID)
        .then(() => {
          setComments(
            comments.filter((eachcomment) => eachcomment.id !== comment.id)
          );
          console.log("Comment Deleted!");
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  return (
    <div className="flex flex-col mx-3">
      {/* <!-- title section --> */}
      <div className="justify-left flex flex-row items-center gap-4 px-6 py-3">
        <div className="rounded-full bg-slate-300  flex justify-center items-center font-Raleway text-md font-extrabold text-slate-500 h-8 w-8">
          {iconTextGenerator(comment.author)}
        </div>
        <h3 className=" text-md sm:text-lg font-bold text-slate-500 font-Raleway tracking-wide">
          by {comment.author}
        </h3>
      </div>
      <div className="flex min-h-[20%] min-w-[40%] flex-col justify-start gap-3 rounded-2xl bg-slate-50 p-6 shadow-md hover:shadow-xl">
        {/* <!-- Body --> */}
        <div className="w-f font-sans text-lg text-slate-600">
          {comment.content}
        </div>
        {/* <!-- utilities --> */}

        {/* only shows edit button if current user is the author of the post */}
        {comment.user_id === user.user.id && (
          <>
            {/* <!-- Hr --> */}
            <hr className="rounded-full border-t-2 border-slate-300" />
            <div className="flex flex-row justify-between">
              <BtnEdit handleClick={() => setIsEditingComment(true)} />
              <BtnDelete handleClick={handleDeleteComment(comment.id)} />
            </div>
          </>
        )}
      </div>

      {/* <!-- Comment status --> */}
      <div className="w-f flex flex-row flex-nowrap items-center justify-between mx-6 my-3">
        {/* Creation date */}
        <h4 className="font-sans text-xs text-slate-500">
          {creationDateGen(comment.created_at, "Posted")}
        </h4>

        {/* Update date, only displayed if updated */}
        {comment.created_at !== comment.updated_at && (
          <h4 className="font-sans text-xs text-slate-500">
            {updateDateGen(comment.updated_at, "Edited")}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Comment;
