import styled from "styled-components";
import SideBarComponent from "../Components/SideBarComponent";
import { IoIosArrowRoundBack } from "react-icons/io";
import Header from "../Components/Header";
import { Link, useParams } from "react-router-dom";
import { GetRoomThunk } from "../Features/Rooms";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
                        <h1>Component here</h1>
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