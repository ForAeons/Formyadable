import React from "react";
import { Link } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

import { categories } from "../types/type";
import categoryConvertor from "../utility/categoryConvertor";

const Navbar: React.FC = () => {
  return (
    <nav className="h-screen flex flex-col justify-start items-center p-4 bg-slate-200 drop-shadow-[0_12px_12px_rgba(0,0,0,0.20)] gap-4 sticky top-0 2xl:m-6 2xl:rounded-lg 2xl:h-[calc(100vh-3rem)] 2xl:top-6">
      <ChatBubbleOvalLeftEllipsisIcon className="h-12 w-12 text-slate-700 " />
      <h1 className="text-2xl font-bold text-slate-700 whitespace-nowrap">
        Just Forum
      </h1>
      <hr className="rounded-full border-t-2 w-[100%] border-slate-300" />
      <div className="flex flex-col items-start w-full px-3 gap-1">
        <Link
          to="/signin"
          className="font-sans text-lg text-slate-700 hover:text-slate-500 "
        >
          Sign In
        </Link>
        <Link
          to="/login"
          className="font-sans text-lg text-slate-700 hover:text-slate-500 "
        >
          Login
        </Link>
      </div>
      <hr className="rounded-full border-t-2 w-[100%] border-slate-300" />
      <div className="flex flex-col items-start w-full px-3 gap-1">
        {categories.map((cat, i) => {
          return (
            <Link
              key={i}
              to={`posts?cat=${categoryConvertor(cat)}`}
              className="font-sans text-lg text-slate-700 hover:text-slate-500 "
            >
              {cat}
            </Link>
          );
        })}
      </div>
      <a
        href="#"
        className="rounded-md bg-red-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-red-300 mt-auto"
      >
        Back to Top
      </a>
    </nav>
  );
};

export default Navbar;
