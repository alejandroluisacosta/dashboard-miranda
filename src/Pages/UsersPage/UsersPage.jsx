import { Navigate, useNavigate } from "react-router-dom";
import SideBarComponent from "../../Components/SideBarComponent/SideBarComponent";
import styled from "styled-components";
import TableComponent from "../../Components/TableComponent/TableComponent";


const Users = styled.div`

    background-color: var(--light-gray);

`;

const data = [
    {
      "name": "John Doe",
      "job_desk": "Engineer",
      "schedule": "Mon-Fri, 9-5",
      "contact": "john.doe@example.com",
      "status": "Active"
    },
    {
      "name": "Jane Smith",
      "job_desk": "Designer",
      "schedule": "Mon-Fri, 10-6",
      "contact": "jane.smith@example.com",
      "status": "Active"
    },
    {
      "name": "Alice Johnson",
      "job_desk": "Manager",
      "schedule": "Mon-Fri, 8-4",
      "contact": "alice.johnson@example.com",
      "status": "Inactive"
    },
    {
      "name": "Bob Brown",
      "job_desk": "Developer",
      "schedule": "Mon-Fri, 9-5",
      "contact": "bob.brown@example.com",
      "status": "Active"
    },
    {
      "name": "Carol White",
      "job_desk": "Analyst",
      "schedule": "Mon-Fri, 9-5",
      "contact": "carol.white@example.com",
      "status": "Active"
    },
    {
      "name": "Dave Black",
      "job_desk": "Support",
      "schedule": "Mon-Fri, 11-7",
      "contact": "dave.black@example.com",
      "status": "Inactive"
    }
  ]

const columns = ['Name', 'Job Desk', 'Schedule', 'Contact', 'Status'];


const UsersPage = () => {
    
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
                <Users>
                    <div className="page-container">
                        <SideBarComponent/>
                        <div className="main-content">
                            <h1>Dashboard Page</h1>
                            <button onClick={logoutHandler}>Logout</button>
                            <TableComponent data={data} columns={columns}/>
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