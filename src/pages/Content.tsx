import React from "react";
import {
  Post,
  PostLoading,
  PostForm,
  Comment,
  CommentLoading,
  CommentForm,
  Navbar,
  SearchBar,
} from "../components";

const Content: React.FC = () => {
  return (
    <div className="scroll-smooth flex flex-col sm:flex-row  sm:justify-between gap-6 2xl:w-[1535px] 2xl:mx-auto 2xl:px-3">
      <Navbar />
      <div className="flex flex-row flex-wrap content-start items-center justify-center gap-4 py-3 ">
        <SearchBar />
        <Post />
        <PostLoading />
        <PostForm />
        <Comment />
        <CommentLoading />
        <CommentForm />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Content;
