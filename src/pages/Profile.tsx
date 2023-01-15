import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";

import { ProfileCard, ProfileForm, ProfileLoading, Alert } from "../components";
import {
  TUserApiResponseWithToken,
  TUserApiResponse,
  severityLevel,
  alert,
  IAxiosError,
  nullAlert,
  nullUser,
} from "../types/type";
import { getUserInfo } from "../utility/userApi";
import { handleError } from "../utility/error";

/**
 * Profile page
 * - View user's profile
 * - Edit user profile (for the logged in user)
 * - Holds the state of edit or view mode (default to view)
 */

const Profile: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  const [alert, setAlert] = useState<alert>(nullAlert);

  const [displayedUser, setDisplayedUser] = useState(nullUser.user);

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
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Bad Request",
          responseMessage:
            "This user does not exist!\nOr they may have changed their username.",
          severity: severityLevel.medium,
        });
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
        displayedUser.username && (
          <ProfileCard
            user={displayedUser}
            setIsEditingProfile={setIsEditingProfile}
          />
        )
      )}
      {alert.message && <Alert alert={alert} />}
    </div>
  );
};

export default Profile;
