import { AnyAction, Dispatch } from "redux";
import axios from "axios";
import { stripHtml } from "string-strip-html";

import {
  Store,
  Post,
  TPost,
  TPostApiResponse,
  IAxiosResponse,
  IAxiosError,
  alert,
  severityLevel,
  nullAlert,
} from "../store/type";
import { cleanHtml } from "./strings";
import { handleError } from "./error";
import {
  setStore,
  setPosts,
  editPost,
  addPost,
  deletePost,
} from "../store/action";

export const getAllPost = async () => {
  const res: IAxiosResponse = await axios.get("/posts");
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const getPostByID = async (id: number) => {
  const res: IAxiosResponse = await axios.get(`/posts/${id}`);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const getPostByCategory = async (cat: string) => {
  const res: IAxiosResponse = await axios.get(`/posts?cat=${cat}`);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const getPostByTitle = async (title: string) => {
  const res: IAxiosResponse = await axios.get(`/posts?q=${title}`);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const getPostByAuthorID = async (authorID: number) => {
  const res: IAxiosResponse = await axios.get(`/posts?user_id=${authorID}`);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const createPost = async (post: TPost) => {
  const res: IAxiosResponse = await axios.post("/posts", post);
  // for debugging
  console.log(res);

  if (res.statusText == "Created") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const updatePost = async (post: TPost) => {
  const res: IAxiosResponse = await axios.patch(`/posts/${post.id}`, post);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

export const delPost = async (postID: number) => {
  const res: IAxiosResponse = await axios.delete(`/posts/${postID}`);
  // for debugging
  console.log(res);

  if (res.statusText == "OK") {
    // the request was successful
    return res.data;
  } else {
    // the request was not successful
    throw Error(res.data.statusText || res.data.error);
  }
};

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

export function FetchPosts(
  categoryParam: string | undefined,
  dispatch: Dispatch<AnyAction>,
  store: Store
) {
  dispatch(
    setStore({
      ...store,
      isFetchingPosts: true,
      alert: nullAlert,
    })
  );

  // no category restriction, get all posts
  if (!categoryParam) {
    getAllPost()
      .then((result: TPostApiResponse[]) => {
        // adds the posts and removes error message
        dispatch(setPosts(result));
      })
      .catch((err: IAxiosError) => {
        handleError(err, (alert: alert) =>
          dispatch(
            setStore({
              ...store,
              alert: alert,
            })
          )
        );
      })
      .finally(() => {
        dispatch(
          setStore({
            ...store,
            isFetchingPosts: false,
          })
        );
      });
  } else {
    // get posts by category
    getPostByCategory(categoryParam)
      .then((result: TPostApiResponse[]) => {
        dispatch(setPosts(result));
      })
      .catch((err: IAxiosError) => {
        handleError(err, (alert: alert) =>
          dispatch(
            setStore({
              ...store,
              alert: alert,
            })
          )
        );
      })
      .finally(() => {
        dispatch(
          setStore({
            ...store,
            isFetchingPosts: false,
          })
        );
      });
  }
}

export function SearchPostsFn(
  dispatch: Dispatch<AnyAction>,
  store: Store
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // prevent user from making request until the current request is completed
    if (store.isFetchingPosts) return;

    // loads posts
    setStore({
      ...store,
      isFetchingPosts: true,
      alert: nullAlert,
    });

    getPostByTitle(store.searchValue)
      .then((result: TPostApiResponse[]) => {
        dispatch(setPosts(result));
        console.log(result);
      })
      .catch((err: IAxiosError) => {
        handleError(err, (alert: alert) =>
          dispatch(
            setStore({
              ...store,
              alert: alert,
            })
          )
        );
      })
      .finally(() => {
        dispatch(
          setStore({
            ...store,
            isFetchingPosts: false,
          })
        );
      });
  };
}

export function toggleCreatePost(dispatch: Dispatch<AnyAction>, store: Store) {
  // checking for logged in status
  if (store.user.token === "") {
    dispatch(
      setStore({
        ...store,
        alert: {
          message: "Please log in first!",
          severity: severityLevel.low,
        },
      })
    );
    return;
  } else {
    dispatch(
      setStore({
        ...store,
        isCreatingPost: true,
      })
    );
  }
}

export function toggleReverse(dispatch: Dispatch<AnyAction>, store: Store) {
  dispatch(
    setStore({
      ...store,
      posts: store.posts.reverse(),
      isReverse: !store.isReverse,
    })
  );
}

export function SubmitPostFn(
  post: Post,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (post.category == "") {
      dispatch(
        editPost({
          ...post,
          alert: {
            message: "Please choose a category.",
            severity: severityLevel.low,
          },
        })
      );
      return;
    }

    const plaintext = stripHtml(post.content).result;
    if (post.title == "" || plaintext === "") {
      dispatch(
        editPost({
          ...post,
          alert: {
            message: "Your post cannot be empty",
            severity: severityLevel.low,
          },
        })
      );
      return;
    }

    if (plaintext.length > 5000) {
      dispatch(
        editPost({
          ...post,
          alert: {
            message: "Your post have exceeded the maximum character limit.",
            severity: severityLevel.medium,
          },
        })
      );
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(post.content);
    createPost({ ...post, content: santiziedContent })
      .then((result: TPostApiResponse) => {
        dispatch(addPost(result));
        dispatch(
          editPost({
            ...post,
            isEditingPost: false,
            title: "",
            content: "",
            category: "",
            alert: nullAlert,
          })
        );
      })
      .catch((err: IAxiosError) => {
        handleError(
          err,
          (alert: alert) =>
            dispatch(
              editPost({
                ...post,
                alert: alert,
              })
            ),
          {
            statusMessage: "Unprocessable Entity",
            responseMessage:
              "Please check that your post does not exceed maximum length!",
            severity: severityLevel.medium,
          }
        );
      });
  };
}

export function EditPostFn(
  post: Post,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (post.category == "") {
      dispatch(
        editPost({
          ...post,
          alert: {
            message: "Please choose a category.",
            severity: severityLevel.low,
          },
        })
      );
      return;
    }

    const plaintext = stripHtml(post.content).result;
    if (post.title == "" || plaintext === "") {
      dispatch(
        editPost({
          ...post,
          alert: {
            message: "Your post cannot be empty",
            severity: severityLevel.low,
          },
        })
      );
      return;
    }

    if (plaintext.length > 5000) {
      dispatch(
        editPost({
          ...post,
          alert: {
            message: "Your post have exceeded the maximum character limit.",
            severity: severityLevel.medium,
          },
        })
      );
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(post.content);
    updatePost({ ...post, content: santiziedContent })
      .then((result: TPostApiResponse) => {
        dispatch(editPost({ ...post, alert: nullAlert, isEditingPost: false }));
      })
      .catch((err: IAxiosError) => {
        handleError(
          err,
          (alert: alert) =>
            dispatch(
              editPost({
                ...post,
                alert: alert,
              })
            ),
          {
            statusMessage: "Unauthorized",
            responseMessage: "Please login first!",
            severity: severityLevel.medium,
          }
        );
      });
  };
}

export function DeletePostFn(
  post: Post,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    delPost(post.id)
      .then(() => {
        dispatch(deletePost(post));
      })
      .catch((err: IAxiosError) => {
        handleError(err, (alert: alert) =>
          dispatch(
            editPost({
              ...post,
              alert: alert,
            })
          )
        );
      });
  };
}
