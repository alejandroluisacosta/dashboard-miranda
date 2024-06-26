import { configureStore } from "@reduxjs/toolkit";
import Bookings from "../Features/Bookings";
import Rooms from "../Features/Rooms";

const Store = configureStore({
    reducer: {
        Bookings: Bookings.reducer,
        Rooms: Rooms.reducer,
    }
})

export default Store;