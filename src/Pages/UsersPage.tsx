import styled from "styled-components";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import FilterTabs from "../Components/FilterTabs";
import SideBar from "../Components/SideBar";
import Table from "../Components/Table";
import { Columns, User } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Users, { GetUsersThunk } from "../Features/Users";


const StyledUsers = styled.div`

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

const columns: Columns[] = [
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
    property: 'jobDesk',
  },
  {
    label: 'Schedule',
    display: (row: User) => (
      <>
        <p>{row.schedule}</p>
        <p>Check schedule</p>
      </>
    )
  },
  {
    label: 'Contact',
    property: 'contact',
  },
];

const UsersPage = () => {
    
    const [renderedUsers, setRenderedUsers] = useState<User[]>([]);
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.Users.items);

  useEffect(() => {
    if (!renderedUsers.length)
      dispatch(GetUsersThunk());
    sortUsersHandler('incorporatedOn');
  }, [users])

  const sortUsersHandler = (value: string) => {
  if (value === 'incorporatedOn') {
    const allUsers = [...users];
    allUsers.sort((a, b) => (new Date(a.incorporatedOn).getTime() as number) - (new Date(b.incorporatedOn).getTime() as number));
      setRenderedUsers(allUsers);
    } else if (value === 'active') {
      setRenderedUsers(users.filter(user => user.status === 'Active'));
    } else if (value === 'inactive') {
      setRenderedUsers(users.filter(user => user.status === 'Inactive'));
    }
  }

    return (
        <>
          <StyledUsers>
              <div className="page-container">
                  <SideBar/>
                  <div className="main-content">
                      <Header/>
                      <FilterTabs 
                        sortHandler={sortUsersHandler}
                        fields={{
                          'All employees': 'incorporatedOn',
                          'Active employees': 'active',
                          'Inactive employees': 'inactive',
                        }}
                      />
                      <Table data={renderedUsers} columns={columns}/>
                  </div>
              </div>
          </StyledUsers>
      </>
    )
}

export default UsersPage;