import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const getInitialAuthState = () => {
    const initialState = localStorage.getItem('auth');

    if (!initialState)
        return {isLoggedIn: false};

    return JSON.parse(initialState);
};

const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

const authReducer = (state, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {...state, userName: action.payload.username, userEmail: action.payload.email, isLoggedIn: true}
        case types.LOGOUT:
            return {isLoggedIn: false};
        default:
            return {...state};
    }
}

export const AuthProvider = ({ children }) => {
    
    const [authState, authDispatch] = useReducer(authReducer, getInitialAuthState);

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}