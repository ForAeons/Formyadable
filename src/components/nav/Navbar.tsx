import React, { useState } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

import MobileMenu from "./MobileMenu";
import NavMenu from "./NavMenu";
import { useNavigate } from "react-router-dom";

/**
 * Navigation bar for users to navigate the page
 */

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const navigator = useNavigate();

  return (
    <div className="flex flex-col gap-6 w-full sm:w-auto sm:sticky sm:top-0">
      <nav className="sm:h-screen flex sm:flex-col flex-row-reverse sm:justify-start justify-between items-center sm:p-4 py-2 px-4 bg-slate-200 shadow-md sm:shadow-xl sm:hover:shadow-2xl gap-4 2xl:m-6 2xl:rounded-lg 2xl:h-[calc(100vh-3rem)] flex-grow-0">
        {/* Logo, also act as home button*/}
        <ChatBubbleOvalLeftEllipsisIcon
          className="h-8 w-8 sm:h-16 sm:w-16 text-slate-700 hover:cursor-pointer hover:text-slate-600"
          onClick={() => navigator("/")}
        />

        {/* App Name */}
        <h1 className="font-Raleway text-2xl tracking-widest sm:tracking-tight font-extrabold text-slate-700 whitespace-nowrap">
          JUST FORUM
        </h1>

        <hr className="rounded-full border-t-2 w-[100%] border-slate-300 hidden sm:block" />

        <button
          id="hamburger-button"
          className="relative h-6 w-6 cursor-pointer text-2xl sm:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="absolute -mt-0.5 h-[3px] w-6 rounded bg-slate-600 transition-all duration-500 before:absolute before:h-[3px] before:w-6 before:-translate-x-3 before:-translate-y-2 before:rounded before:bg-slate-600 before:transition-all before:duration-500 before:content-[''] after:absolute after:h-[3px] after:w-6 after:-translate-x-3 after:translate-y-2 after:rounded after:bg-slate-600 after:transition-all after:duration-500 after:content-['']"></div>
        </button>

        {/* desktop/tablet: navbar */}
        <NavMenu isMobile={false} />
      </nav>

      {/* Mobile: drop down menu */}
      <MobileMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
    </div>
  );
};

export default Navbar;
