import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function TeacherLeaveView() {
  return (
    <div className="container-fluid minHeight">
      <div class="col-auto">
        <div class="hstack gap-2 justify-content-end mt-4">
          <Link to="/teacher/leave">
            <button type="submit" class="btn btn-sm btn-border">
              <span>Back</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="m-5 mb-7 ">
        <div className="row mt-5 m-3">
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold  ">Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Michelle Sng</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">Leave Type</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Medical Leave</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">Leave Reason</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Fever</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">From Date</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 2024-01-04</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">To Date</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 2022-01-06</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">No.Of.Days</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 03</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">No.Of.Hours</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 18</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">Day Type</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Full Day</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">Request Date</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 2022-01-23</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm fw-semibold">Status</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Approve</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-7 m-4">
        <div className="row mt-3">
          <div class="card-header">
            <h6 className="">Attachment</h6>
          </div>
          <hr></hr>
          <div className="table-responsive">
            <table class="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">File Type</th>
                  <th scope="col">File Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Medical certificates</td>
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

export default TeacherLeaveView;
