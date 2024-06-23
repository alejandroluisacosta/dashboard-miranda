import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import TableComponent from "../../Components/TableComponent/TableComponent";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import FilterTabs from "../../Components/FilterTabs";


const Users = styled.div`

    background-color: var(--light-gray);

`;

const StyledNameColumn = styled.div`
    display: flex;
    border-bottom: 0 !important;
    img {
        width: 80px;
        height: 80px;
        margin-right: 30px;
    }
    div {
      border-bottom: 0;
    }
`;

const columns = [
  {
    label: 'Name',
    display: row => (
      <StyledNameColumn>
        <img src={row.image} alt="User image"/>
        <div>
          <p>{row.name}</p>
          <p>{row.id}</p>
          <p>{row.incorporatedOn}</p>
        </div>
      </StyledNameColumn>
    )
  },
  {
    label: 'Job Desk',
    property: 'job desk',
  },
  {
    label: 'Schedule',
    display: schedule => (
      <>
        <p>{schedule}</p>
        <p>Check schedule</p>
      </>
    )
  },
  {
    label: 'Contact',
    property: 'contact',
  },
  {
    label: 'Status',
    display: status => (
      status === 'Active' ? <button>Active</button> : <button>Inactive</button>
    )
  },
];

const mockUsers = [
  {
    basicInfo: {
      name: 'Alice Johnson',
      id: '#001',
      incorporatedOn: '2022-01-15',
      image: '/assets/user.jpeg'
    },
    jobDesk: 'Answering guest inquiries, directing phone calls, coordinating travel plans, and more.',
    schedule: 'Monday, Wednesday',
    contact: '555-1234',
    status: 'Active',
  },
  {
    basicInfo: {
      name: 'Bob Smith',
      id: '#002',
      incorporatedOn: '2022-02-20',
      image: '/assets/user.jpeg'
    },
    jobDesk: 'Managing front desk operations, overseeing staff, and ensuring guest satisfaction.',
    schedule: 'Tuesday, Thursday',
    contact: '555-5678',
    status: 'Inactive',
  },
  {
    basicInfo: {
      name: 'Charlie Davis',
      id: '#003',
      incorporatedOn: '2022-03-25',
      image: '/assets/user.jpeg'
    },
    jobDesk: 'Coordinating housekeeping activities, managing laundry services, and maintaining cleanliness.',
    schedule: 'Wednesday, Friday',
    contact: '555-8765',
    status: 'Active',
  },
  {
    basicInfo: {
      name: 'Edward Wilson',
      id: '#005',
      incorporatedOn: '2022-05-05',
      image: '/assets/user.jpeg'
    },
    jobDesk: 'Managing restaurant operations, overseeing food and beverage services, and ensuring guest satisfaction.',
    schedule: 'Friday, Sunday',
    contact: '555-7890',
    status: 'Active',
  },
  {
    basicInfo: {
      name: 'Diana Evans',
      id: '#004',
      incorporatedOn: '2022-04-30',
      image: '/assets/user.jpeg'
    },
    jobDesk: 'Organizing events, handling guest reservations, and providing concierge services.',
    schedule: 'Thursday, Saturday',
    contact: '555-4321',
    status: 'Inactive',
  },
];



const UsersPage = () => {
    
    let isLoggedIn = localStorage.getItem('token');
    const [users, setUsers] = useState(mockUsers);

    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.setItem('token', 'false');
        navigate('login');
    }

    const sortUsersInitially = (users) => {
      return users.sort((a, b) => new Date(a.basicInfo.incorporatedOn) - new Date(b.basicInfo.incorporatedOn));
  }

  useEffect(() => {
    setUsers(sortUsersHandler('incorporatedOn'));
  }, [])

    const sortUsersHandler = (event, value) => {
      const allUsers = [...mockUsers];
      if (value === 'incorporatedOn') {
        allUsers.sort((a, b) => new Date(a.basicInfo.incorporatedOn) - new Date(b.basicInfo.incorporatedOn));
        setUsers(allUsers);
      } else if (value === 'active') {
        const filteredUsers = allUsers.filter(user => user.status === 'Active')
        setUsers(filteredUsers);
      } else if (value === 'inactive') {
        const filteredUsers = allUsers.filter(user => user.status === 'Inactive')
        setUsers(filteredUsers);
      } else if (value === 'name') {
        setUsers(allUsers.sort((a, b) => a.basicInfo.name.localeCompare(b.basicInfo.name)));
      }
    }

    return (
        <>
            {
            isLoggedIn && isLoggedIn !== 'false' ? 
            <>
                <Users>
                    <div className="page-container">
                        <SideBarComponent/>
                        <div className="main-content">
                            <Header/>
                            <FilterTabs 
                              sortHandler={sortUsersHandler}
                              fields={{
                                'All employees': 'incorporatedOn',
                                'Active employees': 'Active',
                                'Inactive employees': 'inactive',
                              }}
                            />
                            <TableComponent data={users} columns={columns}/>
                        </div>
                    </div>
                </Users>
            </>
            :
            <Navigate to="/login"/>
            }
        </>
    )
}

export default UsersPage;