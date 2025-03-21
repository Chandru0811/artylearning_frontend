import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassRoomWithCenterIds from "../List/ClassRoomList";
import Select from "react-select";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllClassRoomWithAll from "../List/ClassRoomListAll";

function ClassAdd({ selectedCenter }) {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  console.log("Selected Center :::", selectedCenter);
  const [classRoomData, setClassRoomData] = useState(null);
  const [teacherData, setTeacherData] = useState([]);
  const [batchData, setBatchData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const validationSchema = Yup.object({
    // centerId: Yup.string().required("*Centre Name is required"),
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
    userId: Yup.string().required("*Teacher selection is required"),
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
      centerId: selectedCenter === "0" ? "" : selectedCenter,
      centerName: "",
      courseId: "",
      className: "",
      courseName: "",
      classType: "",
      classCode: "",
      userId: "",
      teacherName: "",
      classId: "",
      durationInHrs: "",
      durationInMins: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: getEndDate(),
      startTime: "",
      endTime: "",
      day: "",
      remark: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.createdBy = userName;
      try {
        const response = await api.post("/createClassSchedules", values, {
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
        console.log(error);
        if (error.response.status === 409) {
          toast.warning(error?.response?.data?.message);
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
      const response = await fetchAllCentersWithIds();
      if (Array.isArray(response)) {
        setCenterData(response);
        // formik.setFieldValue("centerId", selectedCenter);
        fetchCourses(selectedCenter);
        fetchClassRoom(selectedCenter);
      } else {
        console.error("Invalid data format:", response);
        setCenterData([]);
      }
    } catch (error) {
      toast.error("Failed to fetch center data");
      console.error(error);
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      let courses = [];
      const numericCenterId = Number(centerId);
      if (numericCenterId === 0) {
        courses = await fetchAllCoursesWithIds();
      } else {
        courses = await fetchAllCoursesWithIdsC(numericCenterId);
      }
      if (!Array.isArray(courses)) {
        throw new Error("API did not return an array");
      }
      const formattedCourses = courses.map((course) => ({
        value: course.id,
        label: course.courseNames,
      }));
      setCourseOptions(formattedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error(error.message || "Failed to fetch courses");
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

  useEffect(() => {
    fetchData();
    if (selectedCenter) {
      formik.setFieldValue("centerId", selectedCenter);
    }
  }, [selectedCenter]);

  const fetchBatchandTeacherData = async (day) => {
    try {
      let apiUrl = `getTeacherWithBatchListByDay?day=${day}`;

      // Only append centerId if selectedCenter is not 0
      if (selectedCenter !== "0") {
        apiUrl += `&centerId=${selectedCenter}`;
      }

      const response = await api.get(apiUrl);
      setTeacherData(response.data.teacherList);
      setBatchData(response.data.batchList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (formik.values.day && selectedCenter) {
      fetchBatchandTeacherData(formik.values.day, selectedCenter);
    }
  }, [formik.values.day, selectedCenter]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getAllCoursesById/${formik.values.courseId}`
        );
        formik.setFieldValue("durationInHrs", response.data.durationInHrs);
        formik.setFieldValue("durationInMins", response.data.durationInMins);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
    if (formik.values.courseId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.courseId]);

  const handleCenterChange = (event) => {
    let center = event.target.value || selectedCenter;

    if (center === "0") {
      center = ""; // Set empty string if selectedCenter is "0"
    }
    setCourseOptions([]);
    formik.setFieldValue("centerId", center);
    fetchCourses(center);
    fetchClassRoom(center);
  };

  useEffect(() => {
    if (selectedCenter === "0") {
      formik.setFieldValue("centerId", "");
    } else {
      formik.setFieldValue("centerId", selectedCenter);
    }
    fetchData();
  }, [selectedCenter]);

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
            className="d-flex align-items-center justify-content-between p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="active dot"></div>
              </div>
              <span className="text-muted me-2">Add Class</span>
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
                <span className="fw-medium">Save</span>
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-12 col-md-6 d-none mb-4">
                <lable className="">
                  Centre<span className="text-danger">*</span>
                </lable>
                <select
                  {...formik.getFieldProps("centerId")}
                  name="centerId"
                  type="hidden"
                  className={`form-select  ${
                    formik.touched.center && formik.errors.center
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  onChange={handleCenterChange}
                >
                  <option disabled>Select a center</option>
                  {Array.isArray(centerData) &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.center && formik.errors.center && (
                  <div className="invalid-feedback">{formik.errors.center}</div>
                )}
              </div>
              <div className="col-12 col-md-6 mb-4">
                <label>
                  Course<span className="text-danger">*</span>
                </label>
                <Select
                  options={courseOptions}
                  name="courseId"
                  value={courseOptions.find(
                    (option) => option.value === formik.values.courseId
                  )}
                  onChange={(selectedOption) => {
                    formik.setFieldValue(
                      "courseId",
                      selectedOption ? selectedOption.value : ""
                    );
                    formik.setFieldTouched("courseId", true);
                  }}
                  onBlur={() => formik.setFieldTouched("courseId", true)}
                  placeholder="Select Course"
                  isSearchable
                  isClearable
                  className={`${
                    formik.touched.courseId && formik.errors.courseId
                      ? "is-invalid"
                      : ""
                  }`}
                  // {...formik.getFieldProps("courseId")}
                />
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
                >
                  <option></option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
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
                <label>
                  Teacher <span className="text-danger">*</span>
                </label>
                <Select
                  options={teacherData?.map((teacher) => ({
                    value: teacher.teacherId,
                    label: teacher.teacherName,
                  }))}
                  name="userId"
                  value={
                    teacherData?.find(
                      (teacher) => teacher.teacherId === formik.values.userId
                    )
                      ? {
                          value: formik.values.userId,
                          label: teacherData.find(
                            (teacher) =>
                              teacher.teacherId === formik.values.userId
                          )?.teacherName,
                        }
                      : null
                  }
                  onChange={(selectedOption) => {
                    formik.setFieldValue(
                      "userId",
                      selectedOption ? selectedOption.value : ""
                    );
                    formik.setFieldTouched("userId", true);
                  }}
                  onBlur={() => formik.setFieldTouched("userId", true)}
                  placeholder="Select Teacher"
                  isSearchable
                  isClearable
                  className={`${
                    formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                  }`}
                />
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

export default ClassAdd;
