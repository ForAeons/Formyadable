import React from "react";

interface Props {
  showComments: boolean;
  handleClick: () => void;
}

const BtnComment: React.FC<Props> = ({ showComments, handleClick }) => {
  return (
    <button
      className="rounded-md bg-slate-300 hover:bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md transition mx-auto"
      onClick={handleClick}
    >
      {showComments ? "Hide Comments" : "View Comments"}
    </button>
  );
};

export default BtnComment;
