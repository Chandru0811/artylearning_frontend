import React from "react";
import { Link } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";

function LeaveView() {
  return (
    <div class="container-fluid minHeight mb-5">
      <div class="container-fluid py-4">
        <div class="row align-items-center">
          <div class="hstack gap-2 justify-content-end">
            <Link to="/leaveadmin">
              <button type="button" class="btn btn-sm btn-border">
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
              <p className="text-sm fw-medium">Centre Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Art Learning @ Hougang</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Employee Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Sathish</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Leave Type</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Sick Leave</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">No.Of.Days</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 02</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">From Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 2024-04-30</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">To Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: 2024-05-01</p>
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
              <p className="text-muted text-sm">: 2024-04-29</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">Approver Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Manoj</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">Status</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: Approved</p>
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

export default LeaveView;