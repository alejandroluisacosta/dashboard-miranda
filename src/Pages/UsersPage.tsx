import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import FilterTabs from "../Components/FilterTabs";
import SideBar from "../Components/SideBar";
import Table from "../Components/Table";


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

interface User {
  name: string;
  id: string;
  image: string;
  incorporatedOn: string;
  jobDesk: string;
  schedule: string;
  contact: string;
  status: string;
}

const columns = [
  {
    label: 'Name',
    display: (row: User) => (
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
    display: (schedule: string) => (
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
    display: (status: 'Active' | 'Inactive') => (
      status === 'Active' ? <button>Active</button> : <button>Inactive</button>
    )
  },
];

const mockUsers: User[] = [
  {
    name: 'Alice Johnson',
    id: '#001',
    incorporatedOn: '2022-01-15',
    image: '/assets/user.jpeg',
    jobDesk: 'Answering guest inquiries, directing phone calls, coordinating travel plans, and more.',
    schedule: 'Monday, Wednesday',
    contact: '555-1234',
    status: 'Active',
  },
  {
    name: 'Bob Smith',
    id: '#002',
    incorporatedOn: '2022-02-20',
    image: '/assets/user.jpeg',
    jobDesk: 'Managing front desk operations, overseeing staff, and ensuring guest satisfaction.',
    schedule: 'Tuesday, Thursday',
    contact: '555-5678',
    status: 'Inactive',
  },
  {
    name: 'Charlie Davis',
    id: '#003',
    incorporatedOn: '2022-03-25',
    image: '/assets/user.jpeg',
    jobDesk: 'Coordinating housekeeping activities, managing laundry services, and maintaining cleanliness.',
    schedule: 'Wednesday, Friday',
    contact: '555-8765',
    status: 'Active',
  },
  {
    name: 'Edward Wilson',
    id: '#005',
    incorporatedOn: '2022-05-05',
    image: '/assets/user.jpeg',
    jobDesk: 'Managing restaurant operations, overseeing food and beverage services, and ensuring guest satisfaction.',
    schedule: 'Friday, Sunday',
    contact: '555-7890',
    status: 'Active',
  },
  {
    name: 'Diana Evans',
    id: '#004',
    incorporatedOn: '2022-04-30',
    image: '/assets/user.jpeg',
    jobDesk: 'Organizing events, handling guest reservations, and providing concierge services.',
    schedule: 'Thursday, Saturday',
    contact: '555-4321',
    status: 'Inactive',
  },
];

const UsersPage = () => {
    
    const [users, setUsers] = useState<User[]>(mockUsers);

  //   const sortUsersInitially = (users: User[]): User[] => {
  //     return users.sort((a, b) => (new Date(a.incorporatedOn).getTime() as number) - (new Date(b.incorporatedOn).getTime() as number));
  // } REMOVE AFTER CONFIRMING USELESSNESSS

  useEffect(() => {
    setUsers(sortUsersHandler('incorporatedOn'));
  }, [])

  // THIS FUNCTION NEEDS TO RETURN AN ARRAY OF USER-INTERFACE INSTANCES, NOT MERE OBJECTS
  const sortUsersHandler = (value: string): User[] => {
    if (value === 'incorporatedOn') {
      const allUsers = [...mockUsers];
      allUsers.sort((a, b) => (new Date(a.incorporatedOn).getTime() as number) - (new Date(b.incorporatedOn).getTime() as number));
      return allUsers;
    } else if (value === 'active') {
      return mockUsers.filter(user => user.status === 'Active')
    } else if (value === 'inactive') {
      return mockUsers.filter(user => user.status === 'Inactive')
    }
    return mockUsers;
  }

    return (
        <>
          <Users>
              <div className="page-container">
                  <SideBar/>
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
                      <Table data={users} columns={columns}/>
                  </div>
              </div>
          </Users>
      </>
    )
}

export default UsersPage;