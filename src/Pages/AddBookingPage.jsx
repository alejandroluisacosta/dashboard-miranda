import styled from "styled-components";
import Header from "../Components/Header";
import AddBooking from "../Components/AddBooking";
import SideBar from "../Components/SideBar";

const StyledAddBookingPage = styled.div`
    background-color: var(--light-gray);
`;

const AddBookingPage = () => {
    return (
        <>
            <StyledAddBookingPage>
                <div className="page-container">
                    <SideBar/>
                    <div className="main-content">
                        <Header />
                        <AddBooking />
                    </div>
                </div>
            </StyledAddBookingPage>
        </>
    )
}

export default AddBookingPage;