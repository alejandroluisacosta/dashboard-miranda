import styled from "styled-components";
import Header from "../Components/Header";
import AddRoom from "../Components/AddRoom";
import SideBar from "../Components/SideBar";
import AddUser from "../Components/AddUser";
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
                        <AddUser />
                    </div>
                </div>
            </StyledAddUserPage>
        </>
    )
}

export default AddUserPage;