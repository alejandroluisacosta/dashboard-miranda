import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import TableComponent from "../../Components/TableComponent/TableComponent";

const Bookings = styled.div`

    background-color: var(--light-gray);

`;

const data = [
    {
      name: 'John Doe',
      orderDate: '2024-06-01',
      checkInDate: '2024-06-15',
      checkOutDate: '2024-06-20',
      specialRequest: true,
      roomType: 'Double Room',
      status: 'booked',
    },
    {
      name: 'Jane Smith',
      orderDate: '2024-06-02',
      checkInDate: '2024-06-18',
      checkOutDate: '2024-06-25',
      specialRequest: false,
      roomType: 'Single Room',
      status: 'pending',
    },
    {
      name: 'Michael Johnson',
      orderDate: '2024-06-05',
      checkInDate: '2024-06-20',
      checkOutDate: '2024-06-23',
      specialRequest: true,
      roomType: 'Suite',
      status: 'cancelled',
    },
    {
      name: 'Emily Davis',
      orderDate: '2024-06-08',
      checkInDate: '2024-06-25',
      checkOutDate: '2024-06-28',
      specialRequest: false,
      roomType: 'Double Room',
      status: 'booked',
    },
    {
      name: 'Daniel Wilson',
      orderDate: '2024-06-10',
      checkInDate: '2024-06-22',
      checkOutDate: '2024-06-27',
      specialRequest: true,
      roomType: 'Single Room',
      status: 'pending',
    },
  ];
  
const columns = ['Name', 'Order Date', 'Check-in Date', 'Check-out Date', 'Special Request', 'Room Type', 'Status'];


const BookingsPage = () => {
    let isLoggedIn = localStorage.getItem('token');

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem('token', 'false');
        navigate('login');
    }

    return (
        <>
            {
            isLoggedIn && isLoggedIn !== 'false' ? 
            <>
                <Bookings>
                    <div className="page-container">
                        <SideBarComponent/>
                        <div className="main-content">
                            <h1>Bookings</h1>
                            <button onClick={logoutHandler}>Logout</button>
                            <TableComponent data={data} columns={columns}/>
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