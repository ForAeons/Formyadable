import React from "react";
import { Link } from "react-router-dom";

import { BtnBack, BtnHome } from "../components";

/**
 * Error 404 page
 * - If the route does not exist, users will be directed to this page
 * - Option to go the home page
 */

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] justify-center items-center">
      <div className="flex flex-col min-h-[50%] w-[70%] sm:w-[50%] max-w-[550px] justify-center items-center gap-6 rounded-2xl bg-slate-200 p-6 shadow-xl hover:shadow-2xl transition">
        <h1 className="font-Raleway sm:text-9xl text-8xl font-extralight text-slate-800">
          404
        </h1>
        <p className="font-Raleway sm:text-3xl text-xl text-slate-800">Oops</p>
        <p className="font-Raleway sm:text-3xl text-xl text-center text-slate-800">
          THIS PAGE DOESNT'T EXIST OR IS UNAVAILABLE
        </p>
        <div className="flex w-full justify-evenly">
          <BtnBack />
          <BtnHome />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
