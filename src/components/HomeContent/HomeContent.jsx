import React, { useEffect, useState } from "react";
import "./homecontent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast from "react-hot-toast";

// 🔹 Other components
import TopPicks from "../TopPicks/TopPicks";
import Facilities from "../Facilities/Facilities";
import About from "../About/About";
import Reviews from "../Reviews/Reviews";
// import Gallery from "../Gallery/Gallery";

const HomeContent = () => {
  const text = "Enjoy Your Dream Vacation And Homestay";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [roomType, setRoomType] = useState("");

  // 🔹 Typing animation
  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  // 🔹 Convert local date to UTC safely (timezone-proof)
  const convertLocalDateToUTC = (date, isEnd = false) => {
    const localDate = new Date(date);

    if (isEnd) {
      localDate.setHours(23, 59, 59, 999);
    } else {
      localDate.setHours(0, 0, 0, 0);
    }

    return new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
        localDate.getHours(),
        localDate.getMinutes(),
        localDate.getSeconds(),
        localDate.getMilliseconds()
      )
    ).toISOString();
  };

  // 🔹 Enquiry submit
  const handleEnquireClick = async () => {
    if (!fromDate || !toDate || !email || !phone || !adults || !roomType) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      fromDate: convertLocalDateToUTC(fromDate),       // UTC start of day
      toDate: convertLocalDateToUTC(toDate, true),     // UTC end of day
      email,
      phoneNumber: phone,
      adults: Number(adults),
      children: Number(children || 0),
      roomType,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}rooms/inquiry`, payload);
      toast.success("Inquiry submitted successfully");

      setFromDate(null);
      setToDate(null);
      setEmail("");
      setPhone("");
      setAdults("");
      setChildren("");
      setRoomType("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <>
      {/* 🔹 HERO / ENQUIRY SECTION */}
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-3xl rounded-3xl bg-white/30 backdrop-blur-xl shadow-2xl p-8 md:p-12 text-center">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-8 tracking-wide">
            {displayedText}
          </h1>

          {/* From Date */}
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            minDate={new Date()}
            placeholderText="From Date"
            className="w-full h-14 rounded-full px-6 text-base bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="yyyy-MM-dd"
          />

          {/* To Date */}
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            minDate={fromDate || new Date()}
            placeholderText="To Date"
            className="w-full h-14 rounded-full px-6 mt-4 text-base bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="yyyy-MM-dd"
            disabled={!fromDate}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 rounded-full px-6 mt-4 bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full h-14 rounded-full px-6 mt-4 bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Adults & Children */}
          <div className="flex gap-4 mt-4">
            <input
              type="number"
              placeholder="Adults"
              className="w-1/2 h-14 rounded-full px-6 bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
            />
            <input
              type="number"
              placeholder="Children"
              className="w-1/2 h-14 rounded-full px-6 bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </div>

          {/* Room Type */}
          <select
            className="w-full h-14 rounded-full px-6 mt-4 bg-white/90 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Select Room Type</option>
            <option value="Standard">Standard</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
          </select>

          {/* Button */}
          <div className="mt-9">
            <button
              onClick={handleEnquireClick}
              className="w-44 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Inquire
            </button>
          </div>

        </div>
      </div>

      {/* 🔹 OTHER SECTIONS */}
      <TopPicks />
      <Facilities />
      <About />
      {/* <Gallery /> */}
      <Reviews />
    </>
  );
};

export default HomeContent;
