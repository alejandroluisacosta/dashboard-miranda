import { Link } from "react-router-dom";
import styled from "styled-components";
import Table from "../Components/Table";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { GetRoomsThunk } from "../Features/Rooms";
import SideBar from "../Components/SideBar";
import { Columns, Room } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const StyledNameColumn = styled.div`
    border-bottom: 0 !important;
    a {
      display: flex;
      text-decoration: none;
      color: inherit; 
    }
    img {
        width: 150px;
        height: 77px;
        margin-right: 30px;
    }
    div {
      border-bottom: 0;
    }
`;

const columns: Columns[] = [
    {
      label: 'Room Name',
      display: (row: Room) => (
        <StyledNameColumn>
          <Link to={row.id}>
            <img src={row.image} alt="Room image"/>
            <div>
              <p>#{row.id}</p>
              <p>{row.name}</p>
            </div>
          </Link>
        </StyledNameColumn>
      )
    },
    {
      label: 'Room Type',
      property: 'room type',
    },
    {
      label: 'Amenities',
      property: 'amenities'

    },
    {
      label: 'Price',
      property: 'price',
    },
    {
      label: 'Offer',
      property: 'offer',
    },
    {
      label: 'Status',
      display: (status: string) => (
        status === 'Available' ? <button>Available</button> : <button>Booked</button>
      )
    },
  ];
  
const StyledRooms = styled.div`
  background-color: var(--light-gray);
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
        cursor: pointer
      }
    }
`;

const RoomsPage = () => {

    const [renderedRooms, setRenderedRooms] = useState<Room[]>([]);
    const dispatch = useAppDispatch();
    const rooms = useAppSelector(state => state.Rooms.items);

    useEffect(() => {
        dispatch(GetRoomsThunk());
        setRenderedRooms(rooms);
    }, [rooms])

    return (
        <>
          <StyledRooms>
              <div className="page-container">
                  <SideBar/>
                  <div className="main-content">
                    <Header/>
                    <div className="add-button-container">
                      <Link to="add"><button className="add-button">+ Add Room</button></Link>
                    </div>
                    <Table data={renderedRooms} columns={columns}/>
                  </div>
              </div>
          </StyledRooms>
      </>
    )
}

export default RoomsPage;