import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, ...props}) => {
  if (props.loggedIn) {
    return children;
  }
  return <Navigate to="/signin" />;
};

export default ProtectedRoute;
