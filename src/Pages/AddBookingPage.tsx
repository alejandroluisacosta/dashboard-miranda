import styled from "styled-components";
import Header from "../Components/Header";
import AddBooking from "../Components/AddBooking";
import SideBar from "../Components/SideBar";
import { useState } from "react";

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
                <div className="page-container">
                    <SideBar visible={isSidebarVisible}/>
                    <div className="main-content">
                        <Header toggleSidebar={toggleSidebar}/>
                        <AddBooking />
                    </div>
                </div>
            </StyledAddBookingPage>
        </>
    )
}

export default AddBookingPage;