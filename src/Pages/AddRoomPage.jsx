import styled from "styled-components";
import Header from "../Components/Header";
import AddRoom from "../Components/AddRoom";
import SideBar from "../Components/SideBar";
;

const StyledAddRoomPage = styled.div`
    background-color: var(--light-gray);
`;

const AddRoomPage = () => {
    return (
        <>
            <StyledAddRoomPage>
                <div className="page-container">
                    <SideBar/>
                    <div className="main-content">
                        <Header />
                        <AddRoom />
                    </div>
                </div>
            </StyledAddRoomPage>
        </>
    )
}

export default AddRoomPage;