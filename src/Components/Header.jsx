import { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./Auth";

const HeaderContainer = styled.div`
    padding: 30px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-right: 25px;
    }
    p {
        font-size: 22px;
        font-weight: 600;
    }
`;

const Right = styled.div`
    display: flex;
    justify-content: space-around;
    width: 40%;
    align-items: center;
    div {
        display: flex;
        margin-left: 20px; 
        span {
            color: var(--ocher-green);
        }
        p {
            margin-right: 5px;
            color: var(--red);
        }
    }
    img {
        width: 45px;
        height: 45px;
        border-radius: 8px;
    }
`;

const Header = () => {

    const { authDispatch } = useContext(AuthContext);

    const logOutHandler = () => {
        authDispatch({type: 'LOGOUT'});
    }

    const modifyUserHandler = () => {
        authDispatch({type: 'UPDATE_USER', payload: {userName: 'Joe', userEmail: 'joe@oxygen.com'}});
    }

    return (
        <HeaderContainer>
            <Left>
                <span className="material-symbols-outlined">
                    menu
                </span>
                <p>Dashboard</p>
            </Left>
            <Right>
            <span className="material-symbols-outlined">
                search
            </span>
            <span className="material-symbols-outlined">
                favorite
            </span>
            <span className="material-symbols-outlined">
                inbox
            </span>
            <span className="material-symbols-outlined">
                room_service
            </span>
            <span className="material-symbols-outlined">
                chat
            </span>
            <img src="/assets/user.jpeg" onClick={modifyUserHandler} alt="Profile icon"/>
                <div>
                    <p onClick={logOutHandler}>EN</p>
                    <span className="material-symbols-outlined">
                        keyboard_arrow_down
                    </span>
                </div>
            </Right>
        </HeaderContainer>
    )
}

export default Header;