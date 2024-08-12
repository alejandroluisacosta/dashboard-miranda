import { useContext, useState } from "react";
import { AuthContext } from "../Components/Auth";
import { useNavigate } from "react-router-dom"
import { AuthContextType } from "../types";
import styled from "styled-components";

const PageContainer = styled.div`
    background-color: #ececec;
    padding: 1% 20%;
    height: 100%;
    @media only screen and (min-width: 1920px) {
        padding: 5% 20%;
    }
`;

const StyledMockCredentials = styled.div`
    display: flex;
    margin-left: 20px;
    gap: 15px;
    margin-bottom: 20px;
    align-items: center;
    font-size: 12px;
    .credential {
        text-align: center;
        background-color: var(--dark-green);
        color: white;
        padding: 2px 10px;
        border-radius: 8px;
    }
`;

const StyledLogin = styled.div`
    display: flex;
    border-radius: 12px;
    padding: 1%;
    gap: 10%;
    background-color: white;
    & > :first-child {
        flex: 0 0 50%;
    }

    & > :nth-child(2) {
        flex: 0 0 40%;
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 5%;
    padding-bottom: 10%;
    padding-left: 5%;
    gap: 50%;
    justify-content: space-between;
    .title-container {
        margin-bottom: 10%;
        @media only screen and (min-width: 1920px) {
            margin-bottom: 15%;
        }
    }
    .name-container {
        display: flex;
        gap: 25px;
        align-items: center;
        margin-bottom: 16px;
    }
    h2 {
        font-size: 28px;
    }
    .slogan {
        font-size: 20px;
    }
    .logo {
        width: 50px;
        height: 50px;
    }
    h1 {
        margin-bottom: 20px;
    }
    .login-container {
    }
    label {
        margin-bottom: 8px;
        display: block;
    }
    input {
        display: block;
        margin-bottom: 32px;
        width: 100%;
        height: 32px;
        border-radius: 8px;
        padding: 10px;
    }
    #password {
        margin-bottom: 44px;
    }
    button {
        padding: 16px;
        width: 100%;
        border-radius: 12px;
        font-size: 18px;
        background-color: var(--dark-green);
        color: white;
        transition: background-color 0.6s ease, color 0.6s ease;
    }
    button:hover {
        background-color: white;
        color: var(--dark-green);
        transition: background-color 0.6s ease, color 0.6s ease;
    }
`;

const Right = styled.div`
    // height: 1000px;
    .image {
        border-radius: 12px;
        width: 100%;
        min-height: 100%;
        padding-bottom: 50%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
`;

const LoginPage = () => {

    const { authDispatch } = useContext(AuthContext) as AuthContextType;
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const authTokenRequest = async (username: string, password: string) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
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
        <PageContainer>
            <StyledMockCredentials>
                <p>Login mock credentials / Credenciales para login:</p>
                <p className="label">Username:</p>
                <p className="credential">username123</p>
                <p className="label">Password:</p>
                <p className="credential">1234</p>
            </StyledMockCredentials>
            <StyledLogin>
                <Left>
                    <div className="title-container">
                        <div className="name-container">
                            <img className="logo" src="/assets/HotelLogo.svg" alt="Hotel Logo"/>
                            <h2>Travl</h2>
                        </div>
                        <p className="slogan">More features. More control. <strong>Easier.</strong></p>
                    </div>
                    <div className="login-container">
                        <h1>Login</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={submitHandler}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Your username"/>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Your password" autoComplete="true"/>
                            <button type="submit">Login now</button>
                        </form>
                    </div>
                </Left>
                <Right>
                    <div className="image" style={{ backgroundImage: "url('/assets/Reception.jpeg')" }}></div>
                </Right>
            </StyledLogin>
        </PageContainer>
    )
}

export default LoginPage;