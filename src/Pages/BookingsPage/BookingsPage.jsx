import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent";
import styled from "styled-components";
import TableComponent from "../../Components/TableComponent";
import Header from "../../Components/Header";
import FilterTabs from "../../Components/FilterTabs";
import { useEffect, useState } from "react";
import FilterInput from "../../Components/FilterInput";
import { useDispatch, useSelector } from "react-redux";
import { GetBookings } from "../../Features/Bookings";

const Bookings = styled.div`
    background-color: var(--light-gray);
    .filter-container {
      display: flex;
      align-items: center;
    }
`;
  
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
    property: 'order date'
  },
  {
    label: 'Check In',
    property: 'check in'
  },
  {
    label: 'Check Out',
    property: 'check out'
  },
  {
    label: 'Special Request',
    display: specialRequest => (
      specialRequest ? <button>View Notes</button> : <button disabled>View Notes</button>
    )
  },
  {
    label: 'Room Type',
    property: 'room type'
  },
  {
    label: 'Status',
    property: 'status'
  }
];


const BookingsPage = () => {

    const [renderedBookings, setRenderedBookigs] = useState([{a: "a"}]);
    let isLoggedIn = localStorage.getItem('token');
    const dispatch = useDispatch();
    const BookingsStatus = useSelector(state => state.Bookings.status);
    const BookingsFromSlice = useSelector(state => state.Bookings.items);

    const sortBookingsHandler = (event, value) => {
      const allBookings = [...renderedBookings];
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
      const bookingsFilteredByName = allBookings.filter(booking => booking.identification.name.includes(event.target.value));
      setRenderedBookigs(bookingsFilteredByName);
  };

  useEffect(() => {
    if (BookingsStatus === 'idle')
      dispatch(GetBookings());
    else if (BookingsStatus === 'pending')
      console.log('pending...');
    else if (BookingsStatus === 'fulfilled') {
      setRenderedBookigs(BookingsFromSlice);
    }
  }, [BookingsFromSlice, BookingsStatus, dispatch])

    return (
        <>
            {
            isLoggedIn && isLoggedIn !== 'false' ? 
            <>
                <Bookings>
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
                          <TableComponent data={renderedBookings} columns={columns}/>
                        </div>
                    </div>
                </Bookings>
            </>
            :
            <Navigate to="/login"/>
            }
        </>
    )
}

export default BookingsPage;