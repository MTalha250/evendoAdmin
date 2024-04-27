import React, { ReactNode } from "react";
import { useAuthStore } from "store/useAuthStore";
import { Navigate } from "react-router-dom";

interface AuthProtectedProps {
  children: ReactNode;
}

const AuthProtected: React.FC<AuthProtectedProps> = ({ children }) => {

  const {user} = useAuthStore();

  if (!user) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default AuthProtected;