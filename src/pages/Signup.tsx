import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

import { signUp } from "../utility/userApi";
import { TUserApiResponse } from "../types/type";

interface Context {
  setUser: (user: TUserApiResponse) => void;
}

const Signup: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [message, setMessage] = useState("");

  const { setUser }: Context = useOutletContext();
  const navigator = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // password check
    if (password !== passwordC) {
      setMessage("Both passwords must be the same!");
      return;
    }

    // username check
    if (userName.length < 6 || userName.length > 30) {
      setMessage("Username must be between 6 and 30 characters long!");
      return;
    }

    signUp({ username: userName, password: password })
      .then((result) => {
        setUser(result);
        setMessage("Account successfully created!\nRedirecting to home page.");
        setTimeout(() => {
          navigator("/");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.message) {
          setMessage(err.message);
        }
      });
  };

  return (
    <div className="bg-slate-50 h-screen w-screen flex flex-col justify-center items-center gap-6">
      <form
        className="p-6 min-w-[30%] bg-slate-200 rounded-2xl shadow-xl flex flex-col items-center justify-between gap-6 hover:shadow-2xl"
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
            className="bg-slate-600 text-md font-bold text-slate-200 px-5 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-slate-500"
            value="Signup"
          ></input>
          <Link
            to="/login"
            className="bg-slate-600 text-md font-bold text-slate-200 px-5 py-1 rounded-md shadow-md hover:cursor-pointer hover:bg-slate-500"
          >
            Login
          </Link>
        </div>
      </form>
      {/* Renders a error message depending when necessary */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
