import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnPencil: React.FC<Props> = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <PencilSquareIcon className="h-6 w-6 text-slate-600 hover:text-slate-500 transition-colors" />
    </button>
  );
};

export default BtnPencil;
