import React from "react";

interface Props {
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

const BtnCreatePost: React.FC<Props> = ({ setCreatePost }) => {
  return (
    <button
      className="rounded-lg sm:mt-6 bg-emerald-400 py-2 px-4 shadow-md text-sm font-bold text-slate-800"
      onClick={() => setCreatePost(true)}
    >
      Create Post
    </button>
  );
};

export default BtnCreatePost;
