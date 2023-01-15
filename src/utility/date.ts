const miliSecond = 1;
const second = miliSecond * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 30;
const year = month * 12;

/**
 * Takes in the time diference in milliseconds and returns a neatly formatted, human readable time/date
 * @param timeDif integer, milliseconds
 * @param action string, verb
 * @returns String
 */

const timeFromNow = (timeDif: number, action: string): string => {
  if (timeDif < 10 * second) {
    const number = Math.round(timeDif / second);
    return `${action} just now`;
  }

  if (timeDif < minute) {
    const number = Math.round(timeDif / second);
    return `${action} ${number} second${number === 1 ? "" : "s"} ago`;
  }

  if (timeDif < hour) {
    const number = Math.round(timeDif / minute);
    return `${action} ${number} minute${number === 1 ? "" : "s"} ago`;
  }

  if (timeDif < day) {
    const number = Math.round(timeDif / hour);
    return `${action} ${number} hour${number === 1 ? "" : "s"} ago`;
  }

  if (timeDif < week) {
    const number = Math.round(timeDif / day);
    return `${action} ${number} day${number === 1 ? "" : "s"} ago`;
  }

  if (timeDif < month) {
    const number = Math.round(timeDif / week);
    return `${action} ${number} week${number === 1 ? "" : "s"} ago`;
  }

  if (timeDif < year) {
    const number = Math.round(timeDif / month);
    return `${action} ${number} month${number === 1 ? "" : "s"} ago`;
  } else {
    const number = Math.round(timeDif / year);
    return `${action} ${number} year${number === 1 ? "" : "s"} ago`;
  }
};

/**
 * Takes in the creation date and action (verb in passive state, e.g."Posted","Commented") and returns a neatly formatted, human readable time/date
 * @param date String, only the ISO 8601 format
 * @param action string, verb
 * @returns string
 */

export const creationDateGen = (date: string, action: string): string => {
  return timeFromNow(Date.now() - Date.parse(date), action);
};

/**
 * Takes in the updated date and action (verb in passive state, e.g."Posted","Commented") and returns a neatly formatted, human readable time/date
 * @param date String, only the ISO 8601 format
 * @param action string, verb
 * @returns string
 */

export const updateDateGen = (date: string, action: string): string => {
  return timeFromNow(Date.now() - Date.parse(date), action);
};
