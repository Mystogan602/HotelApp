import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ApiService from '../../../service/ApiService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './RoomDetailsPage.scss'
const RoomDetailsPage = () => {
    const { roomId } = useParams() // get room ID from URL params
    const navigate = useNavigate() // Access navigation functions 
    const [roomDetails, setRoomDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true) // State to handle loading
    const [error, setError] = useState(null) // State to handle error
    const [checkInDate, setCheckInDate] = useState(null)// State to handle check-in date
    const [checkOutDate, setCheckOutDate] = useState(null)// State to handle check-out date
    const [numAdults, setNumAdults] = useState(1)// State to handle number of adults
    const [numChildren, setNumChildren] = useState(0)// State to handle number of children
    const [totalPrice, setTotalPrice] = useState(0)// State to handle total price
    const [totalGuests, setTotalGuests] = useState(1)// State to handle total guests
    const [showDatePicker, setShowDatePicker] = useState(false)// State to handle date picker visibility
    const [userId, setUserId] = useState('')// State to handle user ID
    const [showMessage, setShowMessage] = useState(false)// State to handle message visibility
    const [confirmationCode, setConfirmationCode] = useState('')// State to handle confirmation code
    const [errorMessage, setErrorMessage] = useState('')// State to handle error message

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)// Set loading to true
                const response = await ApiService.getRoomById(roomId)
                setRoomDetails(response.room)// Set room details in state
                const userProfile = await ApiService.getUserProfile()
                setUserId(userProfile.user.id)// Set user ID in state
            } catch (error) {
                setError(error.response?.data?.message || error.message)// Set error message in state
            } finally {
                setIsLoading(false)// Set loading to false
            }
        }
        fetchData()
    }, [roomId])

    const handleConfirmBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            setErrorMessage('Please select check-in and check-out dates')
            setTimeout(() => {
                setErrorMessage('')
            }, 5000) // Clear error message after 5 seconds
            return
        }

        //Check if number of adults and children are valid
        if (isNaN(numAdults) || isNaN(numChildren) || numAdults < 1 || numChildren < 0) {
            setErrorMessage('Please enter a valid number of adults and children')
            setTimeout(() => {
                setErrorMessage('')
            }, 5000) // Clear error message after 5 seconds
            return
        }

        // Calculate number of days 
        const oneDay = 24 * 60 * 60 * 1000 // One day in milliseconds
        const startDate = new Date(checkInDate)
        const endDate = new Date(checkOutDate)
        const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay) + 1)

        // Calculate total price
        const roomPricePerNight = roomDetails.roomPrice
        const totalPrice = roomPricePerNight * totalDays

        // Calculate total guests
        const totalGuests = numAdults + numChildren

        setTotalPrice(totalPrice)
        setTotalGuests(totalGuests)
    }

    const acceptBooking = async () => {
        try {

            // Convert check-in and check-out dates to Date objects
            const startDate = new Date(checkInDate)
            const endDate = new Date(checkOutDate)

            // Log the original dates 
            console.log('Start Date:', startDate)
            console.log('End Date:', endDate)

            // Convert dates to YYYY-MM-DD format, adjust for timezone difference
            const formattedCheckInDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]
            const formattedCheckOutDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]

            // Log the formatted dates
            console.log('Formatted Start Date:', formattedCheckInDate)
            console.log('Formatted End Date:', formattedCheckOutDate)

            // Create booking object
            const booking = {
                checkInDate: formattedCheckInDate,
                checkOutDate: formattedCheckOutDate,
                numAdults: numAdults,
                numChildren: numChildren,
            }
            console.log('Booking:', booking)

            // Send booking request to server
            const response = await ApiService.bookRoom(roomId, userId, booking)
            if (response.status === 200) {
                setConfirmationCode(response.bookingConfirmationCode)
                setShowMessage(true)
                setTimeout(() => {
                    setShowMessage(false)
                    navigate('/rooms')
                }, 10000)
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message)
            setTimeout(() => {
                setErrorMessage('')
            }, 5000)
        }
    }

    if (isLoading) {
        return <p className='room-details-loading'>Loading...</p>
    }

    if (error) {
        return <p className='room-details-loading'>{error}</p>
    }

    if (!roomDetails) {
        return <p className='room-details-loading'>Room not found</p>
    }

    const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails

    return (
        <div className='room-details-booking'>
            {showMessage &&
                <p className='booking-success-message'>
                    Booking confirmed with confirmation code: {confirmationCode}. An SMS and email of your booking details has been sent to you
                </p>}
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <h2>Room details</h2>
            <br />
            <img src={roomPhotoUrl} alt={roomType} className='room-details-image' />
            <div className='room-details-info'>
                <h3>Room type: {roomType}</h3>
                <p>Price per night: ${roomPrice}/night</p>
                <p>Description: {description}</p>
            </div>
            {bookings && bookings.length > 0 && (
                <>
                    <h3>Existing booking details:</h3>
                    <ul className='booking-list'>
                        {bookings.map((booking, index) => (
                            <li key={booking.id} className='booking-item'>
                                <span className='booking-number'>Booking {index + 1}:</span>
                                <span className='booking-text'>Check-in date: {booking.checkInDate}</span>
                                <span className='booking-text'>Check-out date: {booking.checkOutDate}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <div className='booking-info'>
                <button className='book-now-button' onClick={() => setShowDatePicker(true)}>Book now</button>
                <button className='go-back-button' onClick={() => setShowDatePicker(false)}>Go back</button>
                {showDatePicker && (
                    <div className='date-picker-container'>
                        <DatePicker
                            className='detail-search-field'
                            selected={checkInDate}
                            onChange={(date) => setCheckInDate(date)}
                            selectsStart
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            placeholderText='Check-in date'
                            dateFormat='dd/MM/yyyy'
                        />
                        <DatePicker
                            className='detail-search-field'
                            selected={checkOutDate}
                            onChange={(date) => setCheckOutDate(date)}
                            selectsEnd
                            startDate={checkInDate}
                            endDate={checkOutDate}
                            placeholderText='Check-out date'
                            dateFormat='dd/MM/yyyy'
                        />

                        <div className='guest-container'>
                            <div className='guest-div'>
                                <label htmlFor='numAdults'>Adults:</label>
                                <input
                                    type='number'
                                    id='numAdults'
                                    value={numAdults}
                                    onChange={(e) => setNumAdults(parseInt(e.target.value))}
                                />
                            </div>
                            <div className='guest-div'>
                                <label htmlFor='numChildren'>Children:</label>
                                <input
                                    type='number'
                                    id='numChildren'
                                    value={numChildren}
                                    onChange={(e) => setNumChildren(parseInt(e.target.value))}
                                />
                            </div>
                            <button className='confirm-booking' onClick={handleConfirmBooking}>Confirm booking</button>
                        </div>
                    </div>
                )}
                {totalPrice > 0 && (
                    <div className='total-price'>
                        <p>Total price: ${totalPrice}</p>
                        <p>Total guests: {totalGuests}</p>
                        <button className='accept-booking' onClick={acceptBooking}>Accept booking</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoomDetailsPage
