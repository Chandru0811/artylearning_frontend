import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import View from "../../assets/clientimage/View.jpeg";
import api from "../../config/URL";
import { toast } from "react-toastify";

function News() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllNewsUpdatedSavePublish`);
      setData(response.data);
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="news">
      <div className="container py-5">
        <div className="content my-4">
          <p>
            Stay informed with our latest news and updates. Discover exciting
            news and upcoming events from Arty Learning. Come<br></br>
            join us on our journey of continuous learning and growth.
          </p>
        </div>

        <div className="row">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div className="col-md-4 col-12 my-2 calendar-item" key={index}>
                <div className="custom-card shadow-lg h-100 d-flex flex-column align-items-center mx-3 mt-2 pt-3 position-relative">
                  <img src={item.cardImageOne || View} style={{ height: "45%", width: "96%" }} alt="view" className="custom-img-fluid" />
                  <div className="custom-card-body d-flex flex-column p-2">
                    <div className="custom-content">
                      <h6 className="custom-card-title">
                        {item.heading}
                      </h6>
                      <p>
                        {item.role}/{item.date}/{item.comment}
                      </p>
                    </div>
                    <div className="">
                      <Link to={`/calender/${item.id}`}>
                        <button className="custom-button mt-4">Read More</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p>No news available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
