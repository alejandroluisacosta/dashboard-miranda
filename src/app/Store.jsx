import { configureStore } from "@reduxjs/toolkit";
import Bookings from "../Features/Bookings";

const Store = configureStore({
    reducer: {
        Bookings: Bookings.reducer,
    }
})

export default Store;