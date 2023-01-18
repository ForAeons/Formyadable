import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

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
import {
  FetchPosts,
  SearchPostsFn,
  toggleCreatePost,
  toggleReverse,
} from "../utility/postApi";
import { getLoadingForumCount } from "../utility/loadingForumCount";
import { emptyPost, nullAlert, severityLevel, Store } from "../store/type";
import { setPosts, setStore } from "../store/action";

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
  const store = useSelector((state: Store) => state);
  const dispatch = useDispatch();
  const { category: categoryParam } = useParams();

  // fetches posts on mount
  useEffect(() => {
    FetchPosts(categoryParam, dispatch, store);
  }, [categoryParam]); // trigger reload when categoryParam changes

  const handleSearch = SearchPostsFn(dispatch, store);
  const handleCreatePost = () => toggleCreatePost(dispatch, store);
  const handleReverse = () => toggleReverse(dispatch, store);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start content-start w-[100%] lg:max-w-[1536px] lg:mx-auto">
      <Navbar />
      <div className="flex flex-col w-full lg:max-w-[calc(100%-224.916px)] flex-grow items-center justify-start gap-4 my-3 px-3 lg:px-6">
        <div className="flex w-full flex-row justify-between items-center mx-3 gap-3 mt-3 lg:mt-6">
          <BtnCreatePost handleClick={handleCreatePost} />
          <SearchBar
            handleClick={handleSearch}
            searchValue={store.searchValue}
            setSearchValue={(value: string) =>
              dispatch(setStore({ ...store, searchValue: value }))
            }
          />
          <BtnReverse
            isReversed={store.isReverse}
            handleClick={handleReverse}
          />
        </div>

        {store.isCreatingPost && (
          <PostForm
            key={1}
            // initialise to a blank post
            post={{
              ...emptyPost,
              isEditingPost: false,
              alert: nullAlert,
              isShowingComments: false,
              isFetchingComments: false,
              comments: [],
            }}
          />
        )}

        {/* displays error */}
        {store.alert.message && <Alert alert={store.alert} />}

        {/* displays prompt to post */}
        {store.posts.length === 0 && store.isFetchingPosts === false && (
          <Alert
            alert={{
              message: "No posts here.\nBe the first to post!",
              severity: severityLevel.low,
            }}
          />
        )}

        {/* Loading posts placeholder */}
        {store.isFetchingPosts &&
          Array(getLoadingForumCount())
            .fill(1)
            .map((_, i) => <PostLoading key={i} />)}

        {/* Displaying each Post */}
        {store.posts.map((post) => (
          <PostContainer key={post.id} post={post} />
        ))}
        <button
          className="p-7 bg-black"
          onClick={() => console.log(store)}
        ></button>
      </div>
    </div>
  );
};

export default Content;
