import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import { ProfileCard, ProfileForm, ProfileLoading, Alert } from "../components";
import {
  TUserApiResponseWithToken,
  TUserApiResponse,
  severityLevel,
  alert,
  IAxiosError,
} from "../types/type";
import { getUserInfo } from "../utility/userApi";

interface Context {
  user: TUserApiResponseWithToken;
}

/**
 * Profile page
 * - View user's profile
 * - Edit user profile (for the logged in user)
 * - Holds the state of edit or view mode (default to view)
 */

const Profile: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [alert, setAlert] = useState<alert>({ message: "", severity: -1 });

  const {
    user: { user },
  }: Context = useOutletContext();

  const [displayedUser, setDisplayedUser] = useState(user);

  let { username } = useParams();

  // fetches the user profile info on mount
  useEffect(() => {
    // if no username is supplied, skip fetching the user
    if (!username) return;

    // otherwise proceed to fetch the user
    setIsFetchingUser(true);
    getUserInfo(username)
      .then((data: TUserApiResponse) => {
        setDisplayedUser(data);
      })
      .catch((err: IAxiosError) => {
        console.log(err);
        if (err.response.statusText) {
          setAlert({
            message: err.response.statusText,
            severity: severityLevel.high,
          });
          return;
        }
        if (err.message) {
          setAlert({
            message: err.message,
            severity: severityLevel.high,
          });
        }
      })
      .finally(() => {
        setIsFetchingUser(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
      {isFetchingUser ? (
        <ProfileLoading />
      ) : isEditingProfile ? (
        // no props is needed since user can only edit their own acc
        <ProfileForm
          setIsEditingProfile={setIsEditingProfile}
          setDisplayedUser={setDisplayedUser}
          setAlert={setAlert}
        />
      ) : (
        <ProfileCard
          user={displayedUser}
          setIsEditingProfile={setIsEditingProfile}
        />
      )}
      {alert.message && <Alert alert={alert} />}
    </div>
  );
};

export default Profile;
