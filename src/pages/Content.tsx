import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import {
  PostLoading,
  PostForm,
  Navbar,
  SearchBar,
  BtnCreatePost,
  Alert,
} from "../components";
import { PostContainer } from "../containers";
import {
  getAllPost,
  getPostByTitle,
  getPostByCategory,
} from "../utility/postApi";
import { getLoadingForumCount } from "../utility/loadingForumCount";
import {
  TUserApiResponseWithToken,
  TPostApiResponse,
  emptyPost,
  severityLevel,
  alert,
  IAxiosError,
  nullAlert,
} from "../types/type";
import { handleError } from "../utility/error";

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
  const [searchValue, setSearchValue] = useState("");
  const [alert, setAlert] = useState<alert>(nullAlert);
  const { category: categoryParam } = useParams();

  const { user }: Context = useOutletContext();

  ////////////////////////////////////////////////////////////////////////
  // Actions on mount
  ////////////////////////////////////////////////////////////////////////

  // fetches posts on mount
  useEffect(() => {
    setIsLoadingPosts(true);
    setAlert(nullAlert);

    // no category restriction, get all posts
    if (!categoryParam) {
      getAllPost()
        .then((result: TPostApiResponse[]) => {
          setPosts(result);
          // removes error message
          setAlert(nullAlert);
        })
        .catch((err: IAxiosError) => {
          handleError(err, setAlert);
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    } else {
      // get posts by category
      getPostByCategory(categoryParam)
        .then((result: TPostApiResponse[]) => {
          setPosts(result);
          setAlert(nullAlert);
        })
        .catch((err: IAxiosError) => {
          handleError(err, setAlert);
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    }
    // trigger reload when categoryParam changes
  }, [categoryParam]);

  ////////////////////////////////////////////////////////////////////////
  // HANDLERS
  ////////////////////////////////////////////////////////////////////////

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // prevent user from making request until the current request is completed
    if (isLoadingPosts) return;

    // loads posts
    setIsLoadingPosts(true);
    console.log("Searching by title");

    getPostByTitle(searchValue)
      .then((result: TPostApiResponse[]) => {
        // overrides existing posts
        setPosts(result);
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        console.log(err);
        handleError(err, setAlert);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  };

  const handleCreatePost = () => {
    // checking for logged in status
    if (user.token === "") {
      setAlert({
        message: "Please log in first!",
        severity: severityLevel.low,
      });
      return;
    }

    setCreatePost(true);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start content-start w-[100%] lg:max-w-[1536px] lg:mx-auto">
      <Navbar />
      <div className="flex flex-col w-full items-center justify-start gap-4 my-3 px-3 lg:px-6">
        <div className="flex w-full flex-row justify-center items-center mx-3 gap-3 mt-3 lg:mt-6">
          <SearchBar
            handleClick={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <BtnCreatePost handleClick={handleCreatePost} />
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
