import axios from "axios";
import { TUser, IAxiosResponse } from "../types/type";

export const signUp = async (user: TUser) => {
  const res: IAxiosResponse = await axios.post("/signup", user);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successfu
    throw Error(res.data.statusText || res.data.error);
  }
};

export const login = async (user: TUser) => {
  const res: IAxiosResponse = await axios.post("/login", user);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const getUserInfo = async (userID: number) => {
  const res: IAxiosResponse = await axios.get(`/users/${userID}`);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const updateUserInfo = async (user: TUser, userID: number) => {
  const res: IAxiosResponse = await axios.patch(`/users/${userID}`, user);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

// import { BACKEND_BASE_URL } from "./global";

// const userApi = axios.create({
//   baseURL: BACKEND_BASE_URL,
// });

// export const signUp = async (user: TUser) => {
//   return await userApi.post("/signup", user);
// };

// export const login = async (user: TUser) => {
//   return await userApi.post("/login", user);
// };

// export const updateBio = async (user: TUser) => {
//   return await userApi.patch("/edit_bio", user);
// };
