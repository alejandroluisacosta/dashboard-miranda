import { useNavigate } from "react-router-dom"


const LoginPage = ({ authHandler }) => {

    const navigate = useNavigate();
    
    const submitHandler = (event) => {
        event.preventDefault()
        console.log(event.target.elements.username.value)
        if (event.target.elements.username.value === 'John') {
            authHandler();
            navigate('/');
        }
    }

    return (
        <>
            <h1>Login</h1>
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