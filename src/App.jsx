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


const App = () => {

  const [auth, setAuth] = useState(localStorage.getItem('token'));

  const authHandler = () => {
    const token = "A1b2C3!?/"
    localStorage.setItem('token', token);
    setAuth(true);
  }

    return (
      <>
        <React.StrictMode>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="login" element={<LoginPage authHandler={authHandler}/>} />
                <Route path="" element={<ProtectedRoute auth={auth}><DashboardPage /></ProtectedRoute>} />
                <Route path="bookings" element={<ProtectedRoute auth={auth}><BookingsPage /></ProtectedRoute>} />
                <Route path="bookings/:id" element={<ProtectedRoute auth={auth}><BookingDetailsPage /></ProtectedRoute>} />
                <Route path="rooms" element={<ProtectedRoute auth={auth}><RoomsPage /></ProtectedRoute>} />
                <Route path="rooms/add" element={<ProtectedRoute auth={auth}><AddRoomPage /></ProtectedRoute>} />
                <Route path="users" element={<ProtectedRoute auth={auth}><UsersPage /></ProtectedRoute>} />
                <Route path="users/add" element={<ProtectedRoute auth={auth}><AddUserPage /></ProtectedRoute>} />
                <Route path="contact" element={<ProtectedRoute auth={auth}><ContactPage /></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </React.StrictMode>
      </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);