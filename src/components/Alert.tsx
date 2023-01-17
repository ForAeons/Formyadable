import React from "react";

import { alert } from "../types/type";

interface Props {
  alert: alert;
}

const Alert: React.FC<Props> = ({ alert }) => {
  const theme = {
    bgColor: "bg-indigo-400",
    textColor: "text-slate-600",
  };

  if (alert.severity === 2) theme.bgColor = "bg-red-500";
  else if (alert.severity === 1) theme.bgColor = "bg-amber-400";
  else if (alert.severity === 0) theme.bgColor = "bg-sky-200";

  return (
    <div
      className={`${theme.bgColor} ${theme.textColor} mt-3 py-6 px-10 flex justify-center items-center rounded-lg shadow-md hover:shadow-lg transition-shadow animate-WiggleOnce`}
    >
      <h2 className="text-center font-Raleway text-lg font-extrabold tracking-wide whitespace-pre">
        {alert.message}
      </h2>
    </div>
  );
};

export default Alert;
