import React from "react";
import { Navigate } from "react-router-dom";

function AuthRoute({ authenticated, component: Component }) {
  return authenticated ? Component : <Navigate to="/loginform" />;
}

export default AuthRoute;
