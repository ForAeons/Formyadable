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
  const { setJwtToken, setAlertMessage, setDisplay } =
    useOutletContext() as OutletContext;

  const navigator = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      await fetch(BACKEND_URL.concat("login"), {
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
      <h2>Login</h2>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
