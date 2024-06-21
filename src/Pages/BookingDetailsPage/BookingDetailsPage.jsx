import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";

const StyledRoomDetails = styled.div`

`;

const BookingDetailsPage = () => {

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
            <StyledRoomDetails>
                <div className="page-container">
                    <SideBarComponent/>
                    <div className="main-content">
                      <Header />
                    </div>
                </div>
            </StyledRoomDetails>
        </>
        :
        <Navigate to="/login"/>
        }
    </>
    )
}

export default BookingDetailsPage;