import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './Pages/DashboardPage/DashboardPage'
import BookingsPage from './Pages/BookingsPage/BookingsPage'
import RoomsPage from './Pages/RoomsPage/RoomsPage'
import UsersPage from './Pages/UsersPage/UsersPage'
import ContactPage from './Pages/ContactPage/ContactPage'
import BookingDetailsPage from './Pages/BookingDetailsPage/BookingDetailsPage'
import AddRoomPage from './Pages/AddRoomPage/AddRoomPage'
import AddUserPage from './Pages/AddUserPage/AddUserPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DashboardPage />}/>
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="bookings/:id" element={<BookingDetailsPage />} />
        <Route path="rooms" element={<RoomsPage />}/>
        <Route path="rooms/add" element={<AddRoomPage />}/>
        <Route path="users" element={<UsersPage />}/>
        <Route path="users/add" element={<AddUserPage />}/>
        <Route path="contact" element={<ContactPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
