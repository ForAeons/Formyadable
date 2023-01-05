import React from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

import { categories } from "../../types/type";
import categoryConvertor from "../../utility/categoryConvertor";

interface Props {
  isMobile: boolean;
}

const NavMenu: React.FC<Props> = ({ isMobile }) => {
  return (
    <div
      className={`${
        isMobile ? "flex sm:hidden" : "sm:flex hidden"
      } h-[100%] flex-col items-center justify-start gap-4`}
    >
      <div className="flex flex-col items-start w-full px-3 gap-1">
        <UserCircleIcon className="h-12 w-12 sm:h-[3px]2 sm:w-12 text-slate-700" />
        <Link
          to="/signup"
          className="font-Raleway font-bold tracking-wide text-lg text-slate-700 hover:text-slate-500 "
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="font-Raleway font-bold tracking-wide text-lg text-slate-700 hover:text-slate-500 "
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
              className="font-Raleway font-bold tracking-wide text-lg text-slate-700 hover:text-slate-500 "
            >
              {cat}
            </Link>
          );
        })}
      </div>
      <a
        href="#top"
        className="rounded-md bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-red-300 mt-auto"
      >
        Back to Top
      </a>
    </div>
  );
};

export default NavMenu;
