import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import api from "../../config/URL";
import { Link } from "react-router-dom";

const Attendance = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const getCurrentDate = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(
      "0" +
      (today.getMonth() + 1)
    ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;
    return formattedDate;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const validationSchema = Yup.object({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     initializeDataTable();
  //   }
  //   return () => {
  //     destroyDataTable();
  //   };
  // }, [loading]);

  const initializeDataTable = () => {
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const formik = useFormik({
    initialValues: {
      centerId: "",
      courseId: "",
      attendanceStatus: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        centerId: values.centerId,
        attendanceDate: selectedDate,
      };
      if (values.courseId !== undefined && values.courseId !== null) {
        payload.courseId = values.courseId;
      }
      if (
        values.attendanceStatus !== undefined &&
        values.attendanceStatus !== null
      ) {
        payload.attendanceStatus = values.attendanceStatus;
      }

      try {
        const response = await api.post(
          "getAttendanceByCenterIdAndDate",
          payload
        );
        if (response.status === 200) {
          setDatas(response.data);
        } else {
          // Handle unexpected response status
          toast.error("Unexpected response status: " + response.status);
        }
      } catch (error) {
        // Handle API call error
        toast.error(error.message || "An error occurred while fetching data");
      }
    },
  });

  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      formik.setValues({ centerId: centers[0].id });
      setCenterData(centers);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courses);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCenterChange = (event) => {
    setCourseData(null);
    formik.setFieldValue("courseId", null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    fetchCourses(centerId);
  };

  return (
    <div className="container my-3">
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
          Report Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Attendance Report
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
            style={{ background: "#f5f7f9" }}
          >
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2 text-muted">Attendance</span>
            </div>
          </div>
          <div className="container">
          <div className="row my-4">
            <div className="col-md-4 col-12 mb-2">
              <label className="form-label">Centre</label>
              <select
                {...formik.getFieldProps("centerId")}
                className={`form-select ${
                  formik.touched.centerId && formik.errors.centerId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                onChange={handleCenterChange}
              >
                <option></option>
                {centerData &&
                  centerData.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.centerNames}
                    </option>
                  ))}
              </select>
              {formik.touched.centerId && formik.errors.centerId && (
                <div className="invalid-feedback">{formik.errors.centerId}</div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-2">
              <label className="form-label">Course</label>
              <select
                {...formik.getFieldProps("courseId")}
                className={`form-select ${
                  formik.touched.courseId && formik.errors.courseId
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option></option>
                {courseData &&
                  courseData.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.courseId && formik.errors.courseId && (
                <div className="invalid-feedback">{formik.errors.courseId}</div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-2">
              <label className="form-label">Attendance Date</label>
              <input
                {...formik.getFieldProps("attendanceDate")}
                type="date"
                onFocus={(e) => e.target.showPicker()}
                className={`form-control ${
                  formik.touched.attendanceDate && formik.errors.attendanceDate
                    ? "is-invalid"
                    : ""
                }`}
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              />
              {formik.touched.attendanceDate &&
                formik.errors.attendanceDate && (
                  <div className="invalid-feedback">
                    {formik.errors.attendanceDate}
                  </div>
                )}
            </div>
            <div className="col-md-4 col-12">
              <label className="form-label">Status</label>
              <select
                {...formik.getFieldProps("attendanceStatus")}
                className={`form-select ${
                  formik.touched.attendanceStatus &&
                  formik.errors.attendanceStatus
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option disabled></option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
              {formik.touched.attendanceStatus &&
                formik.errors.attendanceStatus && (
                  <div className="invalid-feedback">
                    {formik.errors.attendanceStatus}
                  </div>
                )}
            </div>
            <div className="col-md-4 col-12 d-flex align-items-end">
              <button
                type="submit"
                className="btn btn-light btn-border btn-sm mt-3"
              >
                Search
              </button>
            </div>
          </div>
          </div>
        </div>
      </form>

      <table ref={tableRef} className="table table-striped">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S No
            </th>
            <th scope="col">Student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Centre</th>
            <th scope="col">Course</th>
            <th scope="col">Class Code</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.studentUniqueId}</td>
                <td>{data.studentName}</td>
                <td>{data.centerName}</td>
                <td>{data.courseName}</td>
                <td>{data.classCode}</td>
                <td>
                  {data.attendanceStatus === "present" ? (
                    <span className="badge badges-Green">Present</span>
                  ) : data.attendanceStatus === "deposit" ? (
                    <span className="badge badges-Brown">Deposit Deducted</span>
                  ) : data.attendanceStatus === "class_replaced" ? (
                    <span className="badge badges-Orange">Class Replaced</span>
                  ) : (
                    <span className="badge badges-Red">Absent</span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
