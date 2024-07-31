import { useContext, useState } from "react";
import { AuthContext } from "../Components/Auth";
import { useNavigate } from "react-router-dom"
import { AuthContextType } from "../types";

const LoginPage = () => {

    const { authDispatch } = useContext(AuthContext) as AuthContextType;
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const authTokenRequest = async (username: string, password: string) => {
        const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userName": username,
                "password": password
            })
        });

        if (!response.ok) {
            return;
        }

        const json = await response.json();
        return json;
    }
    
    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()


        const target = event.target as typeof event.target & {
            elements: {
                username: { value: string },
                password: { value: string }
            }
        };

        const username = target.elements.username.value;
        const password = target.elements.password.value;

        const authData = await authTokenRequest(username, password);
        
        if (authData) {
            authDispatch({type: 'LOGIN', payload: {userName: authData.userData[0].userName, email: authData.userData[0].email, image: authData.userData[0].image, token: authData.token, isLoggedIn: true}});
            navigate('/');
        }
        else 
            setError("Incorrect username or password.");
    }

    return (
        <>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Your username"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Your password" autoComplete="true"/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginPage;