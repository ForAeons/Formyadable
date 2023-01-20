import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Alert, PostLoading, BtnBack, BtnHome } from "../components";
import { ProfileContainer, PostContainer } from "../containers";
import { nullAlert, TPostApiResponse, severityLevel } from "../types/type";
import { getLoadingForumCount } from "../utility/loadingForumCount";
import { handleGetPostByAuthorIDFn } from "../components/post/handler";

const Profile: React.FC = () => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<TPostApiResponse[]>([]);
  const [alert, setAlert] = useState(nullAlert);

  let { userID } = useParams();

  // fetches posts on mount
  useEffect(() => {
    if (!userID) return;
    handleGetPostByAuthorIDFn(+userID, setPosts, setIsLoadingPosts, setAlert);
    // trigger reload when categoryParam changes
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start content-start w-[100%] lg:max-w-[1536px] lg:mx-auto">
      <div className="flex flex-col items-center justify-center h-fit lg:h-screen my-6 lg:m-0 gap-4 lg:sticky lg:top-0">
        <ProfileContainer />

        <div className="flex flex-row justify-evenly w-full">
          <BtnHome />
          <BtnBack />
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-start gap-4 my-3 px-3 lg:px-6">
        {/* displays error */}
        {alert.message && <Alert alert={alert} />}

        {/* displays prompt to post */}
        {posts.length === 0 && isLoadingPosts === false && (
          <Alert
            alert={{
              message: "No posts here.\nBe the first to post!",
              severity: severityLevel.low,
            }}
          />
        )}

        {/* Loading posts placeholder */}
        {isLoadingPosts &&
          Array(getLoadingForumCount())
            .fill(1)
            .map((_, i) => <PostLoading key={i} />)}

        {/* Displaying each Post */}
        {posts.map((post) => (
          <PostContainer
            key={post.id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
