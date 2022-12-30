import React from "react";
import { useRouteError } from "react-router-dom";
import { RouteError } from "../../types/type";

const Error: React.FC = () => {
  const error = useRouteError() as RouteError;
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occured</p>
      <p>
        <em>{error.statusText || error.message}</em>
      </p>
    </div>
  );
};

export default Error;
