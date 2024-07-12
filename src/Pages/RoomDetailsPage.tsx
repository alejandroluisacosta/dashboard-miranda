import styled from "styled-components";
import { IoIosArrowRoundBack } from "react-icons/io";
import Header from "../Components/Header";
import { Link, useParams } from "react-router-dom";
import { GetRoomThunk } from "../Features/Rooms";
import { useEffect, useState } from "react";
import RoomDetails from "../Components/RoomDetails";
import SideBar from "../Components/SideBar";
import { useAppDispatch } from "../app/hooks";

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

    const [fetched, setFetched] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { roomId } = useParams<{ roomId: string }>();


    if (!roomId) {
        throw new Error('No room selected - Room\'s ID misising')
    }

    const initialFetch = async (): Promise<void> => {
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
                    <SideBar/>
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