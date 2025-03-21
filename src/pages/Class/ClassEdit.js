import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassRoomWithCenterIds from "../List/ClassRoomList";
import Select from "react-select";
import fetchAllClassRoomWithAll from "../List/ClassRoomListAll";

function ClassEdit() {
  const { id } = useParams();
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

  const [batchData, setBatchData] = useState(null);

  const formik = useFormik({
    initialValues: {
      centerId: "",
      courseId: "",
      className: "",
      classType: "",
      durationInHrs: "01",
      durationInMins: "30",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      day: "",
      teacher: "",
      classId: "",
      remark: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.updatedBy = userName;
      const selectedValue = formik.values.centerId;
      let selectedOptionName = "";

      centerData.forEach((center) => {
        if (parseInt(selectedValue) === center.id) {
          selectedOptionName = center.centerNames || "--";
        }
      });

      values.centerName = selectedOptionName;

      console.log(values);

      try {
        const response = await api.put(
          `/updateCourseClassListing/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
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
      let classRoom = [];
      const numericCenterId = Number(centerId);
      if (numericCenterId === 0) {
        classRoom = await fetchAllClassRoomWithAll();
      } else {
        classRoom = await fetchAllClassRoomWithCenterIds(numericCenterId);
      }
      if (!Array.isArray(classRoom)) {
        throw new Error("API did not return an array");
      }
      const formattedCourses = classRoom.map((course) => ({
        value: course.id,
        label: course.classRoomName,
      }));
      setClassRoomData(formattedCourses);
    } catch (error) {
      console.error("Error fetching classRoom:", error);
      toast.error(error.message || "Failed to fetch");
    }
  };

  const handleCenterChange = (event) => {
    const center = event.target.value;
    formik.setFieldValue("centerId", center);
    formik.setFieldValue("classId", "");
    formik.setFieldValue("userId", ""); // Reset teacher/userId
    setCourseData(null);
    setClassRoomData(null);
    setTeacherData(null);
    fetchCourses(center);
    fetchClassRoom(center);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseClassListingsById/${id}`);
        formik.setValues(response.data);
        fetchCourses(response.data.centerId);
        fetchClassRoom(response.data.centerId);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };

    getData();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const fetchBatchandTeacherData = async (day ,centerId) => {
    try {
      const response = await api.get(
        `getTeacherWithBatchListByDay?day=${day}&centerId=${centerId}`
      );
      setTeacherData(response.data.teacherList);
      setBatchData(response.data.batchList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (formik.values.day && formik.values.centerId) {
      fetchBatchandTeacherData(formik.values.day, formik.values.centerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.day, formik.values.centerId]);

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
        <li className="active breadcrumb-item" aria-current="page">
          &nbsp;Class Edit
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex align-items-center justify-content-between p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="active dot"></div>
              </div>
              <span className="text-muted me-2">Edit Class</span>
            </div>
            <div className="d-flex align-items-center my-2 pe-3">
              <Link to="/class">
                <button type="button " className="btn btn-border btn-sm">
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
                    className="me-2 spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                <span className="fw-medium">Update</span>
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-12 col-md-6 mb-4">
                <lable className="">
                  Centre<span className="text-danger">*</span>
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
                  onChange={handleCenterChange}
                  disabled
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
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Course<span className="text-danger">*</span>
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
                  disabled
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
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Class Name<span className="text-danger">*</span>
                </label>
                <input
                  name="className"
                  type="text"
                  className={`form-control  ${
                    formik.touched.className && formik.errors.className
                      ? "is-invalid"
                      : ""
                  }`}
                  readOnly
                  {...formik.getFieldProps("className")}
                />
                {formik.touched.className && formik.errors.className && (
                  <div className="invalid-feedback">
                    {formik.errors.className}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Class Type<span className="text-danger">*</span>
                </label>{" "}
                <br />
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classType"
                    id="inlineRadio1"
                    value="Group"
                    onChange={formik.handleChange}
                    checked={formik.values.classType === "Group"}
                    disabled
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Group
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="classType"
                    id="inlineRadio2"
                    value="Individual"
                    onChange={formik.handleChange}
                    checked={formik.values.classType === "Individual"}
                    disabled
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Individual
                  </label>
                </div>
                {formik.errors.classType && formik.touched.classType && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.classType}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Duration(Hrs)<span className="text-danger">*</span>
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
                  disabled
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
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Duration(Mins)<span className="text-danger">*</span>
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
                  disabled
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
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Start Date<span className="text-danger">*</span>
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
                  readOnly
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
              <div className="col-12 col-md-6 mb-4">
                <label>
                  End Date<span className="text-danger">*</span>
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
                  readOnly
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
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Day<span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("day")}
                  className={`form-select  ${
                    formik.touched.day && formik.errors.day ? "is-invalid" : ""
                  }`}
                  name="day"
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.day}
                >
                  <option></option>
                  <option value="MONDAY">Monday</option>
                  <option value="TUESDAY">Tuesday</option>
                  <option value="WEDNESDAY">Wednesday</option>
                  <option value="THURSDAY">Thursday</option>
                  <option value="FRIDAY">Friday</option>
                  <option value="SATURDAY">Saturday</option>
                  <option value="SUNDAY">Sunday</option>
                </select>
                {formik.touched.day && formik.errors.day && (
                  <div className="invalid-feedback">{formik.errors.day}</div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-4">
                <label>Teacher</label>
                <select
                  {...formik.getFieldProps("userId")}
                  className={`form-select  ${
                    formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                  }`}
                  name="userId"
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userId}
                >
                  <option></option>
                  {teacherData &&
                    teacherData.map((userId) => (
                      <option key={userId.teacherId} value={userId.teacherId}>
                        {userId.teacherName}
                      </option>
                    ))}
                </select>
                {formik.touched.userId && formik.errors.userId && (
                  <div className="invalid-feedback">{formik.errors.userId}</div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Start Time<span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("startTime")}
                  className={`form-select  ${
                    formik.touched.startTime && formik.errors.startTime
                      ? "is-invalid"
                      : ""
                  }`}
                  name="startTime"
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startTime}
                >
                  <option></option>
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
                {formik.touched.startTime && formik.errors.startTime && (
                  <div className="invalid-feedback">
                    {formik.errors.startTime}
                  </div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-4">
                <label>
                  End Time<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("endTime")}
                  className={`form-control  ${
                    formik.touched.endTime && formik.errors.endTime
                      ? "is-invalid"
                      : ""
                  }`}
                  disabled
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
              {/* <div className="col-12 col-md-6 mb-4">
                <label>Class Room</label>
                <select
                  {...formik.getFieldProps("classId")}
                  className={`form-select  ${
                    formik.touched.classId && formik.errors.classId
                      ? "is-invalid"
                      : ""
                  }`}
                  name="classId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.classId}
                >
                  <option></option>
                  {classRoomData &&
                    classRoomData.map((classId) => (
                      <option key={classId.id} value={classId.id}>
                        {classId.classRoomName}
                      </option>
                    ))}
                </select>
                {formik.touched.classId && formik.errors.classId && (
                  <div className="invalid-feedback">
                    {formik.errors.classId}
                  </div>
                )}
              </div> */}
              <div className="col-12 col-md-6 mb-4">
                              <label>Class Room</label>
                              <Select
                                options={classRoomData}
                                name="classId"
                                value={classRoomData?.find(
                                  (option) => option.value === formik.values.classId
                                )}
                                onChange={(selectedOption) => {
                                  formik.setFieldValue(
                                    "classId",
                                    selectedOption ? selectedOption.value : ""
                                  );
                                  formik.setFieldTouched("classId", true);
                                }}
                                onBlur={() => formik.setFieldTouched("classId", true)}
                                placeholder="Select Course"
                                isSearchable
                                isClearable
                                className={`${
                                  formik.touched.classId && formik.errors.classId
                                    ? "is-invalid"
                                    : ""
                                }`}
                                // {...formik.getFieldProps("classId")}
                              />
                              {formik.touched.classId && formik.errors.classId && (
                                <div className="invalid-feedback">
                                  {formik.errors.classId}
                                </div>
                              )}
                            </div>
              <div className="col-12 col-md-6 mb-4">
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

export default ClassEdit;
