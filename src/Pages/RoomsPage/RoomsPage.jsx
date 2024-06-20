import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import FilterTabs from "../../Components/FilterTabs";
import TableComponent from "../../Components/TableComponent/TableComponent";
import Header from "../../Components/Header";

const StyledNameColumn = styled.div`
    img {
        width: 150px;
        height: 77px;
    }
`;

const columns = [
    {
      label: 'Room Name',
      display: row => (
        <StyledNameColumn>
          <img src="/assets/HotelRoom3.jpeg"/>
          <div>
            <p>{row.name}</p>
            <p>{row.id}</p>
          </div>
        </StyledNameColumn>
      )
    },
    {
      label: 'Room Type',
      property: 'room type'
    },
    {
      label: 'Amenities',
      property: 'amenities'
    },
    {
      label: 'Price',
      property: 'price'
    },
    {
      label: 'Offer',
      property: 'offer'
    },
    {
      label: 'Status',
      display: status => (
        status === 'Available' ? <button>Available</button> : <button>Booked</button>
      )
    },
  ];

const StyledRooms = styled.div`

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
                          <div className="filter-container">
                            <FilterTabs/>
                          </div>
                          {/* <TableComponent/> */}
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