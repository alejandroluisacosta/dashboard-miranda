import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent";
import styled from "styled-components";
import TableComponent from "../../Components/TableComponent";
import Header from "../../Components/Header";
import FilterTabs from "../../Components/FilterTabs";
import { useEffect, useState } from "react";
import FilterInput from "../../Components/FilterInput";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingsThunk, RemoveBookingThunk } from "../../Features/Bookings";

const StyledBookings = styled.div`
    background-color: var(--light-gray);
    .filter-container {
      display: flex;
      align-items: center;
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

const BookingsPage = () => {
  
    const columns = [
      {
        label: 'Guest',
        display: row => (
          <>
            <p>{row.name}</p>
            <p>{row.id}</p>
          </>
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
        display: specialRequest => (
          specialRequest ? <button>View Notes</button> : <button disabled>View Notes</button>
        )
      },
      {
        label: 'Room Type',
        property: 'roomType'
      },
      {
        label: 'Status',
        display: row => (
          <StyledStatus>
            <p>{row.status}</p>
            <span className="material-symbols-outlined" onClick={() => dispatch(RemoveBookingThunk(row.id))}>delete</span>
          </StyledStatus>
        )
      },
    ];  

    const [renderedBookings, setRenderedBookigs] = useState([]);
    const dispatch = useDispatch();
    const BookingsStatus = useSelector(state => state.Bookings.status);
    const Bookings = useSelector(state => state.Bookings.items);

    const sortBookingsHandler = (event, value) => {
      const allBookings = [...Bookings];
      if (value === 'inProgress') { 
        const today = new Date();
        const filteredBookings = renderedBookings.filter(booking => new Date(booking.checkInDate) < today && new Date(booking.checkOutDate) > today);
        setRenderedBookigs(filteredBookings);
      } else {
        const sortedBookings = allBookings.sort((a, b) => new Date(a[value]) - new Date(b[value]));
        setRenderedBookigs(sortedBookings);
      }
      event.target.selected = true; // NOT WORKING
    }

    const filterByNameHandler = (event) => {
      const allBookings = [...renderedBookings]; 
      if (!event.target.value)
        setRenderedBookigs(Bookings);
      else { 
        const bookingsFilteredByName = allBookings.filter(booking => booking.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setRenderedBookigs(bookingsFilteredByName);
      }
    };

    const addBookingHandler = () => {
      dispatch(AddBooking({
        name: 'Jude Bellingham',
        id: '#7171',
        orderDate: '2024-06-06',
        checkInDate: '2024-06-19',
        checkOutDate: '2024-06-24',
        specialRequest: false,
        roomType: 'Double Room',
        status: 'booked'
      }))
    }

    useEffect(() => {
      if (BookingsStatus === 'idle')
        dispatch(GetBookingsThunk());
      else if (BookingsStatus === 'pending')
        console.log('pending...');
      else if (BookingsStatus === 'fulfilled') {
        setRenderedBookigs(Bookings);
      }
    }, [Bookings, BookingsStatus, dispatch])

    return (
        <>
          <StyledBookings>
              <div className="page-container">
                  <SideBarComponent/>
                  <div className="main-content">
                    <Header/>
                    <div className="filter-container">
                      <FilterTabs 
                        sortHandler={sortBookingsHandler}
                        fields={{
                          'All bookings': 'orderDate',
                          'Check in': 'checkInDate',
                          'Check Out': 'checkOutDate',
                          'In Progress': 'inProgress',
                        }}
                      />
                      <FilterInput filterByName={filterByNameHandler}/>
                    </div>
                    <h1 onClick={addBookingHandler} style={{ marginLeft: '50px' }}>Add booking</h1>
                    <TableComponent data={renderedBookings} columns={columns}/>
                  </div>
              </div>
          </StyledBookings>
        </>
    )
}

export default BookingsPage;