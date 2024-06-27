import Header from "../../Components/Header";
import SideBarComponent from "../../Components/SideBarComponent";
import styled from "styled-components";
import BookingDetails from "../../Components/BookingDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBookingThunk } from "../../Features/Bookings";
import { IoIosArrowRoundBack } from "react-icons/io";


const StyledBookingDetailsPage = styled.div`
    background-color: var(--light-gray);
    .back-link-container {
        display: flex;
        align-items: center;
        margin: 30px 50px 15px;
        font-size: 20px;
        color: black;
        a {
            text-decoration: none;
            color: inherit; 
        }
    }
`;

const BookingDetailsPage = () => {

    const Booking = useSelector(state => state.Bookings.single);
    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const [fetched, setFetched] = useState(false);

    const initialFetch = async () => {
        await dispatch(GetBookingThunk(bookingId)).unwrap();
        setFetched(true)
    }

    useEffect(() => {
        initialFetch();
    }, [])
    
    return (
        <>
            <StyledBookingDetailsPage>
                <div className="page-container">
                    <SideBarComponent/>
                    <div className="main-content">
                        <Header />
                        <div className="back-link-container">
                            <IoIosArrowRoundBack style={{ fontSize: '30px', marginRight: '2.5px' }}/>
                            <Link to="/bookings"><a>All Bookings</a></Link>
                        </div>
                        {fetched ? 
                        <BookingDetails booking={Booking}/>
                        :
                        <h1>Loading</h1>
                        }
                    </div>
                </div>
            </StyledBookingDetailsPage>
        </>
    )
}

export default BookingDetailsPage;