import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import {
  FaWifi,
  FaSmokingBan,
  FaPaw,
  FaUsers,
  FaRulerCombined,
} from "react-icons/fa";

import TopPicks from "../TopPicks/TopPicks";

const Details = () => {
  const { id } = useParams();
  const roomState = useSelector((state) => state.room);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (roomState?.data?.existingRooms) {
      setRoom(roomState.data.existingRooms);
    }
  }, [roomState]);

  if (!room) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b0b0b] text-white">
        Loading…
      </div>
    );
  }

  return (
    /* 🔴 PAGE BACKGROUND — FULL WIDTH */
    <main className="w-full min-h-screen text-white bg-black/50 backdrop-blur-2xl">

      {/* ================= IMAGE STRIP (FULL WIDTH) ================= */}
      <section className="w-full px-6 pt-16">
        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
          }}
        >
          {room.filepaths.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-[220px] rounded-xl overflow-hidden bg-black">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}uploads/${img}`}
                  alt="Room"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= HEADER ================= */}
      <section className="w-full px-6 pt-16">
        <div className="max-w-7xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-400 mb-4">
            Le Métisse Stay
          </p>

          <h1 className="text-4xl md:text-5xl font-extralight tracking-wide">
            {room.roomType}
          </h1>
{/* 
          <p className="mt-6 max-w-3xl text-gray-300 leading-loose">
            A refined space designed for comfort, calm, and understated luxury.
          </p> */}
        </div>
      </section>

      {/* ================= CONTENT GRID ================= */}
      <section className="w-full px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-20">

            {/* EXPERIENCE */}
            <div className="bg-white/3 border border-white/5 rounded-2xl p-8">
              <h2 className="text-2xl font-light mb-6">The Experience</h2>
              <p className="text-gray-300 text-lg leading-loose">
                {room.availabilities}
              </p>
            </div>

            {/* ROOM DETAILS */}
            <div className="bg-white/3 border border-white/5 rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-gray-300">
              <div className="flex items-center gap-3">
                <FaUsers className="text-[#c9b27c]" />
                {room.members} Guests
              </div>

              <div className="flex items-center gap-3">
                <FaRulerCombined className="text-[#c9b27c]" />
                {room.areaInSqft || "—"} sq.ft
              </div>

              <div className="flex items-center gap-3">
                <FaWifi className="text-[#c9b27c]" />
                High-speed Wi-Fi
              </div>
            </div>

            {/* AMENITIES */}
            <div className="bg-white/3 border border-white/5 rounded-2xl p-8">
              <h2 className="text-2xl font-light mb-8">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 text-gray-300">
                {room.amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 bg-[#c9b27c] rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* POLICIES */}
            <div className="bg-white/3 border border-white/5 rounded-2xl p-8 flex gap-14 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <FaSmokingBan /> Non-Smoking
              </span>
              <span className="flex items-center gap-2">
                <FaPaw /> Pets Not Allowed
              </span>
            </div>
          </div>

          {/* PRICE CARD */}
          <div className="sticky top-28 h-fit">
            <div className="bg-white/4 border border-white/5 rounded-3xl p-10">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-4">
                Starting from
              </p>

              <h3 className="text-5xl font-light mb-2">₹300</h3>
              <p className="text-gray-400 mb-8">per night</p>

              <div className="space-y-4 text-sm text-gray-300 border-t border-white/5 pt-6">
                <p>Check-in: 12:00 PM</p>
                <p>Check-out: 12:00 PM</p>
              </div>

              <button className="mt-10 w-full py-4 rounded-full bg-[#c9b27c] text-black font-medium tracking-wide hover:bg-[#e6d8a8] transition">
                Reserve Your Stay
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= TOP PICKS ================= */}
      <section className="w-full py-28 bg-white/2">
        <div className="px-6">
          <TopPicks showHeading={true} slidesToShow={2} />
        </div>
      </section>

    </main>
  );
};

export default Details;
