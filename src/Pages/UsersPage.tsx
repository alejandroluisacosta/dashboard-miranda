import styled from "styled-components";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import FilterTabs from "../Components/FilterTabs";
import SideBar from "../Components/SideBar";
import Table from "../Components/Table";
import { Column, StyledPageContainer, User } from "../types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetUsersThunk, RemoveUserThunk } from "../Features/Users";
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
    border-bottom: 0 !important;
      a {
      display: flex;
      text-decoration: none;
      color: inherit; 
    }
    img {
        width: 80px;
        height: 80px;
        margin-right: 30px;
    }
    div {
      border-bottom: 0;
    }
`;

const StyledContact = styled.div`
    display: flex;
    border-bottom: 0 !important;
    gap: 5%;
    justify-content: space-between;
    .delete {
        cursor: pointer;
    }
`;


const UsersPage = () => {

    const columns: Column<User>[] = [
        {
          label: 'Name',
          display: (row: User) => (
            <StyledNameColumn>
              <Link to={row._id}>
                <img src={row.image} alt="User image"/>
                <div>
                  <p>{row.name}</p>
                  <p>{`#${row._id.slice(0, 7)}...`}</p>
                  <p>{row.incorporatedOn}</p>
                </div>
              </Link>
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
          display: (row: User) => (
            <StyledContact>
              <p>{row.phone.split('x')[0]}</p>
              <span className="delete material-symbols-outlined" onClick={() => dispatch(RemoveUserThunk(row._id))}>delete</span>
            </StyledContact>
          )
        },
    ];
    
    const [renderedUsers, setRenderedUsers] = useState<User[]>([]);
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.Users.items);
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
      if (!users.length) {
        dispatch(GetUsersThunk());
      }
      setRenderedUsers([...users].reverse());
    }, [users])

    const sortUsersHandler = (value: string) => {
    if (value === 'incorporatedOn') {
      const allUsers = [...users];
      allUsers.sort((a, b) => (new Date(a.incorporatedOn).getTime() as number) - (new Date(b.incorporatedOn).getTime() as number));
        setRenderedUsers(allUsers);
      } else if (value === 'active') {
        setRenderedUsers(users.filter(user => user.status === 'Available'));
      } else if (value === 'inactive') {
        setRenderedUsers(users.filter(user => user.status === 'Unavailable'));
      }
    }

    return (
        <>
          <StyledUsers>
              <StyledPageContainer visible={isSidebarVisible}>
                  <SideBar visible={isSidebarVisible}/>
                  <div className="main-content">
                      <Header toggleSidebar={toggleSidebar}/>
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
              </StyledPageContainer>
          </StyledUsers>
      </>
    )
}

export default UsersPage;