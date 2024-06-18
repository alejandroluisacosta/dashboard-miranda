import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";

const Dashboard = styled.div`
    background-color: #F8F8F8;
`;
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
                <Dashboard>
                    <h1>Dashboard Page</h1>
                    <button onClick={logoutHandler}>Logout</button>
                    <SideBarComponent/>
                </Dashboard>
            </>
            :
            <Navigate to="/login"/>
            }
        </>
    )
}

export default DashboardPage;