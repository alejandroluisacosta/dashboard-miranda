import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockRooms from "../data/mockRooms";
import { Room } from '../types';

const delay = (data: Room | Room[] | string): Promise<Room | Room[] | string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
}

export const GetRoomsThunk = createAsyncThunk('Rooms/GetRooms', async(): Promise<Room[]> => {
    const rooms: Room[] = await delay(mockRooms) as Room[];
    return rooms;
})

export const GetRoomThunk = createAsyncThunk('Rooms/GetRoom', async(id: string): Promise<Room> => {
    const roomId = await delay(id);
    const room: Room | undefined = mockRooms.find(room => room.id === roomId);
    if (!room)
        throw('Room not found');
    return room;
})

export const AddRoomThunk = createAsyncThunk('Rooms/AddRoom', async(newRoom: Room): Promise<Room> => {
    const room: Room = await delay(newRoom) as Room;
    return room;
})

export const RemoveRoomThunk = createAsyncThunk('Rooms/RemoveRoom', async(id: string): Promise<string> => {
    const roomId: string = await delay(id) as string;
    return roomId; 
})

export const EditRoomThunk = createAsyncThunk('Rooms/EditRoom', async(updatedRoom: Room): Promise<Room> => {
    const room: Room = await delay(updatedRoom) as Room;
    return room; 
})

interface RoomState {
    status: string;
    items: Room[];
    single: Room;
    error: string | null;    
}

const initialState: RoomState = {
    status: 'idle',
    items: [] as Room[],
    single: {} as Room,
    error: null,
}

const Rooms = createSlice({
    name: 'Rooms',
    initialState,
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
        .addCase(GetRoomsThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
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
        .addCase(GetRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
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
        .addCase(AddRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
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
        .addCase(RemoveRoomThunk.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = 'fulfilled';
            state. error = 'false';
            const removedRoom = state.items.find(room => room.id === action.payload);
            if (removedRoom)
                state.single = removedRoom;
            state.items = state.items.filter(room => room.id !== action.payload);
        })
        .addCase(EditRoomThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditRoomThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.map(room => room.id === action.payload.id ? room = action.payload : room);
            state.single = action.payload;
        })
    }
})

export default Rooms;