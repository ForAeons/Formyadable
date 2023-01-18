import React from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";

import {
  PostCard,
  CommentForm,
  CommentLoading,
  PostForm,
  Alert,
} from ".././components";
import { CommentContainer } from "../containers";
import {
  Store,
  Post,
  emptyComment,
  severityLevel,
  nullAlert,
} from "../store/type";
import { getCommentsByPostID, getCommentsFn } from "../utility/commentApi";
import { handleError } from "../utility/error";
import { editPost, setComments } from "../store/action";

interface Props {
  post: Post;
}

/**
 * Container for a single post, which holds the state of the post.
 * A post is either in edit or view mode. It defaults to view mode.
 * Edit mode is only accessible by creator of the post.
 *
 *  A post container also contains:
 * - a comment form
 * - an array of potentially to-be-fetched comment (containers)
 *
 * Upon fetch, the comments will be rendered beneath the post without the need to go to a separate page, disrupting the viewing experience.
 * Comments are lazy loaded and toggleable.
 */

const PostContainer: React.FC<Props> = ({ post }) => {
  const store = useSelector((state: Store) => state);

  return (
    <div className="flex flex-col mx-3 w-full items-center animate-FadeIn">
      {/* Renders post based on editing mode */}
      {post.isEditingPost ? (
        <PostForm key={post.id} post={post} />
      ) : (
        <PostCard key={post.id} post={post} />
      )}

      {/* displays error */}
      {post.alert.message && <Alert alert={post.alert} />}

      {/* showComment: display loading comment or actual comments */}
      {post.isShowingComments && (
        <>
          <div className="flex flex-col w-full content-start items-center justify-start gap-2">
            {post.isFetchingComments ? (
              // comment place holders
              Array(Math.floor(Math.random() * 4 + 1))
                .fill(1)
                .map((_, i) => <CommentLoading key={i} />)
            ) : (
              <>
                {/* displays prompt to post */}
                {post.comments.length === 0 && (
                  <Alert
                    alert={{
                      message: "No comments here.\nBe the first to comment!",
                      severity: severityLevel.low,
                    }}
                  />
                )}

                {/* Comment submission form, shows only when logging in */}
                {store.user.token != "" && (
                  <CommentForm
                    comment={{
                      ...emptyComment,
                      isEditingComment: false,
                      alert: nullAlert,
                    }}
                  />
                )}

                {/* Comments */}
                {post.comments.map((comment) => (
                  <CommentContainer key={comment.id} comment={comment} />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PostContainer;
