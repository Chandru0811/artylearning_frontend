import React, { useEffect, useState } from "react";
import "../../styles/sidebar.css";
import api from "../../config/URL";
import AddMore from "./AddMore";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import ReplacementAdd from "./ReplacementAdd";

function Attendances() {
  const [attendanceData, setAttendanceData] = useState([]);
  console.log("Attendance Data Reload again", attendanceData);
  const [centerData, setCenterData] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState("1");
  const [selectedBatch, setSelectedBatch] = useState("1");
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [batchOptions, setBatchOptions] = useState([]);
  
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
      return `${day}/${month}/${year}`;
    };
  
    // Fetch available slots based on the selected date
    const fetchAvailableSlots = async (date) => {
      try {
        const formattedDate = formatDate(date);
        const response = await api.get(
          `getActualSlotsByDate?date=${formattedDate}`
        );
        setBatchOptions(response.data); // Update batch options with API response
      } catch (error) {
        toast.error("Error fetching slots:", error);
      }
    };
  
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };

  const fetchListData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
      setSelectedCenter(centerData[0].id);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
      fetchData();
    }
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const requestBody = {
        centerId: selectedCenter,
        batchId: selectedBatch,
        date: selectedDate,
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
    fetchData();
  }, []);

  const handelSubmitData = () => {
    fetchData();
  };

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
          batchId: parseInt(selectedBatch),
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
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6 col-12 mb-2">
            <label className="form-lable">Centre</label>
            <select
              className="form-select "
              aria-label="Default select example"
              onChange={(e) => setSelectedCenter(e.target.value)}
            >
              <option selected></option>
              {centerData &&
                centerData.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.centerNames}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6 col-12">
            <label className="form-lable">Batch</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value=""></option>
              {batchOptions?.map((batch, index) => (
                <option key={index} value={batch.batchId}>
                  {batch.batchTime}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-12 mb-3">
            <label className="form-lable">Attendance Date</label>
            <input
              type="date"
              className="form-control"
              onChange={handleDateChange}
              value={selectedDate}
            />
          </div>
          <div className="col-md-4 col-12 d-flex align-items-end mb-3">
            <button
              className="btn btn-light btn-button btn-sm mt-3"
              onClick={handelSubmitData}
            >
              Search
            </button>
            &nbsp;&nbsp;
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div
              className="table d-flex"
              style={{
                backgroundColor: "white",
              }}
            >
              <div style={{ width: "20%" }} className="py-2">
                <p style={{ marginBottom: "0px", fontWeight: "700" }}>Centre</p>
              </div>
              <div style={{ width: "20%" }} className="py-2">
                <p style={{ marginBottom: "0px", fontWeight: "700" }}>Course</p>
              </div>
              <div style={{ width: "20%" }} className="py-2">
                <p style={{ marginBottom: "0px", fontWeight: "700" }}>
                  Class Code
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
                      clclassNameass="accordion-header"
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
                          <div style={{ width: "20%" }} className="pb-2 pt-4 ">
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
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <div className="d-flex justify-content-end mb-3">
                          <AddMore
                            onSuccess={fetchData}
                            courseId={attendanceItem.courseId}
                            userId={attendanceItem.userId}
                            attendanceDate={selectedDate}
                            batchId={selectedBatch}
                            feedbackData={attendanceItem.feedbacks}
                          />
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped ">
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
                              {attendanceData &&
                                attendanceData.map(
                                  (attendanceItem, attendanceIndex) => (
                                    <React.Fragment key={attendanceIndex}>
                                      {attendanceItem.students.map(
                                        (student, studentIndex) => (
                                          <tr key={studentIndex}>
                                            <th scope="row">
                                              {studentIndex + 1}
                                            </th>
                                            <td>{student.studentUniqueId}</td>
                                            <td>{student.studentName}</td>
                                            <td>
                                              <div className="">
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
                                                        checked={
                                                          student.attendance ===
                                                          "absent"
                                                        }
                                                        value="absent"
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
                                                ) : <>
                                                <span className="text-center">Replacement Class Requseted</span>
                                                </>}
                                                <br />
                                                {student.attendance ===
                                                  "absent" && (
                                                  <>
                                                    <label>
                                                      <ReplacementAdd
                                                        selectedID={student.id}
                                                        attendanceData={
                                                          attendanceData
                                                        }
                                                        attendanceDate={
                                                          selectedDate
                                                        }
                                                        selectedStudent={
                                                          student
                                                        }
                                                        onClickReplacement={() =>
                                                          handleAttendanceChange(
                                                            attendanceIndex,
                                                            studentIndex,
                                                            "replacement"
                                                          )
                                                        }
                                                      />
                                                    </label>
                                                  </>
                                                )}
                                              </div>
                                            </td>
                                            <td>
                                              <input
                                                type="text"
                                                value={student.remarks}
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
                                    </React.Fragment>
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
                              disabled={
                                attendanceData[attendanceIndex].students
                                  .length === 0
                              }
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
    </>
  );
}

export default Attendances;
