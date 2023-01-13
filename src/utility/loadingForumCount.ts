import { PostLoadingHeight } from "./global";

/**
 * Returns the suitable number of PostLoading components to fill up the page
 * @returns integer
 */

export const getLoadingForumCount = (): number => {
  const windowHeight = window.innerHeight;
  return Math.ceil(windowHeight / PostLoadingHeight);
};
