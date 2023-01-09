import React, { useState, useEffect } from "react";

import {
  PostLoading,
  PostForm,
  Navbar,
  SearchBar,
  BtnCreatePost,
} from "../components";
import { PostContainer } from "../containers";
import { getAllPost } from "../utility/postApi";
import { getLoadingForumCount } from "../utility/loadingForumCount";
import { TPostApiResponse } from "../types/type";

const Content: React.FC = () => {
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState<TPostApiResponse[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // fetches posts on mount
  useEffect(() => {
    setIsLoadingPosts(true);

    getAllPost()
      .then((result: TPostApiResponse[]) => {
        setPosts([...posts, ...result]);
        setIsLoadingPosts(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingPosts(false);
      });
  }, []);

  return (
    <div className=" flex flex-col sm:flex-row items-center sm:items-start content-start 2xl:w-[1535px] 2xl:mx-auto 2xl:px-3">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-start gap-4 my-3 px-3 sm:px-6">
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

        {/* Loading posts placeholder */}
        {isLoadingPosts &&
          Array(getLoadingForumCount())
            .fill(1)
            .map((_) => <PostLoading />)}

        {/* Displaying each Post */}
        {posts.map((post) => (
          <PostContainer post={post} posts={posts} setPosts={setPosts} />
        ))}
      </div>
    </div>
  );
};

export default Content;
