import Register from "./components/Register/Register";
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import HomeContent from "./components/HomeContent/HomeContent";
import About from "./components/About/About";
import TopPicks from "./components/TopPicks/TopPicks";
import Footer from "./components/Footer/Footer";
import Reviews from "./components/Reviews/Reviews";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Routes, Route } from "react-router-dom";

import Details from "./components/Details/Details";
import AboutHotel from "./components/AboutHotel/AboutHotel";
import AddRooms from "./components/AddRooms/AddRooms";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./../src/i18n/i18n.js"; // Import i18n config
import Facilities from "./components/Facilities/Facilities.jsx";
import Inquiries from "./components/Inquiries/Inquries.jsx";




function App() {
  return (
    <div className="">
      <Toaster position="top-right" /> 
      <div className="sticky-top">
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<HomeContent />} />
        <Route path="/room/:id" element={<Details />} />
        <Route path="/abouthotel" element={<AboutHotel />} />
        <Route path="/addRooms" element={<AddRooms />} />
                <Route path="/admin/inquiries" element={<Inquiries />} />

        

        
      </Routes>
      <Footer />
      {/* <div className="p-5">
        <Register />
      </div> */}
    </div>

  );
}

export default App;
