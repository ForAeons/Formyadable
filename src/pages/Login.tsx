import React from "react";

const Login: React.FC = () => {
  return (
    <div className="bg-slate-50 h-screen  flex justify-center items-center">
      <form className="p-6 min-w-[30%] bg-slate-200 rounded-2xl shadow-xl flex flex-col items-center justify-between gap-6 hover:shadow-2xl">
        <h1 className="font-bold text-3xl text-slate-700">Login</h1>
        <input
          type="text"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md border-none"
          placeholder="Username"
        ></input>
        <input
          type="password"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md border-none"
          placeholder="Password"
        ></input>
        <input
          type="submit"
          className="bg-slate-600 text-md font-bold text-slate-200 px-5 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-slate-500"
          value="Login"
        ></input>
      </form>
    </div>
  );
};

export default Login;
