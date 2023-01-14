import React from "react";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnShowMore: React.FC<Props> = ({ handleClick }) => {
  return (
    <button
      className="rounded-md bg-blue-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-blue-300"
      onClick={handleClick}
    >
      Show more
    </button>
  );
};

export default BtnShowMore;
