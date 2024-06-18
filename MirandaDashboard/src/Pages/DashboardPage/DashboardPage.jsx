import { Navigate, useNavigate } from "react-router-dom";

const DashboardPage = () => {

    let isLoggedIn = localStorage.getItem('token');

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem('token', 'false');
        navigate('login');
    }

    return (
        <>
            {
            isLoggedIn && isLoggedIn !== 'false' ? 
            <>
                <h1>Dashboard Page</h1>
                <button onClick={logoutHandler}>Logout</button>
            </>
            :
            <Navigate to="/login"/>
            }
        </>
    )
}

export default DashboardPage;