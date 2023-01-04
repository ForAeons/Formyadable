import React from "react";

const CommentLoading: React.FC = () => {
  return (
    <div className="flex flex-col w-[100%] mx-3">
      {/* <!-- title section --> */}
      <div className="justify-left flex w-[100%] flex-row items-center gap-4 px-6 py-3">
        <div className="rounded-full bg-slate-300 shadow-md p-4"></div>
      </div>
      <div className="flex min-h-[20%] w-[100%] flex-col justify-start gap-3 rounded-2xl bg-slate-50 p-6 shadow-md hover:shadow-xl ">
        {/* Fake body */}
        <div className="bg-slate-300 opacity-75 py-3 ml-12 rounded-md"></div>
        <div className="bg-slate-300 opacity-75 py-3 rounded-md"></div>
        <div className="bg-slate-300 opacity-75 py-3 max-w-[30%] rounded-md"></div>
        {/* Hr */}
        <hr className="rounded-full border-t-2 border-slate-300" />
        {/* Fake utilities */}
        <div className="flex flex-row justify-between">
          <div className="rounded-md opacity-75 bg-red-400 py-3  shadow-md px-8"></div>
          <div className="rounded-md opacity-75 bg-slate-300 px-12 py-3 shadow-md"></div>
          <div className="rounded-md opacity-75 bg-slate-400 px-8 py-3 shadow-md "></div>
        </div>
      </div>

      {/* Fake PostLoading status */}
      <div className="w-f flex flex-row flex-nowrap items-center justify-between px-6 py-3">
        <div className="bg-slate-300 py-2 px-12 rounded-md opacity-75"></div>
        <div className="bg-slate-300 py-2 px-12 rounded-md opacity-75"></div>
      </div>
    </div>
  );
};

export default CommentLoading;
