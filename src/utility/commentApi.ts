import axios from "axios";
import { TComment, IAxiosResponse } from "../types/type";

export const getCommentsByPostID = async (PostID: number) => {
  const res: IAxiosResponse = await axios.get(`/comments?post_id=${PostID}`);

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

export const getCommentsByID = async (commentID: number) => {
  const res: IAxiosResponse = await axios.get(`/comments/${commentID}`);

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

export const createComment = async (comment: TComment) => {
  const res: IAxiosResponse = await axios.post("/comments", comment);

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

export const updateComment = async (comment: TComment, commentID: number) => {
  const res: IAxiosResponse = await axios.patch(
    `/comments/${commentID}`,
    comment
  );

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

export const deleteComment = async (commentID: number) => {
  const res: IAxiosResponse = await axios.delete(`/comments/${commentID}`);

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

// let commentApi = axios.create({
//   baseURL: BACKEND_BASE_URL,
// });

// export const updateCommentApi = (token: string): void => {
//   commentApi = axios.create({
//     baseURL: BACKEND_BASE_URL,
//     headers: {
//       Authorization: "Bearer ".concat(token),
//     },
//   });
// };
