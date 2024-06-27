import styled from "styled-components"
import { FaPhoneAlt } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const StyledBookingDetails = styled.div`
    display: flex;
    margin: 50px;
    background-color: white;
    border-radius: 12px;
`;

const Left = styled.div`
    width: 50%;
    padding: 40px 40px 50px;
`;

const ClientContainer = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 30px;
    img {
        width: 156px;
        border-radius: 12px;
        margin-right: 40px;
    }
    div {
        p:first-child {
            font-size: 30px;
            font-weight: 600;
            margin-bottom: 13px;
            color: black;
        }
        p {
            font-size: 14px;
            color: var(--ocher-green);
            margin-bottom: 20px;
        }
    }
    .edit {
        position: absolute;
        right: 0;
        top: 0;
    }
`;

const ContactContainer = styled.div`
    display: flex;
    .call-container {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        border: 1px solid #E8F2EF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 16px;
        .icon {
            color: var(--dark-green);
        }
    }

`;

const SendMessageContainer = styled.div`
    display: flex;
    padding: 18px 26px 18px 18px;
    background-color: var(--dark-green);
    border-radius: 12px;
    align-items: center;
    .icon {
        margin-right: 18px;
        width: 24px;
        height: 24px;
        color: white;
    }
    .send-message {
        margin: 0;
        color: white;
    }
`;

const DatesContainer = styled.div`
    display: flex;
    padding-bottom: 30px;
    border-bottom: 2px solid var(--light-gray);
    margin-bottom: 30px;
    gap: 15%;
    div {
        p:first-child {
        font-size: 14px;
            color: #6E6E6E;
            margin-bottom: 16px;
        }
        p:last-child {
            font-weight: 600;
        }
    }
`;

const RoomContainer = styled.div`
    .room-description {
        font-size: 14px;
        margin-bottom: 30px;
    }
`;

const RoomTopContainer = styled.div`
    display: flex;
    gap: 15%;
    margin-bottom: 30px;
    div {
        .label {
            font-size: 14px;
            color: #6E6E6E;
        }
        .bigger-text {
            font-size: 24px;
        }
    }
    .price-container {
        display: flex;
        align-items: center;
    }
`;

const Facilities = styled.div`
    p {
        font-size: 14px;
        color: #6E6E6E;
        margin-bottom: 12px;
    }
`;

const Right = styled.div`
    width: 50%;
    div {
        min-height: 100%;
        width: 100%;
        padding-bottom: 50%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 12px;
    }
`;

const BookingDetails = ({ booking }) => {

    return (
        <StyledBookingDetails>
            <Left>
                <ClientContainer>
                    <PiDotsThreeOutlineVerticalFill class="edit"/>
                    <img src="/assets/user.jpeg" alt="User image"/>
                    <div>
                        <p>{booking.name}</p>
                        <p>Booking {booking.id}</p>
                        <ContactContainer>
                            <div className="call-container">
                                <FaPhoneAlt className="icon"/>
                            </div>
                            <SendMessageContainer>
                                <SiGooglemessages className="icon"/>
                                <p className="send-message">Send Message</p>
                            </SendMessageContainer>
                        </ContactContainer>
                    </div>
                </ClientContainer>
                <DatesContainer>
                    <div>
                        <p>Check In</p>
                        <p>October 30th, 2020 | 8:23 AM</p>
                    </div>
                    <div>
                        <p>Check Out</p>
                        <p>November 2th, 2020</p>
                    </div>
                </DatesContainer>
                <RoomContainer>
                    <RoomTopContainer>
                        <div>
                            <p className="label">Room Info</p>
                            <p className="bigger-text">Deluxe Z - 002323</p>
                        </div>
                        <div>
                            <p className="label">Price</p>
                            <div className="price-container">
                                <p className="bigger-text">145$</p>
                                <p>/night</p>
                            </div>
                        </div>
                    </RoomTopContainer>
                    <p className="room-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </p>
                    <Facilities>
                        <p>Facilities</p>
                        <h1>Tags here</h1>
                    </Facilities>
                </RoomContainer>
            </Left>
            <Right>
            <div style={{backgroundImage: `url(../assets/HotelRoom3.jpeg)`}}></div>
            </Right>
        </StyledBookingDetails>
    )
}

export default BookingDetails;