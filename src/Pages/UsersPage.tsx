import styled from "styled-components";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import FilterTabs from "../Components/FilterTabs";
import SideBar from "../Components/SideBar";
import Table from "../Components/Table";
import { Columns, User } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Users, { GetUsersThunk } from "../Features/Users";
import { Link } from "react-router-dom";


const StyledUsers = styled.div`

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
    if (!users.length) {
      dispatch(GetUsersThunk());
    }
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
                      <div className="filter-container">
                        <FilterTabs 
                          sortHandler={sortUsersHandler}
                          fields={{
                            'All employees': 'incorporatedOn',
                            'Active employees': 'active',
                            'Inactive employees': 'inactive',
                          }}
                        />
                        <Link to='add'><button className="add-button">Add User</button></Link>
                      </div>
                      <Table data={renderedUsers} columns={columns}/>
                  </div>
              </div>
          </StyledUsers>
      </>
    )
}

export default UsersPage;