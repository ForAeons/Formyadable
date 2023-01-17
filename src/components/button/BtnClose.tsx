import React from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnClose: React.FC<Props> = ({ handleClick }) => {
  return (
    <button onClick={handleClick}>
      <XCircleIcon className="h-9 w-9 hover:text-slate-500 text-slate-600 self-center transition" />
    </button>
  );
};

export default BtnClose;
