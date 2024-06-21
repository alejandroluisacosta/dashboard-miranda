import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import BookingDetails from "../../Components/BookingDetails";

const StyledBookingDetailsPage = styled.div`
    background-color: var(--light-gray);
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
            <StyledBookingDetailsPage>
                <div className="page-container">
                    <SideBarComponent/>
                    <div className="main-content">
                      <Header />
                      <BookingDetails />
                    </div>
                </div>
            </StyledBookingDetailsPage>
        </>
        :
        <Navigate to="/login"/>
        }
    </>
    )
}

export default BookingDetailsPage;