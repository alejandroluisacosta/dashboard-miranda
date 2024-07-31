import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockBookings from "../data/mockBookings";
import { Booking } from "../types";
import backendAPICall from '../../utils/backendAPICall';

const delay = (data: Booking | Booking[] | string): Promise<Booking | Booking[] | string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200)
    })
}

export const GetBookingsThunk = createAsyncThunk('Bookings/GetBookings', async(): Promise<Booking[]> => {
    const bookings: Booking[] = await backendAPICall('bookings') as Booking[];
    return bookings;
})

export const GetBookingThunk = createAsyncThunk('Bookings/GetBooking', async(id: string): Promise<Booking> => {
    const bookingId = await delay(id) as string;
    const booking: Booking | undefined = mockBookings.find(booking => booking.id === bookingId);
    if (!booking) 
        throw('Booking not found');
    return booking;
})

export const AddBookingThunk = createAsyncThunk('Bookings/AddBooking', async(newBooking: Booking): Promise<Booking> => {
    const booking: Booking = await delay(newBooking) as Booking;
    return booking;
})

export const RemoveBookingThunk = createAsyncThunk('Bookings/RemoveBooking', async(id: string): Promise<string> => {
    const bookingId: string = await delay(id) as string;
    if (!bookingId) 
        throw('Booking not found');
    return bookingId; 
})

export const EditBookingThunk = createAsyncThunk('Bookings/EditBooking', async(updatedBooking: Booking): Promise<Booking> => {
    const newData: Booking = await delay(updatedBooking) as Booking;
    return newData; 
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
            const removedBooking = state.items.find(booking => booking.id === action.payload);
            if (removedBooking)
                state.single = removedBooking;
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
        .addCase(EditBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
            state.status = 'fulfilled',
            state.error = 'false',
            state.items = state.items.map(booking => booking.id === action.payload.id ? action.payload : booking);
            state.single = action.payload;
        })
    }
})

export default Bookings;
