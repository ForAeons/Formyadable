import axios from "axios";
import {
  TPost,
  TPostApiResponse,
  category,
  IAxiosResponse,
} from "../types/type";

export const getAllPost = async () => {
  const res: IAxiosResponse = await axios.get("/posts");
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

export const getPostByID = async (id: number) => {
  const res: IAxiosResponse = await axios.get(`/posts/${id}`);
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

export const getPostByCategory = async (cat: string) => {
  const res: IAxiosResponse = await axios.get(`/posts?cat=${cat}`);
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

export const getPostByTitle = async (title: string) => {
  const res: IAxiosResponse = await axios.get(`/posts?q=${title}`);
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

export const getPostByAuthorID = async (authorID: number) => {
  const res: IAxiosResponse = await axios.get(`/posts?user_id=${authorID}`);
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

export const createPost = async (post: TPost) => {
  const res: IAxiosResponse = await axios.post("/posts", post);
  // for debugging
  console.log(res);

  if (res.statusText == "Created") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const updatePost = async (post: TPost) => {
  const res: IAxiosResponse = await axios.patch(`/posts/${post.id}`, post);
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

export const deletePost = async (postID: number) => {
  const res: IAxiosResponse = await axios.delete(`/posts/${postID}`);
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

// let postApi = axios.create({
//   baseURL: BACKEND_BASE_URL,
// });

// export const updatePostApi = (token: string): void => {
//   postApi = axios.create({
//     baseURL: BACKEND_BASE_URL,
//     headers: {
//       Authorization: "Bearer ".concat(token),
//     },
//   });
// };
