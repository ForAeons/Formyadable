import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import {
  TUserApiResponseWithToken,
  nullUser,
  themeChoice,
  IAxiosError,
  TUserApiResponse,
} from "./types/type";
import { getUserInfo } from "./utility/userApi";

const App: React.FC = () => {
  // user is initialised to not logged in state
  const [user, setUser] = useState<TUserApiResponseWithToken>(nullUser);
  // const [theme, setTheme] = useState(themeChoice.default);

  // Actions on mount:
  useEffect(() => {
    // Restore the user state from local storage when the component mounts.
    const userString = localStorage.getItem("user");
    if (userString) {
      // prevent logging out first
      const thisUser = JSON.parse(userString) as TUserApiResponseWithToken;
      setUser(thisUser);

      // then fetches the latest data
      getUserInfo(thisUser.user.id)
        .then((data: TUserApiResponse) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...thisUser, user: data })
          );
        })
        .catch((err: IAxiosError) => {
          console.error(err);
        });
    }

    // Theme: On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === themeChoice.dark ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add(themeChoice.dark);
    } else {
      document.documentElement.classList.remove(themeChoice.dark);
    }
  }, []);

  // Resets the user in the localstorage upon logging out
  // adds Auth token to axios headers upon logging in
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
