import styled from "styled-components";
import SideBarComponent from "../Components/SideBarComponent";
import { IoIosArrowRoundBack } from "react-icons/io";
import Header from "../Components/Header";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { GetRoomThunk } from "../Features/Rooms";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomDetails from "../Components/RoomDetails";

const StyledRoomDetailsPage = styled.div`
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

const RoomDetailsPage = () => {

    const [fetched, setFetched] = useState(false);
    const roomFromSlice = useSelector(state => state.Rooms.single);
    const dispatch = useDispatch();
    const { roomId } = useParams();

    const initialFetch = async () => {
        await dispatch(GetRoomThunk(roomId)).unwrap();
        setFetched(true)
    }

    useEffect(() => {
        initialFetch();
    }, [])

    return (
        <>
            <StyledRoomDetailsPage>
                <div className="page-container">
                    <SideBarComponent/>
                    <div className="main-content">
                        <Header />
                        <div className="back-link-container">
                            <IoIosArrowRoundBack style={{ fontSize: '30px', marginRight: '2.5px' }}/>
                            <Link to="/rooms">All Rooms</Link>
                        </div>
                        {fetched ? 
                        <RoomDetails/>
                        :
                        <h1>Loading</h1>
                        }
                    </div>
                </div>
            </StyledRoomDetailsPage>
        </>
    )
}

export default RoomDetailsPage;