import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

const ProtectedRoute = ({children, auth}) => {

    const { authState } = useContext(AuthContext);
    const auth = authState.isLoggedIn;

    return auth ? children : <Navigate to="/login" />
}

export default ProtectedRoute;