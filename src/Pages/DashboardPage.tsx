import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LuBedDouble, LuCalendarCheck2 } from "react-icons/lu";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Header from "../Components/Header";
import BookingSummary from "../Components/BookingSummary";
import { useEffect, useState } from "react";
import Comment from "../Components/Comment";
import SideBar from "../Components/SideBar";
import { GetBookingsThunk } from "../Features/Bookings";
import { Booking } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";



const mockData = [
    {"month":1,"bookings":8023,"occupation":802,"check-ins":152,"check-outs":257},
{"month":2,"bookings":6304,"occupation":736,"check-ins":216,"check-outs":657},
{"month":3,"bookings":2074,"occupation":231,"check-ins":175,"check-outs":987},
{"month":4,"bookings":7985,"occupation":576,"check-ins":400,"check-outs":107}
]

const mockBookings = [
    {
      "images": {
        "image1": "/path/to/image1.jpg",
        "image2": "/path/to/image2.jpg",
        "image3": "/path/to/image3.jpg"
      },
      "roomType": "Queen Bed",
      "roomNumber": "A-1234",
      "clientName": "John Doe",
      "checkInDate": "2025-01-05",
      "checkOutDate": "2025-01-10",
      "orderDate": "2024-06-19T10:00:00Z"
    },
    {
      "images": {
        "image1": "/path/to/image4.jpg",
        "image2": "/path/to/image5.jpg",
        "image3": "/path/to/image6.jpg"
      },
      "roomType": "Deluxe Room",
      "roomNumber": "B-2345",
      "clientName": "Jane Smith",
      "checkInDate": "2025-01-12",
      "checkOutDate": "2025-01-15",
      "orderDate": "2024-06-19T12:00:00Z"
    },
    {
      "images": {
        "image1": "/path/to/image7.jpg",
        "image2": "/path/to/image8.jpg",
        "image3": "/path/to/image9.jpg"
      },
      "roomType": "King Big",
      "roomNumber": "C-3456",
      "clientName": "Alice Johnson",
      "checkInDate": "2025-01-20",
      "checkOutDate": "2025-01-25",
      "orderDate": "2024-06-19T14:00:00Z"
    },
    {
      "images": {
        "image1": "/path/to/image10.jpg",
        "image2": "/path/to/image11.jpg",
        "image3": "/path/to/image12.jpg"
      },
      "roomType": "Queen Bed",
      "roomNumber": "A-4567",
      "clientName": "Bob Brown",
      "checkInDate": "2025-01-07",
      "checkOutDate": "2025-01-09",
      "orderDate": "2024-06-19T11:00:00Z"
    },
    {
      "images": {
        "image1": "/path/to/image13.jpg",
        "image2": "/path/to/image14.jpg",
        "image3": "/path/to/image15.jpg"
      },
      "roomType": "Deluxe Room",
      "roomNumber": "B-5678",
      "clientName": "Carol White",
      "checkInDate": "2025-01-15",
      "checkOutDate": "2025-01-18",
      "orderDate": "2024-06-19T12:00:00Z"
    }
  ]

const mockComments = [
    {
      "text": "Great article! Really enjoyed reading it.",
      "userName": "John Doe",
      "timestamp": "2023-06-15T08:30:00Z"
    },
    {
      "text": "Interesting insights. Looking forward to more!",
      "userName": "Alice Johnson",
      "timestamp": "2024-06-19T15:25:00Z"
    },
    {
      "text": "Well written. Thanks for sharing.",
      "userName": "Jane Smith",
      "timestamp": "2023-06-13T12:00:00Z"
    }
  ]
  
  

const Dashboard = styled.div`
    background-color: #F8F8F8;
    .page-container {
        display: flex;
        overflow: hidden;
    }

    .calendar-graph-container {
        display: flex;
        justify-content: space-between;
        margin: 0 50px;
        .calendar, .graph {
            width: 500px;
            height: 400px;
            background-color: white;
        }
    }
`;

const KpiContainer = styled.section`
    display: flex;
    justify-content: space-between;
    margin: 50px; 

        .icon {
            width: 28px;
            height: 28px;
        }
    }
`;

const Kpi = styled.div`
    display: flex;
    align-items: center;
    padding: 30px;
    border-radius: 12px;
    background-color: white;
    width: 22.5%;
`;

interface IconContainerProps {
    selected: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
    width: 65px;
    height: 65px;
    background-color: ${props => props.selected ? 'var(--red)' : 'var(--pink)'};
    color: ${props => props.selected ? 'white' : 'var(--red)'};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 22px;
`;

const BookingSummaryList = styled.div`
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 50px 40px;
    border-radius: 20px;
`;

const CommentList = styled.div`
    margin: 0 50px 50px;
    background-color: white;
    border-radius: 20px;
    padding: 30px 30px 70px;
    h3 {
        font-size: 20px;
        margin-bottom: 30px;
        font-weight: 400;
    }
    div {
        display: flex;
        justify-content: space-between;
    }
    `;

const DashboardPage = () => {

    const [sortedBookings, setSortedBookings] = useState<Booking[]>([]);
    const [fetched, setFetched] = useState<Boolean>(false);

    const bookings = useAppSelector(state => state.Bookings.items);
    const dispatch = useAppDispatch();

    const sortBookings = (bookings: Booking[]): Booking[] => {
        return bookings.sort((a, b) => (new Date(a.checkInDate).getTime() as number) - (new Date(b.checkInDate).getTime() as number));
    }

    const getTimeDifference = (timestamp: number): string => {
        const now = new Date().getTime() as number;
        const then = new Date(timestamp).getTime() as number;
        const differenceInMs = now - then;
        const differenceInMinutes = Math.floor(differenceInMs / 60000);
        return `${differenceInMinutes}`;
      };
      

    // INITIAL FETCH NOT WORKING
    useEffect(() => {
        const initialFetch = async () => {
            await dispatch(GetBookingsThunk()).unwrap();
            setFetched(true)
        }
        initialFetch();
        setSortedBookings(sortBookings(bookings));
    }, [])

    return (
            <>
                <Dashboard>
                    <div className="page-container">
                        <SideBar/>
                        <div className="main-content">
                            <Header/>
                            <KpiContainer>
                                <Kpi>
                                    <IconContainer selected={false}>
                                        <LuBedDouble className="icon"/>
                                    </IconContainer>
                                    <div className="data">
                                        <p className="value">{mockData[0].bookings}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </Kpi>
                                <Kpi>
                                    <IconContainer selected={true}>
                                        <LuCalendarCheck2 className="icon"/>
                                    </IconContainer>
                                    <div className="data">
                                        <p className="value">{mockData[0].occupation}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </Kpi>
                                <Kpi>
                                    <IconContainer selected={false}>
                                        <BiLogIn className="icon"/>
                                    </IconContainer>
                                    <div className="data">
                                        <p className="value">{mockData[0]["check-ins"]}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </Kpi>
                                <Kpi>
                                    <IconContainer selected={false}>
                                        <BiLogOut className="icon"/>
                                    </IconContainer>
                                    <div className="data">
                                        <p className="value">{mockData[0]["check-outs"]}</p>
                                        <p className="description">New booking</p>
                                    </div>
                                </Kpi>
                            </KpiContainer>
                            <div className="calendar-graph-container">
                                <div className="calendar"></div>
                                <div className="graph"></div>
                            </div>
                            <BookingSummaryList>
                                {sortedBookings.slice(0, 4).map((booking, index) => (
                                    <BookingSummary booking={booking} timeAgo={getTimeDifference(new Date(booking.orderDate).getTime())} key={index}/>
                                ))}
                            </BookingSummaryList>
                            <CommentList>
                                <h3>Latest Reviews by Customers</h3>
                                <div>
                                    {mockComments.map((comment, index) => (
                                        <Comment comment={comment} timeAgo={getTimeDifference(new Date(comment.timestamp).getTime())} key={index}/>
                                    ))}
                                </div>    
                            </CommentList>
                        </div>
                    </div>
                </Dashboard>
        </>
    )
}

export default DashboardPage;