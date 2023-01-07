import React, { useState, useEffect } from "react";
import {
  Post,
  PostLoading,
  PostForm,
  Comment,
  CommentLoading,
  CommentForm,
  Navbar,
  SearchBar,
  BtnCreatePost,
} from "../components";

import { getAllPost } from "../utility/postApi";
import { getLoadingForumCount } from "../utility/loadingForumCount";
import { TPostApiResponse } from "../types/type";

const Content: React.FC = () => {
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState<TPostApiResponse[]>([]);

  useEffect(() => {
    getAllPost()
      .then((result: TPostApiResponse[]) => {
        setPosts([...posts, ...result]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" flex flex-col sm:flex-row  sm:justify-between gap-6 2xl:w-[1535px] 2xl:mx-auto 2xl:px-3">
      <Navbar />
      <div className="flex flex-row flex-wrap content-start items-center justify-center gap-4 my-3 ">
        <div className="flex w-full flex-row justify-between content-center mx-3 gap-3">
          <SearchBar />
          <BtnCreatePost setCreatePost={setCreatePost} />
        </div>
        {createPost && (
          <PostForm
            setCreatePost={setCreatePost}
            setPosts={setPosts}
            posts={posts}
          />
        )}
        {/* <Post />
        <PostLoading />
        <Comment />
        <CommentLoading />
        <CommentForm />
        <Post />
        <Post />
        <Post /> */}

        {/* Loading posts placeholder */}
        {posts.length === 0 &&
          Array(getLoadingForumCount())
            .fill(1)
            .map((_) => <PostLoading />)}

        {/* Displaying each Post */}
        {posts.map((post) => (
          <Post post={post} posts={posts} setPosts={setPosts} />
        ))}
      </div>
    </div>
  );
};

export default Content;
