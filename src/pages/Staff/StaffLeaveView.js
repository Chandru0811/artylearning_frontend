import React from "react";
import { Link } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
function StaffLeaveView() {
  return (
    <div class="container-fluid minHeight mb-5">
      <div class="container-fluid py-4">
        <div class="row align-items-center">
          <div class="hstack gap-2 justify-content-end">
            <Link to="/staff">
              <button type="submit" class="btn btn-sm btn-border">
                <span>Back</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Michelle Sng</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Leave Type</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Medical Leave</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">Leave Reason</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Fever</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">From Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 2022-01-18</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">To Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 2022-01-19</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">No.of.Days</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 02</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">No.of.Hours</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 12</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Day Type</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Full Day</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Request Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 2022-01-25</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">Status</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Approve</p>
            </div>
          </div>
        </div>
      </div>

      <p class="headColor mt-5">Attachment</p>

      <hr></hr>
      <div className="row mt-4">
        <div className="">
          <div className="row mb-3 d-flex">
            <div className="col-4 ">
              <p className="text-sm fw-medium">File Type</p>
            </div>
            <div className="col-4">
              <p className="text-sm fw-medium">File Name</p>
            </div>
            <div className="col-4">
              <p className="text-sm fw-medium">Action</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="">
          <div className="row mb-3 d-flex">
            <div className="col-4 ">
              <p className="text-sm text-muted">Leave Attendance</p>
            </div>
            <div className="col-4">
              <p className="text-sm text-muted">evelynchiasiting.pdf</p>
            </div>
            <div className="col-4">
              <p className="text-sm text-muted">
                <FaCloudDownloadAlt />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="">
          <div className="row mb-3 d-flex">
            <div className="col-4 ">
              <p className="text-sm text-muted">Medical Certificates</p>
            </div>
            <div className="col-4">
              <p className="text-sm text-muted">evelynchiasiting.pdf</p>
            </div>
            <div className="col-4">
              <p className="text-sm text-muted">
                <FaCloudDownloadAlt />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffLeaveView;
