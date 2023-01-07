// import React from "react";
import { AxiosRequestConfig } from "axios";

export type category = "Discussion" | "Theorycrafting" | "Fan Art" | "";

export const categories: category[] = [
  "Discussion",
  "Theorycrafting",
  "Fan Art",
];

export type TError = {
  error: string;
};

export function isError(
  toBeDetermined: TError | any
): toBeDetermined is TError {
  return !!(toBeDetermined as TError)?.error;
}

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

export type TUserApiResponse = {
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

export const emptyUser = {
  user: {
    id: -1,
    username: "",
    password_digest: "",
    created_at: "",
    updated_at: "",
  },
  token: "",
};

export interface IAxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}
