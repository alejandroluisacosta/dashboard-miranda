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
    UPDATE_USER: 'UPDATE_USER',
}

const authReducer = (state, action) => {
    let newState = {};
    switch (action.type) {
        case types.LOGIN:
                newState = {
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
        case types.UPDATE_USER:
                newState = {
                    ...state,
                    userName: action.payload.userName,
                    userEmail: action.payload.userEmail,
            };
            localStorage.setItem('auth', JSON.stringify(newState));
            return newState;
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