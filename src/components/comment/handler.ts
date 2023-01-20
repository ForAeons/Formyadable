import { stripHtml } from "string-strip-html";
import {
  alert,
  severityLevel,
  IAxiosError,
  TCommentApiResponse,
  TPostApiResponse,
  nullAlert,
} from "../../types/type";
import { cleanHtml } from "../../utility/strings";
import { handleError } from "../../utility/error";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostID,
} from "../../utility/commentApi";

export function handleCloseFn(
  setIsEditingComment?: (value: React.SetStateAction<boolean>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    // checks for undefined
    if (setIsEditingComment) setIsEditingComment(false);
  };
}

export function handleGetFn(
  comments: TCommentApiResponse[],
  showComments: boolean,
  isFetchingComments: boolean,
  post: TPostApiResponse,
  setComments: React.Dispatch<React.SetStateAction<TCommentApiResponse[]>>,
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFetchingComments: React.Dispatch<React.SetStateAction<boolean>>,
  setAlert: (value: React.SetStateAction<alert>) => void
): () => void {
  return (): void => {
    setShowComments(!showComments);

    if (isFetchingComments) return; // guard clause
    if (comments.length > 0) return; // no need to refetch

    setIsFetchingComments(true);

    getCommentsByPostID(post.id)
      .then((result: TCommentApiResponse[]) => {
        setComments([...comments, ...result]);
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert);
      })
      .finally(() => {
        setIsFetchingComments(false);
      });
  };
}

export function handleSubmitFn(
  thisComment: TCommentApiResponse,
  comments: TCommentApiResponse[],
  content: string,
  setContent: (value: React.SetStateAction<string>) => void,
  setComments: (value: React.SetStateAction<TCommentApiResponse[]>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();

    if (stripHtml(content).result === "") {
      setAlert({
        message: "Your comment cannot be empty",
        severity: severityLevel.low,
      });
      return;
    }

    if (stripHtml(content).result.length > 3000) {
      setAlert({
        message: "Your comment have exceeded the maximum character limit.",
        severity: severityLevel.medium,
      });
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(content);
    createComment({ content: santiziedContent, post_id: thisComment.post_id })
      .then((result: TCommentApiResponse) => {
        setComments([result, ...comments]);

        // clears the input field
        setContent("");
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unprocessable Entity",
          responseMessage:
            "Please check that your comment does not exceed maximum length!",
          severity: severityLevel.medium,
        });
      });
  };
}

export function handleEditFn(
  thisComment: TCommentApiResponse,
  comments: TCommentApiResponse[],
  content: string,
  setComments: (value: React.SetStateAction<TCommentApiResponse[]>) => void,
  setIsEditingComment:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (stripHtml(content).result === "") {
      setAlert({
        message: "Your comment cannot be empty",
        severity: severityLevel.low,
      });
      return;
    }

    if (stripHtml(content).result.length > 3000) {
      setAlert({
        message: "Your comment have exceeded the maximum character limit.",
        severity: severityLevel.medium,
      });
      return;
    }

    // prevent cross-site scripting (XSS) attacks
    const santiziedContent = cleanHtml(content);
    updateComment(
      { content: santiziedContent, post_id: thisComment.post_id },
      thisComment.id
    )
      .then((result: TCommentApiResponse) => {
        setComments(
          comments.map((eachComment) =>
            eachComment.id !== thisComment.id ? eachComment : result
          )
        );
        setAlert(nullAlert);
        if (setIsEditingComment) setIsEditingComment(false);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unauthorized",
          responseMessage: "You may not edit comments from others!",
          severity: severityLevel.medium,
        });
      });
  };
}

export function handleDeleteFn(
  thisComment: TCommentApiResponse,
  comments: TCommentApiResponse[],
  setComments: (value: React.SetStateAction<TCommentApiResponse[]>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    deleteComment(thisComment.id)
      .then(() => {
        setComments(
          comments.filter((eachcomment) => eachcomment.id !== thisComment.id)
        );
        setAlert(nullAlert);
      })
      .catch((err) => {
        handleError(err, setAlert);
      });
  };
}
