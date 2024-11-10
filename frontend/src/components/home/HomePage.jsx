import React, { useState } from 'react'
import RoomResult from "../common/RoomResult/RoomResult"
import RoomSearch from "../common/RoomSearch/RoomSearch"
import ServiceCard from '../common/ServiceCard/ServiceCard'
import './HomePage.scss'


const HomePage = () => {
  const [roomSearchResult, setRoomSearchResult] = useState([]);

  //Function to handle search result
  const handleSearchResult = (result) => {
    setRoomSearchResult(result);
  }

  return (
    <div className='home'>
      {/* HEADER/ BANNER ROOM SECTION */}
      <section>
        <header className='header-banner'>
          <img src="./assets/images/hotel.webp" alt="Mys hotel" className='header-image' />
          <div className='overlay'></div>
          <div className='animated-texts overlay-content'>
            <h1>Welcome to <span className='mys-color'>Mys Hotel</span></h1>
            <br />
            <h3>Experience luxury and comfort at our hotel</h3>
          </div>
        </header>
      </section>

      {/* SEARCH/FIND AVAILABLE ROOMS SECTION */}
      <RoomSearch handleSearchResult={handleSearchResult} />
      <RoomResult roomSearchResult={roomSearchResult} />

      <h4><a className='view-rooms-home' href="/rooms">All Rooms</a></h4>

      <h2 className='home-services'>Services at <span className='mys-color'>Mys Hotel</span></h2>

      {/* SERVICES SECTION */}
      <section className='services-section'>
        <ServiceCard
          imageUrl="./assets/images/ac.png"
          imageAlt="Air Conditioning"
          title="Air Conditioning"
          description="Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning"
        />
        <ServiceCard
          imageUrl="./assets/images/mini-bar.png"
          imageAlt="Mini Bar"
          title="Mini Bar"
          description="Enjoy a refreshing drink or snack from our well-stocked mini bar with no additional cost."
        />
        <ServiceCard
          imageUrl="./assets/images/parking.png"
          imageAlt="Parking"
          title="Parking"
          description="Secure and convenient parking is available on site for our guests. Please inquire about valet parking options if available"
        />
        <ServiceCard
          imageUrl="./assets/images/wifi.png"
          imageAlt="Wifi"
          title="Wifi"
          description="Stay connected with our complimentary high-speed wifi throughout the hotel in all rooms and public areas."
        />
      </section>
    </div>
  )
}

export default HomePage
