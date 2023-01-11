import React from "react";
import { useOutletContext } from "react-router-dom";

import { BtnEdit, BtnHome, BtnBack } from "../../components";
import { TUserApiResponseWithToken } from "../../types/type";
import iconTextGenerator from "../../utility/iconTextGeneator";

interface Context {
  user: TUserApiResponseWithToken;
}

interface Props {
  thisUser?: TUserApiResponseWithToken;
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileCard: React.FC<Props> = ({ thisUser, setIsEditingProfile }) => {
  let { user: loggedInUser }: Context = useOutletContext();

  // if thisUser is provided, the current user is not the logged in user
  thisUser = thisUser || loggedInUser;

  return (
    <div className="flex flex-col h-fit items-start justify-center gap-4 mx-12 sm:max-w-lg bg-slate-100 rounded-2xl shadow-2xl p-6">
      {/* Profile pic */}
      <div className="rounded-full bg-slate-600 hover:bg-slate-500 flex justify-center items-center font-Raleway text-2xl font-extrabold text-slate-200 h-24 w-24 self-center shadow-lg">
        {iconTextGenerator(thisUser.user.username)}
      </div>

      {/* Profile */}
      <div className="flex flex-col bg-slate-300 shadow-lg p-6 rounded-xl gap-4">
        <h1 className="font-Raleway text-2xl font-extrabold text-slate-700">
          {thisUser.user.username}
        </h1>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-400" />

        {thisUser.user.bio ? (
          <h2 className="font-sans text-md text-slate-700">
            {thisUser.user.bio}
          </h2>
        ) : (
          <h2 className="font-sans text-md text-slate-700">
            This person has nothing to say.
          </h2>
        )}
      </div>

      {/* Back to home */}
      <div className="w-full self-center flex justify-evenly">
        <BtnHome />
        {/* only displays edit button if viewing their own page */}
        {thisUser.user.id === loggedInUser.user.id && (
          <BtnEdit handleClick={() => setIsEditingProfile(true)} />
        )}
        <BtnBack />
      </div>
    </div>
  );
};

export default ProfileCard;
