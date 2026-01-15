import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRoomById } from "../../redux/roomSlice";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TopPicks({ showHeading = false, slidesToShow = 4 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}rooms/getrooms`);
      const data = await res.json();
      setRoomData(data.existingRooms || []);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  const roomDetails = (item) => {
    dispatch(getRoomById({ roomid: item._id }));
    navigate(`/room/${item._id}`);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 4,        // ✅ 4 cards desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="relative py-24 w-full">

      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

      {/* FULL WIDTH CONTAINER */}
      <div className="relative z-10 w-full px-8">

        {/* Heading */}
        <h2 className="text-center text-4xl font-light tracking-wide text-white mb-16">
          {showHeading ? "Similar Picks" : "Top Picks"}
        </h2>

        {/* Slider */}
        <Slider {...settings}>
          {roomData.map((item) => (
            <div key={item._id} className="px-3">
              <div className="group relative h-[420px] rounded-3xl overflow-hidden shadow-2xl">

                {/* Image */}
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}uploads/${item.filepaths?.[0]}`}
                  alt={item.roomType}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 w-full p-6 text-white">
                  <h3 className="text-2xl font-semibold tracking-wide">
                    {item.roomType}
                  </h3>

                  <div className="mt-2 flex justify-between items-center text-sm text-gray-200">
                    <span className="italic truncate w-2/3">
                      {item.availabilities?.slice(0, 40)}...
                    </span>
                    <span>{item.members} guests</span>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        roomDetails(item);
                      }}
                      className="
    px-8 py-2.5 rounded-full
    bg-[#c9b27c]/90 text-black
    font-medium tracking-wide
    backdrop-blur-md
    hover:bg-white hover:scale-105
    transition-all duration-300
  "
                    >
                      Explore
                    </button>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
