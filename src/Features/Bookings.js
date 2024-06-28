import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mockBookings from "../data/mockBookings";

const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
}

export const GetBookingsThunk = createAsyncThunk('Bookings/GetBookings', async() => {
    const bookings = delay(mockBookings);
    return bookings;
})

export const GetBookingThunk = createAsyncThunk('Bookings/GetBooking', async(id) => {
    const bookingId = delay(id);
    return bookingId;
})

export const AddBookingThunk = createAsyncThunk('Bookings/AddBooking', async(newBooking) => {
    const booking = delay(newBooking);
    return booking;
})

export const RemoveBookingThunk = createAsyncThunk('Bookings/RemoveBooking', async(id) => {
    const bookingId = delay(id);
    return bookingId; 
})

export const EditBookingThunk = createAsyncThunk('Bookings/EditBooking', async(updatedBooking) => {
    const newData = delay(updatedBooking);
    return newData; 
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
        .addCase(GetBookingsThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetBookingsThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetBookingsThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = action.payload;
        })
        .addCase(GetBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(GetBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(GetBookingThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.single = state.items.find(booking => booking.id === action.payload);
        })
        .addCase(AddBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(AddBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(AddBookingThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items.push(action.payload);
        })
        .addCase(RemoveBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(RemoveBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(RemoveBookingThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.filter(booking => booking.id !== action.payload);
        })
        .addCase(EditBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditBookingThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled',
            state. error = 'false',
            state.items = state.items.map(booking => booking.id === action.payload.id ? action.payload : booking);
        })
    }
})

export default Bookings;
