import React from "react";
import { Link } from "react-router-dom";

const StudentDeposit = () => {
  return (
    <div className="container my-4">
      <div className="mb-5 mt-3 d-flex justify-content-end">
        <Link to={`/student`}>
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
        &nbsp;&nbsp;
        <Link to={`/student`}>
          <button type="button" className="btn btn-button btn-sm">
            Save
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="row py-4">
          <div className="col-md-6 col-12 mb-4">
            <lable className="form-lable">
              Centre Name<span className="text-danger"></span>
            </lable>
            <select
              className="form-select form select-sm"
              aria-label="Default select example"
            >
              <option selected>Arty Learning @ HG</option>
              <option value="1">Arty Learning @ AMk</option>
            </select>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Student ID<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput`}
                value={"S000377"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Student Name<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"Meagan Han"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Date of Absent<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="date"
                onFocus={(e) => e.target.showPicker()}
                className={`form-control iconInput `}
                value={"2024-01-06"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <lable className="form-lable">
              Absent Reason<span className="text-danger"></span>
            </lable>
            <select
              className="form-select form select-sm"
              aria-label="Default select example"
            >
              <option selected>Fever</option>
              <option value="1">Cold</option>
            </select>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Deduction Account<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"0.00"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Credit Account<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"0.00"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Parent Name<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"Kate Lee"}
              />
            </div>
          </div>
          <div className="col-md-6 col-12 mb-2">
            <lable className="form-lable">
              Parent Email ID<span className="text-danger"></span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control iconInput `}
                value={"katz215@hotmail.com"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDeposit;
