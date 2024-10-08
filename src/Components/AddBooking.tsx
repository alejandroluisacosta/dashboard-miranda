import styled from "styled-components";
import { AddBookingThunk } from "../Features/Bookings";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { useAppDispatch } from "../app/hooks";

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
            margin-bottom: 12px;
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
        border-radius: 12px;
    }
`;

const AddBooking: React.FC = () => {

    const dispatch = useAppDispatch();
    const notify = () => toast.success('Booking created successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const navigate = useNavigate();

    const addBookingHandler = (event: React.FormEvent<HTMLFormElement>): void => {

        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const name: string = (form.querySelector('#name') as HTMLInputElement).value;
        const orderDate: string = new Date().toISOString().split('T')[0];
        const checkInDate: string = (form.querySelector('#checkIn') as HTMLInputElement).value;
        const checkOutDate: string = (form.querySelector('#checkOut') as HTMLInputElement).value;
        const specialRequest: string = (form.querySelector('#special-request') as HTMLInputElement).value;
        const roomType: string = (form.querySelector('#room-type') as HTMLInputElement).value;
        const status: 'Check-In' | 'Check-Out' = (form.querySelector('#status') as HTMLInputElement).value as 'Check-In' | 'Check-Out';

        dispatch(AddBookingThunk({
            name: name,
            orderDate: orderDate,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            specialRequest: specialRequest,
            roomType: roomType,
            status: status,
        })) 

        notify();
        setTimeout(() => navigate('/bookings'), 1000);
    }

    return (
        <>
            <StyledAddBooking>
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
                <Left>
                    <h1>Add Booking</h1>
                    <form onSubmit={addBookingHandler}>
                        <StyledRow>
                            <div className="name-row">
                                <label htmlFor="name">Name *</label>
                                <input id="name" type="text" required/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                            <div>
                                <label htmlFor="checkIn">Check In Date *</label>
                                <input id="checkIn" type="date" required/>
                            </div>
                            <div>
                                <label htmlFor="checkOut">Check Out Date *</label>
                                <input id="checkOut" type="date" required/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                            <div>
                                <label htmlFor="room-type">Room Type *</label>
                                <select id="room-type" required>
                                    <option value="Single">Single Room</option>
                                    <option value="Double">Double Room</option>
                                    <option value="Double Superior">Double Superior</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status">Status *</label>
                                <select id="status" required>
                                    <option value="booked">Booked</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </StyledRow>
                        <div>
                            <label htmlFor="special-request">Special Request (optional)</label>
                            <textarea id="special-request" />
                        </div>
                        <div className="button-container">
                            <button type="submit">Create Booking</button>
                            <Link to='/bookings'><p>All Bookings</p></Link>
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