import styled from "styled-components";
import { toast } from 'react-toastify';
import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { User } from "../types";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { EditUserThunk } from '../Features/Users';

const StyledUserDetails = styled.div`
    display: flex;
    margin: 0 50px 50px;
    background-color: white;
    border-radius: 12px;
    h2 {
        margin-bottom: 40px;
    }
    .row-of-three {
        div {
            width: 30%;
        }
    }
`;

const StyledNameContainer = styled.div`
    position: relative;
    .edit {
        position: absolute;
        right: 5%;
        top: 0;
    }
    button {
        position: absolute;
        right: 0;
        top: 0;
        padding: 10px 20px;
        color: var(--dark-green);
        background-color: white;
        border-radius: 12px;
    }
`;

interface LeftProps {
    $isEditing: boolean;
}

const Left = styled.div<LeftProps>`
    width: 50%;
    padding: 40px 40px 50px;
    background-color: ${props => props.$isEditing ? 'var(--lighter-green)' : 'unset'};
    input {
        border-radius: 8px;
        padding: 5px;
    }
    select {
        border-radius: 8px;
        padding: 7.5px;
    }
    .label {
        font-weight: 600;
        margin-bottom: 12px;
    }
`;

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    div {
        width: 48%;
    }
`;

const Right = styled.div`

`;

const UserDetails = () => {

    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const user: User = useAppSelector(state => state.Users.single);
    const name = user.name;
    const id = user._id;
    const userName = user.userName;
    const image = user.image;
    const [incorporatedOn, setIncorporatedOn] = useState(user.incorporatedOn);
    const [jobDesk, setJobDesk] = useState(user.jobDesk);
    const [schedule, setSchedule] = useState(user.schedule);
    const [phone, setPhone] = useState(user.phone);
    const [status, setStatus] = useState(user.status);
    const [role, setRole] = useState(user.role);
    const [email, setEmail] = useState(user.email);
    const dispatch = useAppDispatch();
    

    
    const notify = () => toast.success('User successfully modified', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleEditClick = (): void => {
        setIsEditing(true);
    }

    const handleSaveClick = async () => {
        dispatch(EditUserThunk({
            _id: id,
            name: name,
            userName: userName,
            image: image,
            incorporatedOn,
            jobDesk,
            schedule,
            phone,
            status,
            role,
            email

        }));
        setIsEditing(false);
        notify();
    }

    return (
        <StyledUserDetails>
            <Left $isEditing={isEditing}>
                <StyledNameContainer>
                    <h2>{name} - {userName}</h2>
                    {isEditing ?
                        <button onClick={handleSaveClick}>Save Changes</button>
                    :
                        <PiDotsThreeOutlineVerticalFill className="edit" onClick={handleEditClick}/>
                    }
                    <StyledRow>
                        <div>
                            <p>Schedule</p>
                            {isEditing ? (
                                <input
                                    type="text" 
                                    value={schedule}
                                    onChange={(event) => setSchedule(event.target.value)}
                                />
                            ) :
                                <p>{user.schedule}</p>
                            }
                        </div>
                        <div>
                            <p>Role</p>
                            {isEditing ?
                                <select defaultValue={role} onChange={(event) => setRole(event.target.value)}>
                                    <option value="Manager">Manager</option>
                                    <option value="Reception">Reception</option>
                                    <option value="Room Service">Room service</option>
                                </select>
                            :
                                <p>{user.role}</p>
                            }
                        </div>
                    </StyledRow>
                    <StyledRow>
                        <div>
                            <p>Email</p>
                            {isEditing ?
                                <input
                                    type="text" 
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            :
                                <p>{user.email}</p>
                            }
                        </div>
                        <div>
                            <p>Phone</p>
                            {isEditing ?
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            :
                                <p>{user.phone}</p>
                            }
                        </div>
                    </StyledRow>
                    <StyledRow >
                            <div>
                                <p>Incorporated On</p>
                                {isEditing ?
                                    <input
                                        type="date" 
                                        value={incorporatedOn}
                                        onChange={(event) => setIncorporatedOn(event.target.value)}
                                    />
                                :
                                    <p>{user.incorporatedOn}</p>
                                }
                            </div>
                            <div>
                                <p>Status</p>
                                {isEditing ?
                                    <select defaultValue={status} onChange={(event) => setStatus(event.target.value)} required>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                :
                                    <p>{user.status}</p>
                                }
                            </div>
                    </StyledRow>
                    <div>
                        <p>Job Description</p>
                        {isEditing ?
                            <textarea placeholder={jobDesk ? jobDesk : ""} onChange={(event) => setJobDesk(event.target.value)}/>
                        :
                            <p>{user.jobDesk}</p>
                        }
                    </div>
                </StyledNameContainer>
            </Left>
            <Right>

            </Right>
        </StyledUserDetails>
    )
}

export default UserDetails;