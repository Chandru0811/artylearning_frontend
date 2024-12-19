import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import api from "../../config/URL";
import { toast } from "react-toastify";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net";
import * as Yup from "yup";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllPackageListByCenter from "../List/PackageListByCenter";

const validationSchema = Yup.object().shape({
  packageName: Yup.string().required("Package Name is required"),
  lessonName: Yup.string().required("Lesson Name is required"),
});

function StudentRegisterCourse() {
  const { id } = useParams();
  const [data, setData] = useState({});
  console.log("Data ....:", data);
  console.log("ID ....:", id);

  // const centerIdNO = data.centerId;
  // console.log("Center ID:", centerIdNO);

  const [studentCourseDetailsId, setStudentCourseDetailsId] = useState({});

  console.log("studentCourseDetailsId", studentCourseDetailsId);

  const tableRef = useRef(null);
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const centerId = searchParams.get("centerId");
  const [batchData, setBatchData] = useState(null);

  const formik = useFormik({
    initialValues: {
      lessonName: "",
      packageName: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      if (!selectedRow) {
        toast.warning("Please select a course");
        return;
      }
      setLoadIndicator(true);
      const payload = {
        ...data,
        studentId: id,
        centerId: selectedRowData.centerId,
        centerName: selectedRowData.centerName,
        classId: selectedRowData.classId,
        className: selectedRowData.className,
        course: selectedRowData.course,
        courseId: selectedRowData.courseId,
        batchId: selectedRowData.batchId,
        batch: selectedRowData.batch,
        days: selectedRowData.days,
        classRoom: selectedRowData.classRoom,
        startDate: selectedRowData.startDate,
        endDate: selectedRowData.endDate,
        studentCount: selectedRowData.studentCount,
        teacher: selectedRowData.teacher,
        userId: selectedRowData.userId,
      };
      console.log("Payload Data:", payload);
      try {
        let response;

        if (studentCourseDetailsId !== null) {
          response = await api.put(
            `/updateStudentCourseDetails/${studentCourseDetailsId}`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          response = await api.post(`/createStudentCourseDetails`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
        if (response.status === 200 || response.status === 201) {
          toast.success(response.data.message);
          // navigate("/student");
          navigate(`/invoice/add?studentID=${id}`);
          formik.resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const fetchCourseData = async () => {
    try {
      const courseData = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courseData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPackageData = async () => {
    try {
      const packageData = await fetchAllPackageListByCenter(centerId);
      setPackageData(packageData);
    } catch (error) {
      console.error(error);
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
      const response = await api.get(`/getAllScheduleTeachers/${centerId}`, {
        params,
      });
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
        const response = await api.get(`/getAllStudentById/${id}`);
        setData(response.data);

        const studentCourseDetail = response.data.studentCourseDetailModels[0];
        setStudentCourseDetailsId(studentCourseDetail.id);
        console.log("studentCourseDetail:", studentCourseDetail);
        formik.setValues({
          // ...studentCourseDetail,
          studentCourseDetailsId: studentCourseDetail.id,
          // courseId : courseId,
          // packageName : packageName,
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

  const fetchBatchandTeacherData = async (day) => {
    try {
      const response = await api.get(`getTeacherWithBatchListByDay?day=${day}`);
      setBatchData(response.data.batchList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (formik.values.days) {
      fetchBatchandTeacherData(formik.values.days);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.days]);

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

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
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
        <li>
          <Link to="/student" className="custom-breadcrumb">
            &nbsp;Student Listing{" "}
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to={`/student/view/${id}`} className="custom-breadcrumb">
            &nbsp;Studnet View
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Studnet Course Detail
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
            className="d-flex justify-content-between align-items-center p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2 text-muted">Course Detail</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to={`/student/view/${id}`}>
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button type="submit" className="btn btn-button btn-sm">
                <span className="fw-medium">Update</span>
              </button>
            </div>
          </div>
          <div className="p-2">
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
          <div className="border-0 my-2 px-2">
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
              <div className="col-md-4 d-flex">
                <select
                  {...formik.getFieldProps("batchId")}
                  className="form-select"
                  id="batchId"
                  name="batchId"
                >
                  <option value="">Select Batch</option>
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
                <button
                  type="button"
                  className="btn btn-sm border-secondary ms-3 my-1"
                  style={{ width: "100px" }}
                  onClick={() =>
                    formik.resetForm({
                      values: {
                        lessonName: "",
                        packageName: "",
                        courseId: "",
                        days: "",
                        batchId: "",
                      },
                    })
                  }
                >
                  Clear
                </button>
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
                      {Array.isArray(datas) &&
                        datas.map((data, index) => (
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
                      <option key={packages.id} value={packages.packageNamesas}>
                        {packages.packageNames}
                      </option>
                    ))}
                </select>
                {formik.touched.packageName && formik.errors.packageName && (
                  <div className="invalid-feedback">
                    {formik.errors.packageName}
                  </div>
                )}
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
                  {formik.touched.lessonName && formik.errors.lessonName && (
                    <div className="invalid-feedback">
                      {formik.errors.lessonName}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentRegisterCourse;
