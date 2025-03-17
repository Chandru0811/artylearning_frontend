import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllClassesWithIds from "../List/ClassList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const validationSchema = Yup.object().shape({
  currentCourse: Yup.string().required("*Select a Current Course"),
  currentClass: Yup.string().required("*Select a Current Class"),
  lastLessonDate: Yup.string().required("*Select a Last Lesson"),
  reason: Yup.string().required("*Select a Reason"),
  otherReason: Yup.string().required("*Other Reason is required"),
  centerRemark: Yup.string()
    .required("*Leave Reason is required")
    .max(200, "*The maximum length is 200 characters"),
  parentRemark: Yup.string()
    .required("*Leave Reason is required")
    .max(200, "*The maximum length is 200 characters"),
});

const StudentChangeClassAdd = ({ id, centerId }) => {
  const [courseData, setCourseData] = useState(null);
  const [classData, setClassData] = useState(null);
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    fetchData();
  };
  // console.log(id);
  const formik = useFormik({
    initialValues: {
      currentCourse: "",
      currentClass: "",
      lastLessonDate: "",
      reason: "",
      otherReason: "",
      centerRemark: "",
      parentRemark: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.studentId = id;
      try {
        const response = await api.post("/createStudentChangeClass", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          handleClose();
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

  const fetchData = async () => {
    try {
      const course = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(course);
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

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    formik.setFieldValue("currentCourse", courseId);
    fetchClasses(courseId); // Fetch class for the selected center
  };

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
        console.log("Error Fetching Form Data");
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-success btn-sm"
        style={{ fontSize: "12px" }}
        onClick={handleShow}
      >
        Change Class
      </button>
      <Modal show={show} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="headColor">Student Change Class</p>
          </Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <div className="container-fluid px-4">
            <div className="row">
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
                {formik.touched.currentCourse &&
                  formik.errors.currentCourse && (
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
                  <option value="Withdraw">Withdraw</option>
                  <option value="Graduate ">Graduate</option>
                </select>
                {formik.touched.reason && formik.errors.reason && (
                  <div className="invalid-feedback">{formik.errors.reason}</div>
                )}
              </div>
            </div>
            <div className=" mb-4">
              <lable className="form-lable">
                Other Reason<span className="text-danger">*</span>
              </lable>

              <textarea
                className={`form-control   ${
                  formik.touched.otherReason && formik.errors.otherReason
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("otherReason")}
              ></textarea>
              {formik.touched.otherReason && formik.errors.otherReason && (
                <div className="invalid-feedback">
                  {formik.errors.otherReason}
                </div>
              )}
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
          <Modal.Footer className="mt-3">
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
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
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default StudentChangeClassAdd;
