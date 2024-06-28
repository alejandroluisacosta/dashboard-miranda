import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddRoomThunk } from "../Features/Rooms";

const StyledAddRoom = styled.div`
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
        min-height: 30px;
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
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
    .row-of-three {
        div {
            width: 30%;
        }
    }
    .amenities-label {
        margin-bottom: 16px;
    }
    .checkboxes-form {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 28px;
        input[type="checkbox"] {
            width: 20px;
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

const AddRoom = () => {

    const dispatch = useDispatch();
    const notify = () => toast.success('Room created successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const addRoomHandler = (event) => {
        event.preventDefault();
        const form = event.target;
    
        const roomType = form['room-type'].value;
        const roomNumber = form['room-number'].value;
        const offer = form['offer'].value;
        const price = form['price'].value;
        const discount = form['discount'].value;
        const description = form['description'].value;
        const amenities = Array.from(form.querySelectorAll('input[name="amenities"]:checked')).map(input => input.value).join(', ');
        const cancellationPolicies = form['cancellation'].value;

        dispatch(AddRoomThunk({
            name: `${roomType} ${roomNumber}`,
            id: `${Math.floor(Math.random() * 1000)}`,
            image: '/assets/HotelInside.jpeg',
            'room type': roomType,
            amenities: amenities,
            price: price,
            offer: offer === 'Yes' ? discount : false,
            status: 'Available',
            description: description,
            cancellationPolicies: cancellationPolicies,
        }));
    
        notify();
    }
    

    return (
        <>
            <StyledAddRoom>
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
                    <h1>Add Room</h1>
                    <form onSubmit={addRoomHandler}>
                        <StyledRow>
                            <div>
                                <label htmlFor="room-type">* Room Type</label>
                                <select id="room-type" required>
                                    <option value="Single">Single Room</option>
                                    <option value="Double">Double Room</option>
                                    <option value="Double Superior">Double Superior</option>
                                    <option value="Suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="room-number">* Room Number</label>
                                <input id="room-number" type="text" required/>
                            </div>
                        </StyledRow>
                        <StyledRow className="row-of-three">
                            <div>
                                <label htmlFor="offer">* Offer</label>
                                <select id="offer" required>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="price">* Price</label>
                                <input id="price" type="number" required placeholder="$/night"/>
                            </div>
                            <div>
                                <label htmlFor="discount">* Discount</label>
                                <input id="discount" type="number" required placeholder="%"/>
                            </div>
                        </StyledRow>
                        <StyledRow>
                        </StyledRow>
                        <div>
                            <label htmlFor="description" required>* Description</label>
                            <textarea id="description" />
                        </div>
                        <div>
                            <label htmlFor="amenities" className="amenities-label"required>* Amenities</label>
                            <div className="checkboxes-form">
                                <label><input type="checkbox" name="amenities" value="Wi-Fi"/> Wi-Fi</label>
                                <label><input type="checkbox" name="amenities" value="Breakfast"/> Breakfast</label>
                                <label><input type="checkbox" name="amenities" value="Parking"/> Parking</label>
                                <label><input type="checkbox" name="amenities" value="Gym"/> Gym</label>
                                <label><input type="checkbox" name="amenities" value="Pool"/> Swimming Pool</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cancellation" required>* Cancellation Policies</label>
                            <textarea id="cancellation" />
                        </div>
                        <div className="button-container">
                            <button type="submit">Create Room</button>
                            <Link to='/rooms'><p>All Rooms</p></Link>
                        </div>
                    </form>
                </Left>
                <Right>
                    <div style={{backgroundImage: `url(../assets/HotelInside.jpeg)`}}></div>
                </Right>
            </StyledAddRoom>
        </>
    )
}

export default AddRoom;