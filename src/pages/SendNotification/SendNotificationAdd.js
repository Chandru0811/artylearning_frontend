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
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const centerOptions = centerData.map(center => ({ label: center.centerNames, value: center.id }));
  const courseOptions = courseData.map(course => ({ label: course.courseNames, value: course.id }));
  const classOptions = classData.map(classes => ({ label: classes.classNames, value: classes.id }));

  useEffect(() => {
    fetchAllCentersWithIds().then(setCenterData).catch(error => toast.error(error.message));
  }, []);

  useEffect(() => {
    if (selectedCenters.length > 0) {
      const centerIds = selectedCenters.map(option => option.value);
      fetchAllCoursesWithIdsC(centerIds).then(setCourseData).catch(error => toast.error(error.message));
    } else {
      setCourseData([]);
    }
  }, [selectedCenters]);

  useEffect(() => {
    if (selectedCourses.length > 0) {
      const courseIds = selectedCourses.map(option => option.value);
      fetchAllClassesWithIdsC(courseIds).then(setClassData).catch(error => toast.error(error.message));
    } else {
      setClassData([]);
    }
  }, [selectedCourses]);

  const validationSchema = Yup.object({
    recipient: Yup.string().required("*Recipient Name is required"),
    messageTitle: Yup.string().required("*Title is required"),
    centerId: Yup.array().min(1, "At least one center must be selected"),
    courseId: Yup.array().min(1, "At least one course must be selected"),
    classId: Yup.array().min(1, "At least one class must be selected"),
    day: Yup.string().required("*Day is required"),
    attachments: Yup.string().required("*Photo is required"),
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
      attachments: "",
    },
    validationSchema: validationSchema,
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
      for (let attachments of values.attachments) {
        formData.append("attachments", attachments);
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
              <label className="form-label">
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
              <label className="form-label">
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
              <MultiSelect 
                options={courseOptions}
                value={selectedCourses}
                onChange={(selected) => {
                  setSelectedCourses(selected);
                  formik.setFieldValue('courseId', selected.map(option => option.value));
                }}
                labelledBy="Select Courses"
                className={`form-multi-select ${formik.touched.courseId && formik.errors.courseId ? 'is-invalid' : ''}`}
              />
              {formik.touched.courseId && formik.errors.courseId && (
                <div className="invalid-feedback">
                  {formik.errors.courseId}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2">
              <label className="form-label">
                Class<span className="text-danger">*</span>
              </label>
              <MultiSelect 
                options={classOptions}
                value={selectedClasses}
                onChange={(selected) => {
                  setSelectedClasses(selected);
                  formik.setFieldValue('classId', selected.map(option => option.value));
                }}
                labelledBy="Select Classes"
                className={`form-multi-select ${formik.touched.classId && formik.errors.classId ? 'is-invalid' : ''}`}
              />
              {formik.touched.classId && formik.errors.classId && (
                <div className="invalid-feedback">
                  {formik.errors.classId}
                </div>
              )}
            </div>

            <div class="col-md-6 col-12 mb-4">
              <label className="form-label">
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
              <label className="form-label">Attachement</label>
              <span className="text-danger">*</span>
              <input
                type="file"
                name="attachments"
                className={`form-control  ${formik.touched.attachments && formik.errors.attachments
                  ? "is-invalid"
                  : ""
                  }`}
                onChange={(event) => {
                  formik.setFieldValue("attachments", event.target.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.attachments && formik.errors.attachments && (
                <div className="invalid-feedback">{formik.errors.attachments}</div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label className="form-label">Description</label>
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
