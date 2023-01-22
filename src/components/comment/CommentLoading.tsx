import React from "react";

/**
 * Visual place holder for comments while comments are being fetched
 */

const CommentLoading: React.FC = () => {
  return (
    <div className="flex flex-col min-w-fit mx-3 w-[50%]">
      <div className="justify-left flex w-full flex-row items-center gap-4 px-6 py-3 animate-pulse">
        <div className="bg-slate-300 py-2 px-12 rounded-md opacity-75 ml-auto"></div>
      </div>
      <div className="flex min-h-[20%] w-[100%] flex-col justify-start gap-3 rounded-xl lg:rounded-2xl bg-slate-50 p-6 shadow-md hover:shadow-xl">
        {/* Fake body */}
        <div className="bg-slate-300 opacity-75 py-3 ml-12 rounded-md animate-pulse"></div>
        <div className="bg-slate-300 opacity-75 py-3 rounded-md animate-pulse"></div>
        <div className="bg-slate-300 opacity-75 py-3 max-w-[30%] rounded-md animate-pulse"></div>
      </div>

      {/* Fake PostLoading status */}
      <div className="w-f flex flex-row flex-nowrap items-center justify-between px-6 py-3 animate-pulse">
        <div className="bg-slate-300 py-2 px-12 rounded-md opacity-75"></div>
        <div className="bg-slate-300 py-2 px-12 rounded-md opacity-75"></div>
      </div>
    </div>
  );
};

export default CommentLoading;
