import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import { BtnEdit, BtnClose } from "../../components";
import {
  TUserApiResponseWithToken,
  TUserApiResponse,
  IAxiosError,
  severityLevel,
  alert,
  nullAlert,
} from "../../types/type";
import iconTextGenerator from "../../utility/iconTextGeneator";
import { updateUserInfo } from "../../utility/userApi";
import { handleError } from "../../utility/error";
import { handleEditFn } from "./handler";

interface Context {
  user: TUserApiResponseWithToken;
  setUser: React.Dispatch<React.SetStateAction<TUserApiResponseWithToken>>;
}

interface Props {
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayedUser: React.Dispatch<React.SetStateAction<TUserApiResponse>>;
  setAlert: React.Dispatch<React.SetStateAction<alert>>;
}

const ProfileForm: React.FC<Props> = ({
  setIsEditingProfile,
  setDisplayedUser,
  setAlert,
}) => {
  let { user, setUser }: Context = useOutletContext();

  const [newUsername, setNewUsername] = useState(user.user.username);
  const [newBio, setNewBio] = useState(user.user.bio);
  const [password, setPassword] = useState("");

  const handleEdit = handleEditFn(
    newUsername,
    password,
    newBio,
    user,
    setUser,
    setDisplayedUser,
    setIsEditingProfile,
    setAlert
  );

  const textareaBioRef = useRef<HTMLTextAreaElement>(null);

  // Allows textfields to expand upon reaching its size limit
  const handleOnInput = () => {
    if (textareaBioRef.current) {
      textareaBioRef.current.style.height = "auto";
      textareaBioRef.current.style.height =
        textareaBioRef.current.scrollHeight + "px";
    }
  };

  return (
    <div className="flex flex-col w-fit items-start justify-center gap-4 mx-6 max-w-lg bg-slate-100 rounded-2xl shadow-lg hover:shadow-xl transition p-6 relative">
      {/* Profile pic */}
      <div className="rounded-full bg-slate-600 hover:bg-slate-500 flex justify-center items-center font-Raleway text-2xl font-extrabold text-slate-200 h-24 w-24 self-center shadow-lg">
        {iconTextGenerator(user.user.username)}
      </div>

      <div className="absolute right-6 top-6">
        <BtnClose handleClick={() => setIsEditingProfile(false)} />
      </div>

      {/* Form */}
      <form className="flex flex-col bg-slate-300 shadow-lg p-6 rounded-xl gap-4">
        {/* Updating username */}
        <div className="flex justify-between items-center gap-6">
          <label className="font-Raleway text-lg font-extrabold text-slate-700">
            New username
          </label>
          <div className="px-3 py-1 rounded-md shadow-inner bg-white">
            <input
              className="text-lg font-bold text-slate-700 font-Raleway tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
              name="username"
              id="newUsername"
              onChange={(e) => setNewUsername(e.target.value)}
              defaultValue={newUsername}
              placeholder="Cool new name"
            />
          </div>
        </div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-400" />

        {/* Updating bio */}
        <div className="flex flex-col h-fit gap-3">
          <label className="font-Raleway text-lg font-extrabold text-slate-700">
            Update bio
          </label>
          <div className="px-3 py-1 w-full h-fit rounded-lg shadow-inner bg-white">
            <textarea
              className="w-full text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none"
              name="username"
              id="username"
              rows={7}
              onChange={(e) => setNewBio(e.target.value)}
              defaultValue={newBio}
              ref={textareaBioRef}
              onInput={handleOnInput}
              placeholder="Tell us more about you"
            />
          </div>

          {/* <!-- bio length status --> */}
          <h4 className="font-sans font-bold text-xs text-slate-500 self-end">
            {`${newBio ? newBio.length : 0}/300`}
          </h4>
        </div>

        {/* <!-- Hr --> */}
        <hr className="rounded-full border-t-2 border-slate-400" />

        <input
          type="password"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md"
          placeholder="Current password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>

      <BtnEdit handleClick={handleEdit} />
    </div>
  );
};

export default ProfileForm;
