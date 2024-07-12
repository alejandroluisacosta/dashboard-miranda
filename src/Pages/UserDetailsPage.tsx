import { IoIosArrowRoundBack } from "react-icons/io";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
import UserDetails from "../Components/UserDetails"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { GetUserThunk } from "../Features/Users";
import styled from "styled-components";

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
`;


const UserDetailsPage = () => {

    const [ fetched, setFecthed ] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { userId } = useParams<{ userId: string }>();
    
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
                    <SideBar />
                    <div className="main-content">
                        <Header />
                        <div className="back-link-container">
                            <IoIosArrowRoundBack style={{ fontSize: '30px', marginRight: '2.5px' }}/>
                            <Link to="/users">All Users</Link>
                        </div>
                        {fetched ?
                            <UserDetails />
                        :
                            <h1>Loading</h1>
                        }
                    </div>
                </div>
            </StyledUserDetails>
        </>
    )
}

export default UserDetailsPage;