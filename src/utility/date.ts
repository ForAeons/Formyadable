const miliSecond = 1;
const second = miliSecond * 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = week * 30;
const year = month * 12;

const timeFromNow = (timeDif: number, action: string): string => {
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

export const creationDateGen = (date: string, action: string): string => {
  return timeFromNow(Date.now() - Date.parse(date), action);
};

export const updateDateGen = (date: string, action: string): string => {
  return timeFromNow(Date.now() - Date.parse(date), action);
};
