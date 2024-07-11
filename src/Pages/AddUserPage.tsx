import styled from "styled-components";
import Header from "../Components/Header";
import AddRoom from "../Components/AddRoom";
import SideBar from "../Components/SideBar";
;

const StyledAddUserPage = styled.div`
    background-color: var(--light-gray);
`;

const AddUserPage = () => {
    return (
        <>
            <StyledAddUserPage>
                <div className="page-container">
                    <SideBar/>
                    <div className="main-content">
                        <Header />
                        <AddRoom />
                    </div>
                </div>
            </StyledAddUserPage>
        </>
    )
}

export default AddUserPage;