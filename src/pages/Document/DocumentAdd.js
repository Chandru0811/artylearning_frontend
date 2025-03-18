import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";
import fetchAllCentersWithIds from "../List/CenterList";
import Select from "react-select";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllTeachersWithIds from "../List/TeacherList";
import fetchAllStudentsWithIds from "../List/StudentList";

const validationSchema = Yup.object({
  center: Yup.string().required("*Centre is required"),
  course: Yup.string().required("*Course is required"),
  userId: Yup.string().required("*Teacher is required"),
  day: Yup.string().required("*Days is required"),
  batchTime: Yup.string().required("*Batch Time is required"),
  classListing: Yup.string().required("*Class Listing is required"),
  folderCategoryListing: Yup.string().required("*FolderCategory is required"),
  date: Yup.string().required("*Date is required"),
  expiredDate: Yup.string().required("*Expired Date is required"),
});

function DocumentAdd({ selectedCenter }) {
  const navigate = useNavigate();
  const [folderCategory, setFolderCategory] = useState("group");
  const [centerData, setCenterData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [classCenter, setClassCenter] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [batchData, setBatchData] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  console.log("courseOptions ::", teacherOptions);

  const formik = useFormik({
    initialValues: {
      center: selectedCenter,
      course: "",
      userId: "",
      classId: "",
      classListing: "",
      date: "",
      day: "",
      expiredDate: "",
      folderCategoryListing: "group",
      batchTime: "",
      groupSelect: "",
      studentSelect: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      try {
        let selectedOptionName = "";
        let selectedClassName = "";
        let selectedCourseName = "";
        let selectedTeacherName = "";
        let selectedStudentName = "";

        console.log("Selected Center Object:", values.center);

        let classCenterData = classCenter; // Store initial value

        if (!selectedCenter || selectedCenter === "0") {
          try {
            const response = await api.get(
              `/getAllCourseClassListingsById/${values.classListing}`
            );
            classCenterData = response.data; // Assign fetched data
            setClassCenter(response.data); // Update state
          } catch (error) {
            toast.error("Error Fetching Data");
            setLoadIndicator(false);
            return; // Stop execution
          }
        }

        selectedOptionName = classCenterData?.centerName || "--";

        // Find selected class name
        selectedClassName =
          classOptions.find(
            (cls) => parseInt(values.classListing) === cls.value
          )?.label || "--";

        // Find selected course name
        selectedCourseName =
          courseOptions.find(
            (course) => parseInt(values.course) === course.value
          )?.label || "--";

        // Find selected teacher name
        selectedTeacherName =
          teacherOptions.find((user) => parseInt(values.userId) === user.value)
            ?.label || "--";

        // Find selected student name
        selectedStudentName =
          studentOptions.find(
            (student) => parseInt(values.studentName) === student.value
          )?.label || "--";

          let requestBody = {
            centerId: classCenterData?.centerId || selectedCenter,
            userId: values.userId,
            user: selectedTeacherName,
            day: values.day,
            center: selectedOptionName,
            classListing: selectedClassName,
            course: selectedCourseName,
            courseId: values.course,
            classId: values.classListing,
            folderCategory: folderCategory,
            batchTime: values.batchTime,
            date: values.date,
            expiredDate: values.expiredDate,
            createdBy: userName,
            isGroupUpload: folderCategory === "group",
          };

        if (folderCategory === "group") {
          requestBody.isGroupUpload = true;
        } else {
          requestBody.isGroupUpload = false;
          requestBody.studentId = values.studentSelect;
          requestBody.studentId = values.studentId;
          requestBody.studentName = selectedStudentName;
        }
        // console.log(requestBody);

        const response = await api.post(
          "/uploadStudentFilesWithSingleOrGroup",
          requestBody
        );

        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/document");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (
          error?.response?.status === 409 ||
          error?.response?.status === 404
        ) {
          toast.warning(error?.response?.data?.message);
        } else {
          toast.error("Error deleting data:", error);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
    validateOnChange: false, // Enable validation on change
    validateOnBlur: true, // Enable validation on blur
  });

  // Function to scroll to the first error field
  const scrollToError = (errors) => {
    const errorField = Object.keys(errors)[0]; // Get the first error field
    const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus(); // Set focus to the error element
    }
  };

  // Watch for form submit and validation errors
  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors);
    }
  }, [formik.submitCount, formik.errors]);

  const fetchData = async () => {
    try {
      const response = await fetchAllCentersWithIds();
      if (Array.isArray(response)) {
        setCenterData(response);
        formik.setFieldValue("center", selectedCenter);
        fetchCourses(selectedCenter);
        fetchTeacher(selectedCenter);
        fetchStudent(selectedCenter);
      } else {
        console.error("Invalid data format:", response);
        setCenterData([]);
      }
    } catch (error) {
      toast.error("Failed to fetch center data");
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchData();
    if (selectedCenter) {
      formik.setFieldValue("center", selectedCenter);
    }
  }, [selectedCenter]);

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

  const fetchTeacher = async (centerId) => {
    try {
      let teacherList = [];
      const numericCenterId = Number(centerId);
      if (numericCenterId === 0) {
        teacherList = await fetchAllTeachersWithIds();
      } else {
        teacherList = await fetchAllTeacherListByCenter(numericCenterId);
      }
      if (!Array.isArray(teacherList)) {
        throw new Error("API did not return an array");
      }
      const formattedCourses = teacherList.map((teacher) => ({
        value: teacher.id,
        label: teacher.teacherNames,
      }));
      setTeacherOptions(formattedCourses);
    } catch (error) {
      console.error("Error fetching Teacher:", error);
      toast.error(error.message || "Failed to fetch courses");
    }
  };

  const fetchStudent = async (centerId) => {
    try {
      let student = [];
      const numericCenterId = Number(centerId);
      if (numericCenterId === 0) {
        student = await fetchAllStudentsWithIds();
      } else {
        student = await fetchAllStudentListByCenter(numericCenterId);
      }
      if (!Array.isArray(student)) {
        throw new Error("API did not return an array");
      }
      const formattedCourses = student.map((student) => ({
        value: student.id,
        label: student.studentNames,
      }));
      setStudentOptions(formattedCourses);
    } catch (error) {
      console.error("Error fetching Student:", error);
      toast.error(error.message || "Failed to fetch courses");
    }
  };

  const fetchClasses = async (courseId) => {
    try {
      const classes = await fetchAllClassesWithIdsC(courseId);
      const formattedClasses = classes.map((classListing) => ({
        value: classListing.id,
        label: classListing.classNames,
      }));
      setClassOptions(formattedClasses);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (formik.values.date) {
      const calculatedExpiredDate = calculateExpiryDate(formik.values.date);
      formik.setFieldValue("expiredDate", calculatedExpiredDate);
    }
  }, [formik.values.date]);

  const calculateExpiryDate = (date) => {
    if (!date) return "";

    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) return "";

    const expiryDate = new Date(
      selectedDate.getTime() + 30 * 24 * 60 * 60 * 1000
    );

    const year = expiryDate.getFullYear();
    const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
    const day = String(expiryDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCenterChange = (event) => {
    const center = event.target.value || selectedCenter;
    // setCourseData(null);
    // setClassData(null);
    // setUserData(null);
    // setStudentData(null);
    setCourseOptions([]);
    setClassOptions([]);
    setTeacherOptions([]);
    setStudentOptions([]);
    formik.setFieldValue("center", center);
    fetchCourses(center);
    fetchTeacher(center);
    fetchStudent(center); // Fetch courses for the selected center
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
    if (formik.values.day) {
      fetchBatchandTeacherData(formik.values.day);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.day]);

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

  const handleCourseChange = (selectedOption) => {
    setClassData(null);
    const course = selectedOption ? selectedOption.value : "";
    formik.setFieldValue("course", course);
    fetchClasses(course); // Fetch class for the selected course
  };
  console.log("formik.values.center", formik.values.center);

  return (
    <div className="container">
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
          Document Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/document" className="custom-breadcrumb">
            Document
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Document Add
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
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Add Document</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/document">
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

          <div className="container">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-4 d-none">
                <lable className="">
                  Centre<span className="text-danger">*</span>
                </lable>
                <select
                  {...formik.getFieldProps("center")}
                  name="center"
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
              <div className="col-md-6 col-12 mb-4">
                <label className="">
                  Course<span className="text-danger">*</span>
                </label>
                <Select
                  options={courseOptions}
                  name="course"
                  value={
                    courseOptions.find(
                      (option) => option.value === formik.values.course
                    ) || null
                  }
                  onChange={handleCourseChange}
                  placeholder="Select Course"
                  isSearchable
                  isClearable
                  className={
                    formik.touched.course && formik.errors.course
                      ? "is-invalid"
                      : ""
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.course && formik.errors.course && (
                  <div className="invalid-feedback">{formik.errors.course}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4 ">
                <lable className="">
                  Class Listing<span className="text-danger">*</span>
                </lable>
                <Select
                  options={classOptions}
                  name="classListing"
                  value={classOptions.find(
                    (option) => option.value === formik.values.classListing
                  )}
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "classListing",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  placeholder="Select Class"
                  isSearchable
                  isClearable
                  className={`${
                    formik.touched.classListing && formik.errors.classListing
                      ? "is-invalid"
                      : ""
                  }`}
                  onBlur={formik.handleBlur}
                  // {...formik.getFieldProps("classListing")}
                />

                {formik.touched.classListing && formik.errors.classListing && (
                  <div className="invalid-feedback">
                    {formik.errors.classListing}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <lable className="">
                  Teacher<span className="text-danger">*</span>
                </lable>
                <Select
                  options={teacherOptions}
                  name="userId"
                  value={
                    teacherOptions.find(
                      (option) => option.value === formik.values.userId
                    ) || null
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "userId",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  placeholder="Select Teacher"
                  isSearchable
                  isClearable
                  className={`${
                    formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                  }`}
                  onBlur={formik.handleBlur}
                  // {...formik.getFieldProps("userId")}
                />

                {formik.touched.userId && formik.errors.userId && (
                  <div className="invalid-feedback">{formik.errors.userId}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label className="">
                  Days<span className="text-danger">*</span>
                </label>
                <Select
                  options={[
                    { value: "MONDAY", label: "Monday" },
                    { value: "TUESDAY", label: "Tuesday" },
                    { value: "WEDNESDAY", label: "Wednesday" },
                    { value: "THURSDAY", label: "Thursday" },
                    { value: "FRIDAY", label: "Friday" },
                    { value: "SATURDAY", label: "Saturday" },
                    { value: "SUNDAY", label: "Sunday" },
                  ]}
                  name="day"
                  value={
                    formik.values.day
                      ? {
                          value: formik.values.day,
                          label:
                            formik.values.day.charAt(0) +
                            formik.values.day.slice(1).toLowerCase(),
                        }
                      : null // Ensure null when no value is selected
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "day",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("day", true)}
                  placeholder="Select Day"
                  isSearchable
                  isClearable
                  className={
                    formik.touched.day && formik.errors.day ? "is-invalid" : ""
                  }
                />

                {formik.touched.day && formik.errors.day && (
                  <div className="invalid-feedback">{formik.errors.day}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label className="">
                  Batch Time<span className="text-danger">*</span>
                </label>
                <Select
                  options={
                    batchData
                      ? batchData.map((time) => ({
                          value:
                            time.includes("AM") || time.includes("PM")
                              ? convertTo24Hour(time)
                              : time,
                          label: normalizeTime(time),
                        }))
                      : []
                  }
                  name="batchTime"
                  value={
                    batchData
                      ? batchData
                          .map((time) => ({
                            value:
                              time.includes("AM") || time.includes("PM")
                                ? convertTo24Hour(time)
                                : time,
                            label: normalizeTime(time),
                          }))
                          .find(
                            (option) => option.value === formik.values.batchTime
                          )
                      : null
                  }
                  onChange={(selectedOption) =>
                    formik.setFieldValue(
                      "batchTime",
                      selectedOption ? selectedOption.value : ""
                    )
                  }
                  onBlur={() => formik.setFieldTouched("batchTime", true)}
                  placeholder="Select Batch Time"
                  isSearchable
                  isClearable
                  className={
                    formik.touched.batchTime && formik.errors.batchTime
                      ? "is-invalid"
                      : ""
                  }
                />

                {formik.touched.batchTime && formik.errors.batchTime && (
                  <div className="invalid-feedback">
                    {formik.errors.batchTime}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Date<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    name="date"
                    type="date"
                    className={`form-control  ${
                      formik.touched.date && formik.errors.date
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("date")}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="invalid-feedback">{formik.errors.date}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Expired Date<span className="text-danger">*</span>
                </label>
                <input
                  name="expiredDate"
                  type="date"
                  className={`form-control  ${
                    formik.touched.expiredDate && formik.errors.expiredDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("expiredDate")}
                  value={calculateExpiryDate(formik.values.date)}
                />
                {formik.touched.expiredDate && formik.errors.expiredDate && (
                  <div className="invalid-feedback">
                    {formik.errors.expiredDate}
                  </div>
                )}
              </div>
              {/* Radio buttons for selecting folder category */}
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Folder Category<span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <div>
                    <input
                      className="form-check-input "
                      type="radio"
                      id="group"
                      name="folderCategoryListing"
                      value="group"
                      checked={folderCategory === "group"}
                      onChange={() => setFolderCategory("group")}
                    />{" "}
                    &nbsp;
                    <label htmlFor="group">Group</label>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div>
                    <input
                      className="form-check-input "
                      type="radio"
                      id="individual"
                      name="folderCategoryListing"
                      value="individual"
                      checked={folderCategory === "individual"}
                      onChange={() => setFolderCategory("individual")}
                    />
                    &nbsp;
                    <label htmlFor="individual">Individual</label>
                  </div>
                </div>
                {formik.touched.folderCategoryListing &&
                  formik.errors.folderCategoryListing && (
                    <div className="invalid-feedback">
                      {formik.errors.folderCategoryListing}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                {folderCategory === "group" ? (
                  <></>
                ) : (
                  <div className="">
                    <label className="form-label">Student Name</label>
                    <Select
                      options={studentOptions}
                      name="studentId"
                      value={studentOptions.find(
                        (option) => option.value === formik.values.studentId
                      )}
                      onChange={(selectedOption) =>
                        formik.setFieldValue(
                          "studentId",
                          selectedOption ? selectedOption.value : ""
                        )
                      }
                      placeholder="Select Student"
                      isSearchable
                      isClearable
                      menuPlacement="top"
                    />
                    {/* <select
                      {...formik.getFieldProps("studentSelect")}
                      className={`form-select   ${
                        formik.touched.studentSelect &&
                        formik.errors.studentSelect
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option disabled></option>
                      {studentData &&
                        studentData.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.studentNames}
                          </option>
                        ))}
                    </select> */}
                    {formik.touched.studentId && formik.errors.studentId && (
                      <div className="invalid-feedback">
                        {formik.errors.studentId}
                      </div>
                    )}
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

export default DocumentAdd;
