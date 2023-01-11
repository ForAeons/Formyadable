import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { BtnEdit, BtnHome, BtnBack } from "../../components";
import { TUserApiResponseWithToken, TUserApiResponse } from "../../types/type";
import iconTextGenerator from "../../utility/iconTextGeneator";
import { updateBio } from "../../utility/userApi";

interface Context {
  user: TUserApiResponseWithToken;
  setUser: React.Dispatch<React.SetStateAction<TUserApiResponseWithToken>>;
}

interface Props {
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileForm: React.FC<Props> = ({ setIsEditingProfile }) => {
  let { user, setUser }: Context = useOutletContext();

  const [newUsername, setNewUsername] = useState(user.user.username);
  const [newBio, setNewBio] = useState(user.user.bio);
  const [password, setPassword] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [message, setMessage] = useState("");

  const handleEdit = () => {
    if (password !== passwordC) return;

    updateBio(
      { username: newUsername, password: password, bio: newBio },
      user.user.id
    )
      .then((result: TUserApiResponse) => {
        setUser({ ...user, user: result });
      })
      .catch((err) => {
        console.log(err);
        if (err.request.statusText === "Unauthorized") {
          setMessage("Please login first!");
          return;
        }
        if (err.message) {
          setMessage(err.message);
        }
      })
      .finally(() => setIsEditingProfile(false));
  };

  return (
    <div className="flex flex-col w-fit items-start justify-center gap-4 mx-12 sm:max-w-lg bg-slate-100 rounded-2xl shadow-2xl p-6">
      {/* Profile pic */}
      <div className="rounded-full bg-slate-600 hover:bg-slate-500 flex justify-center items-center font-Raleway text-2xl font-extrabold text-slate-200 h-24 w-24 self-center shadow-lg">
        {iconTextGenerator(user.user.username)}
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
        <div className="flex flex-col min-h-fit gap-3">
          <label className="font-Raleway text-lg font-extrabold text-slate-700">
            Update bio
          </label>
          <div className="px-3 py-1 w-full h-fit rounded-lg shadow-inner bg-white">
            <textarea
              className="w-full text-slate-700 font-sans tracking-wide flex-grow bg-transparent my-1 focus:outline-none h-48"
              name="username"
              id="username"
              onChange={(e) => setNewBio(e.target.value)}
              defaultValue={newBio}
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
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="font-semibold text-xl dark:text-slate-400 px-5 py-1 rounded-md shadow-md"
          placeholder="Confirm Password"
          onChange={(e) => setPasswordC(e.target.value)}
        />
      </form>

      {/* Back to home */}
      <div className="w-full self-center flex justify-evenly">
        <BtnHome />
        <BtnEdit handleClick={handleEdit} />
        <BtnBack />
      </div>
    </div>
  );
};

export default ProfileForm;
