import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import TableComponent from "../../Components/TableComponent/TableComponent";
import Header from "../../Components/Header";
import FilterTabs from "../../Components/FilterTabs";
import { useEffect, useState } from "react";
import FilterInput from "../../Components/FilterInput";

const Bookings = styled.div`
    background-color: var(--light-gray);
    .filter-container {
      display: flex;
      align-items: center;
    }
`;

const mockBookings = [
  {
    identification: {
      name: 'John Doe',
      id: '#1234'
    },
    orderDate: '2024-06-01',
    checkInDate: '2024-06-15',
    checkOutDate: '2024-06-17',
    specialRequest: true,
    roomType: 'Double Room',
    status: 'booked'
  },
  {
    identification: {
      name: 'Jane Smith',
      id: '#3456'
    },
    orderDate: '2024-06-02',
    checkInDate: '2024-06-18',
    checkOutDate: '2024-06-25',
    specialRequest: false,
    roomType: 'Single Room',
    status: 'pending'
  },
  {
    identification: {
      name: 'Michael Johnson',
      id: '#7890'
    },
    orderDate: '2024-06-05',
    checkInDate: '2024-06-20',
    checkOutDate: '2024-06-23',
    specialRequest: true,
    roomType: 'Suite',
    status: 'cancelled'
  },
  {
    identification: {
      name: 'Emily Davis',
      id: '#7891'
    },
    orderDate: '2024-06-08',
    checkInDate: '2024-06-25',
    checkOutDate: '2024-06-28',
    specialRequest: false,
    roomType: 'Double Room',
    status: 'booked'
  },
  {
    identification: {
      name: 'Daniel Wilson',
      id: '#7892'
    },
    orderDate: '2024-06-10',
    checkInDate: '2024-06-22',
    checkOutDate: '2024-06-27',
    specialRequest: true,
    roomType: 'Single Room',
    status: 'pending'
  }
];

  
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

    const [renderedBookings, setRenderedBookigs] = useState(mockBookings);

    let isLoggedIn = localStorage.getItem('token');

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem('token', 'false');
        navigate('login');
    }

    const sortBookingsHandler = (event, value) => {
      const allBookings = [...mockBookings];
      if (value === 'inProgress') {
        const today = new Date();
        const filteredBookings = renderedBookings.filter(booking => new Date(booking.checkInDate) < today && new Date(booking.checkOutDate) > today);
        setRenderedBookigs(filteredBookings);
      } else {
        const sortedBookings = allBookings.sort((a, b) => new Date(a[value]) - new Date(b[value]));
        setRenderedBookigs(sortedBookings);
      }
    }

    const filterByNameHandler = (event) => {
      const allBookings = [...mockBookings];
      const bookingsFilteredByName = allBookings.filter(booking => booking.identification.name.includes(event.target.value));
      setRenderedBookigs(bookingsFilteredByName);
  };

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
                            <FilterTabs sortBookings={sortBookingsHandler}/>
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