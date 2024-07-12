import styled from "styled-components";
import { toast } from 'react-toastify';
import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { User } from "../types";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { EditUserThunk } from '../Features/Users';

const StyledUserDetails = styled.div`

`;

const StyledNameContainer = styled.div`

`;

interface LeftProps {
    $isEditing: boolean;
}

const Left = styled.div<LeftProps>`

`;

const StyledRow = styled.div`

`;

const Right = styled.div`

`;

const UserDetails = () => {

    const [ isEditing, setIsEditing ] = useState<boolean>(false);
    const user: User = useAppSelector(state => state.Users.single);

    return (
        <StyledUserDetails>
            <Left $isEditing={isEditing}>
                <StyledNameContainer>
                    <h2>'username' 'id'</h2>
                    {isEditing ?
                        <button>Save Changes</button>
                    :
                        <PiDotsThreeOutlineVerticalFill className="edit" />
                    }
                    <StyledRow>
                        <div>
                            <label htmlFor='schedule'>* Schedule</label>
                            {isEditing ?
                                <input id='schedule' type="text" required />
                            :
                                <p>{user.schedule}</p>
                            }
                        </div>
                        <div>
                            <label htmlFor="role">* Role</label>
                            {isEditing ?
                                <select id="role" required>
                                    <option value="Manager">Manager</option>
                                    <option value="Reception">Reception</option>
                                    <option value="Room Service">Room service</option>
                                </select>
                            :
                                <p>{user.role}</p>
                            }
                        </div>
                    </StyledRow>
                </StyledNameContainer>
            </Left>
            <Right>

            </Right>
        </StyledUserDetails>
    )
}

export default UserDetails;