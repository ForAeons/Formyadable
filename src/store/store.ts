import { configureStore } from "@reduxjs/toolkit";
import { Store, nullAlert, nullUser, Post, Comment } from "./type";
import { ActionTypes, actionEnum } from "./action";

function forumReducer(
  state: Store = {
    alert: nullAlert,
    user: nullUser,
    posts: [] as Post[],
    isFetchingPosts: false,
    isCreatingPost: false,
    isReverse: false,
    searchValue: "",
  },
  action: ActionTypes
): Store {
  switch (action.type) {
    case actionEnum.SET_POSTS:
      console.log("SETPOST ", action);
      console.log(
        action.payload.map((p) => {
          return {
            ...p,
            alert: nullAlert,
            isEditingPost: false,
            isShowingComments: false,
            isFetchingComments: false,
            comments: [] as Comment[],
          };
        })
      );
      return {
        ...state,
        posts: action.payload.map((p) => {
          return {
            ...p,
            alert: nullAlert,
            isEditingPost: false,
            isShowingComments: false,
            isFetchingComments: false,
            comments: [] as Comment[],
          };
        }),
      };

    case actionEnum.ADD_POST:
      return {
        ...state,
        posts: [
          {
            ...action.payload,
            alert: nullAlert,
            isEditingPost: false,
            isShowingComments: false,
            isFetchingComments: false,
            comments: [] as Comment[],
          },
          ...state.posts,
        ],
      };

    case actionEnum.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id != action.payload.id ? p : action.payload
        ),
      };

    case actionEnum.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.payload),
      };

    case actionEnum.SET_COMMENTS:
      if (action.payload.length === 0) return state;
      const post_id = action.payload[0].post_id;

      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id != post_id
            ? p
            : {
                ...p,
                comments: action.payload.map((c) => {
                  return {
                    ...c,
                    alert: nullAlert,
                    isEditingComment: false,
                  };
                }),
              }
        ),
      };

    case actionEnum.ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id != action.payload.post_id
            ? p
            : {
                ...p,
                comments: [
                  ...p.comments,
                  {
                    ...action.payload,
                    alert: nullAlert,
                    isEditingComment: false,
                  },
                ],
              }
        ),
      };

    case actionEnum.EDIT_COMMENT:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id != action.payload.post_id
            ? p
            : {
                ...p,
                comments: p.comments.map((c) =>
                  c.id != action.payload.id ? c : action.payload
                ),
              }
        ),
      };

    case actionEnum.DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id != action.payload.post_id
            ? p
            : {
                ...p,
                comments: p.comments.filter((c) => c.id != action.payload.id),
              }
        ),
      };

    case actionEnum.SET_USER:
      console.log("SETTING USER", action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case actionEnum.SET_STORE:
      return action.payload;

    default:
      return state;
  }
}

const store = configureStore({
  reducer: forumReducer,
});

export default store;
