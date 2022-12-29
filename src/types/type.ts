// import React from "react";

export type catergory = "Discussion" | "Question" | "Idea" | "Issues";

export const catergories: catergory[] = [
  "Discussion",
  "Question",
  "Idea",
  "Issues",
];

export type RouteError = {
  statusText?: string;
  message?: string;
};

// export type OutletContext = {
//   jwtToken: string;
//   setJwtToken: (token: string) => void;
// };

export type Post = {
  userId: number;
  postId: number;
  title: string;
  body: string;
  catergory: catergory;
  createDate: Date;
  updateDate: Date;
};

export type Comment = {
  userId: number;
  postId: number;
  commentId: number;
  body: string;
  createDate: Date;
  updateDate: Date;
};

export type User = {
  userId: number;
  userName: string;
};
