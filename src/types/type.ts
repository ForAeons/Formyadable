// import React from "react";
import { AxiosRequestConfig } from "axios";

export type category =
  | "Discussion"
  | "Theorycrafting"
  | "Fan Art"
  | "Lore"
  | "Guide"
  | "Meme"
  | "Question"
  | "News";

export const categories: category[] = [
  "Discussion",
  "Theorycrafting",
  "Fan Art",
  "Lore",
  "Guide",
  "Meme",
  "Question",
  "News",
];

export enum severityLevel {
  low,
  medium,
  high,
}

export type alert = {
  message: string;
  severity: number;
};

// export type TError = {
//   error: string;
// };

// export function isError(
//   toBeDetermined: TError | any
// ): toBeDetermined is TError {
//   return !!(toBeDetermined as TError)?.error;
// }

export type TPost = {
  id?: number;
  title: string;
  content: string;
  category: string;
};

export type TPostApiResponse = {
  author: string;
  category: string;
  content: string;
  created_at: string;
  id: number;
  title: string;
  updated_at: string;
  user_id: number;
};

export type TComment = {
  post_id: number;
  content: string;
};

export type TCommentApiResponse = {
  author: string;
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  updated_at: string;
  created_at: string;
};

export type TUser = {
  username: string;
  password: string;
  bio?: string;
};

export type TUserApiResponseWithToken = {
  user: {
    id: number;
    username: string;
    password_digest: string;
    created_at: string;
    updated_at: string;
    bio?: string;
  };
  token: string;
};

export type TUserApiResponse = {
  id: number;
  username: string;
  password_digest: string;
  created_at: string;
  updated_at: string;
  bio?: string;
};

export const nullUser = {
  user: {
    id: -1,
    username: "",
    password_digest: "",
    created_at: "",
    updated_at: "",
  },
  token: "",
};

export const emptyComment = {
  author: "",
  id: -1,
  post_id: -1,
  user_id: -1,
  content: "",
  updated_at: "",
  created_at: "",
};

export const emptyPost = {
  author: "",
  category: "",
  content: "",
  created_at: "",
  id: -1,
  title: "",
  updated_at: "",
  user_id: -1,
};

export interface IAxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface IAxiosError {
  code: string;
  config: AxiosRequestConfig;
  message: string;
  name: string;
  request?: any;
  response: IAxiosResponse;
}

export interface IPriorityError {
  statusMessage: string;
  responseMessage: string;
  severity: number;
}

export const nullAlert = { message: "", severity: -1 };

export enum themeChoice {
  default = "default",
  dark = "dark",
  light = "light",
}
