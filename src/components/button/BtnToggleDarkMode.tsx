import React from "react";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

interface Props {
  isDarkMode: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BtnToggleDarkMode: React.FC<Props> = ({ isDarkMode, handleClick }) => {
  return (
    <div className="w-12 h-6 rounded-2xl bg-white flex items-center shadow p-1">
      <button
        onClick={handleClick}
        className={`flex justify-center items-center w-5 h-5 relative rounded-full transition duration-700 ${
          isDarkMode
            ? "translate-x-0 bg-slate-700"
            : "translate-x-full bg-slate-200"
        }`}
      >
        {isDarkMode ? (
          <MoonIcon className="text-slate-200 hover:text-slate-100 transition-colors h-4 w-4" />
        ) : (
          <SunIcon className="text-slate-700 hover:text-slate-600 transition-colors h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default BtnToggleDarkMode;
