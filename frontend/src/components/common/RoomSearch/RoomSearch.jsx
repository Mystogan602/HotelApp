import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ApiService from '../../../service/ApiService'
import './RoomSearch.scss'

const RoomSearch = ({ handleSearchResult }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [roomType, setRoomType] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        }
        fetchRoomTypes();
    }, []);

    //this method is going to be used to show error message
    const showError = (message, timeout = 5000) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, timeout);
    }

    //this is going to be used to fetch available rooms database based on search data
    const handleInternalSearch = async () => {
        if (!startDate || !endDate || !roomType) {
            showError('Please fill in all fields');
            return false;
        }
        try {
            // convert startDate and endDate to the desired format
            const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
            const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
            // Call the API to get available rooms based on the search criteria
            const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);
            // Check if the response is successful
            if (response.statusCode === 200) {
                if (response.roomList.length === 0) {
                    showError('No rooms found for the selected dates and type');
                    return;
                }
                handleSearchResult(response.roomList);
                setError('');
            }
        } catch (error) {
            showError('An error occurred:', error.response.data.message);
        }
    }
    return (
        <section>
            <div className='search-container'>
                <div className='search-fields'>
                    <label htmlFor="checkInDate">Check-in Date</label>
                    <DatePicker id='checkInDate'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat='dd-MM-yyyy'
                        placeholderText='Select check-in date'
                    />
                </div>
                <div className='search-fields'>
                    <label htmlFor="checkOutDate">Check-out Date</label>
                    <DatePicker id='checkOutDate'
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat='dd-MM-yyyy'
                        placeholderText='Select check-out date'
                    />
                </div>
                <div className='search-fields'>
                    <label htmlFor="roomType">Room Type</label>
                    <select id='roomType' value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                        <option disabled value=''>Select room type</option>
                        {roomTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <button className='search-btn' onClick={handleInternalSearch}>Search Rooms</button>
            </div>
            {error && <p className='error-message'>{error}</p>}
        </section>
    )
}

export default RoomSearch
