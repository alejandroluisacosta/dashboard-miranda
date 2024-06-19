import styled from "styled-components";
import { FaHotel } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { HiOutlinePuzzle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const SideBar = styled.div`
    
    padding: 32px 56px 0;
    max-width: 345px;
    background-color: white;

    .logo-container {
        display: flex;
        align-items: center;
        margin-bottom: 60px;
        .icon {
            margin-right: 30px;
            width: 48px;
            height: 48px;
        }
    }

    .text-container {

        p:first-child {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0;
        }

        p:last-child {
            font-size: 12px;
            margin: 0;
        }
    }

    .navigation {

        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        color: var(--ocher-green);
        .link-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-bottom: 55px;
            .icon {
                width: 28px;
                height: 28px;
                margin-right: 26px;
            }
            p {
                margin: 0;
                font-size: 18px;
            }
        }
    }

    .user-container {
        text-align: center;
        padding: 0 35px 24px;
        box-shadow: 0px 20px 30px #00000014;
        border-radius: 18px;
        img {
            width: 70px;
            height: 70px;
            border-radius: 8px;
            transform: translateY(-50%);
        }
        .name {
            letter-spacing: 0px;
            color: #393939;
            opacity: 1;
            margin-top: -15px;
            font-size: 16px;
            margin-bottom: 9px;
        }
        .email {
            margin-bottom: 16px;
        }
        button {
            padding: 16px 42px;
            border-radius: 8px;
            border: 0;
            background-color: var(--lighter-green);
            color: var(--dark-green);
        }
    }
`;

const SideBarComponent = () => {

    const navigate = useNavigate();

    const navigateHandler = (route) => {
        navigate("rooms");
    }

    return (
        <>
            <SideBar>
                <div className="logo-container">
                    <FaHotel className="icon"/>
                    <div className="text-container">
                        <p>travl</p>
                        <p>Hotel Admin Dashboard</p>
                    </div>
                </div>
                <div className="navigation">
                    <div className="link-container" onClick={navigateHandler}>
                        <MdOutlineDashboard className="icon"/>
                        <p>Dashboard</p>
                    </div>
                    <div className="link-container" onClick={navigateHandler}>
                        <TfiKey className="icon"/>
                        <p>Room</p>
                    </div>
                    <div className="link-container" onClick={navigateHandler}>
                        <LuCalendarCheck2 className="icon"/>
                        <p>Bookings</p>
                    </div>
                    <div className="link-container" onClick={navigateHandler}>
                        <CiUser className="icon"/>
                        <p>Guest</p>
                    </div>
                    <div className="link-container" onClick={navigateHandler}>
                        <HiOutlinePuzzle className="icon"/>
                        <p>Users</p>
                    </div>
                </div>
                <div className="user-container">
                    <img src="/assets/user.jpeg"/>
                    <p className="name">William Johanson</p>
                    <p className="email">williajohn@mail.com</p>
                    <button>Contact Us</button>
                </div>
            </SideBar>
        </>
    )
}

export default SideBarComponent;