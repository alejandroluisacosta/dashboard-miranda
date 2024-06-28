import React, { useState } from 'react'
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
import LoginPage from './Pages/LoginPage/LoginPage'
import ProtectedRoute from './Components/ProtectedRoute'
import { AuthProvider } from './Components/Auth'
import { Provider } from 'react-redux'
import Store from './app/Store'
import AddBookingPage from './Pages/AddBookingPage'
import RoomDetailsPage from './Pages/RoomDetailsPage'
import { ToastContainer } from 'react-toastify'


const App = () => {

    return (
      <>
        <React.StrictMode>
          <AuthProvider>
            <Provider store={Store}>
              <BrowserRouter>
                <Routes>
                  <Route path="login" element={<LoginPage/>} />
                  <Route path="" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
                  <Route path="bookings/:bookingId" element={<ProtectedRoute><BookingDetailsPage /></ProtectedRoute>} />
                  <Route path="bookings/add" element={<ProtectedRoute><AddBookingPage /></ProtectedRoute>} />
                  <Route path="rooms" element={<ProtectedRoute><RoomsPage /></ProtectedRoute>} />
                  <Route path="rooms/:roomId" element={<ProtectedRoute><RoomDetailsPage /></ProtectedRoute>} />
                  <Route path="rooms/add" element={<ProtectedRoute><AddRoomPage /></ProtectedRoute>} />
                  <Route path="users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
                  <Route path="users/add" element={<ProtectedRoute><AddUserPage /></ProtectedRoute>} />
                  <Route path="contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
                </Routes>
              </BrowserRouter>
            </Provider>
            <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="light"
                />
          </AuthProvider>
        </React.StrictMode>
      </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);