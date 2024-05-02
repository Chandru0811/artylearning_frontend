import React from "react";
import { Link } from "react-router-dom";

function DeductionView() {
  return (
    <section>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 text-end">
            <Link to="/deduction">
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
                  <p className="fw-medium">Employee Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Ragul</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Deduction Nam</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: CPF</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Deduction Month</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 2024-01</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Deduction Amount</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: $10</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Total Deduction Amount</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeductionView;
