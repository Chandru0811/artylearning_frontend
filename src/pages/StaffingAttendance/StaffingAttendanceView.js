import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllTeachersWithIds from "../List/TeacherList";
import { toast } from "react-toastify";


function StaffingAttendanceView() {

  const [data, setData] = useState([]);
  console.log('Attendance Datas:',data);
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
                  <p className="text-muted text-sm">
                    : {centerData &&
                      centerData.map((centerId) =>
                        parseInt(data.centerId) === centerId.id
                          ? centerId.centerNames || "--"
                          : ""
                      )}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Employee Name </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.employeeName || "--"}</p>
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
                  <p className="text-muted text-sm">: {data.attendanceStatus || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check In</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.checkIn || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Check Out</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.checkOut || "--"}</p>
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
                  <p className="fw-medium">Mode Of Working</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.modeOfWorking || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">OT Start Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.otStartTime || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">OT End Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.otEndTime || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row    mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Attendance Remark</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.attendanceRemark || "--"}</p>
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
