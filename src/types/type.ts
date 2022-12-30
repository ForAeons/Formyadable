// import React from "react";

export type catergory = "Discussion" | "Theorycrafting" | "Fan Art";

export const catergories: catergory[] = [
  "Discussion",
  "Theorycrafting",
  "Fan Art",
];

export type RouteError = {
  statusText?: string;
  message?: string;
};

export type Post = {
  user_id: number;
  id: number;
  title: string;
  body: string;
  catergory: catergory;
  created_at: Date;
  updated_at: Date;
};

export type Comment = {
  user_id: number;
  post_id: number;
  id: number;
  body: string;
  created_at: Date;
  update_at: Date;
};

export type User = {
  id: number;
  userName: string;
};
