import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import {
  BtnLike,
  BtnComment,
  BtnEdit,
  BtnDelete,
  PostEdit,
  Comment,
  CommentForm,
  CommentLoading,
} from "../.././components";
import iconTextGenerator from "../../utility/iconTextGeneator";
import { creationDateGen, updateDateGen } from "../../utility/date";
import {
  TUserApiResponse,
  TPostApiResponse,
  TCommentApiResponse,
} from "../../types/type";
import { getCommentsByPostID } from "../../utility/commentApi";
import { deletePost } from "../../utility/postApi";

interface Context {
  user: TUserApiResponse;
}

interface Props {
  post: TPostApiResponse;
  posts: TPostApiResponse[];
  setPosts: React.Dispatch<React.SetStateAction<TPostApiResponse[]>>;
}

const Post: React.FC<Props> = ({ post, posts, setPosts }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<TCommentApiResponse[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const page = useRef(1);

  const { user }: Context = useOutletContext();

  const fetchComments = (page: number) => {
    setIsFetching(true);

    getCommentsByPostID(post.id, page)
      .then((result: TCommentApiResponse[]) => {
        setComments(result);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetching(false);
      });
  };

  // GET comments
  const handleGetComments = () => {
    setShowComments(!showComments);

    if (isFetching) return; // guard clause

    fetchComments(page.current);
  };

  // DELETE post
  const handleDeletePost = (postID: number) => {
    return () => {
      deletePost(postID)
        .then(() => {
          setPosts(posts.filter((eachpost) => eachpost.id !== post.id));
        })
        .catch((err) => {
          console.log(err);
          setIsFetching(false);
        });
    };
  };

  if (isEditing) {
    return (
      <PostEdit
        thisPost={{
          title: post.title,
          content: post.content,
          category: post.category,
          id: post.id,
        }}
        setPosts={setPosts}
        posts={posts}
        setIsEditing={setIsEditing}
      />
    );
  } else
    return (
      <div className="flex flex-col mx-3 w-full items-center">
        <div className="flex flex-col">
          {/* <!-- title section --> */}
          <div className="justify-left flex flex-row items-center gap-4 px-6 py-3">
            <div className="rounded-full bg-slate-300  flex justify-center items-center font-Raleway text-md font-extrabold text-slate-500 h-8 w-8">
              {iconTextGenerator(post.author)}
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-700 font-Raleway tracking-wide">
              {post.title}
            </h3>
            <h3 className=" text-xs sm:text-sm font-light text-slate-500 ml-auto self-end font-Raleway tracking-wide">
              by {post.author}
            </h3>
          </div>

          <div className="flex min-h-[20%] min-w-[40%] flex-col justify-start gap-3 rounded-2xl bg-slate-200 p-6 shadow-lg hover:shadow-xl">
            {/* <!-- Body --> */}
            <div className="w-f font-sans text-lg text-slate-600">
              {post.content}
            </div>

            {/* <!-- Hr --> */}
            <hr className="rounded-full border-t-2 border-slate-300" />

            {/* <!-- utilities --> */}
            <div className="flex flex-row justify-between gap-4">
              {/* only shows edit button if current user is the author of the post */}
              {post.user_id === user.user.id && (
                <BtnEdit handleClick={() => setIsEditing(true)} />
              )}
              <BtnComment
                handleClick={handleGetComments}
                showComments={showComments}
              />
              {/* only shows delete button if current user is the author of the post */}
              {post.user_id === user.user.id && (
                <BtnDelete handleClick={handleDeletePost(post.id)} />
              )}
            </div>
          </div>

          {/* <!-- Post status --> */}
          <div className="w-f flex flex-row flex-nowrap items-center justify-between mx-6 my-3">
            {/* Creation date */}
            <h4 className="font-sans text-xs text-slate-500">
              {creationDateGen(post.created_at, "Posted")}
            </h4>

            {/* Update date, only displayed if updated */}
            {post.created_at !== post.updated_at && (
              <h4 className="font-sans text-xs text-slate-500">
                {updateDateGen(post.updated_at, "Edited")}
              </h4>
            )}
          </div>
        </div>

        {/* showComment: display loading comment or actual comments */}
        {showComments &&
          (isFetching ? (
            Array(Math.floor(Math.random() * 4 + 1))
              .fill(1)
              .map((_) => <CommentLoading />)
          ) : (
            <>
              <CommentForm
                postID={post.id}
                setComments={setComments}
                comments={comments}
              />
              {comments.map((comment) => (
                <Comment comment={comment} />
              ))}
              {/* only show the show more comments button  */}
              {comments.length > 0 && (
                <button
                  className="rounded-md bg-blue-400 px-5 py-1 text-sm font-bold text-slate-600 shadow-md hover:bg-blue-300"
                  onClick={() => {
                    page.current += 1;
                    fetchComments(page.current);
                  }}
                >
                  Show more comments
                </button>
              )}
            </>
          ))}
      </div>
    );
};

export default Post;
