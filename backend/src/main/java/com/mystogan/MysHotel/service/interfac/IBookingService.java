package com.mystogan.MysHotel.service.interfac;

import com.mystogan.MysHotel.dto.Response;
import com.mystogan.MysHotel.entity.Booking;

public interface IBookingService {
    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
