import styled from "styled-components";
import Header from "../Components/Header";
import AddBooking from "../Components/AddBooking";
import SideBar from "../Components/SideBar";
import { useState } from "react";
import { StyledPageContainer } from "../types";

const StyledAddBookingPage = styled.div`
    background-color: var(--light-gray);
`;

const AddBookingPage = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <StyledAddBookingPage>
                <StyledPageContainer visible={isSidebarVisible}>
                    <SideBar visible={isSidebarVisible}/>
                    <div className="main-content">
                        <Header toggleSidebar={toggleSidebar}/>
                        <AddBooking />
                    </div>
                </StyledPageContainer>
            </StyledAddBookingPage>
        </>
    )
}

export default AddBookingPage;