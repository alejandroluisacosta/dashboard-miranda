import { Link } from "react-router-dom";
import styled from "styled-components"
import { useAppDispatch } from "../app/hooks";
import { toast } from "react-toastify";
import { AddUserThunk } from "../Features/Users";

const StyledAddUser = styled.div`
    display: flex;
    margin: 50px 40px 0;
    padding: 5%;
    background-color: white;
    border-radius: 12px;
    input, select, textarea {
        width: 100%;
        padding: 0 7.5px;
        font-size: 16px;
    }
    input, select {
        height: 75%;
    }
    textarea {
        min-height: 30px;
        margin-bottom: 24px;
        padding-top: 7.5px;
        padding-bottom: 7.5px;
    }
    h1 {
        margin-bottom: 30px;
    }
    .button-container {
        text-align: center;
        button {
            padding: 18px 26px 18px 18px;
            background-color: var(--dark-green);
            border-radius: 12px;
            color: white;
            font-size: 18px;
            margin-bottom: 12px;
        }
    }
    .row-of-three {
        div {
            width: 30%;
        }
    }
`;

const Left = styled.div`
    width: 50%;
    label {
        display: block;
    }
    padding-right: 5%;
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

export interface User {
    name: string;
    id: string;
    image: string;
    incorporatedOn: string;
    jobDesk: string;
    schedule: string;
    contact: string;
    status: string;
}

const AddUser: React.FC = () => {

    const dispatch = useAppDispatch();
    const notify = () => toast.success('User successfully created', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const addUserHandler = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.target as HTMLInputElement;

        const name: string = (form.querySelector('#name') as HTMLInputElement).value;
        const incorporatedOn: string = (form.querySelector('#date') as HTMLInputElement).value;
        const jobDesk: string = (form.querySelector('#description') as HTMLInputElement).value;
        const contact: string = (form.querySelector('#phone') as HTMLInputElement).value;
        const status: string = (form.querySelector('#status') as HTMLInputElement).value;
        const role: string = (form.querySelector('#role') as HTMLInputElement).value;

        dispatch(AddUserThunk({
            name: name,
            id: `${Math.floor(Math.random() * 1000)}`,
            image: `/assets/user.jpeg`,
            incorporatedOn: incorporatedOn,
            jobDesk: jobDesk,
            contact: contact,
            status: status,
            role: role,
        }));

        notify();
    }
    return (
        <StyledAddUser>
            <Left>
                <h1>Add User</h1>
                <form onSubmit={addUserHandler}>
                    <StyledRow>
                        <div>
                            <label htmlFor='name'>* Full Name</label>
                            <input id='name' type="text" required />
                        </div>
                        <div>
                            <label htmlFor="role">* Role</label>
                            <select id="role" required>
                                <option value="Manager">Manager</option>
                                <option value="Reception">Reception</option>
                                <option value="Room Service">Room service</option>
                            </select>
                        </div>
                    </StyledRow>
                    <StyledRow>
                        <div>
                            <label htmlFor="email">* Email</label>
                            <input id="email" type="text" required />
                        </div>
                        <div>
                            <label htmlFor="phone">* Phone</label>
                            <input id="phone" type="text" required />
                        </div>
                    </StyledRow>
                    <StyledRow className="row-of-three">
                        <div>
                            <label htmlFor="password">* Password</label>
                            <input id="password" type="text" required />
                        </div>
                        <div>
                            <label htmlFor="date">* Start Date</label>
                            <input id="date" type="date" required />
                        </div>
                        <div>
                            <label htmlFor="status">* Status</label>
                            <select id="status" required>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                    </StyledRow>
                    <div>
                        <label htmlFor="description">Role Description</label>
                        <textarea id="description" />
                    </div>
                    <div className="button-container">
                        <button type="submit">Create User</button>
                        <Link to='/users'><p>All Users</p></Link>
                    </div>
                </form>
            </Left>
            <Right>
                <div style={{backgroundImage: `url(../assets/HotelInside.jpeg)`}}></div>
            </Right>
        </StyledAddUser>
    )
}

export default AddUser;