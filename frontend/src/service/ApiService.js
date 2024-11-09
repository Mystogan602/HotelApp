import axios from "axios"

export default class ApiService {

    static BASE_URL = "http://localhost:4040"

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    // AUTH

    // This register a new user
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    // This login a registered user
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    // USERS

    // This is to get the user profile
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    // this is to get a single user
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    // this is to get user bookings by the user id
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    // this is to delete a user
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    // ROOMS
    // This adds a new room to the database
    static async addRoom(formData) {
        const response = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
            headers: {
                ...this.getHeader(),
                "Content-Type": "multipart/form-data"
            }
        })
        return response.data
    }

    // This gets all available rooms
    static async getAllAvailableRooms() {
        const response = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`)
        return response.data
    }

    //This gets all rooms by dates and rooms from the database with a given date range and a room type
    static async getAvailableRoomsByDateAndType(checkInDate, checkOutDate, roomType) {
        const response = await axios.get(
            `${this.BASE_URL}/rooms/get-rooms-by-date-and-type/?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return response.data
    }

    //This gets all room types from the database
    static async getAllRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`)
        return response.data
    }

    //This gets all rooms from the database
    static async getAllRooms() {
        const response = await axios.get(`${this.BASE_URL}/rooms/all`)
        return response.data
    }

    // This gets a room by id
    static async getRoomById(roomId) {
        const response = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`)
        return response.data
    }

    // This deletes a room by id
    static async deleteRoom(roomId) {
        const response = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    //This updates a room
    static async updateRoom(roomId, formData) {
        const response = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: { ...this.getHeader(), "Content-Type": "multipart/form-data" }
        })
        return response.data
    }

    // BOOKINGS
    // This saves a booking to the database
    static async bookRoom(roomId, userId, booking) {
        const response = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
            headers: this.getHeader()
        })
        return response.data
    }

    // This gets all bookings
    static async getAllBookings() {
        const response = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        })
        return response.data
    }

    // This get booking by the confirmation code 
    static async getBookingByConfirmationCode(confirmationCode) {
        const response = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${confirmationCode}`)
        return response.data
    }

    // This is to cancel a booking
    static async cancelBooking(bookingId) {
        const response = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        })
        return response.data
    }

    // AUTHENTICATION CHECK
    static logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
    }

    static isAuthenticated() {
        const token = localStorage.getItem("token")
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem("role")
        return role === "ADMIN"
    }

    static isUser() {
        const role = localStorage.getItem("role")
        return role === "USER"
    }
}