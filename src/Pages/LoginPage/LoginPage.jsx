import { useContext, useState } from "react";
import { AuthContext } from "../../Components/Auth";
import { useNavigate } from "react-router-dom"


const LoginPage = () => {

    const { authDispatch } = useContext(AuthContext);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    
    const submitHandler = (event) => {

        event.preventDefault()

        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        if (username === 'John' && password === '1234') {
            authDispatch({type: 'LOGIN', payload: {userName: username, userEmail: 'john@oxygen.com'}});
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