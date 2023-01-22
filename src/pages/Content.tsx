import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import {
  PostLoading,
  PostForm,
  Navbar,
  SearchBar,
  BtnCreatePost,
  BtnReverse,
  Alert,
} from "../components";
import { PostContainer } from "../containers";
import { getLoadingForumCount } from "../utility/loadingForumCount";
import {
  TUserApiResponseWithToken,
  TPostApiResponse,
  emptyPost,
  severityLevel,
  alert,
  nullAlert,
} from "../types/type";
import {
  handleCreatePostFn,
  handleGetAllPostFn,
  handleGetPostByCatFn,
  handleReverseFn,
  handleSearchFn,
} from "../components/post/handler";

interface Context {
  user: TUserApiResponseWithToken;
}

/**
 * Index page.
 * It contains:
 * - Navbar (responsive to various screensize)
 * - Search bar (to fetch posts filtered by their title)
 * - a post form (toggleable through the create post button)
 * - an array of potentially to-be-fetched post (containers)
 *
 * Upon mounting, posts will be automatically fetched, the posts will be rendered beneath the searchbar.
 * Upon fetching more posts, the additional posts will be added to the state without the need to refetch the previous posts.
 */

const Content: React.FC = () => {
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState<TPostApiResponse[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [alert, setAlert] = useState<alert>(nullAlert);
  const { category: categoryParam } = useParams();
  const { user }: Context = useOutletContext();

  ////////////////////////////////////////////////////////////////////////
  // Actions on mount
  ////////////////////////////////////////////////////////////////////////

  // fetches posts on mount
  useEffect(() => {
    // no category restriction, get all posts
    if (!categoryParam) {
      handleGetAllPostFn(setPosts, setIsLoadingPosts, setAlert);
    } else {
      handleGetPostByCatFn(
        categoryParam,
        setPosts,
        setIsLoadingPosts,
        setAlert
      );
    }
    // trigger reload when categoryParam changes
  }, [categoryParam]);

  ////////////////////////////////////////////////////////////////////////
  // HANDLERS
  ////////////////////////////////////////////////////////////////////////

  const handleSearch = handleSearchFn(
    searchValue,
    isLoadingPosts,
    setIsLoadingPosts,
    setPosts,
    setAlert
  );

  const handleCreatePost = handleCreatePostFn(user, setCreatePost, setAlert);

  const handleReverse = handleReverseFn(
    posts,
    isReverse,
    setIsReverse,
    setPosts
  );

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start content-start w-[100%] lg:max-w-[1536px] lg:mx-auto">
      <Navbar />
      <div className="flex flex-col w-full lg:max-w-[calc(100%-224.916px)] flex-grow items-center justify-start gap-4 my-3 px-3 lg:px-6">
        <div className="flex w-full flex-row justify-between items-center mx-3 gap-3 mt-3 lg:mt-6">
          <BtnCreatePost handleClick={handleCreatePost} />
          <SearchBar
            handleClick={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <BtnReverse isReversed={isReverse} handleClick={handleReverse} />
        </div>

        {createPost && (
          <PostForm
            key={1}
            // initialise to a blank post
            thisPost={emptyPost}
            posts={posts}
            setPosts={setPosts}
            // is in edit mode: false
            isEditingPost={false}
            setForumStatus={setCreatePost}
            setAlert={setAlert}
          />
        )}

        {/* displays error */}
        {alert.message && <Alert alert={alert} />}

        {/* displays prompt to post */}
        {posts.length === 0 && isLoadingPosts === false && (
          <Alert
            alert={{
              message: "No posts here.\nBe the first to post!",
              severity: severityLevel.low,
            }}
          />
        )}

        {/* Loading posts placeholder */}
        {isLoadingPosts &&
          Array(getLoadingForumCount())
            .fill(1)
            .map((_, i) => <PostLoading key={i} />)}

        {/* Displaying each Post */}
        {posts.map((post) => (
          <PostContainer
            key={post.id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
