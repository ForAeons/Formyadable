import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import { TUserApiResponseWithToken, nullUser } from "./types/type";

const App: React.FC = () => {
  // user is initialised to not logged in state
  const [user, setUser] = useState<TUserApiResponseWithToken>(nullUser);

  // Restore the user state from local storage when the component mounts.
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) setUser(JSON.parse(userString));
  }, []);

  useEffect(() => {
    // empty user's token will have a falsy empty string
    if (user.token) {
      console.log("Logged in");
      // user logs in
      // update auth_token upon updating jwtToken
      axios.defaults.headers.common["Authorization"] = "Bearer ".concat(
        user.token
      );
      // stores user in localstorage for future use
      localStorage.setItem("user", JSON.stringify(user));
      console.log("JwtToken updated to: ", user.token);
    } else {
      console.log("logged out");
      // user logs out
      // clears all data
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("user");
    }
  }, [user]);

  return <Outlet context={{ user, setUser }} />;
};

export default App;
