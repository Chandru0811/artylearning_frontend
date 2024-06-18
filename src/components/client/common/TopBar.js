import React, { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../config/URL";

function TopBar() {

  const [data, setData] = useState({});
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHeaderSavePublish`);
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
  }, []);

  return (
    <section className="pt-1 pb-2 px-3 mb-2 bg-dark text-white">
      <div className="container-fluid">
        <div className="row" style={{ verticalAlign: "center" }}>
          <div className="col-md-5 col-12 center-align-content">

            <Link to={data.facebookLink || "https://www.facebook.com/artylearning/reviews"} className="text-white">
            <span className="social-icons">
              <FaFacebookF />
            </span>
            </Link>

            <Link to={data.instagramLink || "https://www.instagram.com/artylearning/"} className="text-white">
            <span className="social-icons">
              <FaInstagram />
            </span>
            </Link>
            
          </div>
          <div className="col-md-5 col-12 center-align-content d-flex align-items-center justify-content-end">
            <span>
              <small>
                {data.dateTime || " Hours: Tue - Fri, 2.30pm - 8.30pm | Sat - Sun, 9am - 6pm"}
              </small>
            </span>
          </div>
          <div className="col-md-2 col-12 center-align-content d-flex align-items-center justify-content-center">
            <span>
              <small>{data.phoneNumber || "+65 8821 4153"}</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBar;
