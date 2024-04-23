import React from "react";
import { Link } from "react-router-dom";

function AboutJoinUs() {
  return (
    <div className="container">
      <div className="row mt-5 py-5 mx-5">
        <div className="col-md-6 col-12"></div>
        <div className="col-md-6 col-12">
          <h3 className="fw-bold text-center">
            Join Us In This Journey To Nurture The Children Of Our Future With
            Abundance Of Love.
          </h3>
          <div className="text-center mt-4">
            <Link to="/course/english">
              <button className="btn btn-danger btn-danger-button">
                ENGLISH
              </button>
            </Link>
            <Link to="/course/chinesh">
              <button className="btn btn-outline-danger btn-outline-danger-button mx-3">
                CHINESE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutJoinUs;
