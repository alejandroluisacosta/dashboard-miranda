import { Link } from "react-router-dom";
import styled from "styled-components";
import Table from "../Components/Table";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { GetRoomsThunk, RemoveRoomThunk } from "../Features/Rooms";
import SideBar from "../Components/SideBar";
import { Column, Room, StyledPageContainer } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";

const StyledRooms = styled.div`
    background-color: var(--light-gray);
    text-align: center;
    .add-button-container {
    display: flex;
    justify-content: flex-start;
    margin: 30px 50px;
    .add-button {
        padding: 15px 50px;
        background-color: var(--dark-green);
        border-radius: 12px;
        color: white;
        font-size: 20px;
      }
    }
    .delete {
        transform: translate(0, 15%);
        cursor: pointer;
    }
`;

const StyledNameColumn = styled.div`
    border-bottom: 0 !important;
    text-align: left;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit; 
    }
    .single-image-container {
        width: 150px;
        margin-right: 30px;
        min-height: 100%;
        padding-bottom: 25%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    div {
      border-bottom: 0;
    }
`;

interface StatusProps {
  $status: 'Available' | 'Booked';
}

const StyledStatus = styled.div<StatusProps>`
    border-bottom: 0 !important;
    p {
      background-color: ${props => props.$status === 'Available' ? '#DAFFCB' : '#FDA19B'};
      padding: 10px;
      font-size: 12px;
      border-radius: 8px;
      min-width: 90px;
    }
`;

const RoomsPage = () => {

  const columns: Column<Room>[] = [
    {
      label: 'Room Name',
      display: (row: Room) => (
        <StyledNameColumn>
          <Link to={row.id.toString()}>
            <div className="single-image-container" style={{ backgroundImage: `url(${row.image})` }}/>
            <div>
              <p>{`#${row.id}`}</p>
              <p>{row.name}</p>
            </div>
          </Link>
        </StyledNameColumn>
      )
    },
    {
      label: 'Room Type',
      property: 'roomType',
    },
    {
      label: 'Amenities',
      property: 'amenities'

    },
    {
      label: 'Rate',
      display: (row: Room) => (
        <p>{`$${row.rate}`}</p>
      )
    },
    {
      label: 'Offer',
      property: 'offer',
    },
    {
      label: 'Status',
      display: (row: Room) => (
        <StyledStatus $status={row.status}>
          <p>{row.status}</p>
        </StyledStatus>
      )
    },
    {
      label: ' ',
      display: (row: Room) => (
        <span className="delete material-symbols-outlined" onClick={() => dispatch(RemoveRoomThunk(row.id))}>delete</span>
      )
    }
  ];

    const [ renderedRooms, setRenderedRooms ] = useState<Room[]>([]);
    const [ fetched, setFetched ] = useState(false);
    const dispatch = useAppDispatch();
    const rooms: Room[] = useAppSelector(state => state.Rooms.items);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const initialFetch = async () => {
        try {
          await dispatch(GetRoomsThunk()).unwrap();
          setFetched(true);
        } catch (error) {
          toast.error('Failed to fetch rooms');
        }
    }

    useEffect((): void => {
        if (!fetched)
          initialFetch();
        else 
          setRenderedRooms([...rooms].reverse());
    }, [fetched, rooms, dispatch])

    return (
        <>
          <StyledRooms>
              <StyledPageContainer visible={isSidebarVisible}>
                  <SideBar visible={isSidebarVisible}/>
                  <div className="main-content">
                    <Header toggleSidebar={toggleSidebar}/>
                    <div className="add-button-container">
                      <Link to="add"><button className="add-button">+ Add Room</button></Link>
                    </div>
                    <Table data={renderedRooms.slice(0, 10)} columns={columns}/>
                  </div>
              </StyledPageContainer>
          </StyledRooms>
      </>
    )
}

export default RoomsPage;