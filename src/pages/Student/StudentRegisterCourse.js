import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import api from "../../config/URL";
import { toast } from "react-toastify";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllPackageList from "../List/PackageList";

function StudentRegisterCourse() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [studentCourseDetailsId, setStudentCourseDetailsId] = useState(null);
  const tableRef = useRef(null);
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const formik = useFormik({
    initialValues: {
      lessonName:"",
    },
    // validationSchema: validationSchema, 
    onSubmit: async (data) => {
      setLoadIndicator(true);
      const payload = {
        ...data,
        studentId: id,
        centerId: selectedRowData.centerId,
        centerName:selectedRowData.centerName,
        classId: selectedRowData.classId,
        className:selectedRowData.className,
        course:selectedRowData.course,
        courseId: selectedRowData.courseId,
        batchId: selectedRowData.batchId,
        batch: selectedRowData.batch,
        days: selectedRowData.days,
        classRoom: selectedRowData.classRoom,
        startDate: selectedRowData.startDate,
        endDate: selectedRowData.endDate,
        studentCount: selectedRowData.studentCount,
        teacher:selectedRowData.teacher,
        userId: selectedRowData.userId,
      };
      console.log("Payload Data:", payload);
      try {
        const response = await api.put(
          `/updateStudentCourseDetails/${studentCourseDetailsId}`,
          payload
        );

        if (response.status === 200) {
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

  const fetchCourseData = async () => {
    try {
      const courseData = await fetchAllCoursesWithIds();
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchPackageData = async () => {
    try {
      const packageData = await fetchAllPackageList();
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCourseData();
    fetchPackageData();
  }, []);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable();
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table) {
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

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
        setData(response.data);
        const studentCourseDetail = response.data.studentCourseDetailModels[0];
        setStudentCourseDetailsId(studentCourseDetail.id);
        formik.setFieldValue({
          // ...studentCourseDetail,
          studentCourseDetailsId: studentCourseDetail.id,
        });
        console.log("Student Course Detail Id:", studentCourseDetail.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [id]);

  const handleRowSelect = (data) => {
    if (data.availableSlots === 0) {
      toast.error("Class is Full");
      return; // Prevent further actions
    }
    setSelectedRow(data.id);
    setSelectedRowData(data);
    console.log("Selected Row Data:", data);
    console.log("Selected Row Data Valuess are:", selectedRowData);

    // Calculate days between startDate and endDate
    if (data.startDate && data.endDate) {
      const days = calculateDays(data.startDate, data.endDate, data.days);
      setAvailableDays(days);
    } else {
      setAvailableDays([]);
    }
  };

  const calculateDays = (startDate, endDate, selectedDay) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];

    // Get the numeric representation of the selected day (0 for Sunday, 1 for Monday, etc.)
    const targetDay = new Date(
      `${selectedDay}, ${start.toDateString()}`
    ).getDay();

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() === targetDay) {
        days.push({
          value: date.toISOString().split("T")[0],
          label: date.toDateString(),
        });
      }
    }

    return days;
  };

  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="border-0 mb-5">
          <div className="mb-5">
            <div className="border-0 my-2 px-2">
              <div className="row my-2">
                <div className="col-md-6">
                  <p className="headColor">Course Detail</p>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                  <Link to={"/student"}>
                    <button
                      className="btn btn-border btn-sm mx-3"
                      style={{ padding: "7px" }}
                    >
                      Back
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-button btn-sm"
                    disabled={loadIndicator}
                  >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Update
                  </button>
                </div>
              </div>
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
              <div className="row mt-2">
                <div className="col-md-4">
                  <select
                    {...formik.getFieldProps("courseId")}
                    class={`form-select  ${
                      formik.touched.courseId && formik.errors.courseId
                        ? "is-invalid"
                        : ""
                    }`}
                    id="courseId"
                    name="courseId"
                  >
                    <option value="" disabled selected>
                      Select Course
                    </option>
                    {courseData &&
                      courseData.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.courseNames}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    {...formik.getFieldProps("days")}
                    class={`form-select  ${
                      formik.touched.days && formik.errors.days
                        ? "is-invalid"
                        : ""
                    }`}
                    id="days"
                    name="days"
                  >
                    <option value="" disabled selected>
                      Select Day
                    </option>
                    <option value="MONDAY">MONDAY</option>
                    <option value="TUESDAY">TUESDAY</option>
                    <option value="WEDNESDAY">WEDNESDAY</option>
                    <option value="THURSDAY">THURSDAY</option>
                    <option value="FRIDAY">FRIDAY</option>
                    <option value="SATURDAY">SATURDAY</option>
                    <option value="SUNDAY">SUNDAY</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <select
                    {...formik.getFieldProps("batchId")}
                    className="form-select"
                    id="batchId"
                    name="batchId"
                  >
                    <option value="" disabled selected>
                      Select Batch Time
                    </option>
                    <option value="1">2:30 pm</option>
                    <option value="2">3:30 pm</option>
                    <option value="3">5:00 pm</option>
                    <option value="4">7:00 pm</option>
                    <option value="5">12:00 pm</option>
                    <option value="6">1:00 pm</option>
                  </select>
                </div>
              </div>
              {/* ScheduleTeachers Table */}
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
                  <div className="table-responsive">
                    <table ref={tableRef} className="display">
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
                      <tbody>
                        {datas.map((data, index) => (
                          <tr
                            key={index}
                            onClick={() => handleRowSelect(data)}
                            className={
                              selectedRow === data.id ? "selected-row" : ""
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <th scope="row" className="text-center">
                              <input
                                type="radio"
                                className="form-check-input"
                                checked={selectedRow === data.id}
                                onChange={() => handleRowSelect(data)}
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
                )}
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <select
                    {...formik.getFieldProps("packageName")}
                    class={`form-select  ${
                      formik.touched.packageName && formik.errors.packageName
                        ? "is-invalid"
                        : ""
                    }`}
                    id="packageName"
                    name="packageName"
                  >
                    <option value="" disabled selected>
                      Select Package
                    </option>
                    {packageData &&
                      packageData.map((packages) => (
                        <option
                          key={packages.id}
                          value={packages.packageNamesas}
                        >
                          {packages.packageNames}
                        </option>
                      ))}
                  </select>
                </div>
                {availableDays.length > 0 && (
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      name="lessonName"
                      {...formik.getFieldProps("lessonName")}
                    >
                      <option value="" disabled selected>
                        Select Date
                      </option>
                      {availableDays.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  </div>
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
