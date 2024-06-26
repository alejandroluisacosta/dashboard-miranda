import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockRooms from "../data/mockRooms";

const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
}

export const GetRooms = createAsyncThunk('Rooms/GetRooms', async() => {
    const rooms = delay(mockRooms);
    return rooms;
})

export const GetRoom = createAsyncThunk('Rooms/GetRoom', async(id) => {
    const room = delay(mockRooms[id]);
    return room;
})

export const AddRoom = createAsyncThunk('Rooms/AddRoom', async(newRoom) => {
    const room = delay(newRoom);
    return room;
})

export const RemoveRoom = createAsyncThunk('Rooms/RemoveRoom', async(id) => {
    const room = delay(id);
    return room; 
})

export const EditRoom = createAsyncThunk('Rooms/EditRoom', async(id) => {
    const room = delay(mockRooms[id]);
    return room; 
})

const Rooms = createSlice({
    name: 'Rooms',
    initialState: {
        status: 'idle',
        items: [],
        single: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetRooms.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetRooms.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetRooms.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = action.payload;
        })
        .addCase(GetRoom.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetRoom.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.single = action.payload;
        })
        .addCase(AddRoom.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(AddRoom.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(AddRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.push(action.payload);
        })
        .addCase(RemoveRoom.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(RemoveRoom.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(RemoveRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.filter(room => room.id !== action.payload);
        })
        .addCase(EditRoom.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditRoom.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditRoom.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.map(room => room.id === action.payload.id ? booking = action.payload : booking);
        })
    }
})

export default Rooms;