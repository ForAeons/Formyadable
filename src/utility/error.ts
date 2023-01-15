import {
  IAxiosError,
  alert,
  severityLevel,
  IPriorityError,
} from "../types/type";

/**
 * Handles error and displays them
 * @param err error sent back by axios
 * @param setAlert state hook to display error
 * @param alernative any special errors to display
 * @returns
 */
export function handleError(
  err: IAxiosError,
  setAlert: React.Dispatch<React.SetStateAction<alert>>,
  alernative: IPriorityError | undefined = undefined
): void {
  console.error(err);
  if (alernative && err.request.statusText === alernative.statusMessage) {
    setAlert({
      message: alernative.responseMessage,
      severity: severityLevel.medium,
    });
    return;
  }

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
}
