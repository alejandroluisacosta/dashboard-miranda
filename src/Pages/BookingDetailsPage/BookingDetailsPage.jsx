import Header from "../../Components/Header";
import SideBarComponent from "../../Components/SideBarComponent";
import styled from "styled-components";
import BookingDetails from "../../Components/BookingDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetBooking } from "../../Features/Bookings";

const StyledBookingDetailsPage = styled.div`
    background-color: var(--light-gray);
`;

const BookingDetailsPage = () => {

    const Booking = useSelector(state => state.Bookings.single);
    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const [fetched, setFetched] = useState(false);

    const initialFetch = async () => {
        await dispatch(GetBooking(bookingId)).unwrap();
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