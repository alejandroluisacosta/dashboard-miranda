import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import FilterTabs from "../../Components/FilterTabs";
import TableComponent from "../../Components/TableComponent/TableComponent";
import Header from "../../Components/Header";

const StyledNameColumn = styled.div`
    display: flex;
    border-bottom: 0 !important;
    img {
        width: 150px;
        height: 77px;
        margin-right: 30px;
    }
    div {
      border-bottom: 0;
    }
`;

const mockRooms = [
  {
    roomDescription: {
      name: 'Deluxe A-91234',
      id: '#1234',
      image: '/assets/HotelRoom3.jpeg',
    },
    'room type': 'Single Bed',
    amenities: 'Ocean view, King bed, Jacuzzi',
    price: '$300',
    offer: '20% off',
    status: 'Available',
  },
  {
    roomDescription: {
      name: 'Deluxe A-91234',
      id: '#5678',
      image: '/assets/HotelRoom3.jpeg',
    },
    'room type': 'Single Bed',
    amenities: 'Queen bed, City view',
    price: '$150',
    offer: '10% off',
    status: 'Available',
  },
  {
    roomDescription: {
      name: 'Deluxe A-91234',
      id: '#9012',
      image: '/assets/HotelRoom3.jpeg',
    },
    'room type': 'Double Bed',
    amenities: 'City view, Living room, Kitchenette',
    price: '$400',
    offer: '30% off',
    status: 'Booked',
  },
  {
    roomDescription: {
      name: 'Deluxe A-91234',
      id: '#3456',
      image: '/assets/HotelRoom3.jpeg',
    },
    'room type': 'Double Superior',
    amenities: 'Two bedrooms, Garden view',
    price: '$250',
    offer: '15% off',
    status: 'Available',
  },
  {
    roomDescription: {
      name: 'Deluxe A-91234',
      id: '#7890',
      image: '/assets/HotelRoom3.jpeg',
    },
    'room type': 'Suite',
    amenities: 'Ocean view, Balcony',
    price: '$350',
    offer: '25% off',
    status: 'Booked',
  }
];


const columns = [
    {
      label: 'Room Name',
      display: row => (
        <StyledNameColumn>
          <img src={row.image} alt="Room image"/>
          <div>
            <p>{row.id}</p>
            <p>{row.name}</p>
          </div>
        </StyledNameColumn>
      )
    },
    {
      label: 'Room Type',
      property: 'room type',
    },
    {
      label: 'Amenities',
      property: 'amenities',

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
`;

const RoomsPage = () => {

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
                <StyledRooms>
                    <div className="page-container">
                        <SideBarComponent/>
                        <div className="main-content">
                          <Header/>
                          <TableComponent data={mockRooms} columns={columns}/>
                        </div>
                    </div>
                </StyledRooms>
            </>
            :
            <Navigate to="/login"/>
            }
        </>
    )
}

export default RoomsPage;