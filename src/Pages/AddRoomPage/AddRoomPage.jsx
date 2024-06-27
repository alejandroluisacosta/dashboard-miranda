import styled from "styled-components";
import SideBarComponent from "../../Components/SideBarComponent";
import Header from "../../Components/Header";
import AddRoom from "../../Components/AddRoom";
;

const StyledAddRoomPage = styled.div`
    background-color: var(--light-gray);
`;

const AddRoomPage = () => {
    return (
        <>
            <StyledAddRoomPage>
                <div className="page-container">
                    <SideBarComponent/>
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