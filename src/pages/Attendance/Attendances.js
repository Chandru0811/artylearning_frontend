import React, { useEffect, useState } from "react";
import "../../styles/sidebar.css";
import api from "../../config/URL";
import AddMore from "./AddMore";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import ReplacementAdd from "./ReplacementAdd";
import { Link } from "react-router-dom";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";

function Attendances() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [batchData, setBatchData] = useState(null);
  const centerLocalId = localStorage.getItem("selectedCenterId");

  const getCurrentDate = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(
      "0" +
      (today.getMonth() + 1)
    ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;
    return formattedDate;
  };
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  // Function to format date as "DD/MM/YYYY"
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  // Fetch available slots based on the selected date
  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = formatDate(date);
      const response = await api.get(
        `getAvailableBatchTimings?attendanceDate=${formattedDate}`
      );
      setBatchData(response.data); // Update batch options with API response
    } catch (error) {
      toast.error("Error fetching slots:", error);
    }
  };

  const formatTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let hour = parseInt(hours, 10);

    if (hour === 0) {
      hour = 12;
    } else if (hour >= 12) {
      period = "PM";
      if (hour > 12) hour -= 12;
    }

    return `${hour}:${minutes} ${period}`;
  };

  const normalizeTime = (time) => {
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }

    return formatTo12Hour(time);
  };

  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours < 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const fetchCentreData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);

      if (centerData?.length > 0) {
        const defaultCenterId = centerData[0].id;
        if (centerLocalId !== null && centerLocalId !== "undefined") {
          setSelectedCenter(centerLocalId);
        } else if (centerData !== null && centerData.length > 0) {
          setSelectedCenter(defaultCenterId);
        }
        fetchCourses(defaultCenterId);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching centers.");
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      const courseData = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    setSelectedCenter(centerId);
    setSelectedCourse("");
    setCourseData([]);
    fetchCourses(centerId);
  };

  const fetchData = async () => {
    try {
      const requestBody = {
        centerId: selectedCenter,
        date: selectedDate,
        courseId: selectedCourse || "",
        ...(selectedBatch && { batchTime: selectedBatch }),
      };
      const response = await api.post(
        "getAllTeacherWithStudentAttendance",
        requestBody
      );
      setAttendanceData(response.data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
      // fetchData();
    }
  }, [selectedDate]);

  const handelSubmitData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchCentreData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCenter]);

  const handleAttendanceChange = (attendanceIndex, studentIndex, value) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[attendanceIndex].students[studentIndex].attendance =
      value; // Update status
    setAttendanceData(updatedAttendanceData);
  };

  const handleRemarksChange = (attendanceIndex, studentIndex, value) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[attendanceIndex].students[studentIndex].remarks =
      value;
    setAttendanceData(updatedAttendanceData);
  };

  const handleSubmit = async (teacherIndex, attendanceItem) => {
    try {
      const teacherAttendanceData = attendanceData[teacherIndex];
      const flattenedData = teacherAttendanceData.students
        .filter((student) => student.studentUniqueId)
        .map((student) => ({
          id: student.id,
          studentName: student.studentName,
          attendanceDate: selectedDate,
          biometric: false,
          studentUniqueId: student.studentUniqueId,
          attendanceStatus: student.attendance,
          remarks: student.remarks,
          userId: attendanceItem.userId,
          studentId: student.studentId,
          centerId: attendanceItem.centerId,
          classId: attendanceItem.classId,
          courseId: attendanceItem.courseId,
          batchTime: parseInt(selectedBatch),
        }));
      const response = await api.post("markStudentAttendance", flattenedData);
      if (response.status === 201) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error marking attendance:", error);
    }
  };

  return (
    <>
      <div className="container-fluid my-4 center">
        <ol
          className="breadcrumb my-3 px-1"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
          <li>
            <Link to="/" className="custom-breadcrumb">
              Home
            </Link>
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li>
            &nbsp;Student Management
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            &nbsp;Attendance
          </li>
        </ol>
        <div className="card">
          <div
            className="mb-3 d-flex justify-content-between align-items-center p-1"
            style={{ background: "#f5f7f9" }}
          >
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2 text-muted">
                This database shows the list of{" "}
                <span className="bold" style={{ color: "#287f71" }}>
                  Attendance
                </span>
              </span>
            </div>
          </div>
          <div className="row px-2">
            <div className="col-md-6 col-12 mb-2">
              <label className="form-lable">
                Centre<span class="text-danger">*</span>
              </label>
              <select
                className="form-select "
                value={selectedCenter}
                onChange={handleCenterChange}
              >
                {centerData &&
                  centerData.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.centerNames}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 col-12">
              <label className="form-lable">
                Attendance Date<span class="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
            <div className="col-md-6 col-12 mb-2">
              <label className="form-lable">Course</label>
              <select
                className="form-select "
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select a course</option>
                {courseData &&
                  courseData.map((courseId) => (
                    <option key={courseId.id} value={courseId.id}>
                      {courseId.courseNames}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-md-6 col-12">
              <label className="form-lable">Batch</label>
              <select
                className="form-select"
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value=""></option>
                {batchData &&
                  batchData.map((time) => {
                    const displayTime = normalizeTime(time);
                    const valueTime =
                      time.includes("AM") || time.includes("PM")
                        ? convertTo24Hour(time)
                        : time;

                    return (
                      <option key={time} value={valueTime}>
                        {displayTime}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-md-12 col-12 d-flex align-items-end justify-content-end mb-3">
              <button
                className="btn btn-light btn-button btn-sm mt-3"
                onClick={handelSubmitData}
                disabled={!selectedCenter || !selectedDate}
              >
                Search
              </button>
              &nbsp;&nbsp;
            </div>
          </div>
          <div className="container-fluid">
            <div className="row m-0">
              <div
                className="table d-flex"
                style={{
                  backgroundColor: "#f5f7f9",
                }}
              >
                <div style={{ width: "20%" }} className="py-2">
                  <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                    Centre
                  </p>
                </div>
                <div style={{ width: "20%" }} className="py-2">
                  <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                    Course
                  </p>
                </div>
                <div style={{ width: "20%" }} className="py-2">
                  <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                    Class Code
                  </p>
                </div>
                <div style={{ width: "20%" }} className="py-2">
                  <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                    Batch Time
                  </p>
                </div>
                <div style={{ width: "20%" }} className="py-2">
                  <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                    Course Type
                  </p>
                </div>
                <div style={{ width: "20%" }} className="py-2">
                  <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                    Class Listing Teacher
                  </p>
                </div>
              </div>
              {attendanceData &&
                attendanceData.map((attendanceItem, attendanceIndex) => (
                  <div
                    key={attendanceIndex}
                    className="accordion p-0"
                    id="accordionExample mb-3"
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        style={{ marginBottom: "0px" }}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          style={{ padding: "0 10px" }}
                          data-bs-target={`#flush-collapse-${attendanceIndex}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse-${attendanceIndex}`}
                        >
                          <div
                            className="table d-flex"
                            id="acordeanHead"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <div style={{ width: "20%" }} className="pb-2 pt-4">
                              <p
                                style={{
                                  marginBottom: "0px",
                                  paddingLeft: "10px",
                                }}
                              >
                                {attendanceItem.center}
                              </p>
                            </div>
                            <div style={{ width: "20%" }} className="pb-2 pt-4">
                              <p
                                style={{
                                  marginBottom: "0px",
                                  paddingLeft: "10px",
                                }}
                              >
                                {attendanceItem.course}
                              </p>
                            </div>
                            <div style={{ width: "20%" }} className="pb-2 pt-4">
                              <p
                                style={{
                                  marginBottom: "0px",
                                  paddingLeft: "10px",
                                }}
                              >
                                {attendanceItem.classCode}
                              </p>
                            </div>
                            <div style={{ width: "20%" }} className="pb-2 pt-4">
                              <p
                                style={{
                                  marginBottom: "0px",
                                  paddingLeft: "10px",
                                }}
                              >
                                {attendanceItem.batchTime
                                  ? formatTo12Hour(attendanceItem.batchTime)
                                  : "N/A"}
                              </p>
                            </div>
                            <div style={{ width: "20%" }} className="pb-2 pt-4">
                              <p
                                style={{
                                  marginBottom: "0px",
                                  paddingLeft: "10px",
                                }}
                              >
                                {attendanceItem.courseType}
                              </p>
                            </div>
                            <div style={{ width: "20%" }} className="pb-2 pt-4">
                              <p
                                style={{
                                  marginBottom: "0px",
                                  paddingLeft: "10px",
                                }}
                              >
                                {attendanceItem.classListingTeacher}
                              </p>
                            </div>
                          </div>
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse-${attendanceIndex}`}
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="d-flex justify-content-end mb-3">
                            <AddMore
                              onSuccess={fetchData}
                              courseId={attendanceItem.courseId}
                              userId={attendanceItem.userId}
                              attendanceDate={selectedDate}
                              batchTime={selectedBatch}
                              feedbackData={attendanceItem.feedbacks}
                            />
                          </div>
                          <div className="table-responsive">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Student ID</th>
                                  <th>Student Name</th>
                                  <th className="text-start ps-3">Action</th>
                                  <th>Remarks</th>
                                </tr>
                              </thead>
                              <tbody>
                                {attendanceItem.students.map(
                                  (student, studentIndex) => (
                                    <tr key={studentIndex}>
                                      <th scope="row">{studentIndex + 1}</th>
                                      <td>
                                        {student.studentUniqueId || "N/A"}
                                      </td>
                                      <td>{student.studentName}</td>
                                      <td>
                                        <div>
                                          {student.attendance !==
                                          "replacement" ? (
                                            <>
                                              <label className="radio-button">
                                                <input
                                                  type="radio"
                                                  name={`attendance-${attendanceIndex}-${studentIndex}`}
                                                  value="present"
                                                  checked={
                                                    student.attendance ===
                                                    "present"
                                                  }
                                                  onChange={() =>
                                                    handleAttendanceChange(
                                                      attendanceIndex,
                                                      studentIndex,
                                                      "present"
                                                    )
                                                  }
                                                />
                                                <span className="radio-button-text">
                                                  Present
                                                </span>
                                              </label>
                                              <label className="radio-button">
                                                <input
                                                  type="radio"
                                                  name={`attendance-${attendanceIndex}-${studentIndex}`}
                                                  value="absent"
                                                  checked={
                                                    student.attendance ===
                                                    "absent"
                                                  }
                                                  onChange={() =>
                                                    handleAttendanceChange(
                                                      attendanceIndex,
                                                      studentIndex,
                                                      "absent"
                                                    )
                                                  }
                                                />
                                                <span className="radio-button-text">
                                                  Absent
                                                </span>
                                              </label>
                                            </>
                                          ) : (
                                            <span className="text-center">
                                              Replacement Class Requested
                                            </span>
                                          )}
                                          {student.attendance === "absent" && (
                                            <label>
                                              <ReplacementAdd
                                                selectedID={student.id}
                                                attendanceData={attendanceData}
                                                attendanceDate={selectedDate}
                                                selectedStudent={student}
                                                onClickReplacement={() =>
                                                  handleAttendanceChange(
                                                    attendanceIndex,
                                                    studentIndex,
                                                    "replacement"
                                                  )
                                                }
                                              />
                                            </label>
                                          )}
                                        </div>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          value={student.remarks || ""}
                                          className="form-control"
                                          onChange={(e) =>
                                            handleRemarksChange(
                                              attendanceIndex,
                                              studentIndex,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div>
                            {storedScreens?.attendanceUpdate && (
                              <button
                                className="btn btn-button"
                                onClick={() =>
                                  handleSubmit(attendanceIndex, attendanceItem)
                                }
                                disabled={attendanceItem.students.length === 0}
                              >
                                Submit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendances;
