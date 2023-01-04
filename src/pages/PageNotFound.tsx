import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col h-[100vh] w-[100vw] justify-center items-center">
      <div className="flex flex-col min-h-[50%] w-[70%] sm:w-[50%] max-w-[550px] justify-center items-center gap-6 rounded-2xl bg-slate-200 p-6 shadow-xl hover:shadow-2xl">
        <h1 className="font-Raleway sm:text-9xl text-8xl font-extralight text-slate-800">
          404
        </h1>
        <p className="font-Raleway sm:text-3xl text-xl text-slate-800">Oops</p>
        <p className="font-Raleway sm:text-3xl text-xl text-center text-slate-800">
          THIS PAGE DOESNT'T EXIST OR IS UNAVAILABLE
        </p>
        <Link
          to="/"
          className="font-Raleway sm:text-lg text-sm rounded-md bg-slate-700 px-7 py-3  font-bold text-slate-200 shadow-md hover:bg-slate-600 mt-3 sm:tracking-[4px] tracking-wider"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
