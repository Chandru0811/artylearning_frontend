import React from "react";
import { Link } from "react-router-dom";

function Viewpayroll() {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 text-end">
          <Link to="/payrolladmin">
            <button type="button" className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Employee ID</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 2</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Employee Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Nalini Sri</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Gross Pay</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 5100</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Bonus</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 500</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 ">
                <p className="fw-medium">Deduction</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 150</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6  ">
                <p className="fw-medium">Net Pay</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 5350</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6">
                <p className="fw-medium">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Approved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewpayroll;
