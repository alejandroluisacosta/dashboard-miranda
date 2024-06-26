import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AddBookingThunk } from "../Features/Bookings";
import { Link } from "react-router-dom";

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

    const addBookingHandler = (event) => {

        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const orderDate = new Date().toISOString().split('T')[0];
        const checkInDate = form.checkIn.value;
        const checkOutDate = form.checkOut.value;
        const specialRequest = form['special-request'].value;
        const roomType = form['room-type'].value;
        const status = form.status.value;

        dispatch(AddBookingThunk({
            name: name,
            id: `#${Math.floor(Math.random() * 1000)}`,
            orderDate: orderDate,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            specialRequest: specialRequest,
            roomType: roomType,
            status: status,
        }))

        alert('done Sr.')
    }

    return (
        <>
            <StyledAddBooking>
                <Left>
                    <h1>Add Booking</h1>
                    <form onSubmit={addBookingHandler}>
                        <StyledRow>
                            <div className="name-row">
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text"/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                            <div>
                                <label htmlFor="checkIn">Check In Date</label>
                                <input id="checkIn" type="date"/>
                            </div>
                            <div>
                                <label htmlFor="checkOut">Check Out Date</label>
                                <input id="checkOut" type="date"/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                            <div>
                                <label htmlFor="room-type">Room Type</label>
                                <select id="room-type">
                                    <option value="Single">Single Room</option>
                                    <option value="Double">Double Room</option>
                                    <option value="Double Superior">Double Superior</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status">Status</label>
                                <select id="status">
                                    <option value="booked">Booked</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </StyledRow>
                        <div>
                            <label htmlFor="special-request">Special Request</label>
                            <textarea id="special-request" />
                        </div>
                        <div className="button-container">
                            <button type="submit">Create Booking</button>
                            <Link to='/bookings'><p>Bookings</p></Link>
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