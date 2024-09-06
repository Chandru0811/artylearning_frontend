import React from "react";
import img4 from "../../assets/clientimage/parent-img.jpeg";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div className="container">
      <div className="row">
        {/* Main Content Section */}
        <div className="col-md-8 col-12">
          <h1 className="mt-4">Discover Our Latest Posts</h1>
          <div className="blog-post mb-4">
            <Link to="/blog/view">
              <img
                src={img4}
                className="img-fluid py-3 rounded"
                alt="Article"
              />
            </Link>
            <h3 className="mb-2">How to... Host the best New Year's event</h3>
            <p className="text-muted">Ryan Mooss | 29th Nov 2022</p>
          </div>

          <div className="blog-post mb-4">
            <Link to="/blog/view">
              <img
                src={img4}
                className="img-fluid py-3 rounded"
                alt="Article"
              />
            </Link>
            <h3 className="mb-2">
              How to... List a screening event for the 2022 World Cup final
            </h3>
            <p className="text-muted">Ryan Mooss | 29th Nov 2022</p>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="col-md-4 col-12">
          <div className="sticky-top mt-4">
            <div className="sidebar-section mb-4">
              <h2 className="mb-3">Top Posts</h2>
              <div className="list-group">
                <Link
                  to="/blog/post-event-survey-questions"
                  className="list-group-item"
                >
                  <img
                    className="img-fluid p-3"
                    src="https://t4.ftcdn.net/jpg/03/31/65/71/360_F_331657169_RVqGjeodOikjhdNAZ7YH5reLhHX8hd6y.jpg"
                    alt="Sidebar Ad"
                  />
                  Post-Event Survey Questions
                </Link>
                <Link to="/blog/welcome-to-skiddle" className="list-group-item">
                  <img
                    className="img-fluid p-3"
                    src="https://t4.ftcdn.net/jpg/03/31/65/73/360_F_331657333_lv5rrLC0HX9xsEopASQsmcylWnYwZ33A.webp"
                    alt="Sidebar Ad"
                  />
                  Welcome To Skiddle
                </Link>
                <Link
                  to="/blog/how-to-put-on-your-own-festival"
                  className="list-group-item"
                >
                  <img
                    className="img-fluid p-3"
                    src="https://i2-prod.chroniclelive.co.uk/incoming/article5792131.ece/ALTERNATES/s615/first-day-back.jpg"
                  />
                  How to... Put on your own festival
                </Link>
              </div>
            </div>

            {/* <div className="sidebar-section mb-4">
              <h2 className="mb-3">Follow Us</h2>
              <div className="d-flex justify-content-between">
                <a
                  href="#"
                  className="btn btn-outline-dark btn-sm rounded-circle"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-dark btn-sm rounded-circle"
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="#"
                  className="btn btn-outline-dark btn-sm rounded-circle"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
