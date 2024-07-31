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

    const handleEditClick = (): void => {
        setIsEditing(true);
    }

    return (
        <StyledUserDetails>
            <Left $isEditing={isEditing}>
                <StyledNameContainer>
                    <h2>{user.name} - ID: {user._id}</h2>
                    {isEditing ?
                        <button>Save Changes</button>
                    :
                        <PiDotsThreeOutlineVerticalFill className="edit" onClick={handleEditClick}/>
                    }
                    <StyledRow>
                        <div>
                            <label htmlFor='schedule'>Schedule</label>
                            {isEditing ?
                                <input id='schedule' type="text" />
                            :
                                <p>{user.schedule}</p>
                            }
                        </div>
                        <div>
                            <label htmlFor="role">Role</label>
                            {isEditing ?
                                <select id="role">
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
                            <label htmlFor="email">Email</label>
                            {isEditing ?
                                <input id="email" type="text" />
                            :
                                <p>{user.email}</p>
                            }
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            {isEditing ?
                                <input id="phone" type="text" />
                            :
                                <p>{user.phone}</p>
                            }
                        </div>
                    </StyledRow>
                    <StyledRow >
                            <div>
                                <label htmlFor="date">Incorporated On</label>
                                {isEditing ?
                                    <input id="date" type="date" />
                                :
                                    <p>{user.incorporatedOn}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="status">Status</label>
                                {isEditing ?
                                    <select id="status" required>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                :
                                    <p>{user.status}</p>
                                }
                            </div>
                    </StyledRow>
                    <div>
                        <label htmlFor="jobDesk">Job Description</label>
                        {isEditing ?
                            <textarea id="jobDesk"/>
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