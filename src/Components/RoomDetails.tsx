import styled from "styled-components";
import { toast } from 'react-toastify';
import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { EditRoomThunk } from "../Features/Rooms";
import Button from './Button';
import { Room } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const StyledRoomDetails = styled.div`
    display: flex;
    margin: 0 50px 50px;
    background-color: white;
    border-radius: 12px;
    h2 {
        margin-bottom: 40px;
    }
`;

interface LeftProps {
    $isEditing: boolean;
}

const Left = styled.div<LeftProps>`
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

interface TopContainerProps extends LeftProps {}

const TopContainer = styled.div<TopContainerProps>`
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

    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const room: Room = useAppSelector(state => state.Rooms.single);
    const [ name, setName ] = useState<string>(room.name);
    const [ roomType, setRoomType ] = useState<string>(room.roomType);
    const [ image, setImage ] = useState<string>(room.image);
    const [ amenities, setAmenities ] = useState<string>(room.amenities);
    const [ rate, setRate ] = useState<number>(room.rate);
    const [ offer, setOffer ] = useState<string>(room.offer);
    const [ status, setStatus ] = useState<'Available' | 'Booked'>(room.status);
    const dispatch = useAppDispatch();

    const notify = () => toast.success('Room successfully modified', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleEditClick = (): void => {
        setIsEditing(true);
    }

    const handleSaveClick = async (): Promise<void> => {
        
        const modifiedAmenities: string = Array.from(document.getElementById('amenities')?.querySelectorAll('input[name="amenities"]:checked') as NodeListOf<HTMLInputElement>).map(input => input.value).join(', ');
        
        dispatch(EditRoomThunk({
            name: name,
            id: room.id,
            image: 'assets/HotelRoom3.jpeg',
            roomType: room.roomType,
            amenities: modifiedAmenities.length ? modifiedAmenities : amenities,
            rate: rate,
            offer: offer,
            status: status,
            discount: 0,
        }))
        setIsEditing(false);
        notify();
    }

    return (
        <StyledRoomDetails>
            <Left $isEditing={isEditing}>
                <StyledNameContainer>
                <h2>Room {name}</h2>
                <Button $isEditing={isEditing} content='test button'></Button>
                {isEditing ? 
                    <button onClick={handleSaveClick} className="save">Save Changes</button>
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
                                onChange={(event) => setRate(Number(event.target.value))}
                            />
                        ) :
                            <p>{room.rate}</p>
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
                            <select onChange={(event) => setStatus(event.target.value as 'Available' | 'Booked')}>
                                <option value="Available">Available</option>
                                <option value="Booked">Booked</option>
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