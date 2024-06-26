import styled from "styled-components";
import SideBarComponent from "../Components/SideBarComponent";
import Header from "../Components/Header";
import AddBooking from "../Components/AddBooking";

const StyledAddBookingPage = styled.div`
    background-color: var(--light-gray);
`;

const AddBookingPage = () => {
    return (
        <>
            <StyledAddBookingPage>
                <div className="page-container">
                    <SideBarComponent/>
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