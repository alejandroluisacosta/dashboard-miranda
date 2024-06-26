import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AddBookingThunk } from "../Features/Bookings";

const StyledAddBooking = styled.div`
    display: flex;
    margin: 50px 40px 0;
    padding: 5%;
    background-color: white;
    border-radius: 12px;
    input, select, textarea {
        width: 100%;
        padding: 0 7.5px;
        font-size: 16px;
    }
    input, select {
        height: 75%;
    }
    textarea {
        min-height: 100px;
        margin-bottom: 24px;
        padding-top: 7.5px;
        padding-bottom: 7.5px;
    }
    h1 {
        margin-bottom: 30px;
    }
    .button-container {
        text-align: center;
        button {
            padding: 18px 26px 18px 18px;
            background-color: var(--dark-green);
            border-radius: 12px;
            color: white;
            font-size: 18px;
        }
    }
`;

const Left = styled.div`
    width: 50%;
    label {
        display: block;
    }
    padding-right: 5%;
`;

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    div {
        width: 48%;
    }
    .name-row {
        width: 100%;
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
        background-color: black;
        border-radius: 12px;
    }
`;

const AddBooking = () => {

    const dispatch = useDispatch();

    const createBookingHandler = (event) => {
        dispatch(AddBookingThunk)
    }

    return (
        <>
            <StyledAddBooking>
                <Left>
                    <h1>Add Booking</h1>
                    <form>
                        <StyledRow>
                            <div className="name-row">
                                <label for="name">Name</label>
                                <input id="name" type="text"/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                            <div>
                                <label for="checkIn">Check In Date</label>
                                <input id="checkIn" type="date"/>
                            </div>
                            <div>
                                <label for="checkOut">Check Out Date</label>
                                <input id="checkOut" type="date"/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                            <div>
                                <label for="room-type">Room Type</label>
                                <select id="room-type">
                                    <option value="single">Single Room</option>
                                    <option value="double">Double Room</option>
                                    <option value="double-superior">Double Superior</option>
                                    <option value="suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label for="status">Status</label>
                                <select id="status">
                                    <option value="booked">Booked</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </StyledRow>
                        <div>
                            <label for="special-request">Special Request</label>
                            <textarea id="special-request" />
                        </div>
                        <div className="button-container">
                            <button type="submit">Create Booking</button>
                        </div>
                    </form>
                </Left>
                <Right>
                    <div style={{backgroundImage: `url(../assets/HotelInside.jpeg)`}}></div>
                </Right>
            </StyledAddBooking>
        </>
    )
}

export default AddBooking;