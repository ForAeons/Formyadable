// import React from "react";

export type catergory = "Discussion" | "Question" | "Idea" | "Issues";

export const catergories: catergory[] = [
  "Discussion",
  "Question",
  "Idea",
  "Issues",
];

export type Post = {
  userId: number;
  postId: number;
  commentId: number;
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
