import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BACKEND_URL } from "../../../utility/helper";
import "../../../App.css";

interface OutletContext {
  setJwtToken: (token: string) => void;
  setAlertMessage: (errMsg: string) => void;
  setDisplay: (display: boolean) => void;
}

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAlt, setPasswordAlt] = useState("");
  const { setJwtToken, setAlertMessage, setDisplay } =
    useOutletContext() as OutletContext;

  const navigator = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      if (password !== passwordAlt) {
        throw new Error(
          "Passwords are not the same. Please check again!",
          undefined
        );
      }

      await fetch(BACKEND_URL.concat("users"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) throw new Error(data.error);

          console.log(data);
          setJwtToken(data.token);
        });

      navigator("/");
      setAlertMessage("");
      setDisplay(false);
    } catch (err: any) {
      console.log(err.message);
      setAlertMessage(err.message);
      setDisplay(true);
    }
  }

  return (
    <div className="flexbox-item main-body">
      <h2>Sign Up</h2>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Your username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label htmlFor="password">Your password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="password">Confirm password</label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          onChange={(e) => setPasswordAlt(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
