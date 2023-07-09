import React from "react";
import {Route, Navigate} from "react-router-dom";

function ProtectedRoute({children, loggedIn, ...props}) {
  return <Route {...props}>{loggedIn ? children : <Navigate to="/singin" />}</Route>;
}

export default ProtectedRoute;
