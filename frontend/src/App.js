import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>

      </div>
      <Footer />
    </div>
  );
}

export default App;
