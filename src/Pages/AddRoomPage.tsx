import styled from "styled-components";
import Header from "../Components/Header";
import AddRoom from "../Components/AddRoom";
import SideBar from "../Components/SideBar";
import { useState } from "react";
import { StyledPageContainer } from "../types";
;

const StyledAddRoomPage = styled.div`
    background-color: var(--light-gray);
`;

const AddRoomPage = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <StyledAddRoomPage>
                <StyledPageContainer visible={isSidebarVisible}>
                    <SideBar visible={isSidebarVisible}/>
                    <div className="main-content">
                        <Header toggleSidebar={toggleSidebar}/>
                        <AddRoom />
                    </div>
                </StyledPageContainer>
            </StyledAddRoomPage>
        </>
    )
}

export default AddRoomPage;