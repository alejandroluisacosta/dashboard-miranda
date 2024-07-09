import styled from "styled-components";
import { Booking } from '../types';

const MainContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin: 0 0 40px;
    max-width: 47%;
    padding: 30px;
    background-color: white;
    img {
        width: 192px;
        height: 92px;
        // height: 0px;
        // padding-bottom: 5%;
        background-image: url('/assets/HotelRoom3.jpeg');
        // background-size: cover;
        // background-position: center;
        // background-repeat: no-repeat;
        margin-right: 20px;
        border-radius: 8px;
    }
`; 

const InfoContainer = styled.div`
    margin-right: 50px;
    p {
        font-size: 20px;
        margin-bottom: 15px;
    }
    div {
        display: flex;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        p {
            margin: 0;
            font-size: 14px;
        }
        p:nth-child(2) {
            margin-right: 20px;
        }
        p:nth-child(3) {
            color: var(--gray);
        }
    }
`;

const NumberContainer = styled.div`
    position: absolute;
    right: 0;
    width: 35px;
    height: 35px;
    background-color: var(--dark-green);
    color: white;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface BookingSummaryProps {
    booking: Booking;
    timeAgo: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ booking, timeAgo }) => {

    return (
        <MainContainer>
                <img src="/assets/HotelRoom3.jpeg" alt="Room"/>
                <InfoContainer>
                    <p>{booking.roomType} {booking.room.id}</p>
                    <div>
                        <img src="/assets/user.jpeg" alt="Client"/>
                        <p>{booking.name}</p>
                        <p>{timeAgo > 30 ? '+30' : timeAgo} minutes ago</p>
                    </div>
                </InfoContainer>
                <NumberContainer>
                    <p>{booking.checkInDate.split('-')[2]}</p>
                </NumberContainer>
        </MainContainer>
    )
}

export default BookingSummary;