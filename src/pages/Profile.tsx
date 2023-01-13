import React, { useState } from "react";

import { ProfileCard, ProfileForm } from "../components";
import { TUserApiResponseWithToken } from "../types/type";

interface Props {
  thisUser?: TUserApiResponseWithToken;
}

/**
 * Profile page
 * - View user's profile
 * - Edit user profile (for the logged in user)
 * - Holds the state of edit or view mode (default to view)
 */

const Profile: React.FC<Props> = ({ thisUser }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
      {isEditingProfile ? (
        <ProfileForm setIsEditingProfile={setIsEditingProfile} />
      ) : (
        <ProfileCard
          thisUser={thisUser}
          setIsEditingProfile={setIsEditingProfile}
        />
      )}
    </div>
  );
};

export default Profile;
