import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllClassesWithIds from "../List/ClassList";

const validationSchema = Yup.object().shape({
  currentCourse: Yup.string().required("*Select a Current Course"),
  // currentClass: Yup.string().required("*Select a Current Class"),
  lastLessonDate: Yup.string().required("*Select a Last Lesson"),
  reason: Yup.string().required("*Select a Reason"),
  otherReason: Yup.string().required("*Other Reason is required"),
  centerRemark: Yup.string().required("*Center Remark is required"),
  parentRemark: Yup.string().required("*Parent Remark is required"),
});

const StudentEndClass = () => {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [classData, setClassData] = useState(null);

  // console.log(id);
  const formik = useFormik({
    initialValues: {
      currentCourse: "",
      // currentClass: "",
      lastLessonDate: "",
      reason: "",
      otherReason: "",
      centerRemark: "",
      parentRemark: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      values.studentId = id;
      try {
        const response = await api.post("/createStudentEndClass", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate(`/student/view/${id}`);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const fetchData = async () => {
    try {
      const course = await fetchAllCoursesWithIds();
      setCourseData(course);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchClasses = async (courseId) => {
    try {
      const classes = await fetchAllClassesWithIds(courseId);
      setClassData(classes);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    formik.setFieldValue("currentCourse", courseId);
    fetchClasses(courseId); // Fetch class for the selected center
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
        if (response.data.studentCourseDetailModels.length > 0) {
          const formattedResponseData = {
            ...response.data.studentCourseDetailModels[0],
            currentCourse: response.data.studentCourseDetailModels[0].courseId,
          };
          formik.setValues(formattedResponseData);
        } else {
          console.log("Value not present in the table");
        }
      } catch (error) {
        toast.error("Error Fetching Form Data");
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-4">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-5 mt-3 d-flex justify-content-end">
          <Link to={`/student/view/${id}`}>
            <button type="button " className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-button btn-sm">
            Save
          </button>
        </div>
        <div className="container">
          <div className="row py-4">
            {/* <div className="col-md-6 col-12 mb-4">
              <lable className="form-lable">
                Current Course<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("currentCourse")}
                className={`form-select    ${
                  formik.touched.currentCourse && formik.errors.currentCourse
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.currentCourse && formik.errors.currentCourse && (
                <div className="invalid-feedback">
                  {formik.errors.currentCourse}
                </div>
              )}
            </div> */}

            <div className="col-md-6 col-12 mb-4">
              <label className="form-label m-0">
                Current Course <span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("currentCourse")}
                className={`form-select  ${
                  formik.touched.currentCourse && formik.errors.currentCourse
                    ? "is-invalid"
                    : ""
                }`}
                onChange={handleCourseChange}
              >
                <option disabled></option>
                {courseData &&
                  courseData.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.currentCourse && formik.errors.currentCourse && (
                <div className="invalid-feedback">
                  {formik.errors.currentCourse}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-4">
              <lable className="form-lable">
                Current Class<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("currentClass")}
                className={`form-select  ${
                  formik.touched.currentClass && formik.errors.currentClass
                    ? "is-invalid"
                    : ""
                }`}
                // onChange={handleClassChange}
              >
                <option selected></option>
                {classData &&
                  classData.map((classes) => (
                    <option key={classes.id} value={classes.id}>
                      {classes.classNames}
                    </option>
                  ))}
              </select>
              {formik.touched.currentClass && formik.errors.currentClass && (
                <div className="invalid-feedback">
                  {formik.errors.currentClass}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">
                Last Lesson Date<span className="text-danger">*</span>
              </lable>
              <div className="input-group mb-3">
                <input
                  type="date"
                  className={`form-control  ${
                    formik.touched.lastLessonDate &&
                    formik.errors.lastLessonDate
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("lastLessonDate")}
                />
                {formik.touched.lastLessonDate &&
                  formik.errors.lastLessonDate && (
                    <div className="invalid-feedback">
                      {formik.errors.lastLessonDate}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12 mb-2">
              <lable className="form-lable">
                Reason<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("reason")}
                className={`form-select    ${
                  formik.touched.reason && formik.errors.reason
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.reason && formik.errors.reason && (
                <div className="invalid-feedback">{formik.errors.reason}</div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 mb-4">
            <lable className="form-lable">
              Other Reason<span className="text-danger">*</span>
            </lable>
            <div className="input-group mb-3">
              <input
                type="text"
                className={`form-control  ${
                  formik.touched.otherReason && formik.errors.otherReason
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...formik.getFieldProps("otherReason")}
              />
              {formik.touched.otherReason && formik.errors.otherReason && (
                <div className="invalid-feedback">
                  {formik.errors.otherReason}
                </div>
              )}
            </div>
          </div>
          <div className=" mb-4">
            <lable className="form-lable">
              Centre Remark<span className="text-danger">*</span>
            </lable>

            <textarea
              className={`form-control   ${
                formik.touched.centerRemark && formik.errors.centerRemark
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("centerRemark")}
            ></textarea>
            {formik.touched.centerRemark && formik.errors.centerRemark && (
              <div className="invalid-feedback">
                {formik.errors.centerRemark}
              </div>
            )}
          </div>
          <div className=" mb-4">
            <lable className="form-lable">
              Parent Remark<span className="text-danger">*</span>
            </lable>

            <textarea
              className={`form-control   ${
                formik.touched.parentRemark && formik.errors.parentRemark
                  ? "is-invalid"
                  : ""
              }`}
              {...formik.getFieldProps("parentRemark")}
            ></textarea>
            {formik.touched.parentRemark && formik.errors.parentRemark && (
              <div className="invalid-feedback">
                {formik.errors.parentRemark}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentEndClass;
