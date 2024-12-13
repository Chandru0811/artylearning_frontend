import React from "react";
import { Link } from "react-router-dom";

function FreeAssessment() {
  return (
    <section className="freeAssessment">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-6 col-12 text-center">
            <div className="image-in-text-container">
              <h1 className="image-in-text">
                <span>
                  {" "}
                  <b
                    className="artyAnimatedText"
                    // style={{ fontSize: "460%", marginLeft: "20px" }}
                  >
                    ARTY
                  </b>
                  <br />{" "}
                  <b className="artyAnimatedText" id="LEARNING">
                    LEARNING
                  </b>{" "}
                </span>
              </h1>
            </div>
          </div>

          <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <span className="fw-bolder BOOKaFREE">
                BOOK A FREE <br /> ASSESSMENT NOW
              </span>
              <br />
              <span className="text-danger" style={{ fontSize: "55px" }}>
                Join The{" "}
                <span
                  style={{ fontSize: "40px" }}
                  className="fw-bolder text-dark"
                >
                  Waiting List
                </span>
              </span>

              <div>
                <Link to="/course/english">
                  <button className="btn btn-danger btn-lg me-4">ENGLISH</button>
                </Link>
                &nbsp;
                <Link to="/course/chinesh">
                  <button className="btn btn-outline-danger btn-lg">
                    CHINESE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreeAssessment;
