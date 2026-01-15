import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Footer/footer.css";

const Footer = () => {
  return (
    <footer className="foot text-white pt-5">
      <div className="container">
        <div className="row gy-4 align-items-start">

          {/* Contact Details */}
          <div className="col-sm-12 col-md-6">
            <h5 className="mb-3">Contact Us</h5>

            <address className="mb-3">
              <strong>Address:</strong><br />
              48, Labourdodonnais Street,<br />
              Puducherry, India – 605001
            </address>

            <p className="mb-2">
              <strong>Phone:</strong> +91 94434 13545
            </p>

            <p className="mb-0">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@example.com" className="text-white text-decoration-none">
                info@example.com
              </a>
            </p>
          </div>

          {/* Google Map */}
          <div className="col-sm-12 col-md-6">
            <h5 className="mb-3">Find Us</h5>

            <div className="map-container rounded overflow-hidden shadow-sm">
              <iframe
                title="Le Métis Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.690160321934!2d79.8293135747799!3d11.92663763692659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5362298737f79f%3A0xc8a4a0c89241b22a!2s48%2C%20La%20Bourdonnais%20St%2C%20White%20Town%2C%20Puducherry%2C%20605001!5e0!3m2!1sen!2sin!4v1736068743974!5m2!1sen!2sin"
                width="100%"
                height="230"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-3 mt-5 bg-secondary">
        <p className="mb-0 small">
          © {new Date().getFullYear()} <strong>Le Métis</strong>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
