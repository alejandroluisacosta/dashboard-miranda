import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { EditRoomThunk } from "../Features/Rooms";

const StyledRoomDetails = styled.div`
    display: flex;
    margin: 0 50px 50px;
    background-color: white;
    border-radius: 12px;
    h2 {
        margin-bottom: 40px;
    }
`;

const Left = styled.div`
    width: 50%;
    padding: 40px 40px 50px;
    background-color: ${props => props.$isEditing ? 'var(--lighter-green)' : 'unset'};
    input {
        border-radius: 8px;
        padding: 5px;
    }
    select {
        border-radius: 8px;
        padding: 7.5px;
    }
    .label {
        font-weight: 600;
        margin-bottom: 12px;
    }
`;

const StyledNameContainer = styled.div`
    position: relative;
    .edit {
        position: absolute;
        right: 5%;
        top: 0;
    }
    button {
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px 20px;
        color: var(--dark-green);
        background-color: white;
        border-radius: 12px;
    }
`;
            
const TopContainer = styled.div`
    position: relative;
    display: flex;
    gap: 15%;
    margin-bottom: 60px;
`;

const AmenitiesContainer = styled.div`
    margin-bottom: 60px;
    .checkboxes-form {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        input[type="checkbox"] {
        width: 20px;
    }
`;

const BottomContainer = styled.div`
    display: flex;
    gap: 15%;
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

const RoomDetails = () => {

    const [isEditing, setIsEditing] = useState(false);
    const room = useSelector(state => state.Rooms.single);
    const [name, setName] = useState(room.name);
    const [roomType, setRoomType] = useState(room['room type']);
    const [image, setImage] = useState(room.image);
    const [amenities, setAmenities] = useState(room.amenities);
    const [price, setPrice] = useState(room.price);
    const [offer, setOffer] = useState(room.offer);
    const [status, setStatus] = useState(room.status);
    const dispatch = useDispatch();

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
        
        const modifiedAmenities = Array.from(document.getElementById('amenities').querySelectorAll('input[name="amenities"]:checked')).map(input => input.value).join(', ');
        
        dispatch(EditRoomThunk({
            name: room.name,
            id: room.id,
            image: 'assets/HotelRoom3.jpeg',
            'room type': room['room type'],
            amenities: modifiedAmenities.length ? modifiedAmenities : amenities,
            price: price,
            offer: offer,
            status: status,
        }))
        setIsEditing(false);
        notify();
    }

    return (
        <StyledRoomDetails>
                <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
            <Left $isEditing={isEditing}>
                <StyledNameContainer>
                <h2>Room {name}</h2>
                {isEditing ? 
                    <button onClick={handleSaveClick} className="save">Save changes</button>
                :
                    <PiDotsThreeOutlineVerticalFill className="edit" onClick={handleEditClick}/>
                }
                </StyledNameContainer>
                <TopContainer $isEditing={isEditing}>
                    <div>
                        <p className="label">Name</p>
                        {isEditing ? 
                            <input 
                                id="name"
                                type="text"
                                onChange={(event) => setName(event.target.value)}
                            />
                        :
                            <p>{room.name}</p>
                        }
                    </div>
                    <div>
                        <p className="label">Room Type</p>
                        {isEditing ?
                            <select id="room-type" onChange={(event) => setRoomType(event.target.value)} required>
                                <option value="Single">Single Room</option>
                                <option value="Double">Double Room</option>
                                <option value="Double Superior">Double Superior</option>
                                <option value="Suite">Suite</option>
                            </select>
                        :
                        <p>{roomType}</p>
                        }
                    </div>
                    <div>
                        <p className="label">Room ID</p>
                        <p>{room.id}</p>
                    </div>
                </TopContainer>
                <AmenitiesContainer>
                        <p className="label">Amenities</p>
                        {isEditing ? (
                            <div className="checkboxes-form" id="amenities">
                                <label><input type="checkbox" name="amenities" value="Wi-Fi"/> Wi-Fi</label>
                                <label><input type="checkbox" name="amenities" value="Breakfast"/> Breakfast</label>
                                <label><input type="checkbox" name="amenities" value="Parking"/> Parking</label>
                                <label><input type="checkbox" name="amenities" value="Gym"/> Gym</label>
                                <label><input type="checkbox" name="amenities" value="Pool"/> Swimming Pool</label>
                            </div>
                        ) : 
                        <p>{amenities}</p>
                        } 
                </AmenitiesContainer>
                <BottomContainer>
                    <div>
                        <p className="label">Price</p>
                        {isEditing ? (
                            <input
                                id="price"
                                type="number"
                                required
                                placeholder="$/night"
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        ) :
                            <p>{room.price}</p>
                    }
                    </div>
                    <div>
                        <p className="label">Offer</p>
                        {isEditing ? (
                            <input
                                id="offer"
                                type="number"
                                required
                                placeholder="%"
                                onChange={(event) => setOffer(event.target.value)}
                            />
                        ) : 
                            <p>{room.offer}</p>
                        }
                    </div>
                    <div>
                        <p className="label">Status</p>
                        {isEditing ? (
                            <select onChange={(event) => setStatus(event.target.value)}>
                                <option value="available">Available</option>
                                <option value="booked">Booked</option>
                            </select>
                        ) :
                        <p>{status}</p>
                        }
                    </div>
                </BottomContainer>
            </Left>
            <Right>
            <div style={{backgroundImage: `url(../assets/HotelRoom3.jpeg)`}}></div>
            </Right>
        </StyledRoomDetails>
    )
}

export default RoomDetails;