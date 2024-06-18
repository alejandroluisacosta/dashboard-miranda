import styled from "styled-components";
import { FaHotel } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { LuCalendarCheck2 } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { HiOutlinePuzzle } from "react-icons/hi";

const SideBar = styled.div`
    
    padding: 32px 56px 0;
    max-width: 345px;
    background-color: white;

    .logo-container {
        display: flex;
        align-items: center;
        padding: 20px;
        margin-bottom: 80px;
        .icon {
            margin-right: 10px;
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
            font-size: 0.8rem;
            margin: 0;
        }
    }

    .navigation {

        display: flex;
        flex-direction: column;
        align-items: center;

        .link-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            margin-bottom: 55px;
            p {
                margin: 0;
                font-size: 1rem;
            }
        }
    }

    .user-container {
        text-align: center;
        padding: 24px 35px;
        img {
            width: 70px;
        }
        .name {
            font-size: 23px;
        }
    }
`;

const SideBarComponent = () => {
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
                    <div className="link-container">
                        <MdOutlineDashboard className="icon"/>
                        <p>Dashboard</p>
                    </div>
                    <div className="link-container">
                        <TfiKey className="icon"/>
                        <p>Room</p>
                    </div>
                    <div className="link-container">
                        <LuCalendarCheck2 className="icon"/>
                        <p>Bookings</p>
                    </div>
                    <div className="link-container">
                        <CiUser className="icon"/>
                        <p>Guest</p>
                    </div>
                    <div className="link-container">
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