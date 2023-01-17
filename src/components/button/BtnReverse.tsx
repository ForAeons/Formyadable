import React from "react";
import { BarsArrowUpIcon, BarsArrowDownIcon } from "@heroicons/react/24/solid";

interface Props {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isReversed: boolean;
}

const BtnReverse: React.FC<Props> = ({ handleClick, isReversed }) => {
  return (
    <button onClick={handleClick}>
      {isReversed ? (
        <BarsArrowUpIcon className="text-slate-600 hover:text-slate-500 transition h-6 w-6" />
      ) : (
        <BarsArrowDownIcon className="text-slate-600 hover:text-slate-500 transition h-6 w-6" />
      )}
    </button>
  );
};

export default BtnReverse;
