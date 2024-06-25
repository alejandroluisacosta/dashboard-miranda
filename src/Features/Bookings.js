import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockBookings from "../data/mockBookings";

 const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
 }

export const GetBookings = createAsyncThunk('Bookings/GetBookings', async() => {
    const Bookings = delay(mockBookings);
    return Bookings;
})

export const GetBooking = createAsyncThunk('Bookings/GetBooking', async(id) => {
    const Booking = delay(mockBookings[id]);
    return Booking;
})

export const AddBooking = createAsyncThunk('Bookings/CreateBooking', async(newBooking) => {
    const Booking = delay(newBooking);
    return Booking;
})

export const RemoveBooking = createAsyncThunk('Bookings/RemoveBooking', async(id) => {
    const bookingId = delay(id);
    return bookingId; 
})

export const EditBooking = createAsyncThunk('Bookings/EditBooking', async(id) => {
    const Booking = delay(mockBookings[id]);
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
        .addCase(GetBooking.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetBooking.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.single = action.payload;
        })
        .addCase(AddBooking.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(AddBooking.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(AddBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.push(action.payload);
        })
        .addCase(RemoveBooking.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(RemoveBooking.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(RemoveBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.filter(booking => booking.identification.id !== action.payload);
        })
        .addCase(EditBooking.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditBooking.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditBooking.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.map(booking => booking.id === action.payload.id ? booking = action.payload : booking);
        })
    }
})

export default Bookings;
