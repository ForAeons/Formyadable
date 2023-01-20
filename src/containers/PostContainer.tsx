import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  Post,
  CommentForm,
  CommentLoading,
  PostForm,
  Alert,
} from ".././components";
import { CommentContainer } from "../containers";
import {
  TPostApiResponse,
  TCommentApiResponse,
  emptyComment,
  severityLevel,
  alert,
  TUserApiResponseWithToken,
  nullAlert,
} from "../types/type";
import { handleGetFn } from "../components/comment/handler";

interface Context {
  user: TUserApiResponseWithToken;
}

interface Props {
  post: TPostApiResponse;
  posts: TPostApiResponse[];
  setPosts: React.Dispatch<React.SetStateAction<TPostApiResponse[]>>;
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

const PostContainer: React.FC<Props> = ({ post, posts, setPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<TCommentApiResponse[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState<alert>(nullAlert);
  const { user }: Context = useOutletContext();

  // GET comments
  const handleGetComments = handleGetFn(
    comments,
    showComments,
    isFetchingComments,
    post,
    setComments,
    setShowComments,
    setIsFetchingComments,
    setAlert
  );

  return (
    <div className="flex flex-col mx-3 w-full items-center animate-FadeIn">
      {/* Renders post based on editing mode */}
      {isEditing ? (
        <PostForm
          key={post.id}
          thisPost={post}
          posts={posts}
          setPosts={setPosts}
          isEditingPost={true}
          setForumStatus={setIsEditing}
          setAlert={setAlert}
        />
      ) : (
        <Post
          key={post.id}
          post={post}
          showComments={showComments}
          setIsEditing={setIsEditing}
          handleGetComments={handleGetComments}
        />
      )}

      {/* displays error */}
      {alert.message && <Alert alert={alert} />}

      {/* showComment: display loading comment or actual comments */}
      {showComments && (
        <>
          <div className="flex flex-col w-full content-start items-center justify-start gap-2">
            {isFetchingComments ? (
              // comment place holders
              Array(Math.floor(Math.random() * 4 + 1))
                .fill(1)
                .map((_, i) => <CommentLoading key={i} />)
            ) : (
              <>
                {/* displays prompt to post */}
                {comments.length === 0 && (
                  <Alert
                    alert={{
                      message: "No comments here.\nBe the first to comment!",
                      severity: severityLevel.low,
                    }}
                  />
                )}

                {/* Comment submission form, shows only when logging in */}
                {user.token != "" && (
                  <CommentForm
                    thisComment={{ ...emptyComment, post_id: post.id }}
                    comments={comments}
                    setComments={setComments}
                    setAlert={setAlert}
                  />
                )}

                {/* Comments */}
                {comments.map((comment) => (
                  <CommentContainer
                    key={comment.id}
                    comment={comment}
                    comments={comments}
                    setComments={setComments}
                  />
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
