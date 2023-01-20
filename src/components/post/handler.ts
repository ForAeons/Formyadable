import { stripHtml } from "string-strip-html";
import {
  alert,
  severityLevel,
  IAxiosError,
  TPostApiResponse,
  TUserApiResponseWithToken,
  nullAlert,
} from "../../types/type";
import { cleanHtml } from "../../utility/strings";
import { handleError } from "../../utility/error";
import {
  createPost,
  updatePost,
  deletePost,
  getPostByCategory,
  getPostByTitle,
  getAllPost,
  getPostByAuthorID,
} from "../../utility/postApi";

export function handleSearchFn(
  searchValue: string,
  isLoadingPosts: boolean,
  setIsLoadingPosts: (value: React.SetStateAction<boolean>) => void,
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // prevent user from making request until the current request is completed
    if (isLoadingPosts) return;

    // loads posts
    setIsLoadingPosts(true);

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
}

export function handleCreatePostFn(
  user: TUserApiResponseWithToken,
  setCreatePost: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): () => void {
  return () => {
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
}

export function handleReverseFn(
  posts: TPostApiResponse[],
  isReverse: boolean,
  setIsReverse: (value: React.SetStateAction<boolean>) => void,
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void
): () => void {
  return () => {
    setIsReverse(!isReverse);
    setPosts(posts.reverse());
  };
}

export function handleCloseFn(
  setForumStatus: (value: React.SetStateAction<boolean>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    setForumStatus(false);
  };
}

export function handleGetAllPostFn(
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setIsLoadingPosts: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): void {
  setIsLoadingPosts(true);
  setAlert(nullAlert);
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
}

export function handleGetPostByCatFn(
  categoryParam: string,
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setIsLoadingPosts: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): void {
  setIsLoadingPosts(true);
  setAlert(nullAlert);
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

export function handleGetPostByAuthorIDFn(
  userID: number,
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setIsLoadingPosts: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): void {
  setIsLoadingPosts(true);
  setAlert(nullAlert);

  // get posts by userID
  getPostByAuthorID(userID)
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

export function handleSubmitFn(
  posts: TPostApiResponse[],
  title: string,
  content: string,
  category: string,
  setTitle: (value: React.SetStateAction<string>) => void,
  setContent: (value: React.SetStateAction<string>) => void,
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setForumStatus: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (category == "") {
      setAlert({
        message: "Please choose a category.",
        severity: severityLevel.low,
      });
      return;
    }

    if (title == "" || stripHtml(content).result === "") {
      setAlert({
        message: "Your post cannot be empty",
        severity: severityLevel.low,
      });
      return;
    }

    if (stripHtml(content).result.length > 5000) {
      setAlert({
        message: "Your post have exceeded the maximum character limit.",
        severity: severityLevel.medium,
      });
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(content);
    createPost({ title: title, content: santiziedContent, category: category })
      .then((result: TPostApiResponse) => {
        setPosts([result, ...posts]);
        setForumStatus(false);
        // clears the input fields
        setContent("");
        setTitle("");
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unprocessable Entity",
          responseMessage:
            "Please check that your post does not exceed maximum length!",
          severity: severityLevel.medium,
        });
      });
  };
}

export function handleEditFn(
  thisPost: TPostApiResponse,
  posts: TPostApiResponse[],
  title: string,
  content: string,
  category: string,
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setForumStatus: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (category == "") {
      setAlert({
        message: "Please choose a category!",
        severity: severityLevel.low,
      });
      return;
    }

    if (title == "" || stripHtml(content).result === "") {
      setAlert({
        message: "Your post cannot be empty",
        severity: severityLevel.low,
      });
      return;
    }

    if (stripHtml(content).result.length > 5000) {
      setAlert({
        message: "Your post have exceeded the maximum character limit.",
        severity: severityLevel.medium,
      });
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(content);
    updatePost({
      title: title,
      content: santiziedContent,
      category: category,
      id: thisPost.id,
    })
      .then((result: TPostApiResponse) => {
        setPosts(
          posts.map((eachPost) =>
            eachPost.id !== thisPost.id ? eachPost : result
          )
        );
        setAlert(nullAlert);
        setForumStatus(false);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unauthorized",
          responseMessage: "Please login first!",
          severity: severityLevel.medium,
        });
      });
  };
}

export function handleDeleteFn(
  thisPost: TPostApiResponse,
  posts: TPostApiResponse[],
  setPosts: (value: React.SetStateAction<TPostApiResponse[]>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deletePost(thisPost.id)
      .then(() => {
        setPosts(posts.filter((eachpost) => eachpost.id !== thisPost.id));
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert);
      });
  };
}
