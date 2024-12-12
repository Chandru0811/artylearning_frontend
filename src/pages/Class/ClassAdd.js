import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassRoomWithCenterIds from "../List/ClassRoomList";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";

function ClassAdd() {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [classRoomData, setClassRoomData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const validationSchema = Yup.object({
    centerId: Yup.string().required("*Centre Name is required"),
    courseId: Yup.string().required("*Course Name is required"),
    className: Yup.string().required("*Class Name is required"),
    classType: Yup.string().required("*Class Type is required"),
    durationInHrs: Yup.number().required("*Duration Hours is required"),
    durationInMins: Yup.number().required("*Duration Minutes is required"),
    startDate: Yup.date().required("*Start Date is required"),
    endDate: Yup.date().required("*End Date is required"),
    startTime: Yup.string().required("*Start Time is required"),
    endTime: Yup.string().required("*End Time is required"),
    day: Yup.string().required("*Day is required"),
    remark: Yup.string()
      .max(200, "*The maximum length is 200 characters")
      .notRequired(),
  });

  const getEndDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    return today.toISOString().split("T")[0];
  };

  const formik = useFormik({
    initialValues: {
      centerId: "",
      courseId: "",
      className: "",
      classType: "",
      durationInHrs: "01",
      durationInMins: "30",
      startDate: new Date().toISOString().split("T")[0],
      endDate: getEndDate(),
      startTime: "",
      endTime: "",
      day: "",
      teacher: "",
      classRoome: "",
      remark: "",
      // createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.createdBy = userName;
      const selectedValue = formik.values.centerId; // Assuming formik is in scope
      let selectedOptionName = "";

      centerData.forEach((center) => {
        if (parseInt(selectedValue) === center.id) {
          selectedOptionName = center.centerNames || "--";
        }
      });

      values.centerName = selectedOptionName;

      console.log(values);

      try {
        const response = await api.post("/createCourseClassListings", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/class");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Duplicate Error:", error);
        if (error.response.status === 409) {
          toast.warning("Class Name Already Created!");
        } else {
          toast.error(error);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
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

  const fetchClassRoom = async (centerId) => {
    try {
      const classRoom = await fetchAllClassRoomWithCenterIds(centerId);
      setClassRoomData(classRoom);
      console.log("first", setClassRoomData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTeacher = async (centerId) => {
    try {
      const teacher = await fetchAllTeacherListByCenter(centerId);
      setTeacherData(teacher);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCenterChange = (event) => {
    const center = event.target.value;
    formik.setFieldValue("centerId", center);
    formik.setFieldValue("classRoom", "");
    formik.setFieldValue("userId", ""); // Reset teacher/userId
    setCourseData(null);
    setClassRoomData(null);
    setTeacherData(null);
    fetchCourses(center);
    fetchClassRoom(center);
    fetchTeacher(center);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateEndTime = () => {
    const { durationInHrs, durationInMins, startTime } = formik.values;
    if (!startTime) return;

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const endHours =
      (startHours +
        parseInt(durationInHrs) +
        Math.floor((startMinutes + parseInt(durationInMins)) / 60)) %
      24;
    const endMinutes = (startMinutes + parseInt(durationInMins)) % 60;

    const formattedEndTime = `${String(endHours).padStart(2, "0")}:${String(
      endMinutes
    ).padStart(2, "0")}`;
    formik.setFieldValue("endTime", formattedEndTime);
  };

  useEffect(() => {
    calculateEndTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.durationInHrs,
    formik.values.durationInMins,
    formik.values.startTime,
  ]);

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
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/class" className="custom-breadcrumb">
            &nbsp;Class
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Class Add
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
              <span class="me-2 text-muted">Add Class</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/class">
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
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
                <span className="fw-medium">Save</span>
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row">
              <div class="col-md-6 col-12 mb-4">
                <lable class="">
                  Centre<span class="text-danger">*</span>
                </lable>
                <select
                  {...formik.getFieldProps("centerId")}
                  name="centerId"
                  className={`form-select   ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  class="form-select "
                  onChange={handleCenterChange}
                >
                  <option selected></option>
                  {centerData &&
                    centerData.map((centerId) => (
                      <option key={centerId.id} value={centerId.id}>
                        {centerId.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Course<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("courseId")}
                  name="courseId"
                  className={`form-select   ${
                    formik.touched.courseId && formik.errors.courseId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  class="form-select "
                >
                  <option selected></option>
                  {courseData &&
                    courseData.map((courseId) => (
                      <option key={courseId.id} value={courseId.id}>
                        {courseId.courseNames}
                      </option>
                    ))}
                </select>
                {formik.touched.courseId && formik.errors.courseId && (
                  <div className="invalid-feedback">
                    {formik.errors.courseId}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Class Name<span class="text-danger">*</span>
                </label>
                <input
                  name="className"
                  class="form-control "
                  type="text"
                  className={`form-control  ${
                    formik.touched.className && formik.errors.className
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("className")}
                />
                {formik.touched.className && formik.errors.className && (
                  <div className="invalid-feedback">
                    {formik.errors.className}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Class Type<span class="text-danger">*</span>
                </label>{" "}
                <br />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="classType"
                    id="inlineRadio1"
                    value="Group"
                    onChange={formik.handleChange}
                    checked={formik.values.classType === "Group"}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Group
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="classType"
                    id="inlineRadio2"
                    value="Individual"
                    onChange={formik.handleChange}
                    checked={formik.values.classType === "Individual"}
                  />
                  <label class="form-check-label" for="inlineRadio2">
                    Individual
                  </label>
                </div>
                {formik.errors.classType && formik.touched.classType && (
                  <div className="text-danger  " style={{ fontSize: ".875em" }}>
                    {formik.errors.classType}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Duration(Hrs)<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("durationInHrs")}
                  className={`form-select  ${
                    formik.touched.durationInHrs && formik.errors.durationInHrs
                      ? "is-invalid"
                      : ""
                  }`}
                  name="durationInHrs"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.durationInHrs}
                >
                  <option></option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                </select>
                {formik.touched.durationInHrs &&
                  formik.errors.durationInHrs && (
                    <div className="invalid-feedback">
                      {formik.errors.durationInHrs}
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Duration(Mins)<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("durationInMins")}
                  className={`form-select  ${
                    formik.touched.durationInMins &&
                    formik.errors.durationInMins
                      ? "is-invalid"
                      : ""
                  }`}
                  name="durationInMins"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.durationInMins}
                >
                  <option></option>
                  <option value="00">00</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </select>
                {formik.touched.durationInMins &&
                  formik.errors.durationInMins && (
                    <div className="invalid-feedback">
                      {formik.errors.durationInMins}
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Start Date<span class="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("startDate")}
                  className={`form-control  ${
                    formik.touched.startDate && formik.errors.startDate
                      ? "is-invalid"
                      : ""
                  }`}
                  name="startDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startDate}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <div className="invalid-feedback">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  End Date<span class="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("endDate")}
                  className={`form-control  ${
                    formik.touched.endDate && formik.errors.endDate
                      ? "is-invalid"
                      : ""
                  }`}
                  name="endDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endDate}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <div className="invalid-feedback">
                    {formik.errors.endDate}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Day<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("day")}
                  className={`form-select  ${
                    formik.touched.day && formik.errors.day ? "is-invalid" : ""
                  }`}
                  name="day"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.day}
                >
                  <option></option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                {formik.touched.day && formik.errors.day && (
                  <div className="invalid-feedback">{formik.errors.day}</div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>Teacher</label>
                <select
                  {...formik.getFieldProps("teacher")}
                  className={`form-select  ${
                    formik.touched.teacher && formik.errors.teacher
                      ? "is-invalid"
                      : ""
                  }`}
                  name="teacher"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.teacher}
                >
                  <option></option>
                  {teacherData &&
                    teacherData.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.teacherNames}
                      </option>
                    ))}
                </select>
                {formik.touched.teacher && formik.errors.teacher && (
                  <div className="invalid-feedback">
                    {formik.errors.teacher}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Start Time<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("startTime")}
                  className={`form-select  ${
                    formik.touched.startTime && formik.errors.startTime
                      ? "is-invalid"
                      : ""
                  }`}
                  name="startTime"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startTime}
                >
                  <option></option>
                  <option value="10:00">10:00 am</option>
                  <option value="11:30">11:30 am</option>
                </select>
                {formik.touched.startTime && formik.errors.startTime && (
                  <div className="invalid-feedback">
                    {formik.errors.startTime}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  End Time<span class="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("endTime")}
                  className={`form-control  ${
                    formik.touched.endTime && formik.errors.endTime
                      ? "is-invalid"
                      : ""
                  }`}
                  name="endTime"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endTime}
                />
                {formik.touched.endTime && formik.errors.endTime && (
                  <div className="invalid-feedback">
                    {formik.errors.endTime}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>Class Room</label>
                <select
                  {...formik.getFieldProps("classRoom")}
                  className={`form-select  ${
                    formik.touched.classRoom && formik.errors.classRoom
                      ? "is-invalid"
                      : ""
                  }`}
                  name="classRoom"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.classRoom}
                >
                  <option></option>
                  {classRoomData &&
                    classRoomData.map((classRoom) => (
                      <option key={classRoom.id} value={classRoom.id}>
                        {classRoom.classRoomName}
                      </option>
                    ))}
                </select>
                {formik.touched.classRoom && formik.errors.classRoom && (
                  <div className="invalid-feedback">
                    {formik.errors.classRoom}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label>Remark</label>
                <textarea
                  name="remark"
                  className={`form-control ${
                    formik.touched.remark && formik.errors.remark
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("remark")}
                  maxLength={200}
                />
                {formik.touched.remark && formik.errors.remark && (
                  <div className="invalid-feedback">{formik.errors.remark}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ClassAdd;
