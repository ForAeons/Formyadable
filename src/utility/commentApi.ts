import { AnyAction, Dispatch } from "redux";
import { stripHtml } from "string-strip-html";
import axios from "axios";

import {
  TComment,
  IAxiosResponse,
  Comment,
  Post,
  IAxiosError,
  severityLevel,
  TCommentApiResponse,
  alert,
  nullAlert,
} from "../store/type";
import {
  editComment,
  addComment,
  deleteComment,
  setComments,
  editPost,
} from "../store/action";
import { handleError } from "./error";
import { cleanHtml } from "./strings";

export const getCommentsByPostID = async (PostID: number) => {
  const res: IAxiosResponse = await axios.get(`/comments?post_id=${PostID}`);

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

export const getCommentsByID = async (commentID: number) => {
  const res: IAxiosResponse = await axios.get(`/comments/${commentID}`);

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

const createComment = async (comment: TComment) => {
  const res: IAxiosResponse = await axios.post("/comments", comment);

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

const updateComment = async (comment: TComment, commentID: number) => {
  const res: IAxiosResponse = await axios.patch(
    `/comments/${commentID}`,
    comment
  );

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

const delComment = async (commentID: number) => {
  const res: IAxiosResponse = await axios.delete(`/comments/${commentID}`);

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

//////////////////////////////////////////////////////////////////////////////////////

export function getCommentsFn(
  post: Post,
  dispatch: Dispatch<AnyAction>
): () => void {
  return (): void => {
    dispatch(
      editPost({
        ...post,
        isShowingComments: !post.isShowingComments,
      })
    );

    if (post.isFetchingComments || post.comments.length > 0) return; // no need to refetch

    dispatch(
      editPost({
        ...post,
        isFetchingComments: true,
      })
    );

    getCommentsByPostID(post.id)
      .then((result: TCommentApiResponse[]) => {
        dispatch(setComments(result));
        dispatch(
          editPost({
            ...post,
            alert: nullAlert,
          })
        );
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
      })
      .finally(() => {
        dispatch(
          editPost({
            ...post,
            isFetchingComments: false,
          })
        );
      });
  };
}

export function submitCommentFn(
  comment: Comment,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (stripHtml(comment.content).result === "") {
      dispatch(
        editComment({
          ...comment,
          alert: {
            message: "Your comment cannot be empty",
            severity: severityLevel.low,
          },
        })
      );
      return;
    }

    if (stripHtml(comment.content).result.length > 3000) {
      dispatch(
        editComment({
          ...comment,
          alert: {
            message: "Your comment have exceeded the maximum character limit.",
            severity: severityLevel.medium,
          },
        })
      );
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(comment.content);
    createComment({ content: santiziedContent, post_id: comment.post_id })
      .then((result: TCommentApiResponse) => {
        dispatch(addComment(result));
        // clears the input field
        dispatch(
          editComment({
            ...comment,
            content: "",
            alert: nullAlert,
          })
        );
      })
      .catch((err: IAxiosError) => {
        handleError(
          err,
          (alert: alert) =>
            dispatch(
              editComment({
                ...comment,
                alert: alert,
              })
            ),
          {
            statusMessage: "Unprocessable Entity",
            responseMessage:
              "Please check that your comment does not exceed maximum length!",
            severity: severityLevel.medium,
          }
        );
      });
  };
}

export function editCommentFn(
  comment: Comment,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (stripHtml(comment.content).result === "") {
      dispatch(
        editComment({
          ...comment,
          alert: {
            message: "Your comment cannot be empty",
            severity: severityLevel.low,
          },
        })
      );
      return;
    }

    if (stripHtml(comment.content).result.length > 3000) {
      dispatch(
        editComment({
          ...comment,
          alert: {
            message: "Your comment have exceeded the maximum character limit.",
            severity: severityLevel.medium,
          },
        })
      );
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(comment.content);
    updateComment(
      { content: santiziedContent, post_id: comment.post_id },
      comment.id
    )
      .then((result: TCommentApiResponse) => {
        dispatch(
          editComment({
            ...result,
            alert: nullAlert,
            isEditingComment: false,
          })
        );
      })
      .catch((err: IAxiosError) => {
        handleError(
          err,
          (alert: alert) =>
            dispatch(
              editComment({
                ...comment,
                alert: alert,
              })
            ),
          {
            statusMessage: "Unauthorized",
            responseMessage: "You may not edit comments from others!",
            severity: severityLevel.medium,
          }
        );
      });
  };
}

export function deleteCommentFn(
  comment: Comment,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    delComment(comment.id)
      .then(() => {
        dispatch(deleteComment(comment));
      })
      .catch((err) => {
        handleError(err, (alert: alert) =>
          dispatch(
            editComment({
              ...comment,
              alert: alert,
            })
          )
        );
      });
  };
}

export function closeCommentFn(
  comment: Comment,
  dispatch: Dispatch<AnyAction>
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(
      editComment({
        ...comment,
        isEditingComment: false,
      })
    );
  };
}
