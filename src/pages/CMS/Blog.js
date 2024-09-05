import React from "react";
import img4 from "../../assets/clientimage/parent-img.jpeg";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <div>
      <div className="row m-0">
        <div className="col-md-7 col-12 p-3">
          <div className="row">
            <div className="col-md-12 col-12 p-3">
              <h2>Popular Articles</h2>
              <Link to="/blog/view">
                <img
                  src={img4}
                  className="img-fluid py-1 rounded"
                  alt="Article"
                />
              </Link>
              <h3>
                Guardians of the Pride: The Urgency of Lion Conservation Efforts
              </h3>
              <button className="btn btn-outline-dark btn-sm rounded-5">
                Species
              </button>
            </div>

            <div className="col-md-12 col-12 p-3">
              <h2>Popular Articles</h2>
              <img
                src={img4}
                className="img-fluid py-1 rounded"
                alt="Article"
              />
              <h3>
                Guardians of the Pride: The Urgency of Lion Conservation Efforts
              </h3>
              <button className="btn btn-outline-dark btn-sm rounded-5">
                Species
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-5 col-12 p-3">
          <form className="sticky-top mt-md-5 mt-0">
            <label>Name</label>
            <input type="text" className="form-control mb-4" />
            <label>Email</label>
            <input type="email" className="form-control mb-4" />
            <label>Mobile</label>
            <input type="text" className="form-control mb-4" />
            <label>Description</label>
            <textarea type="text" className="form-control mb-4" rows={5} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
