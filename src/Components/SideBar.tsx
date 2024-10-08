import styled from "styled-components";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Link } from "react-router-dom";

const StyledSideBar = styled.div<{ visible: boolean }>`
    
    padding: 32px 56px 0;
    max-width: 345px;
    min-width: 345px;
    background-color: white;
    transition: transform 0.4s ease-in-out;
    transform: ${({ visible }) => (visible ? 'translateX(0)' : 'translateX(-100%)')};

`;

const LogoContainer = styled.div`
    
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        .icon {
            margin-right: 30px;
            width: 48px;
            height: 48px;
        }
        div {
            text-align: left;
            p:first-child {
                font-size: 24px;
                font-weight: bold;
                margin: 0;
            }
    
            p:last-child {
                font-size: 12px;
                margin: 0;
            }
        }
`;

const Navigation = styled.div`

    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    color: var(--ocher-green);

`;

interface NavigationLinkProps {
    selected: boolean;
}

const NavigationLink = styled.div<NavigationLinkProps>`
    cursor: pointer;
    margin-bottom: 55px;
    color: ${props => props.selected ? 'var(--red)' : 'inherit'};
    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
    }
    .icon {
        width: 28px;
        height: 28px;
        margin-right: 26px;
    }
    p {
        margin: 0;
        font-size: 18px;
    }
    
`;

const User = styled.div`

    text-align: center;
    padding: 0 35px 24px;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 18px;
    margin-bottom: 60px;
    .img {
        width: 70px;
        height: 70px;
        border-radius: 8px;
        margin-left: 50%;
        transform: translate(-50%, -50%);
        background-size: cover;
        background-position: center calc(50% + 25px);
        background-repeat: no-repeat;
    }
    p:nth-child(2) {
        letter-spacing: 0px;
        color: #393939;
        opacity: 1;
        margin-top: -15px;
        font-size: 16px;
        margin-bottom: 9px;
    }
    p:nth-child(3) {
        font-size: 14px;
        margin-bottom: 16px;
        word-break: break-word;
    }
    button {
        position: relative;
        padding: 16px 40px;
        border-radius: 8px;
        border: 0;
        background-color: var(--lighter-green);
        color: var(--dark-green);
        transition: background-color 0.3s, color 0.3s;
        &:hover {
            background-color: #333333;
        }
    }
    .button-text,
    .button-hover-text {
        transition: opacity 0.3s;
    }

    .button-hover-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: white;
        opacity: 0;
    }

    button:hover .button-hover-text {
        opacity: 1;
    }

    button:hover .button-text {
        opacity: 0;
    }
`;

const Footer = styled.div`
    p:first-child {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
        color: black;
    }
    p {
        font-size: 14px;
        color: var(--ocher-green);
        font-weight: 300;
    }
    p:nth-child(2) {
        margin-bottom: 65px;
    }
`;

const SideBar: React.FC<{ visible: boolean }> = ({ visible }) => {

    return (
        <StyledSideBar visible={visible}>
            <LogoContainer>
                <img src="/assets/HotelLogo.svg" className="icon"/>
                <div>
                    <p>travl</p>
                    <p>Hotel Admin Dashboard</p>
                </div>
            </LogoContainer>
            <Navigation>
                <NavigationLink selected={true}>
                    <Link to="/">
                        <MdOutlineDashboard className="icon"/>
                        <p>Dashboard</p>
                    </Link>
                </NavigationLink>
                <NavigationLink selected={false}>
                    <Link to="/rooms">
                        <TfiKey className="icon"/>
                        <p>Rooms</p>
                    </Link>
                </NavigationLink>
                <NavigationLink selected={false}>
                    <Link to="/bookings">
                        <LuCalendarCheck2 className="icon"/>
                        <p>Bookings</p>
                    </Link>
                </NavigationLink>
                <NavigationLink selected={false}>
                    <Link to="/users">
                        <HiOutlinePuzzle className="icon"/>
                        <p>Users</p>
                    </Link>
                </NavigationLink>
            </Navigation>
            <User>
                <div className="img" style={{backgroundImage: `url(../assets/alejandroluis.jpeg)`}}></div>
                <p>Alejandro Luis Acosta</p>
                <p>alejandroluisacosta95@gmail.com</p>
                <button onClick={() => window.open("https://docs.google.com/document/d/1pB2hUX5Q8-TqChKeaIbjghglU5dVLyA33SL3q_Lo0Tk/edit?usp=sharing", "_blank")}>
                    <span className="button-text">Contact us</span>
                    <span className="button-hover-text">?</span>
                </button>
            </User>
            <Footer>
                <p>Travl Hotel Admin Dashboard</p>
                <p>© 2020 All Rights Reserved</p>
                <p>Made by Alejandro Luis Acosta</p>
            </Footer>
        </StyledSideBar>
    )
}

export default SideBar;