import React, { useState } from 'react'
import './FindBookingPage.scss'
import ApiService from '../../../service/ApiService'

const FindBookingPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('')
    const [bookingDetails, setBookingDetails] = useState(null)
    const [error, setError] = useState(null)

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError('Please enter a confirmation code')
            setTimeout(() => {
                setError(null)
            }, 5000)
            return
        }
        try {
            const response = await ApiService.getBookingByConfirmationCode(confirmationCode)
            setBookingDetails(response.booking)
        } catch (error) {
            setError(error.response?.data?.message || error.message)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }

    return (
        <div className='find-booking-page'>
            <h2>Find Booking</h2>
            <div className='search-container'>
                <input
                    required
                    type='text'
                    placeholder='Enter Confirmation Code'
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {bookingDetails && (
                <div className='booking-details'>
                    <h3>Booking Details</h3>
                    <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                    <p>Check-in Date: {bookingDetails.checkInDate}</p>
                    <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                    <p>Number of Adults: {bookingDetails.numberOfAdults}</p>
                    <p>Number of Children: {bookingDetails.numberOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Details</h3>
                    <>
                        <p>Name: {bookingDetails.user.name}</p>
                        <p>Email: {bookingDetails.user.email}</p>
                        <p>Phone: {bookingDetails.user.phoneNumber}</p>
                    </>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <>
                        <p>Room Type: {bookingDetails.room.roomType}</p>
                        <img src={bookingDetails.room.roomPhotoUrl} alt={bookingDetails.room.roomType} />
                    </>

                </div>
            )}
        </div>
    )
}

export default FindBookingPage
