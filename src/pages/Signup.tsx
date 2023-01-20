import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

import { Alert } from "../components";
import { TUserApiResponse, nullAlert } from "../types/type";
import { handleSignupFn } from "../components/profile/handler";

interface Context {
  setUser: (user: TUserApiResponse) => void;
}

/**
 * Sign up page
 * - Ability to create new accounts
 * - Ability to navigate to login page
 */

const Signup: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [alert, setAlert] = useState(nullAlert);

  const { setUser }: Context = useOutletContext();
  const navigator = useNavigate();

  const handleSubmit = handleSignupFn(
    userName,
    password,
    passwordC,
    setUser,
    navigator,
    setAlert
  );

  return (
    <div className="bg-slate-50 h-screen w-screen flex flex-col justify-center items-center gap-6 ">
      <form
        className="p-6 md:p-12 w-fit bg-slate-200 rounded-2xl shadow-xl flex flex-col items-center justify-between gap-6 hover:shadow-2xl transition"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-3xl text-slate-700">Sign Up</h1>
        <input
          type="text"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md "
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          type="password"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          type="password"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md"
          placeholder="Confirm Password"
          onChange={(e) => setPasswordC(e.target.value)}
        ></input>
        <div className="flex flex-row justify-evenly w-full">
          <input
            type="submit"
            className="bg-slate-600 text-md font-bold text-slate-200 px-5 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-slate-500 transition-colors"
            value="Signup"
          ></input>
          <Link
            to="/login"
            className="bg-slate-600 text-md font-bold text-slate-200 px-5 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-slate-500 transition-colors"
          >
            Login
          </Link>
        </div>
      </form>

      {/* Renders a error message depending when necessary */}
      {alert.message && <Alert alert={alert} />}
    </div>
  );
};

export default Signup;
