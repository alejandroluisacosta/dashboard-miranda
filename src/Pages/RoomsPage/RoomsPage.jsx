import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideBarComponent from "../../Components/SideBarComponent";
import TableComponent from "../../Components/TableComponent";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddRoomThunk, GetRoomsThunk } from "../../Features/Rooms";

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


const columns = [
    {
      label: 'Room Name',
      display: row => (
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
      display: status => (
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

    const [renderedRooms, setRenderedRooms] = useState([]);
    const dispatch = useDispatch();
    const RoomsStatus = useSelector(state => state.Rooms.status);
    const Rooms = useSelector(state => state.Rooms.items);

    useEffect(() => {
      if (RoomsStatus === 'idle')
        dispatch(GetRoomsThunk());
      else if (RoomsStatus === 'pending')
        console.log('pending...');
      else if (RoomsStatus === 'fulfilled') {
        setRenderedRooms(Rooms);
      }
    }, [Rooms, RoomsStatus, dispatch])

    return (
        <>
          <StyledRooms>
              <div className="page-container">
                  <SideBarComponent/>
                  <div className="main-content">
                    <Header/>
                    <div className="add-button-container">
                      <Link to="add"><button className="add-button">+ Add Room</button></Link>
                    </div>
                    <TableComponent data={renderedRooms} columns={columns}/>
                  </div>
              </div>
          </StyledRooms>
      </>
    )
}

export default RoomsPage;