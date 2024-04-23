import React from 'react'
import {
  Bs1SquareFill,
  Bs2SquareFill,
  Bs3SquareFill,
  Bs4SquareFill,
  Bs5SquareFill,
  Bs6SquareFill,
  Bs7SquareFill
} from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function ParentGuardian() {
  return (
    <div className="container-fluid">
      <div class="card shadow border-0 mb-5">
        <div class="container-fluid py-4">
          <h1 class="h4 ls-tight" style={{ color: '#ff7500' }}>Registration</h1>
        </div>
      </div>
      <div className='card shadow border-0 mb-5'>
        <div className=' text-center mb-5 '>
          <div className='row mt-5 d-flex justify-content-center'>
            <span className='col-lg-2 col-md-6 col-sm-12 text-center'><Bs1SquareFill />&nbsp;<small>Student Details</small></span>&nbsp;&nbsp;
            <span className='col-lg-3 col-md-6 col-sm-12 text-center'><Bs2SquareFill />&nbsp;<small>Videography / Photography</small></span>&nbsp;&nbsp;
            <span className='col-lg-3 col-md-6 col-sm-12 text-center'><Bs3SquareFill />&nbsp;<small>Parent / Guardian</small></span>&nbsp;&nbsp;
            <span className='col-lg-3 col-md-6 col-sm-12 text-center'><Bs4SquareFill />&nbsp;<small>Emergency Contact</small></span>
          </div>
          <div className='row mt-5 mb-5 d-flex justify-content-center'>
            <div className='col-lg-5 col-md-6 col-sm-12 text-start'><Bs5SquareFill />&nbsp;<small>Authorized Person to Take Child from Class</small></div>&nbsp;&nbsp;
            <div className='col-lg-2 col-md-6 col-sm-12 text-start'><Bs6SquareFill />&nbsp;<small>Course Detail</small></div>&nbsp;&nbsp;
            <div className='col-lg-3 col-md-6 col-sm-12 text-start'><Bs7SquareFill />&nbsp;<small>Terms & Conditions</small></div>
          </div>

          <div className="card shadow border-0 my-2 px-2">
            <div className="container py-3">
              <div className="row mt-3">
                <div className="col-lg-6 col-md-6 col-12 px-5">
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Parents / Guardian Name</small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2 mb-4">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Date Of Birth</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
                      type="date"
                    />
                  </div>
                  <div className="text-start mt-5">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Email</small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Relation</small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12 px-5">
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Occupation</small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Profile Image</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
                      type="file"
                    />
                    <p><small><b>Note:</b> File must be PNG,JPG,GIF or BMP, Max Size 1 MB</small></p>
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Mobile No</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
                      type="number"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Postal Code</small>
                    </label>
                    <br />
                    <input
                      className="form-control "
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="text-start mt-2">
                <label htmlFor="" className="mb-1 fw-medium">
                  <small>Remark</small>
                </label>
                <br />
                <textarea className='form-control'
                  type="text"
                  placeholder="Remark"
                  style={{
                    height: "7rem",
                  }}
                />
              </div>
              <div className='d-flex justify-content-end mt-5  m-3'>
                <Link to="/student/register/next">
                  <button className='btn btn-danger' style={{ background: 'red' }}>
                    <span><FaAngleLeft />  Prev</span></button>
                </Link>
                &nbsp;&nbsp;
                <Link to="/student/register/emergencycontact">
                  <button className='btn btn-danger me-5' style={{ background: 'red' }}>
                    <span>Next  <FaAngleRight /></span></button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}

export default ParentGuardian