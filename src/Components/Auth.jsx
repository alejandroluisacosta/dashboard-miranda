import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const getInitialAuthState = () => {
    const initialState = localStorage.getItem('auth');

    if (!initialState)
        return {
            userName: null,
            userEmail: null,
            isLoggedIn: false
        };

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
            return newState;
        case types.LOGOUT:
            newState = {
                ...state,
                userName: null,
                userEmail: null,
                isLoggedIn: false,
            }
            return newState;
        case types.UPDATE_USER:
                newState = {
                    ...state,
                    userName: action.payload.userName,
                    userEmail: action.payload.userEmail,
            };
            return newState;
        default:
            return {...state};
    }
}

export const AuthProvider = ({ children }) => {
    
    const [authState, authDispatch] = useReducer(authReducer, getInitialAuthState());

    useEffect(() => {
        localStorage.setItem('auth', JSON.stringify(authState))
    }, [authState]);

    return (
        <AuthContext.Provider value={{ authState, authDispatch }}>
            {children}
        </AuthContext.Provider>
    )
}