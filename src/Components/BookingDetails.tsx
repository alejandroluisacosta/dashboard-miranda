import styled from "styled-components"
import { FaPhoneAlt } from "react-icons/fa";
import { SiGooglemessages } from "react-icons/si";
import { useEffect, useState } from "react";
import { EditBookingThunk } from "../Features/Bookings";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from "../app/hooks";

const StyledBookingDetails = styled.div`
    display: flex;
    margin: 0 50px 50px;
    background-color: white;
    border-radius: 12px;
`;

interface LeftProps {
    $isEditing: boolean;
}

const Left = styled.div<LeftProps>`
    width: 50%;
    padding: 40px 40px 50px;
    flex: 60%;
    border-radius: 12px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    @media only screen and (min-width: 1920px) {
        flex: 50%;
    }
    background-color: ${props => props.$isEditing ? 'var(--lighter-green)' : 'unset'};
    textarea {
        padding: 10px;
        border-radius: 8px;
    }
    input, select {
        border-radius: 8px;
        padding: 5px;
    }
`;

const ClientContainer = styled.div`
    position: relative;
    display: flex;
    gap: 5%;
    margin-bottom: 30px;
    img {
        width: 156px;
        border-radius: 12px;
        margin-right: 40px;
    }
    .image {
        width: 100%;
        padding-bottom: 50%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 12px;
        @media only screen and (min-width: 1920px) {
            width: 25%;
            padding-bottom: 25%;
        }
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
        order: 2;
        height: 40px;
        border: 1px solid black;
        border-radius: 8px;
        padding: 5px;
        cursor: pointer;
    }
    .save {
        background-color: white;
        height: 35px;
    }
`;

const ContactContainer = styled.div`
    display: flex;
    align-items: flex-end;
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
    max-height: 60px;
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
        font-size: 12px;
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
    margin-bottom: 24px;
    .special-request {
        font-size: 14px;
        margin-bottom: 30px;
    }
    textarea {
        min-height: 80px;
        width: 100%;
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
    flex: 40%;
    @media only screen and (min-width: 1920px) {
        flex: 60%;
    }
    div {
        min-height: 100%;
        width: 100%;
        padding-bottom: 50%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
    }
`;

const BookingDetails = () => {

    const [ isEditing, setIsEditing ] = useState(false);
    const booking = useAppSelector(state => state.Bookings.single);
    const name = booking.name;
    const id = booking._id;
    const orderDate = booking.orderDate;
    const status = booking.status;
    const [checkInDate, setCheckInDate] = useState(booking.checkInDate);
    const [checkOutDate, setCheckOutDate] = useState(booking.checkOutDate);
    const [roomType, setRoomType] = useState(booking.roomType);
    const [specialRequest, setSpecialRequest] = useState(booking.specialRequest);
    const dispatch = useAppDispatch();
    const images = ['/assets/user2.jpeg', '/assets/user3.jpeg', '/assets/user4.jpeg', '/assets/user5.jpeg', '/assets/user6.jpeg'];
    const imageIndex = name.charCodeAt(0) % images.length;
    const image = images[imageIndex];

    const notify = () => toast.success('Booking successfully modified', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleSaveClick = async () => {
        dispatch(EditBookingThunk({
            _id: id,
            name: name,
            orderDate: orderDate,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomType: roomType,
            specialRequest: specialRequest,
            status: status,
            roomId: '123'
        }));
        setIsEditing(false);
        notify();
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <StyledBookingDetails>
            <Left $isEditing={isEditing}>
                <ClientContainer>
                    {isEditing ?
                    <span className="edit save material-symbols-outlined" onClick={handleSaveClick}>
                        check
                    </span>
                    :
                    <span className="edit material-symbols-outlined" onClick={handleEditClick}>
                        edit
                    </span>
                    }
                    <div className="image" style={{backgroundImage: `url(${image})`}}></div> 
                    <div>
                        <p>{name}</p>
                        <p>Booking {id}</p>
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
                        {isEditing ? (
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(event) => setCheckInDate(event.target.value)}
                            />
                        ) : 
                        <p>{new Date(checkInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', })}</p>
                        }
                    </div>
                    <div>
                        <p>Check Out</p>
                        {isEditing ? (
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(event) => setCheckOutDate(event.target.value)}
                            />
                        ) : 
                        <p>{new Date(checkOutDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', })}</p>
                        }
                    </div>
                </DatesContainer>
                <RoomContainer>
                    <RoomTopContainer>
                        <div>
                            <p className="label">Room Info</p>
                            {isEditing ? (
                            <select defaultValue={roomType} onChange={(event) => setRoomType(event.target.value)}>
                                <option value="Single Bed">Single Bed</option>
                                <option value="Double Bed">Double Bed</option>
                                <option value="Double Superior">Double Superior</option>
                                <option value="Suite">Suite</option>
                            </select>
                            ) : 
                            <p>{roomType}</p>
                        }
                        </div>
                        <div>
                            <p className="label">Price</p>
                            <div className="price-container">
                                <p className="bigger-text">145$</p>
                                <p>/night</p>
                            </div>
                        </div>
                    </RoomTopContainer>
                    {isEditing ? (
                            <textarea placeholder={specialRequest ? specialRequest : ""} onChange={(event) => setSpecialRequest(event.target.value)}/>
                            ) : 
                            <p className="special-request">{specialRequest}</p>
                            }
                    <Facilities>
                        <p>Facilities</p>
                        <h1>Tags here</h1>
                    </Facilities>
                </RoomContainer>
                {isEditing && <button className="save-button" onClick={handleSaveClick}>Save Changes</button>}
            </Left>
            <Right>
                <div style={{backgroundImage: `url(../assets/HotelRoom4.jpeg)`}}></div>
            </Right>
        </StyledBookingDetails>
    )
}

export default BookingDetails;