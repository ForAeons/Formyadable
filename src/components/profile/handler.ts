import { NavigateOptions, To } from "react-router-dom";
import {
  alert,
  severityLevel,
  IAxiosError,
  TUserApiResponseWithToken,
  TUserApiResponse,
  nullAlert,
} from "../../types/type";
import { handleError } from "../../utility/error";
import {
  updateUserInfo,
  getUserInfo,
  login,
  signUp,
} from "../../utility/userApi";

export function handleGetFn(
  userID: number,
  setIsFetchingUser: (value: React.SetStateAction<boolean>) => void,
  setDisplayedUser: (value: React.SetStateAction<TUserApiResponse>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): void {
  // otherwise proceed to fetch the user
  setIsFetchingUser(true);
  getUserInfo(+userID)
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
}

export function handleEditFn(
  newUsername: string,
  password: string,
  newBio: string | undefined,
  user: TUserApiResponseWithToken,
  setUser: (value: React.SetStateAction<TUserApiResponseWithToken>) => void,
  setDisplayedUser: (value: React.SetStateAction<TUserApiResponse>) => void,
  setIsEditingProfile: (value: React.SetStateAction<boolean>) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): () => void {
  return () => {
    if (password === "") return;

    updateUserInfo(
      { username: newUsername, password: password, bio: newBio },
      user.user.id
    )
      .then((result: TUserApiResponse) => {
        setUser({ ...user, user: result });
        setDisplayedUser(result);
        setAlert(nullAlert);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unauthorized",
          responseMessage: "Invalid credentials.",
          severity: severityLevel.medium,
        });
      })
      .finally(() => setIsEditingProfile(false));
  };
}

export function handleLoginFn(
  userName: string,
  password: string,
  setUser: (user: TUserApiResponse) => void,
  navigator: (to: To, options?: NavigateOptions | undefined) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.FormEvent<HTMLFormElement>) => void {
  return (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    login({ username: userName, password: password })
      .then((result) => {
        setUser(result);
        setAlert({
          message: "Successfully logged in!\nRedirecting to home page.",
          severity: severityLevel.low,
        });
        setTimeout(() => {
          navigator("/");
        }, 1000);
      })
      .catch((err: IAxiosError) => {
        handleError(err, setAlert, {
          statusMessage: "Unauthorized",
          responseMessage: "Invalid credentials",
          severity: severityLevel.medium,
        });
      });
  };
}

export function handleSignupFn(
  userName: string,
  password: string,
  passwordC: string,
  setUser: (user: TUserApiResponse) => void,
  navigator: (to: To, options?: NavigateOptions | undefined) => void,
  setAlert: (value: React.SetStateAction<alert>) => void
): (e: React.FormEvent<HTMLFormElement>) => void {
  return (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // password check
    if (password !== passwordC) {
      setAlert({
        message: "Both passwords must be the same!",
        severity: severityLevel.medium,
      });
      return;
    }

    // username check
    if (userName.length < 6 || userName.length > 30) {
      setAlert({
        message: "Username must be between 6 and 30 characters long!",
        severity: severityLevel.medium,
      });
      return;
    }

    // password check
    if (password.length < 8 || password.length > 30) {
      setAlert({
        message: "Password must be between 8 and 30 characters long!",
        severity: severityLevel.medium,
      });
      return;
    }

    signUp({ username: userName, password: password })
      .then((result) => {
        setUser(result);
        setAlert({
          message: "Account successfully created!\nRedirecting to home page.",
          severity: severityLevel.low,
        });
        setTimeout(() => {
          navigator("/");
        }, 1000);
      })
      .catch((err) => {
        handleError(err, setAlert, {
          statusMessage: "Unprocessable Entity",
          responseMessage: "This username may have been taken.\nTry a new one!",
          severity: severityLevel.medium,
        });
      });
  };
}
