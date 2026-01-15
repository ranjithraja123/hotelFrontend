import React from 'react';
import '../AboutHotel/aboutHotel.css';
import aboutImg from '../../assets/images/abouthead.png';

const AboutHotel = () => {
  return (
    <div className="p-5">
      <div className="row aboutHotel">
        <div className="d-flex flex-column justify-content-center align-items-center text-center text-light p-3">
          <h2>Welcome to Le Métis Hotel</h2>
          <img src={aboutImg} className="img-size w-75" alt="Background" />
        </div>

        <div className="col-md-6 p-4 fs-5 text-light">
          <h3>About Us</h3>
          <p>
            Since 2025, <strong>Le Métis Hotel</strong> has been a haven of modern comfort and exceptional hospitality. Designed to cater to both leisure and business travelers, we offer a perfect blend of elegance, affordability, and personalized service.
          </p>
          <h3>Experience Unmatched Comfort</h3>
          <ul>
            <li><strong>Stylish Rooms:</strong> Plush bedding, air-conditioned spaces, and elegant decor.</li>
            <li><strong>Modern Amenities:</strong> High-speed Wi-Fi, flat-screen TVs, and spacious workstations.</li>
            <li><strong>Private Balconies:</strong> Enjoy serene views in select rooms.</li>
          </ul>
          <h3>Culinary Delights</h3>
          <ul>
            <li><strong>Breakfast:</strong> Freshly baked goods, seasonal fruits, and hot beverages.</li>
            <li><strong>All-Day Dining:</strong> Gourmet dishes with local and international flavors.</li>
            <li><strong>Cozy Cafe:</strong> Relax with coffee and indulgent desserts.</li>
          </ul>
        </div>

        <div className="col-md-6 p-4 fs-5 text-light">
          <h3>Our Facilities</h3>
          <ul>
            <li><strong>Lounge Spaces:</strong> Ideal for relaxing or working.</li>
            <li><strong>Travel Assistance:</strong> Plan your itinerary with ease.</li>
            <li><strong>Laundry Services:</strong> Convenient for long stays.</li>
            <li><strong>Business Center:</strong> Equipped with essentials for work.</li>
          </ul>
          <h3>Prime Location</h3>
          <p>
            Nestled in a tranquil yet accessible area, Le Métis is close to key attractions, offering peace and convenience.
          </p>
          <h3>Memories Await</h3>
          <p>
            At Le Métis, every detail is crafted to make your stay extraordinary. From warm hospitality to modern amenities, we ensure your visit is seamless and memorable.
          </p>
          <p><strong>Discover the charm of Le Métis—where comfort meets elegance.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default AboutHotel;
