import React, { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import { AuthContextType } from "../types";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }): ReactNode => {

    const { authState } = useContext(AuthContext) as AuthContextType;
    const auth = authState?.isLoggedIn;

    return auth ? children : <Navigate to="/login" />
}

export default ProtectedRoute;