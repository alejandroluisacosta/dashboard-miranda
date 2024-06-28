import styled from "styled-components";
import { FaHotel } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { HiOutlinePuzzle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const SideBar = styled.div`
    
    padding: 32px 56px 0;
    max-width: 345px;
    background-color: white;

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

const NavigationLink = styled.div`
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
    img {
        width: 70px;
        height: 70px;
        border-radius: 8px;
        transform: translateY(-50%);
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
        margin-bottom: 16px;
    }
    button {
        padding: 16px 42px;
        border-radius: 8px;
        border: 0;
        background-color: var(--lighter-green);
        color: var(--dark-green);
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

const SideBarComponent = () => {

    const navigate = useNavigate();

    const navigateHandler = (route) => {
        navigate("rooms");
    }

    return (
        <SideBar>
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
                <img src="/assets/user.jpeg"/>
                <p>William Johanson</p>
                <p>williajohn@mail.com</p>
                <button>Contact Us</button>
            </User>
            <Footer>
                <p>Travl Hotel Admin Dashboard</p>
                <p>© 2020 All Rights Reserved</p>
                <p>Made by Alejandro Luis Acosta</p>
            </Footer>
        </SideBar>
    )
}

export default SideBarComponent;