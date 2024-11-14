import React from 'react'
import './ProfilePage.scss'
import ApiService from '../../../service/ApiService'
import { useState } from 'react'
const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile()
                // Fetch user bookings using the fetched user Id
                const userPlusBookings = await ApiService.getUserBookings(response.user.id)
                setUser(userPlusBookings.user)
            } catch (error) {
                setError(error.response?.data?.message || error.message)
            }
        }
        fetchUserProfile()
    }, [])

    const handleLogout = () => {
        ApiService.logOut()
        navigate('/login')
    }

    const handleEditProfile = () => {
        navigate('/edit-profile')
    }

    return (
        <div className='profile-page'>
            {user && (
                <h2>Welcome, {user.name}</h2>
            )}
            <div className='profile-actions'>
                <button className='edit-profile-button' onClick={handleEditProfile}>Edit Profile</button>
                <button className='logout-button' onClick={handleLogout}>Logout</button>
            </div>
            {error && <p className='error-message'>{error}</p>}
            {user && (
                <div className='profile-details'>
                    <h3>Profile Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
            )}
            <div className='bookings-section'>
                <h3>Your Bookings</h3>
                <div className='bookings-list'>
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div className='booking-item' key={booking.id}>
                                <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                                <p><strong>Check-in Date</strong> {booking.checkInDate}</p>
                                <p><strong>Check-out Date</strong> {booking.checkOutDate}</p>
                                <p><strong>Room Type</strong> {booking.room.roomType}</p>
                                <p><strong>Total Guests</strong> {booking.totalNumberOfGuest}</p>
                                <img src={booking.roomPhotoUrl} alt={booking.room.roomType} className='room-photo'/>
                            </div>
                        ))
                    ) : (
                        <p>No bookings found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
