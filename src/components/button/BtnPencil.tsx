import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  size?: string;
}

const BtnPencil: React.FC<Props> = ({ handleClick, size = "lg" }) => {
  return (
    <button onClick={handleClick}>
      <PencilSquareIcon
        className={`text-slate-600 hover:text-slate-500 transition ${
          size == "lg" ? "h-6 w-6" : "h-4 w-4"
        }`}
      />
    </button>
  );
};

export default BtnPencil;
