import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockBookings from "../data/mockBookings";

 const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500)
    })
 }

export const GetBookings = createAsyncThunk('Bookings/GetBookings', async() => {
    const Bookings = delay(mockBookings);
    return Bookings;
})

const Bookings = createSlice({
    name: 'Bookings',
    initialState: {
        status: 'idle',
        items: [],
        single: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(GetBookings.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetBookings.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetBookings.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = action.payload;
        })
    }
})

export default Bookings;
