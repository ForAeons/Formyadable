import React from "react";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnCreatePost: React.FC<Props> = ({ handleClick }) => {
  return (
    <button
      className="rounded-lg sm:mt-6 hover:bg-teal-300 bg-teal-400 py-2 px-4 shadow-md text-sm font-bold text-slate-700"
      onClick={handleClick}
    >
      Create Post
    </button>
  );
};

export default BtnCreatePost;
