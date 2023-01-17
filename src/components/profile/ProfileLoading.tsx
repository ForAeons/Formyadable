import React from "react";

const ProfileLoading: React.FC = () => {
  return (
    <div className="flex flex-col h-fit items-start justify-start gap-4 bg-slate-100 rounded-2xl shadow-2xl p-6 mx-6 max-w-lg">
      {/* Profile pic placeholder*/}
      <div className="rounded-full bg-slate-600 p-12 shadow-lg self-center animate-pulse"></div>

      {/* Profile */}
      <div className="flex flex-col bg-slate-200 shadow-lg p-6 rounded-xl gap-4 min-w-[300px]">
        <div className=" bg-slate-400 py-4 px-[150] rounded-md w-[50%]  animate-pulse"></div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-400" />

        {/* Fake bio */}
        <div className="bg-slate-400 py-3 ml-12 rounded-md animate-pulse"></div>
        <div className="bg-slate-400 py-3 rounded-md animate-pulse"></div>
        <div className="bg-slate-400 py-3 rounded-md animate-pulse"></div>
        <div className="bg-slate-400 py-3 max-w-[30%] rounded-md animate-pulse"></div>
      </div>

      {/* Fake Utils */}
      <div className="w-full self-center flex justify-evenly">
        <div className="rounded-md opacity-75 bg-teal-300 py-3 shadow-md px-8 animate-pulse"></div>
        <div className="rounded-md opacity-75 bg-slate-400 px-8 py-3 shadow-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;
