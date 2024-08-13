import styled from "styled-components";
import Header from "../Components/Header";
import AddRoom from "../Components/AddRoom";
import SideBar from "../Components/SideBar";
import AddUser from "../Components/AddUser";
import { useState } from "react";
import { StyledPageContainer } from "../types";
;

const StyledAddUserPage = styled.div`
    background-color: var(--light-gray);
`;

const AddUserPage = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <>
            <StyledAddUserPage>
                <StyledPageContainer visible={isSidebarVisible}>
                    <SideBar visible={isSidebarVisible}/>
                    <div className="main-content">
                        <Header toggleSidebar={toggleSidebar}/>
                        <AddUser />
                    </div>
                </StyledPageContainer>
            </StyledAddUserPage>
        </>
    )
}

export default AddUserPage;