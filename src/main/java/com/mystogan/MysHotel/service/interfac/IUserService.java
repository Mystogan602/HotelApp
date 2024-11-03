package com.mystogan.MysHotel.service.interfac;

import com.mystogan.MysHotel.dto.LoginRequest;
import com.mystogan.MysHotel.dto.Response;
import com.mystogan.MysHotel.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
