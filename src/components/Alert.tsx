import React from "react";

interface Props {
  message: string;
  severity: number;
}

const alert: React.FC<Props> = ({ message, severity }) => {
  const theme = {
    bgColor: "bg-indigo-400",
    textColor: "text-slate-600",
  };

  if (severity === 2) theme.bgColor = "bg-red-500";
  else if (severity === 1) theme.bgColor = "bg-amber-400";
  else if (severity === 0) theme.bgColor = "bg-sky-200";

  return (
    <div
      className={`${theme.bgColor} ${theme.textColor} py-6 px-10 flex justify-center items-center rounded-lg shadow-md`}
    >
      <h2 className="text-center font-Raleway text-lg font-extrabold tracking-wide whitespace-pre">
        {message}
      </h2>
    </div>
  );
};

export default alert;
