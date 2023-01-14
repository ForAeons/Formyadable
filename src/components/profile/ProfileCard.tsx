import React from "react";
import { useOutletContext } from "react-router-dom";

import { BtnEdit, BtnBack } from "../../components";
import { TUserApiResponse, TUserApiResponseWithToken } from "../../types/type";
import iconTextGenerator from "../../utility/iconTextGeneator";

interface Context {
  user: TUserApiResponseWithToken;
}

interface Props {
  user: TUserApiResponse;
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileCard: React.FC<Props> = ({ user, setIsEditingProfile }) => {
  let { user: loggedInUser }: Context = useOutletContext();

  return (
    <div className="flex flex-col h-fit items-start justify-center gap-4 mx-12 sm:max-w-lg bg-slate-100 rounded-2xl shadow-2xl p-6">
      {/* Profile pic */}
      <div className="rounded-full bg-slate-600 hover:bg-slate-500 flex justify-center items-center font-Raleway text-2xl font-extrabold text-slate-200 h-24 w-24 self-center shadow-lg">
        {iconTextGenerator(user.username)}
      </div>

      {/* Profile */}
      <div className="flex flex-col bg-slate-300 shadow-lg p-6 rounded-xl gap-4 min-w-[300px]">
        <h1 className="font-Raleway text-2xl font-extrabold text-slate-700">
          {user.username}
        </h1>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-400" />

        {user.bio ? (
          <h2 className="font-sans text-md text-slate-700">{user.bio}</h2>
        ) : (
          <h2 className="font-sans text-md text-slate-700">
            This person has nothing to say.
          </h2>
        )}
      </div>

      {/* Back to home */}
      <div className="w-full self-center flex justify-evenly">
        {/* only displays edit button if viewing their own page */}
        {user.id === loggedInUser.user.id && (
          <BtnEdit handleClick={() => setIsEditingProfile(true)} />
        )}
        <BtnBack />
      </div>
    </div>
  );
};

export default ProfileCard;
