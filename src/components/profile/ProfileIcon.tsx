import React from "react";

import iconTextGenerator from "../../utility/iconTextGeneator";

interface Props {
  username: string;
  size: string;
}

const ProfileIcon: React.FC<Props> = ({ username, size }) => {
  const className =
    size === "lg"
      ? "bg-slate-600 hover:bg-slate-500 text-2xl font-extrabold text-slate-200 h-24 w-24 lg:h-12 lg:w-12"
      : "bg-slate-300 hover:bg-slate-200 h-8 w-8  text-md font-extrabold text-slate-500";
  return (
    <div
      className={`rounded-full self-center flex justify-center items-center font-Raleway hover:scale-110 transition ${className}`}
    >
      {iconTextGenerator(username)}
    </div>
  );
};

export default ProfileIcon;
