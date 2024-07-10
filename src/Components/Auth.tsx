import { ReactNode, createContext, useEffect, useReducer } from "react";
import { AuthAction, AuthContextType } from "../types";

const emptyState = {
    userName: null,
    userEmail: null,
    isLoggedIn: false
}

export const AuthContext = createContext<AuthContextType>({authState: emptyState, authDispatch: () => null});

const getInitialAuthState = () => {
    const initialState = localStorage.getItem('auth');

    if (!initialState)
        return emptyState;

    return JSON.parse(initialState);
};

const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    UPDATE_USER: 'UPDATE_USER',
}

const authReducer = (state, action: AuthAction) => {
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
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