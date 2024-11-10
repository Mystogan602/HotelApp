import React from 'react'
import './BookingResult.scss'
const BookingResult = ({bookingSearchResult}) => {
  return (
    <div className='booking-result'>
      {bookingSearchResult.map((booking) => (
        <div key={booking.id} className='booking-result-item'>
          <p>Room ID: {booking.roomId}</p>
          <p>User ID: {booking.userId}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>End Date: {booking.endDate}</p>
          <p>Status: {booking.status}</p>
          <Link to={`/admin/edit-booking/${booking.id}`} className='edit-link'>Edit</Link>
        </div>
      ))}
    </div>
  )
}

export default BookingResult
