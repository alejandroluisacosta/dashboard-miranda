export type AuthState = {
    userName: string | null;
    userEmail: string | null;
    isLoggedIn: boolean;
}

export type AuthAction =
    { type: 'LOGIN'; payload: { userName: string; userEmail: string; isLoggedIn: true; } }
    | { type: 'LOGOUT'; payload: { userName: null; userEmail: null; isLoggedIn: false; } }
    | { type: 'UPDATE_USER'; payload: { userName: string; userEmail: string; isLoggedIn: true; } }

export type AuthContextType = {
    authState: AuthState;
    authDispatch: React.Dispatch<AuthAction>;
}