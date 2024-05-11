import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";

function DocumentAdd() {
  const navigate = useNavigate();
  const [folderCategory, setFolderCategory] = useState("group");
  const [centerData, setCenterData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();

      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCourses = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courses);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchTeacher = async (centerId) => {
    try {
      const teacher = await fetchAllTeacherListByCenter(centerId);
      setUserData(teacher);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchStudent = async (centerId) => {
    try {
      const teacher = await fetchAllStudentListByCenter(centerId);
      setStudentData(teacher);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchClasses = async (courseId) => {
    try {
      const classes = await fetchAllClassesWithIdsC(courseId);
      setClassData(classes);
    } catch (error) {
      toast.error(error);
    }
  };

  const validationSchema = Yup.object({
    center: Yup.string().required("*Centre is required"),
    course: Yup.string().required("*Course is required"),
    userId: Yup.string().required("*Teacher is required"),
    days: Yup.string().required("*Days is required"),
    classListing: Yup.string().required("*Class Listing is required"),
    date: Yup.string().required("*Date is required"),
    folderCategoryListing: Yup.string().required("*FolderCategory is required"),
    batchId: Yup.string().required("*Batch Time is required"),
    expiredDate: Yup.string().required("*Expired Date is required"),
  });

  const formik = useFormik({
    initialValues: {
      center: "",
      course: "",
      userId: "",
      classListing: "",
      date: "",
      days: "",
      expiredDate: "",
      folderCategoryListing: "group",
      batchId: "",
      groupSelect: "",
      studentSelect: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const selectedValue = formik.values.center;// Assuming formik is in scope
        let selectedOptionName = "";
        let selectedClassName = "";
        let selectedCourseName = "";

        centerData.forEach((center) => {
          if (parseInt(selectedValue) === center.id) {
            selectedOptionName = center.centerNames || "--";
          }
        });

        // Find selected class name
        classData.forEach((cls) => {
          if (parseInt(values.classListing) === cls.id) {
            selectedClassName = cls.classNames || "--";
          }
        });

        // Find selected course name
        courseData.forEach((course) => {
          if (parseInt(values.course) === course.id) {
            selectedCourseName = course.courseNames || "--";
          }
        });

        let requestBody = {
          centerId: values.center,
          userId: values.userId,
          days: values.days,
          center: selectedOptionName,
          classListing: selectedClassName,
          course: selectedCourseName,
          courseId: values.course,
          classId: values.classListing,
          folderCategory: folderCategory,
          batchId: values.batchId,
          batchTime:
            values.batchId === "5"
              ? "12:00 pm"
              : values.batchId === "6"
              ? "1:00 pm"
              : values.batchId === "1"
              ? "2:30 pm"
              : values.batchId === "2"
              ? "3:30 pm"
              : values.batchId === "3"
              ? "5:00 pm"
              : values.batchId === "4"
              ? "7:00 pm"
              : "",
          date: values.date,
          expiredDate: values.expiredDate // Calculating expiry date
        };

        if (folderCategory === "group") {
          requestBody.isGroupUpload = true;
        } else {
          requestBody.isGroupUpload = false;
          requestBody.studentId = values.studentSelect;
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
        toast.error("Error submitting form data:", error.message);
      }finally {
        setLoadIndicator(false);
      }
    },
  });

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
    setCourseData(null);
    setClassData(null);
    setUserData(null);
    setStudentData(null);
    const center = event.target.value;
    formik.setFieldValue("center", center);
    fetchCourses(center);
    fetchTeacher(center);
    fetchStudent(center); // Fetch courses for the selected center
  };

  const handleCourseChange = (event) => {
    setClassData(null);
    const course = event.target.value;
    formik.setFieldValue("course", course);
    fetchClasses(course); // Fetch class for the selected center
  };

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/document">
            <button type="button " className="btn btn-sm btn-border   ">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-button btn-sm" disabled={loadIndicator}>
                {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                Save
              </button>
        </div>
        <div className="container">
          <div className="row py-4">
            <div class="col-md-6 col-12 mb-4">
              <lable class="">
                Centre<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("center")}
                name="center"
                className={`form-select  ${
                  formik.touched.center && formik.errors.center
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                onChange={handleCenterChange}
              >
                <option disabled></option>
                {centerData &&
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
            <div class="col-md-6 col-12 mb-4">
              <lable class="">
                Course<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("course")}
                name="course"
                className={`form-select    ${
                  formik.touched.course && formik.errors.course
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                onChange={handleCourseChange}
              >
                <option disabled></option>
                {courseData &&
                  courseData.map((courses) => (
                    <option key={courses.id} value={courses.id}>
                      {courses.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.course && formik.errors.course && (
                <div className="invalid-feedback">{formik.errors.course}</div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-4 d-flex flex-column justify-content-end">
              <lable class="">
                Class Listing<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("classListing")}
                name="classListing"
                className={`form-select    ${
                  formik.touched.classListing && formik.errors.classListing
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option disabled></option>
                {classData &&
                  classData.map((classes) => (
                    <option key={classes.id} value={classes.id}>
                      {classes.classNames}
                    </option>
                  ))}
              </select>
              {formik.touched.classListing && formik.errors.classListing && (
                <div className="invalid-feedback">
                  {formik.errors.classListing}
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-4">
              <lable class="">
                Teacher<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("userId")}
                name="userId"
                className={`form-select  ${
                  formik.touched.userId && formik.errors.userId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option disabled></option>
                {userData &&
                  userData.map((userId) => (
                    <option key={userId.id} value={userId.id}>
                      {userId.teacherNames}
                    </option>
                  ))}
              </select>
              {formik.touched.userId && formik.errors.userId && (
                <div className="invalid-feedback">{formik.errors.userId}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-4">
              <label className="">
                Days<span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("days")}
                className={`form-select ${
                  formik.touched.days && formik.errors.days ? "is-invalid" : ""
                }`}
              >
                <option value=""></option>
                <option value="SUNDAY">Sunday</option>
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
              </select>
              {formik.touched.days && formik.errors.days && (
                <div className="invalid-feedback">{formik.errors.days}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-4">
              <label className="">
                Batch Time<span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("batchId")}
                className={`form-select ${
                  formik.touched.batchId && formik.errors.batchId
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option value=""></option>
                <option value="5">12:00 pm</option>
                <option value="6">1:00 pm</option>
                <option value="1">2:30 pm</option>
                <option value="2">3:30 pm</option>
                <option value="3">5:00 pm</option>
                <option value="4">7:00 pm</option>
              </select>
              {formik.touched.batchId && formik.errors.batchId && (
                <div className="invalid-feedback">{formik.errors.batchId}</div>
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

            <div class="col-md-6 col-12 mb-3">
              {folderCategory === "group" ? (
                <></>
              ) : (
                <div className="">
                  <label className="form-label">Student Name</label>
                  <select
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
                  </select>
                  {formik.touched.studentSelect &&
                    formik.errors.studentSelect && (
                      <div className="invalid-feedback">
                        {formik.errors.studentSelect}
                      </div>
                    )}
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
                type="text"
                className={`form-control  ${
                  formik.touched.expiredDate && formik.errors.expiredDate
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("expiredDate")}
                value={calculateExpiryDate(formik.values.date)}
              />
               {formik.touched.expiredDate && formik.errors.expiredDate && (
                  <div className="invalid-feedback">{formik.errors.expiredDate}</div>
                )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DocumentAdd;
