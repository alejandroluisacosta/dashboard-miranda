import styled from "styled-components";

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
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Left>
                <span class="material-symbols-outlined">
                    menu
                </span>
                <p>Dashboard</p>
            </Left>
            <Right>
            <span class="material-symbols-outlined">
                search
            </span>
            <span class="material-symbols-outlined">
                favorite
            </span>
            <span class="material-symbols-outlined">
                inbox
            </span>
            <span class="material-symbols-outlined">
                room_service
            </span>
            <span class="material-symbols-outlined">
                chat
            </span>
                <div>
                    <p>EN</p>
                    <span class="material-symbols-outlined">
                        keyboard_arrow_down
                    </span>
                </div>
            </Right>
        </HeaderContainer>
    )
}

export default Header;