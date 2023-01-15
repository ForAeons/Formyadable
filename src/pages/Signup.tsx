import React, { useState } from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";

import { Alert } from "../components";
import { signUp } from "../utility/userApi";
import { TUserApiResponse, severityLevel } from "../types/type";

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
  const [alert, setAlert] = useState({ message: "", severity: -1 });

  const { setUser }: Context = useOutletContext();
  const navigator = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // password check
    if (password !== passwordC) {
      setAlert({
        message: "Both passwords must be the same!",
        severity: severityLevel.medium,
      });
      return;
    }

    // username check
    if (userName.length < 6 || userName.length > 30) {
      setAlert({
        message: "Username must be between 6 and 30 characters long!",
        severity: severityLevel.medium,
      });
      return;
    }

    // password check
    if (password.length < 8 || password.length > 30) {
      setAlert({
        message: "Password must be between 8 and 30 characters long!",
        severity: severityLevel.medium,
      });
      return;
    }

    signUp({ username: userName, password: password })
      .then((result) => {
        setUser(result);
        setAlert({
          message: "Account successfully created!\nRedirecting to home page.",
          severity: severityLevel.low,
        });
        setTimeout(() => {
          navigator("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 422) {
          setAlert({
            message: "This username may have been taken.\nTry a new one!",
            severity: severityLevel.medium,
          });
          return;
        }
        if (err.response.statusText) {
          setAlert({
            message: err.response.statusText,
            severity: severityLevel.high,
          });
          return;
        }
        if (err.message) {
          setAlert({
            message: err.message,
            severity: severityLevel.high,
          });
        }
      });
  };

  return (
    <div className="bg-slate-50 h-screen w-screen flex flex-col justify-center items-center gap-6 ">
      <form
        className="p-6 md:p-12 w-fit bg-slate-200 rounded-2xl shadow-xl flex flex-col items-center justify-between gap-6 hover:shadow-2xl transition-shadow"
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
