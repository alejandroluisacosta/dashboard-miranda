import { IoIosArrowRoundBack } from "react-icons/io";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import UserDetails from "../Components/UserDetails"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { GetUserThunk } from "../Features/Users";
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const StyledUserDetails = styled.div`
    background-color: var(--light-gray);
    .back-link-container {
        display: flex;
        align-items: center;
        margin: 30px 50px 15px;
        font-size: 20px;
        color: black;
        a {
            text-decoration: none;
            color: inherit; 
        }
    }
    .progress {
        position: absolute;
        top: 50%;
        left: 50%;
    }
`;


const UserDetailsPage = () => {

    const [ fetched, setFecthed ] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { userId } = useParams<{ userId: string }>();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    
    if (!userId) {
        console.log(userId);
        throw new Error('No user selected - User\'s ID missing');
    }

    const initialFetch = async (): Promise<void> => {
        await dispatch(GetUserThunk(userId)).unwrap;
        setFecthed(true);
    }

    useEffect(() => {
        initialFetch();
    }, [])


    return (
        <>
            <StyledUserDetails>
                <div className="page-container">
                    <SideBar visible={isSidebarVisible}/>
                    <div className="main-content">
                        <Header toggleSidebar={toggleSidebar}/>
                        <div className="back-link-container">
                            <IoIosArrowRoundBack style={{ fontSize: '30px', marginRight: '2.5px' }}/>
                            <Link to="/users">All Users</Link>
                        </div>
                        {fetched ?
                            <UserDetails />
                        :
                        <Box className="progress" sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                        }
                    </div>
                </div>
            </StyledUserDetails>
        </>
    )
}

export default UserDetailsPage;