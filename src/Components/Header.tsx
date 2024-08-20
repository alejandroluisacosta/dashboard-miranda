import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./Auth";
import { AuthContextType } from "../types";

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
        cursor: pointer;
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
    .img {
        width: 45px;
        height: 45px;
        border-radius: 8px;
        background-size: cover;
        background-position: center calc(50% + 17px);
        background-repeat: no-repeat;
    }
    .icon {
        cursor: pointer;
    }
    .logout {
        color: red;
        transform: scale(1);
        transition: transform 0.3s ease-in-out;
        &:hover {
            transform: scale(1.3);
        }
    }
`;

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {

    const { authDispatch } = useContext(AuthContext) as AuthContextType;

    const logOutHandler = () => {
        authDispatch({type: 'LOGOUT', payload: {userName: null, email: null, image: null, token: null, isLoggedIn: false}});
    }

    return (
        <HeaderContainer>
            <Left>
                <span onClick={toggleSidebar} className="material-symbols-outlined">
                    menu
                </span>
                <p>Dashboard</p>
            </Left>
            <Right>
            <span className="icon material-symbols-outlined">
                search
            </span>
            <span className="icon material-symbols-outlined">
                favorite
            </span>
            <span className="icon material-symbols-outlined">
                inbox
            </span>
            <span className="icon material-symbols-outlined">
                room_service
            </span>
            <span className="icon material-symbols-outlined">
                chat
            </span>
            <div className="img" style={{backgroundImage: `url(../assets/alejandroluis.jpeg)`}}></div>
            <span onClick={logOutHandler} className="logout icon material-symbols-outlined">
                logout
            </span>
            </Right>
        </HeaderContainer>
    )
}

export default Header;