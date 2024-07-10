import { useContext, useState } from "react";
import { AuthContext } from "../Components/Auth";
import { useNavigate } from "react-router-dom"
import { AuthContextType } from "../types";


const LoginPage = () => {

    const { authDispatch } = useContext(AuthContext) as AuthContextType;
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()


        const target = event.target as typeof event.target & {
            elements: {
                username: { value: string },
                password: { value: string }
            }
        };

        const username = target.elements.username.value;
        const password = target.elements.password.value;

        if (username === 'John' && password === '1234') {
            authDispatch({type: 'LOGIN', payload: {userName: username, userEmail: 'john@oxygen.com', isLoggedIn: true}});
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