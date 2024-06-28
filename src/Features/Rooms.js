import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockRooms from "../data/mockRooms";
import { useSelector } from "react-redux";

const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
}

export const GetRoomsThunk = createAsyncThunk('Rooms/GetRooms', async() => {
    const rooms = delay(mockRooms);
    return rooms;
})

export const GetRoomThunk = createAsyncThunk('Rooms/GetRoom', async(id) => {
    const roomId = delay(id);
    const room = mockRooms.find(room => room.id === id);
    return room;
})

export const AddRoomThunk = createAsyncThunk('Rooms/AddRoom', async(newRoom) => {
    const room = delay(newRoom);
    return room;
})

export const RemoveRoomThunk = createAsyncThunk('Rooms/RemoveRoom', async(id) => {
    const room = delay(id);
    return room; 
})

export const EditRoomThunk = createAsyncThunk('Rooms/EditRoom', async(updatedRoom) => {
    const room = delay(updatedRoom);
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
        .addCase(GetRoomsThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetRoomsThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetRoomsThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = action.payload;
        })
        .addCase(GetRoomThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetRoomThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetRoomThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.single = action.payload;
        })
        .addCase(AddRoomThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(AddRoomThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(AddRoomThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.push(action.payload);
            state.single = action.payload;
        })
        .addCase(RemoveRoomThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(RemoveRoomThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(RemoveRoomThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.filter(room => room.id !== action.payload);
            state.single = action.payload;
        })
        .addCase(EditRoomThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditRoomThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditRoomThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.map(room => room.id === action.payload.id ? room = action.payload : room);
            state.single = action.payload;
        })
    }
})

export default Rooms;