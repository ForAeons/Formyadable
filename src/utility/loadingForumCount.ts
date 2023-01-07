import React from "react";
import { PostLoadingHeight } from "./global";

export const getLoadingForumCount = (): number => {
  const windowHeight = window.innerHeight;
  return Math.floor(windowHeight / PostLoadingHeight);
};
