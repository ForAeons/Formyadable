import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es/exports";

import {
  TUserApiResponseWithToken,
  IAxiosError,
  TUserApiResponse,
  Store,
} from "./store/type";
import { getUserInfo } from "./utility/userApi";
import { setUser } from "./store/action";

const App: React.FC = () => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();

  // Actions on mount:
  useEffect(() => {
    // Restore the user state from local storage when the component mounts.
    const userString = localStorage.getItem("user");
    if (userString) {
      // prevent logging out first
      const thisUser = JSON.parse(userString) as TUserApiResponseWithToken;
      dispatch(setUser(thisUser));

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

    // // Theme: On page load or when changing themes, best to add inline in `head` to avoid FOUC
    // if (
    //   localStorage.theme === themeChoice.dark ||
    //   (!("theme" in localStorage) &&
    //     window.matchMedia("(prefers-color-scheme: dark)").matches)
    // ) {
    //   document.documentElement.classList.add(themeChoice.dark);
    // } else {
    //   document.documentElement.classList.remove(themeChoice.dark);
    // }
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
      // user logs out and clears all data
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("user");
    }
  }, [user]);

  return <Outlet />;
};

export default App;
