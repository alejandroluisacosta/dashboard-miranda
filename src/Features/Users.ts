import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../types';
import backendAPICall from "../../utils/backendAPICall";

const delay = (data: User | User[] | string): Promise<User | User[] | string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
}

export const GetUsersThunk = createAsyncThunk('Users/GetUsers', async(): Promise<User[]> => {
    const {users}: User[] = await backendAPICall('users') as User[];
    return users;
})

export const GetUserThunk = createAsyncThunk('Users/GetUser', async(id: string): Promise<User> => {
    const {user}: User | undefined = await backendAPICall('users', 'GET', id);
    if (!user)
        throw('Room not found');
    return user;
})

export const AddUserThunk = createAsyncThunk('Users/AddUser', async(newUser: User): Promise<User> => {
    const user: User = await delay(newUser) as User;
    return user;
})

export const RemoveUserThunk = createAsyncThunk('Users/RemoveUser', async(id: string): Promise<string> => {
    const userId: string = await delay(id) as string;
    return userId; 
})

export const EditUserThunk = createAsyncThunk('Users/EditUser', async(updatedUser: User): Promise<User> => {
    const room: User = await delay(updatedUser) as User;
    return room; 
})

interface UserState {
    status: string;
    items: User[];
    single: User;
    error: string | null;    
}

const initialState: UserState = {
    status: 'idle',
    items: [] as User[],
    single: {} as User,
    error: null,
}

const Users = createSlice({
    name: 'Users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetUsersThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetUsersThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetUsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = action.payload;
        })
        .addCase(GetUserThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetUserThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.single = action.payload;
        })
        .addCase(AddUserThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(AddUserThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(AddUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.push(action.payload);
            state.single = action.payload;
        })
        .addCase(RemoveUserThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(RemoveUserThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(RemoveUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = 'fulfilled';
            state. error = 'false';
            const removedUser = state.items.find(user => user.id === action.payload);
            if (removedUser)
                state.single = removedUser;
            state.items = state.items.filter(user => user.id !== action.payload);
        })
        .addCase(EditUserThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditUserThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.map(user => user.id === action.payload.id ? user = action.payload : user);
            state.single = action.payload;
        })
    }
})

export default Users;