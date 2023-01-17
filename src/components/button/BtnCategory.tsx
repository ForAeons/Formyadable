import React from "react";

import { titleCase, snakeCase } from "../../utility/strings";

interface Props {
  category: string;
  curCategory: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const BtnCategory: React.FC<Props> = ({
  category,
  curCategory,
  setCategory,
}) => {
  return (
    <div
      className={`px-5 py-1 rounded-md shadow-md text-sm font-bold text-slate-600 hover:bg-teal-300 hover:cursor-pointer whitespace-nowrap transition ${
        curCategory === category ? "bg-teal-200" : "bg-teal-400"
      }`}
      onClick={() => {
        curCategory === category
          ? setCategory("")
          : setCategory(snakeCase(category));
        console.log(curCategory, category);
      }}
    >
      {titleCase(category)}
    </div>
  );
};

export default BtnCategory;
