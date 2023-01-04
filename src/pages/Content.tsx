import React from "react";
import { Post, Navbar } from "../components";

const Content: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden flex flex-row justify-between gap-6 relative scroll-smooth 2xl:w-[1535px] 2xl:m-auto 2xl:px-12">
      <Navbar />
      <div className="flex h-screen w-screen flex-row flex-wrap content-start items-center justify-center gap-4 py-3 mr-6">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Content;
