import React from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../service/ApiService'
import './RoomResult.scss'

const RoomResult = ({ roomSearchResult }) => {
    const navigate = useNavigate();
    const isAdmin = ApiService.isAdmin();
    console.log(roomSearchResult);
    return (
        <section className='room-result'>
            {roomSearchResult && roomSearchResult.length > 0 && (
                <div className='room-list'>
                    {roomSearchResult.map((room) => (
                        
                        <div className='room-item' key={room.id}>
                            <img className='room-image' src={room.roomPhotoUrl} alt={room.roomType} />
                            <div className='room-details'>
                                <h3>{room.roomType}</h3>
                                <p>Price: ${room.roomPrice}</p>
                                <p>Description: {room.roomDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button className='edit-room-btn'
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)}>
                                        Edit room
                                    </button>
                                ) : (
                                    <button className='book-now-btn'
                                        onClick={() => navigate(`/room-details-book/${room.id}`)}>
                                        View/Book now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default RoomResult
