import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Profile from "../../../assets/Student.png";
import { Link } from "react-router-dom";

function ViewAction() {
  return (
    <div className="mb-5">
      <div className="container-fluid">
        <div className="card shadow border mb-5 products">
          <div className="container-fluid py-4">
            <div class="row align-items-center ">
              <div class="col">
                <div class="d-flex justify-content-between">
                  <h1 class="h4 ls-tight my-4" style={{ color: "#d48a22" }}>
                    View Staff
                  </h1>
                  <div className="justify-content-end">
                    <Link to="/listing/Addendance">
                      <span>
                        <button className="btn-sm btn-danger ">
                          <span>Student Attendance</span>
                        </button>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="card shadow border-0 mb-5">
          <div className="card-header ">
            <h4>Student Details</h4>
            <div className="d-flex justify-content-center">
              <img
                src={Profile}
                className="img-fluid rounded-circle"
                alt="234"
                width={"90px"}
              ></img>
            </div>
            <div className="row mt-5 m-3">
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Student ID</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: S000482</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Centre</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Arty Learning @ HG</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Gender</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Female</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Nationality</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>School</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Childcare/ E-Bridge</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end">
                    <p className="text-sm">
                      <b>Date Of Birth</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : 11 January 2020(3 Years 11 Months Old)
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Date Enrolled</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 18-02-2024</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Status</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Alica Ong</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Refer By Parent</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : aliciaonggm@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Refer By Student</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 91372040</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>T&C Signature</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Remarks</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Deposit Amount</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 0.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Replacement Class Date</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 2024-01-17</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Request Date</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 2024-01-18</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end ">
                    <p className="text-sm">
                      <b>Replacement Class</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : AP/ WED_13092023_5PM/Wed/6
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Approved Date</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 2-24-01-18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card shadow border-0 mb-5">
          <div className="card-header">
            <h4>Course</h4>
            <div className="row mt-5 m-3">
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Current Course</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Arty Dreamers 2023</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Teacher</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Evelyn Chia Si Ting</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Start Date</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: 18-02-2024</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Last Lesson Attendance</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Last Payment Mode</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Last Paid Lesson</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Pre-Assessment Result</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card shadow border-0 mb-5">
          <div className="card-header ">
            <h4>Family</h4>
            <div className="row mt-5 m-3">
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Name</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Alicia Ong</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Mobile Number</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: +65 91008579</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Email</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: aliciaoggm@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="card shadow border-0 mb-5">
          <div className="card-header ">
            <h4>Emergency Contact</h4>
            <div className="row mt-5 m-3">
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Name</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Ho Ling Foong</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Mobile Number</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: +65 96529948</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Relation</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: Grandfather</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Address</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-5">
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <p className="text-sm">
                      <b>Postal Code</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className=" card p-3 d-flex jusfify-content-between mt-2">
          <div classNameme="col">
            <h5>Required Documents</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">File Type</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Assessment form</td>
                  <td>evelynchiasting.pdf</td>
                  <td>
                    <FaCloudDownloadAlt />
                  </td>
                </tr>
                <tr>
                  <td>Enrollment Form</td>
                  <td>evelynchiasting.pdf</td>
                  <td>
                    <FaCloudDownloadAlt />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAction;
