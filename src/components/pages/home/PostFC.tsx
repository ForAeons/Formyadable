import React from "react";
import { Post, Comment } from "../../../types/type";

interface Props {
  post: Post;
}

const PostFC: React.FC<Props> = ({ post }) => {
  return (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {post.created_at !== post.updated_at ? <p>Edited</p> : null}
    </div>
  );
};

export default PostFC;
