import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {} from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

import {
  TUserApiResponseWithToken,
  categories,
  nullUser,
} from "../../types/type";
import iconTextGenerator from "../../utility/iconTextGeneator";
import { snakeCase } from "../../utility/strings";

interface Context {
  user: TUserApiResponseWithToken;
  setUser: React.Dispatch<React.SetStateAction<TUserApiResponseWithToken>>;
}

interface Props {
  isMobile: boolean;
}

const NavMenu: React.FC<Props> = ({ isMobile }) => {
  const { user, setUser }: Context = useOutletContext();
  return (
    <div
      className={`${
        isMobile ? "flex sm:hidden" : "sm:flex hidden"
      } h-[100%] flex-col items-center justify-start gap-4`}
    >
      <div className="flex flex-col items-start w-full px-3 gap-1">
        {/* Renders user icon and menu options depending on login status */}
        {user.token ? (
          //  logged in
          <>
            <div className="rounded-full bg-slate-600 hover:bg-slate-500 self-center flex justify-center items-center font-Raleway text-2xl font-extrabold text-slate-200 h-24 w-24 sm:h-12 sm:w-12 mb-2">
              {iconTextGenerator(user.user.username)}
            </div>
            <Link
              to={`/profile/${user.user.username}`}
              className="font-Raleway font-bold tracking-wide text-lg text-slate-600 hover:text-slate-500 "
            >
              Profile
            </Link>
            <Link
              to="/"
              className="font-Raleway font-bold tracking-wide text-lg text-slate-600 hover:text-red-500 "
              onClick={() => setUser(nullUser)}
            >
              Log Out
            </Link>
          </>
        ) : (
          // not logged in
          <>
            <UserCircleIcon className="h-24 w-24 sm:h-12 sm:w-12  hover:text-slate-500 text-slate-600 self-center mb-2" />
            <Link
              to="/signup"
              className="font-Raleway font-bold tracking-wide text-lg text-slate-600 hover:text-slate-500 "
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="font-Raleway font-bold tracking-wide text-lg text-slate-600 hover:text-slate-500 "
            >
              Login
            </Link>
          </>
        )}
      </div>
      <hr className="rounded-full border-t-2 w-[100%] border-slate-300" />
      <div className="flex flex-col items-start w-full px-3 gap-1">
        <h1 className="font-Raleway text-xl tracking-widest sm:tracking-tight font-extrabold text-slate-700 whitespace-nowrap self-center mb-2">
          Categories
        </h1>
        {categories.map((cat, i) => {
          return (
            <Link
              key={i}
              to={`/posts/${snakeCase(cat)}`}
              className="font-Raleway font-bold tracking-wide text-lg text-slate-600 hover:text-slate-500 "
            >
              {cat}
            </Link>
          );
        })}
      </div>
      <a
        href="#top"
        className="rounded-md bg-slate-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-slate-300 mt-auto"
      >
        Back to Top
      </a>
    </div>
  );
};

export default NavMenu;
