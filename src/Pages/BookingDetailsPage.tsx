import Header from "../Components/Header";
import styled from "styled-components";
import BookingDetails from "../Components/BookingDetails";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetBookingThunk } from "../Features/Bookings";
import { IoIosArrowRoundBack } from "react-icons/io";
import SideBar from "../Components/SideBar";
import { useAppDispatch } from "../app/hooks";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


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
    .progress {
        position: absolute;
        top: 50%;
        left: 50%;
    }
`;

const BookingDetailsPage = () => {

    const { bookingId = '' } = useParams<{bookingId: string}>();
    const dispatch = useAppDispatch();
    const [fetched, setFetched] = useState<Boolean>(false);

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

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
                    <SideBar visible={isSidebarVisible}/>
                    <div className="main-content">
                        <Header toggleSidebar={toggleSidebar}/>
                        <div className="back-link-container">
                            <IoIosArrowRoundBack style={{ fontSize: '30px', marginRight: '2.5px' }}/>
                            <Link to="/bookings">All Bookings</Link>
                        </div>
                        {fetched ? 
                        <BookingDetails />
                        :
                        <Box className="progress" sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        }
                    </div>
                </div>
            </StyledBookingDetailsPage>
        </>
    )
}

export default BookingDetailsPage;