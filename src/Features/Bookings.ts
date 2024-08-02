import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Booking, BookingInput } from "../types";
import backendAPICall from '../../utils/backendAPICall';

export const GetBookingsThunk = createAsyncThunk('Bookings/GetBookings', async(): Promise<Booking[]> => {
    const { bookings } = await backendAPICall<{bookings: Booking[]}>('bookings');
    return bookings;
})

export const GetBookingThunk = createAsyncThunk('Bookings/GetBooking', async(id: string): Promise<Booking> => {
    const { booking } = await backendAPICall<{booking: Booking}>(`bookings/${id}`, 'GET');
    if (!booking) 
        throw('Booking not found');
    return booking;
})

export const AddBookingThunk = createAsyncThunk('Bookings/AddBooking', async(newBooking: BookingInput): Promise<Booking> => {
    const { booking } = await backendAPICall<{booking: Booking}>('bookings', 'POST', newBooking);
    return booking;
})

export const RemoveBookingThunk = createAsyncThunk('Bookings/RemoveBooking', async(id: string): Promise<string> => {
    await backendAPICall(`bookings/${id}`, 'DELETE');
    return id;
})

export const EditBookingThunk = createAsyncThunk('Bookings/EditBooking', async(updatedBooking: Booking): Promise<Booking> => {
    const { booking } = await backendAPICall<{booking: Booking}>(`bookings/${updatedBooking._id}`, 'PUT', updatedBooking);
    return booking; 
})

interface BookingsState {
    status: string;
    items: Booking[];
    single: Booking;
    error: string | null;
}

const initialState: BookingsState = {
    status: 'idle',
    items: [] as Booking[],
    single: {} as Booking,
    error: null,
}

const Bookings = createSlice({
    name: 'Bookings',
    initialState,
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
        .addCase(GetBookingsThunk.fulfilled, (state, action: PayloadAction<Booking[]>) => {
            state.status = 'fulfilled',
            state.error = 'false',
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
        .addCase(GetBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
            state.status = 'fulfilled',
            state.error = 'false',
            state.single = action.payload;
        })
        .addCase(AddBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(AddBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(AddBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
            state.status = 'fulfilled',
            state.error = 'false',
            state.items.push(action.payload);
            state.single = action.payload;
        })
        .addCase(RemoveBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(RemoveBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(RemoveBookingThunk.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = 'fulfilled';
            state.error = 'false';
            state.items = state.items.filter(booking => booking._id !== action.payload);
        })
        .addCase(EditBookingThunk.pending, state => {
            state.status = 'pending';
            state.error = 'false';
        })
        .addCase(EditBookingThunk.rejected, state => {
            state.status = 'rejected';
            state.error = 'true';
        })
        .addCase(EditBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
            state.status = 'fulfilled',
            state.error = 'false',
            state.items = state.items.map(booking => booking._id === action.payload._id ? action.payload : booking);
            state.single = action.payload;
        })
    }
})

export default Bookings;
