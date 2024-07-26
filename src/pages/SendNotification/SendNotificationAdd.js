import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import { MultiSelect } from 'react-multi-select-component';

function SendNotificationAdd() {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedCenters, setSelectedCenters] = useState([]);

  const centerOptions = centerData.map(center => ({
    label: center.centerNames,
    value: center.id
  }));
  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCourses = async (centerId) => {
    try {
      const courses = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchClasses = async (courseId) => {
    try {
      const classes = await fetchAllClassesWithIdsC(courseId);
      setClassData(classes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    recipient: Yup.string().required("*Recipient Name is required"),
    messageTitle: Yup.string().required("*Title is required"),
    centerId: Yup.array().min(1, "At least one center must be selected"),
    courseId: Yup.array().min(1, "At least one course must be selected"),
    classId: Yup.array().min(1, "At least one class must be selected"),
    day: Yup.string().required("*Day is required"),
    files: Yup.string().required("*File is required"),
  });
  const formik = useFormik({
    initialValues: {
      recipient: "",
      messageTitle: "",
      centerId: [],
      courseId: [],
      classId: [],
      day: "",
      messageDescription: "",
      files: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log(values);
      const formData = new FormData();
      formData.append("recipient", values.recipient);
      formData.append("messageTitle", values.messageTitle);
      formData.append("centerId", values.centerId);
      formData.append("courseId", values.courseId);
      formData.append("classId", values.classId);
      formData.append("day", values.day);
      formData.append("messageDescription", values.messageDescription);
      for (let file of values.files) {
        formData.append("attachments", file);
      }
      try {
        const response = await api.post(
          `/sendSmsPushNotifications`,
          formData,
          {}
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/sendNotification");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log("Duplicate Error:", error);
        if (error.response.status === 409) {
          toast.warning("Already Send!");
        } else {
          toast.error(error);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleCenterChange = (event) => {
    setCourseData([]);
    setClassData([]);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    fetchCourses(centerId);
  };

  const handleCourseChange = (event) => {
    setClassData([]);
    const courseId = event.target.value;
    formik.setFieldValue("courseId", courseId);
    fetchClasses(courseId); // Fetch class for the selected center
  };

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/sendNotification">
            <button type="button " className="btn btn-sm btn-border   ">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-button btn-sm" >
            {/* {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )} */}
            Save
          </button>
        </div>
        <div className="container">
          <div className="row ">
            <div class="col-md-6 col-12 mb-4">
              <label>
                Recipient<span class="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("recipient")}
                className={`form-select  ${formik.touched.recipient && formik.errors.recipient
                  ? "is-invalid"
                  : ""
                  }`}
                name="recipient"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.recipient}
              >
                <option ></option>
                <option value="All">All</option>
                <option value="Parents">Parents</option>
                <option value="Teachers">Teachers</option>
              </select>
              {formik.touched.recipient && formik.errors.recipient && (
                <div className="invalid-feedback">
                  {formik.errors.recipient}
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-4">
              <label>
                Title<span class="text-danger">*</span>
              </label>
              <input
                {...formik.getFieldProps("messageTitle")}
                className={`form-control  ${formik.touched.messageTitle && formik.errors.messageTitle
                  ? "is-invalid"
                  : ""
                  }`}
                name="messageTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.messageTitle}
              >
              </input>
              {formik.touched.messageTitle && formik.errors.messageTitle && (
                <div className="invalid-feedback">
                  {formik.errors.messageTitle}
                </div>
              )}
            </div>

            {/* <div className="col-md-6 col-12 mb-4">
              <label className="form-label">
                Centre<span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("centerId")}
                className={`form-select ${formik.touched.centerId && formik.errors.centerId
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
                <div className="invalid-feedback">
                  {formik.errors.centerId}
                </div>
              )}
            </div> */}

            {/* <div className="col-md-6 col-12 mb-4">
              <label className="form-label">
                Centre<span className="text-danger">*</span>
              </label>
              <MultiSelect
                options={centerOptions}
                value={selectedCenters}
                onChange={(selected) => {
                  setSelectedCenters(selected);
                  formik.setFieldValue('centerIds', selected.map(option => option.value));
                }}
                labelledBy="Select Centers"
                className={`form-multi-select ${formik.touched.centerIds && formik.errors.centerIds ? 'is-invalid' : ''}`}
              />
              {formik.touched.centerIds && formik.errors.centerIds && (
                <div className="invalid-feedback">
                  {formik.errors.centerIds}
                </div>
              )}
            </div> */}

            <div className="col-md-6 col-12 mb-4">
              <label className="form-label">
                Centre<span className="text-danger">*</span>
              </label>
              <MultiSelect
                options={centerOptions}
                value={selectedCenters}
                onChange={(selected) => {
                  setSelectedCenters(selected);
                  formik.setFieldValue('centerId', selected.map(option => option.value));
                }}
                labelledBy="Select Centers"
                className={`form-multi-select ${formik.touched.centerId && formik.errors.centerId ? 'is-invalid' : ''}`}
              />
              {formik.touched.centerId && formik.errors.centerId && (
                <div className="invalid-feedback">
                  {formik.errors.centerId}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2">
              <label className="form-label">
                Course<span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("courseId")}
                class={`form-select  ${formik.touched.courseId && formik.errors.courseId
                  ? "is-invalid"
                  : ""
                  }`}
                onChange={handleCourseChange}
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
                <div className="invalid-feedback">
                  {formik.errors.courseId}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2 d-flex flex-column justify-content-end">
              <label className="form-label">
                Class<span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("classId")}
                class={`form-select  ${formik.touched.classId && formik.errors.classId
                  ? "is-invalid"
                  : ""
                  }`}
              // onChange={handleClassChange}
              >
                <option></option>
                {classData &&
                  classData.map((classes) => (
                    <option key={classes.id} value={classes.id}>
                      {classes.classNames}
                    </option>
                  ))}
              </select>
              {formik.touched.classId && formik.errors.classId && (
                <div className="invalid-feedback">
                  {formik.errors.classId}
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-4">
              <label>
                Day<span class="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("day")}
                name="day"
                className={`form-select   ${formik.touched.day && formik.errors.day
                  ? "is-invalid"
                  : ""
                  }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option selected></option>
                <option value="SUNDAY">Sunday</option>
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
              </select>
              {formik.touched.day && formik.errors.day && (
                <div className="invalid-feedback">{formik.errors.day}</div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-4">
              <label>Attachement</label>
              <span className="text-danger">*</span>
              <input
                type="file"
                name="files"
                className="form-control"
                onChange={(event) => {
                  formik.setFieldValue("files", event.target.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.files && !formik.values.files && (
                <div className="error text-danger">
                  <small>Photo is required</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>Description</label>
              <textarea
                name="messageDescription"
                class="form-control "
                row="5"
                type="text"
                className={`form-control  ${formik.touched.messageDescription && formik.errors.messageDescription
                  ? "is-invalid"
                  : ""
                  }`}
                style={{
                  height: "7rem",
                }}
                {...formik.getFieldProps("messageDescription")}
              />
              {formik.touched.messageDescription && formik.errors.messageDescription && (
                <div className="invalid-feedback">{formik.errors.messageDescription}</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SendNotificationAdd;
