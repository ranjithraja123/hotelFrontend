import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import toast from "react-hot-toast";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  const getReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}rooms/getReviews`);
      if (res?.data?.reviews) {
        setReviews(res.data.reviews);
      }
    } catch {
      toast.error("Unable to load reviews");
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <section className="relative w-full h-[360px] overflow-hidden">
      
      {/* 🌴 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/palms.jpg')" // replace with your existing image
        }}
      />

      {/* Dark Gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50" />

      {/* ✨ Glossy Glass Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div
          className="
            w-full max-w-7xl
            rounded-3xl
            bg-white/15
            backdrop-blur-2xl
            border border-white/25
            shadow-[0_30px_90px_rgba(0,0,0,0.45)]
            px-12 py-12
          "
        >
          <Slider {...settings}>
            {reviews.map((item, index) => (
              <div key={item._id || index} className="px-6">
                
                {/* Review */}
                <div className="text-center">
                  <p className="text-white/90 text-lg italic leading-relaxed">
                    “{item.feedback}”
                  </p>

                  <div className="mx-auto my-6 h-px w-16 bg-white/40"></div>

                  <h4 className="text-white font-semibold tracking-wide">
                    {item.name}
                  </h4>
                </div>

              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
