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
            const newState = {
                ...state,
                userName: action.payload.userName,
                userEmail: action.payload.userEmail,
                isLoggedIn: true
            };
            localStorage.setItem('auth', JSON.stringify(newState));
            return newState;
        case types.LOGOUT:
            localStorage.removeItem('auth');
            return null;
        default:
            return {...state};
    }
}

export const AuthProvider = ({ children }) => {
    
    const [authState, authDispatch] = useReducer(authReducer, getInitialAuthState());

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}