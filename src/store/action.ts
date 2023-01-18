import {
  Post,
  Comment,
  TUserApiResponseWithToken,
  TCommentApiResponse,
  TPostApiResponse,
  Store,
} from "./type";

export enum actionEnum {
  SET_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,

  SET_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,

  SET_USER,

  SET_STORE,
}

export type ActionTypes =
  | { type: typeof actionEnum.SET_POSTS; payload: TPostApiResponse[] }
  | { type: typeof actionEnum.ADD_POST; payload: TPostApiResponse }
  | {
      type: typeof actionEnum.EDIT_POST;
      payload: Post;
    }
  | { type: typeof actionEnum.DELETE_POST; payload: number }
  | { type: typeof actionEnum.SET_COMMENTS; payload: TCommentApiResponse[] }
  | { type: typeof actionEnum.ADD_COMMENT; payload: TCommentApiResponse }
  | {
      type: typeof actionEnum.EDIT_COMMENT;
      payload: Comment;
    }
  | {
      type: typeof actionEnum.DELETE_COMMENT;
      payload: {
        id: number;
        post_id: number;
      };
    }
  | { type: typeof actionEnum.SET_USER; payload: TUserApiResponseWithToken }
  | { type: typeof actionEnum.SET_STORE; payload: Store };

export const setPosts = (posts: TPostApiResponse[]): ActionTypes => ({
  type: actionEnum.SET_POSTS,
  payload: posts,
});

export const addPost = (post: TPostApiResponse): ActionTypes => ({
  type: actionEnum.ADD_POST,
  payload: post,
});

export const editPost = (post: Post): ActionTypes => ({
  type: actionEnum.EDIT_POST,
  payload: post,
});

export const deletePost = (post: Post): ActionTypes => ({
  type: actionEnum.DELETE_POST,
  payload: post.id,
});

export const setComments = (comments: TCommentApiResponse[]): ActionTypes => ({
  type: actionEnum.SET_COMMENTS,
  payload: comments,
});

export const addComment = (comment: TCommentApiResponse): ActionTypes => ({
  type: actionEnum.ADD_COMMENT,
  payload: comment,
});

export const editComment = (comment: Comment): ActionTypes => ({
  type: actionEnum.EDIT_COMMENT,
  payload: comment,
});

export const deleteComment = (comment: Comment): ActionTypes => ({
  type: actionEnum.DELETE_COMMENT,
  payload: {
    id: comment.id,
    post_id: comment.post_id,
  },
});

export const setUser = (user: TUserApiResponseWithToken): ActionTypes => ({
  type: actionEnum.SET_USER,
  payload: user,
});

export const setStore = (store: Store): ActionTypes => ({
  type: actionEnum.SET_STORE,
  payload: store,
});
