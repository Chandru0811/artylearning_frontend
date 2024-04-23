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
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";


function Register() {
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
                      <small>Centre</small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"

                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Student Chinese Name (put N/A if not applicatble) </small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"

                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Date Of Birth</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
                      type="date"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Gender</small>
                    </label>
                    <br />
                    <div className='mt-3'>
                      <input type="radio" value="MALE" name="gender" /> <span style={{ color: 'gray' }}>Male</span> &nbsp;&nbsp;
                      <input type="radio" value="FEMALE" name="gender" /> <span style={{ color: 'gray' }}>Female</span>
                    </div>
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-3 fw-medium">
                      <small>School Type</small>
                    </label>
                    <br />
                    <div className='mt-3'>
                      <input type="radio" value="MALE" name="gender" /> <span style={{ color: 'gray' }}>Childcare</span> &nbsp;&nbsp;
                      <input type="radio" value="FEMALE" name="gender" /> <span style={{ color: 'gray' }}>Kindergarten</span> &nbsp;&nbsp;
                      <input type="radio" value="FEMALE" name="gender" /> <span style={{ color: 'gray' }}>NA</span>
                    </div>
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Pre-Assessment Result </small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Nationality</small>
                    </label>
                    <br />
                    <select className='form-control'
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Refer By Parent</small>
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
                      <small>Student Name / as per ID</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
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
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Age</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
                      type="number"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Medical Condition</small>
                    </label>
                    <br />
                    <input
                      className="form-control "
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>School Name</small>
                    </label>
                    <br />
                    <input
                      className="form-control "
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Race</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
                      type="text"
                    />
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Primary Language Spoken</small>
                    </label>
                    <br />
                    <div className='mt-3'>
                      <input type="radio" value="MALE" name="gender" /> <span style={{ color: 'gray' }}>English</span> &nbsp;&nbsp;
                      <input type="radio" value="FEMALE" name="gender" /> <span style={{ color: 'gray' }}>Chinese</span>
                    </div>
                  </div>
                  <div className="text-start mt-2">
                    <label htmlFor="" className="mb-1 fw-medium">
                      <small>Refer By student</small>
                    </label>
                    <br />
                    <input
                      className="form-control  "
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
              <div className='d-flex justify-content-end m-3'>
                <Link to="/student/register/next">
                  <button className='btn btn-danger' style={{ background: 'red' }}>
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

export default Register