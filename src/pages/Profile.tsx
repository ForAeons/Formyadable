import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Alert, PostLoading } from "../components";
import { ProfileContainer, PostContainer } from "../containers";
import {
  nullAlert,
  TPostApiResponse,
  IAxiosError,
  severityLevel,
} from "../types/type";
import { handleError } from "../utility/error";
import { getPostByAuthorID } from "../utility/postApi";
import { getLoadingForumCount } from "../utility/loadingForumCount";

const Profile: React.FC = () => {
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [posts, setPosts] = useState<TPostApiResponse[]>([]);
  const [alert, setAlert] = useState(nullAlert);

  let { userID } = useParams();

  // fetches posts on mount
  useEffect(() => {
    if (!userID) return;

    setIsLoadingPosts(true);
    setAlert(nullAlert);

    // get posts by userID
    getPostByAuthorID(+userID)
      .then((result: TPostApiResponse[]) => {
        setPosts(result);
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });

    // trigger reload when categoryParam changes
  }, []);
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start content-start w-[100%] lg:max-w-[1536px] lg:mx-auto">
      <ProfileContainer />

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
