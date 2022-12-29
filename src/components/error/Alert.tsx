import React from "react";
import "../../App.css";

interface Props {
  display: boolean;
  message: string;
}

const Alert: React.FC<Props> = ({ display, message }) => {
  return (
    <div className={`flexbox-item main-body ${display ? "" : "hidden"}`}>
      {message}
    </div>
  );
};

export default Alert;
