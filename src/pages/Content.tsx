import React from "react";
import {
  Post,
  PostLoading,
  Comment,
  CommentLoading,
  Navbar,
  SearchBar,
} from "../components";

const Content: React.FC = () => {
  return (
    <div className="min-h-screen scroll-smooth overflow-y-scroll overflow-x-hidden flex flex-col sm:flex-row flex:start sm:justify-between gap-6 relative 2xl:w-[1535px] 2xl:mx-auto 2xl:px-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200 hover:scrollbar-thumb-slate-300">
      <Navbar />
      <div className="flex h-screen w-screen flex-row flex-wrap content-start items-center justify-center gap-4 py-3 mr-6 ">
        <SearchBar />
        <PostLoading />
        <Post />
        <Comment />
        <CommentLoading />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Content;
