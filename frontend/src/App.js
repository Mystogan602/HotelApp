import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import HomePage from './components/home/HomePage';
import AllRoomsPage from './components/booking_rooms/AllRoomsPage/AllRoomsPage';
import FindBookingPage from './components/booking_rooms/FindBookingPage/FindBookingPage';
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/room" element={<AllRoomsPage />} />
          <Route path='/find-booking' element={<FindBookingPage />} />
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
