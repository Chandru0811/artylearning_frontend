import React from "react";
import { Link } from "react-router-dom";

function HolidayView() {
  return (
    <section>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 text-end">
            <Link to="/holiday">
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Center Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : Arty Learning @ Hougang
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Holiday Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: New Year</p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Start Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 2024-01-01</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">End Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 2024-01-01</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HolidayView;
