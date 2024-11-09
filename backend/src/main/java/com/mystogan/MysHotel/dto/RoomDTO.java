package com.mystogan.MysHotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomDTO {

    private Long id;
    private String roomType;
    private String roomDescription;
    private String roomPhotoUrl;
    private BigDecimal roomPrice;
    private List<BookingDTO> bookings;


}
