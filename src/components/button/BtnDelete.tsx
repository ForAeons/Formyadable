import React from "react";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnDelete: React.FC<Props> = ({ handleClick }) => {
  return (
    <button
      className="px-5 py-1 rounded-md shadow-md text-sm font-bold bg-red-400 hover:bg-red-500 text-slate-600 hover:animate-Wiggle transition"
      onClick={handleClick}
    >
      Delete
    </button>
  );
};

export default BtnDelete;
