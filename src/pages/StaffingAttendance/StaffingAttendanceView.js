import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllTeachersWithIds from "../List/TeacherList";
import { toast } from "react-toastify";

function StaffingAttendanceView() {
  const [data, setData] = useState([]);
  console.log("Attendance Datas:", data);
  const { id } = useParams();
  const [centerData, setCenterData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const teacherData = await fetchAllTeachersWithIds();
      setCenterData(centerData);
      setTeacherData(teacherData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getUserAttendanceById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, []);

  const formatTimeTo12Hour = (time) => {
    if (!time) return "--";
    const [hours, minutes] = time.split(":");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/staffing/attendance" className="custom-breadcrumb">
            Attendance
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Attendance View
        </li>
      </ol>
      <div className="card">
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">View Attendance</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/staffing/attendance">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row mt-5 pb-3">
            {/* <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Centre Name </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {centerData &&
                      centerData.map((centerId) =>
                        parseInt(data.centerId) === centerId.id
                          ? centerId.centerNames || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Employee Name </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.employeeName || "--"}
                  </p>
                </div>  
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2  ">
                <div className="col-6  ">
                  <p className="fw-medium">Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.date || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Attendance Status </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.attendanceStatus || "--"}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Mode Of Working</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {(data.modeOfWorking || "--").replace(/_/g, " ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check In</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {formatTimeTo12Hour(data.checkIn)}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">OT Start Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {formatTimeTo12Hour(data.otStartTime)}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check In Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.checkInMode || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check Out Mode</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.checkOutMode || "--"}</p>
                </div>
              </div>
            </div> */}

            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check Out</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {formatTimeTo12Hour(data.checkOut)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">OT End Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {formatTimeTo12Hour(data.otEndTime)}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Attendance Remark</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm text-break">
                    : {data.attendanceRemark || "--"}
                  </p>
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
