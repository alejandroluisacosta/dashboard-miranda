import styled from "styled-components";
import { toast } from 'react-toastify';
import { useState } from "react";
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
    display: flex;
    justify-content: space-between;
    .edit {
        order: 2;
        height: 40px;
        border: 1px solid black;
        border-radius: 8px;
        padding: 5px;
        cursor: pointer;
    }
    .save {
        background-color: white;
        height: 35px;
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
    textarea {
        padding: 10px;
        border-radius: 8px;
        min-height: 80px;
        min-width: 200px;
        overflow: hidden;
        resize: none;
    }
`;

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    word-break: break-all;
    div {
        width: 48%;
    }
`;

const Right = styled.div`
    width: 50%;
    div {
        min-height: 100%;
        width: 100%;
        padding-bottom: 50%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        border-radius: 12px;
    }
`;

const UserDetails = () => {

    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const user = useAppSelector(state => state.Users.single);
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
                    <span className="edit save material-symbols-outlined" onClick={handleSaveClick}>
                    check
                    </span>
                    :
                    <span className="edit material-symbols-outlined" onClick={handleEditClick}>
                        edit
                    </span>
                    }
                    </StyledNameContainer>
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
                                <p>{schedule}</p>
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
                                <p>{role}</p>
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
                                <p>{email}</p>
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
                                <p>{phone}</p>
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
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
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
            </Left>
            <Right>
                <div style={{backgroundImage: `url(../assets/Door-Opens.jpeg)`}}></div>
            </Right>
        </StyledUserDetails>
    )
}

export default UserDetails;