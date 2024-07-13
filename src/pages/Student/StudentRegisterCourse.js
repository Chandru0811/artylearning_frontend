import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllPackageListByCenter from "../List/PackageListByCenter";
import $ from "jquery";


function StudentRegisterCourse() {
  const [data, setData] = useState({});
  const [courseData, setCourseData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [availableDays, setAvailableDays] = useState([]); // State for available days in select
  const [loadIndicator, setLoadIndicator] = useState(false);

  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRow, setSelectedRow] = useState(null); // Add state for selected row
  const [selectedRowData, setSelectedRowData] = useState({}); // State for selected row data

  const formik = useFormik({
    initialValues: {
      courseId: "",
      batchId: "",
      days: "",
      packageName: "",
      startDate: "",
      endDate: "",
      lessonName: "",
      studentId: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (data) => {
      const payload = {
        ...data,
        ...selectedRowData, // Merge selected row data with form data
      };
      console.log("Payload Data:", payload);
      try {
        const response = await api.post(
          `/createStudentCourseDetails`,
          payload
        );

        if (response.status === 201) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable();
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const getData = async () => {
    destroyDataTable();
    setLoading(true);
    let params = {};

    if (formik.values.courseId !== "") {
      params.courseId = formik.values.courseId;
    }

    if (formik.values.days !== "") {
      params.day = formik.values.days;
    }

    if (formik.values.batchId !== "") {
      params.batchId = formik.values.batchId;
    }

    try {
      const response = await api.get("/getAllScheduleTeachers", { params });
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [formik.values.courseId, formik.values.batchId, formik.values.days]);

 
  const handleRowSelect = (data) => {
    if (data.availableSlots === 0) {
      toast.error("Class is Full");
      return; // Prevent further actions
    }
    setSelectedRow(data.id);
    console.log("Selected Row Data:", data);
    // setFormData((prev) => ({ ...prev, ...data })); // Store selected row data in formData
    // Calculate days between startDate and endDate
    // if (data.startDate && data.endDate) {
    //   const days = calculateDays(data.startDate, data.endDate, data.days);
    //   setAvailableDays(days);
    // } else {
    //   setAvailableDays([]);
    // }
  };

  // const calculateDays = (startDate, endDate, selectedDay) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const days = [];

  //   // Get the numeric representation of the selected day (0 for Sunday, 1 for Monday, etc.)
  //   const targetDay = new Date(
  //     `${selectedDay}, ${start.toDateString()}`
  //   ).getDay();

  //   for (
  //     let date = new Date(start);
  //     date <= end;
  //     date.setDate(date.getDate() + 1)
  //   ) {
  //     if (date.getDay() === targetDay) {
  //       days.push({
  //         value: date.toISOString().split("T")[0],
  //         label: date.toDateString(),
  //       });
  //     }
  //   }

  //   return days;
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
        if (response.data.studentCourseDetailModels.length > 0) {
          setData(response.data);
          const formattedResponseData = {
            ...response.data.studentCourseDetailModels[0],
            startDate:
              response.data.studentCourseDetailModels[0].startDate.substring(
                0,
                10
              ),
            endDate:
              response.data.studentCourseDetailModels[0].endDate.substring(
                0,
                10
              ),
            // courseDay:
            //   response.data.studentCourseDetailModels[0].courseDay.substring(
            //     0,
            //     10
            //   ),
          };
          formik.setValues(formattedResponseData);
        } else {
          console.log("Value not present in the table");
        }
      } catch (error) {
        toast.error("Error Fetching Form Data");
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="border-0 mb-5">
          <div className="mb-5">
            <div className="border-0 my-2 px-2">
              <p class="headColor">Course Detail</p>
              <div className="row mt-2">
                <table className="table table-border-solid">
                  <thead>
                    <tr>
                      <th scope="col" className="fw-medium">
                        S.No
                      </th>
                      <th scope="col" className="fw-medium">
                        Course
                      </th>
                      <th scope="col" className="fw-medium">
                        Batch
                      </th>
                      <th scope="col" className="fw-medium">
                        Days
                      </th>
                      <th scope="col" className="fw-medium">
                        Package
                      </th>
                      <th scope="col" className="fw-medium">
                        Lesson Start Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.studentCourseDetailModels &&
                      data.studentCourseDetailModels.map((stdCourse, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{stdCourse.course || "--"}</td>
                          <td>{stdCourse.batch || "--"}</td>
                          <td>{stdCourse.days || "--"}</td>
                          <td>{stdCourse.packageName || "--"}</td>
                          <td>{stdCourse.lessonName || "--"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="container my-4">
                {loading ? (
                  <div className="loader-container">
                    <div className="loading">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <table ref={tableRef} className="display">
                        {/* Table Header */}
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col">Course</th>
                            <th scope="col">Batch</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Day</th>
                            <th scope="col">Available Slot</th>
                          </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                          {datas.map((data, index) => (
                            <tr
                              key={index}
                              onClick={() => handleRowSelect(data)} // Add onClick handler
                              className={
                                selectedRow === data.id ? "selected-row" : ""
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <th scope="row" className="text-center">
                                <input
                                  type="radio"
                                  className="form-check-input"
                                  checked={selectedRow === data.id} // Check if this row is selected
                                  onChange={() => handleRowSelect(data)} // Call handler on change
                                />
                              </th>
                              <td>{data.course}</td>
                              <td>{data.batch}</td>
                              <td>{data.startDate}</td>
                              <td>{data.endDate}</td>
                              <td>{data.days}</td>
                              <td className="text-center">
                                <span className="badge rounded-pill text-bg-success">
                                  {data.availableSlots}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentRegisterCourse;
