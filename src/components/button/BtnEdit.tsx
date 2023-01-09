import React from "react";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnEdit: React.FC<Props> = ({ handleClick }) => {
  return (
    <button
      className="rounded-md bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-slate-300"
      onClick={handleClick}
    >
      Edit
    </button>
  );
};

export default BtnEdit;
