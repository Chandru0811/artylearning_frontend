import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function TopBar() {
  return (
    <section className="pt-1 pb-2 px-3 mb-2 bg-dark text-white">
      <div className="container-fluid">
        <div className="row" style={{ verticalAlign: "center" }}>
          <div className="col-md-5 col-12 center-align-content">
            <span className="social-icons">
              <FaFacebookF />
            </span>
            <span className="social-icons">
              <FaInstagram />
            </span>
          </div>
          <div className="col-md-5 col-12 center-align-content d-flex align-items-center justify-content-end">
            <span>
              <small>
                Hours: Tue - Fri, 2.30pm - 8.30pm | Sat - Sun, 9am - 6pm
              </small>
            </span>
          </div>
          <div className="col-md-2 col-12 center-align-content d-flex align-items-center justify-content-center">
            <span>
              <small>+65 8821 4153</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar;
