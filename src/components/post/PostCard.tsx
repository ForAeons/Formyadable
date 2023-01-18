import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

import { BtnComment, BtnPencil, ProfileIcon } from "..";
import { titleCase, cleanHtml } from "../../utility/strings";
import { creationDateGen, updateDateGen } from "../../utility/date";
import { Post, Store } from "../../store/type";
import { editPost } from "../../store/action";
import { getCommentsFn } from "../../utility/commentApi";

interface Props {
  post: Post;
}

/**
 * Displays a single post.
 * Ability to delete post or enter edit mode for creator of the post.
 * Ability to fetch comments belong to this post.
 */

const PostCard: React.FC<Props> = ({ post }) => {
  const store = useSelector((state: Store) => state);
  const dispatch = useDispatch();

  const handleGetComments = getCommentsFn(post, dispatch);

  return (
    <div className="flex flex-col w-full lg:min-w-[50%]">
      {/* <!-- title section --> */}
      <div className="justify-left flex flex-row items-center gap-4 mx-3 mb-3">
        <Link to={`/profile/${post.user_id}`}>
          <ProfileIcon username={post.author} size="sm" />
        </Link>
        <h3 className="text-lg sm:text-xl font-bold text-slate-700 font-Raleway tracking-wide">
          {post.title}
        </h3>
        <h3 className=" text-xs sm:text-sm font-light text-slate-500 ml-auto self-end font-Raleway tracking-wide">
          Post by {post.user_id === store.user.user.id ? "me" : post.author}
        </h3>
      </div>

      {/* Content card */}
      <div className="flex min-h-[20%] min-w-[40%] flex-col justify-start bg-slate-200 shadow-lg hover:shadow-xl transition rounded-xl lg:rounded-2xl p-4 lg:p-6 gap-2 lg:gap-3">
        <div className="flex justify-between">
          <h3 className=" text-md sm:text-xl font-bold text-slate-600 font-Raleway tracking-wide">
            {titleCase(post.category)}
          </h3>
          {store.user.user.id === post.user_id && (
            <BtnPencil
              handleClick={() =>
                dispatch(
                  editPost({
                    ...post,
                    isEditingPost: true,
                  })
                )
              }
            />
          )}
        </div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-300" />

        <div dangerouslySetInnerHTML={{ __html: cleanHtml(post.content) }} />
      </div>

      {/* <!-- Post status --> */}
      <div className="mx-3 mt-3 gap-2 grid grid-cols-3 justify-center items-center">
        {/* Creation date */}
        <h4 className="font-sans text-xs text-slate-500 row-span-1">
          {creationDateGen(post.created_at, "Posted")}
        </h4>

        <BtnComment
          handleClick={handleGetComments}
          showComments={post.isShowingComments}
        />

        {/* Update date, only displayed if updated */}
        {post.created_at !== post.updated_at && (
          <h4 className="font-sans text-xs text-slate-500 text-right row-span-1">
            {updateDateGen(post.updated_at, "Edited")}
          </h4>
        )}
      </div>
    </div>
  );
};

export default PostCard;
