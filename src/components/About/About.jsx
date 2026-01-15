import React, { useState, useEffect } from 'react';
import './about.css';
import { FaWifi } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";
import { FaSwimmer } from "react-icons/fa";
import { MdOutlineFoodBank } from "react-icons/md";
import { PiWineFill } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { FaShower } from "react-icons/fa";
import bground2 from '../../assets/images/auro.jpg'
import signature from '../../assets/images/signature2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const imageList = [
  'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
  'https://htl-img-res-new.s3.ap-south-1.amazonaws.com/7337/20241226/1.jpg',
  'https://image-tc.galaxy.tf/wijpeg-1s2vlos73f7sa8pccipakjvm7/deluxe-king-room-1600x1067_standard.jpg?crop=89%2C0%2C1423%2C1067',
  'https://www.jeffersonhotel.com/images/content/stay/rooms/premier-room-0.jpg',
  'https://assets-news.housing.com/news/wp-content/uploads/2022/11/25115514/image10-9.jpg'
];

// Array of facilities with descriptions
const facilities = [
  { name: "Wi-Fi", icon: <FaWifi />, description: "Stay connected with our high-speed internet access available throughout the premises." },
  { name: "Breakfast", icon: <PiBowlFoodFill />, description: "Start your day with a delightful breakfast, freshly prepared just for you." },
  { name: "Buffet", icon: <MdOutlineFoodBank />, description: "Enjoy a wide selection of dishes at our delicious buffet spread." },
  { name: "Bar", icon: <PiWineFill />, description: "Sip on your favorite drinks at our well-stocked bar." },
  { name: "Pet-Friendly", icon: <MdOutlinePets />, description: "We welcome your furry friends to join you during your stay." },
  { name: "Air Conditioner", icon: <FaRegSnowflake />, description: "Stay cool and comfortable with air-conditioned rooms and spaces." },
  { name: "Private Restroom", icon: <MdFamilyRestroom />, description: "Enjoy the privacy and convenience of your own restroom." },
  { name: "Gym", icon: <CgGym />, description: "Keep up with your fitness routine at our state-of-the-art gym." },
  { name: "Shower", icon: <FaShower />, description: "Refresh yourself with a luxurious shower experience." },
  { name: "Shower", icon: <FaShower />, description: "Refresh yourself with a luxurious shower experience." },
  { name: "Shower", icon: <FaShower />, description: "Refresh yourself with a luxurious shower experience." },
  { name: "Shower", icon: <FaShower />, description: "Refresh yourself with a luxurious shower experience." }

];

const About = () => {
  const [isVisible, setIsVisible] = useState({
    firstColumn: false,
    secondColumn: false
  });

  // IntersectionObserver to trigger animations when elements come into view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "firstColumn") {
            setIsVisible((prev) => ({ ...prev, firstColumn: true }));
          } else if (entry.target.id === "secondColumn") {
            setIsVisible((prev) => ({ ...prev, secondColumn: true }));
          }
        }
      });
    }, options);

    // // Observe the elements
    // observer.observe(document.getElementById("firstColumn"));
    // observer.observe(document.getElementById("secondColumn"));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className='about container-fluid p-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        {/* Image Column */}
        {/* <div
          id="firstColumn"
          className={`col-12 col-md-12 col-lg-6 mb-4 mb-md-0 p-5 ${isVisible.firstColumn ? 'slide-left' : ''} d-none d-md-block`}
        >
          <img src={bground2} className="img-size w-100" alt="Background" style={{ maxHeight: '650px', objectFit: 'cover', borderRadius: '100px' }} />
        </div> */}
        {/* Facilities Column */}
        <div
          id="secondColumn"
          className={`col-12 col-md-12 col-lg-12 ${isVisible.secondColumn ? 'slide-right' : ''}`}
        >
          <div className='row'>
            <div className='col-md-12 col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center text-center'>
              <p className='heading text-white text-justify'>What We Provide!!!</p>
            </div>
            <div className='col-12  d-flex justify-content-center mb-4 text-center'>
              <p className='subheading text-white'>
                Discover unparalleled comfort and exceptional facilities designed to elevate your stay.
              </p>
            </div>
          </div>
          <div className='lists row d-flex'>
            {facilities.map((facility, index) => (
              <div
                key={index}
                className={`col-6 col-md-4 col-sm-6 col-xs-6 col-lg-3 mb-4 ${index === 0 ? 'fade-in' :
                  index === 1 ? 'fade-in-delay' :
                    index === 2 ? 'fade-in-delay2' : 'fade-in-delay3'}`}
              >
                <div className="card custom-card">
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <div className="icon mb-3">{facility.icon}</div>
                    <h5 className="card-title">{facility.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

       
      </div>
    </div>
  );
};

export default About;
