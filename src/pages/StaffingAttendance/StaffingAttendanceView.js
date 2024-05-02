import React from "react";
import { Link } from "react-router-dom";


function StaffingAttendanceView() {
  return (
    <div className="container ">
      <div className="row  mt-3">
        <div className="col-12 text-end">
          <Link to="/staffing/attendance">
            <button className="btn btn-sm btn-border">Back</button>
          </Link>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Centre Name </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Arty Dreamers</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Employee Name </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Kishore Kumar</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2  ">
                <div className="col-6  ">
                  <p className="fw-medium">Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 2024-02-13</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Attendance Status </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Present</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check In</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 09:00 AM</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check Out</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 06:00 PM</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check In Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Tap In</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check Out Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Tap In</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">OT Start Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 06:01 PM</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">OT End Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 08:00 PM</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Hours Worked</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 11 Hrs</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Attendance Remark</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Good</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffingAttendanceView;
