import styled from "styled-components";
import Header from "../Components/Header";
import FilterTabs from "../Components/FilterTabs";
import { useEffect, useState } from "react";
import FilterInput from "../Components/FilterInput";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingsThunk, RemoveBookingThunk } from "../Features/Bookings";
import { Link } from "react-router-dom";
import Table from "../Components/Table";
import SideBar from "../Components/SideBar";

const StyledBookings = styled.div`
    background-color: var(--light-gray);
    .filter-container {
      display: flex;
      align-items: center;
      margin: 50px 50px 30px;
    }
    .add-button {
        padding: 10px 18px;
        background-color: var(--dark-green);
        border-radius: 12px;
        color: white;
        font-size: 14px;
        margin-left: 50px;
    }
`;

const StyledStatus = styled.div`
    position: relative;
    border-bottom: 0 !important;
    span {
      position: absolute;
      right: 0;
      top: 50%;
    }
`;

const StyledGuestColumn = styled.div`
  border-bottom: 0 !important;
  div {
    border-bottom: 0 !important;
  }
  a {
      text-decoration: none;
      color: inherit; 
  }
`;

const BookingsPage = () => {

  interface Booking {
    name: string;
    id: string;
    orderDate: string;
    checkInDate: string;
    checkOutDate: string;
    specialRequest: string;
    roomType: string;
    status: string;
  }
  
    const columns = [
      {
      label: 'Guest',
      display: (row: Booking) => (
        <StyledGuestColumn>
            <Link to={row.id}>
              <p>{row.name}</p>
              <p>{`#${row.id}`}</p>
            </Link>
          </StyledGuestColumn>
        )
      },
      {
        label: 'Order Date',
        property: 'orderDate'
      },
      {
        label: 'Check In',
        property: 'checkInDate'
      },
      {
        label: 'Check Out',
        property: 'checkOutDate'
      },
      {
        label: 'Special Request',
        display: (specialRequest: string) => (
          specialRequest ? <button>View Notes</button> : <button disabled>View Notes</button>
        )
      },
      {
        label: 'Room Type',
        property: 'roomType'
      },
      {
        label: 'Status',
        display: (row: Booking) => (
          <StyledStatus>
            <p>{row.status}</p>
            <span className="material-symbols-outlined" onClick={() => dispatch(RemoveBookingThunk(row.id))}>delete</span>
          </StyledStatus>
        )
      },
    ];

    const [renderedBookings, setRenderedBookigs] = useState<Booking[]>([]);
    const dispatch = useDispatch();
    const bookings = useSelector(state => state.Bookings.items);

    const sortBookingsHandler = (event, value: string): void => {
      const allBookings = [...bookings];
      if (value === 'inProgress') { 
        const today = new Date();
        const filteredBookings: Booking[] = renderedBookings.filter(booking => new Date(booking.checkInDate) < today && new Date(booking.checkOutDate) > today);
        setRenderedBookigs(filteredBookings);
      } else {
        const sortedBookings: Booking[] = allBookings.sort((a, b) => (new Date(a[value]).getTime() as number) - (new Date(b[value]).getTime() as number));
        setRenderedBookigs(sortedBookings);
      }
      event.target.selected = true; // NOT WORKING
    }

    const filterByNameHandler = (event): void => {
      const allBookings = [...renderedBookings]; 
      if (!event.target.value)
        setRenderedBookigs(bookings);
      else { 
        const bookingsFilteredByName = allBookings.filter(booking => booking.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setRenderedBookigs(bookingsFilteredByName);
      }
    };

    useEffect((): void => {
      dispatch(GetBookingsThunk());
      setRenderedBookigs(bookings);
    }, [bookings])

    return (
        <>
          <StyledBookings>
              <div className="page-container">
                  <SideBar/>
                  <div className="main-content">
                    <Header/>
                    <div className="filter-container">
                      <FilterTabs 
                        sortHandler={sortBookingsHandler}
                        fields={{
                          'All Bookings': 'orderDate',
                          'Check In': 'checkInDate',
                          'Check Out': 'checkOutDate',
                          'In Progress': 'inProgress',
                        }}
                      />
                      <FilterInput filterByName={filterByNameHandler}/>
                      <Link to='add'><button className="add-button">Add booking</button></Link>
                    </div>
                    <Table data={renderedBookings} columns={columns}/>
                  </div>
              </div>
          </StyledBookings>
        </>
    )
}

export default BookingsPage;