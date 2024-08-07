import Header from "../Components/Header";
import styled from "styled-components";
import BookingDetails from "../Components/BookingDetails";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBookingThunk } from "../Features/Bookings";
import { IoIosArrowRoundBack } from "react-icons/io";
import SideBar from "../Components/SideBar";
import { useAppDispatch } from "../app/hooks";


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

    interface RouteParams {
        bookingId: string;
    }

    const { bookingId = '' } = useParams<{bookingId: string}>();
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState<Boolean>(false);

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
                    <SideBar/>
                    <div className="main-content">
                        <Header />
                        <div className="back-link-container">
                            <IoIosArrowRoundBack style={{ fontSize: '30px', marginRight: '2.5px' }}/>
                            <Link to="/bookings">All Bookings</Link>
                        </div>
                        {fetched ? 
                        <BookingDetails />
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