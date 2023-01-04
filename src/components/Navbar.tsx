import React from "react";
import { Link } from "react-router-dom";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

import { categories } from "../types/type";
import categoryConvertor from "../utility/categoryConvertor";

const Navbar: React.FC = () => {
  return (
    <nav className="sm:h-screen flex sm:flex-col flex-row justify-start items-center p-4 bg-slate-200 shadow-xl hover:shadow-2xl sm:gap-4 sm:sticky sm:top-0 2xl:m-6 2xl:rounded-lg 2xl:h-[calc(100vh-3rem)] 2xl:top-6">
      {/* Logo */}
      <ChatBubbleOvalLeftEllipsisIcon className="h-12 w-12 text-slate-700 " />

      {/* App Name */}
      <h1 className="text-2xl font-bold text-slate-700 whitespace-nowrap">
        Just Forum
      </h1>

      <hr className="rounded-full border-t-2 w-[100%] border-slate-300 hidden sm:block" />

      {/* TODO: Hamburger button */}

      {/* Mobile: drop down menu, desktop/tablet: navbar */}
      <div className="hidden sm:flex sm:flex-col justify-start items-center gap-4 h-[100%]">
        <div className="flex flex-col items-start w-full px-3 gap-1">
          <Link
            to="/signup"
            className="font-sans text-lg text-slate-700 hover:text-slate-500 "
          >
            Sign Up
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
          href="#top"
          className="rounded-md bg-red-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-red-300 mt-auto"
        >
          Back to Top
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
