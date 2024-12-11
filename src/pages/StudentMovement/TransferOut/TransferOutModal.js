import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import fetchAllCoursesWithIdsC from "../../../pages/List/CourseListByCenter";
import fetchAllCentersWithIds from "../../../pages/List/CenterList";

function TransferOutModal({ id, centerId }) {
  const [show, setShow] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [centerData, setCenterData] = useState(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const validationSchema = yup.object().shape({
    courseId: yup.string().required("*Current Course is required"),
    currentClass: yup.string().required("*Current Class is required"),
    lastLessonDate: yup.string().required("*Last Lesson Date  is required"),
    centerId: yup.string().required("*Transfer To is required"),
    preferStartDate: yup.string().required("*Prefer Start Date is required"),
    reason: yup.string().required("*Reason is required"),
    centerRemark: yup
      .string()
      .required("*Center Remark is required")
      .max(200, "*The maximum length is 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      courseId: "",
      currentClass: "",
      lastLessonDate: "",
      centerId: "",
      preferDays: "",
      preferTiming: "",
      preferStartDate: "",
      reason: "",
      otherReason: "",
      centerRemark: "",
      parentRemark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Transfer Out Modal Datas:", values);
    },
  });

  const fetchCourseData = async () => {
    try {
      const course = await fetchAllCoursesWithIdsC(centerId);
      const center = await fetchAllCentersWithIds();
      setCourseData(course);
      setCenterData(center);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <>
      <button
        className="btn btn-success btn-sm"
        type="button"
        style={{ fontSize: "12px" }}
        onClick={handleShow}
      >
        Transfer Out
      </button>
      <Modal show={show} size="lg" centered onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Transfer Out</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Current Course<span className="text-danger">*</span>
                </label>
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
                    Select a course
                  </option>
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
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Current Class<span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("currentClass")}
                  name="currentClass"
                  className={`form-select ${
                    formik.touched.currentClass && formik.errors.currentClass
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected>Select a class</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                {formik.touched.currentClass && formik.errors.currentClass && (
                  <div className="invalid-feedback">
                    {formik.errors.currentClass}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Last lesson date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  {...formik.getFieldProps("lastLessonDate")}
                  name="lastLessonDate"
                  className={`form-control ${
                    formik.touched.lastLessonDate &&
                    formik.errors.lastLessonDate
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.lastLessonDate &&
                  formik.errors.lastLessonDate && (
                    <div className="invalid-feedback">
                      {formik.errors.lastLessonDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12"></div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Transfer To<span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("centerId")}
                  name="centerId"
                  className={`form-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected>Select a Center</option>
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
              </div>
              <div className="col-md-6 col-12"></div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Prefer Days</label>
                <select
                  {...formik.getFieldProps("preferDays")}
                  name="preferDays"
                  className={`form-select`}
                  aria-label="Default select example"
                >
                  <option selected>Please Select</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Prefer Timing</label>
                <input
                  class={`form-control`}
                  name="preferTiming"
                  {...formik.getFieldProps("preferTiming")}
                  type="time"
                />
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Prefer Start Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="preferStartDate"
                  className={`form-control ${
                    formik.touched.preferStartDate &&
                    formik.errors.preferStartDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("preferStartDate")}
                />
                {formik.touched.preferStartDate &&
                  formik.errors.preferStartDate && (
                    <div className="invalid-feedback">
                      {formik.errors.preferStartDate}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12"></div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Reason<span className="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("reason")}
                  name="reason"
                  className={`form-select ${
                    formik.touched.reason && formik.errors.reason
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected>Select a reason</option>
                  <option value="Relocation">Relocation</option>
                  <option value="Convenience">Convenience</option>
                  <option value="Facility Upgrade">Facility Upgrade</option>
                  <option value="Schedule Conflict">Schedule Conflict</option>
                  <option value="Special Requirements">
                    Special Requirements
                  </option>
                </select>
                {formik.touched.reason && formik.errors.reason && (
                  <div className="invalid-feedback">{formik.errors.reason}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Other Reason</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Other Reason"
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Center Remark<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={3}
                  name="centerRemark"
                  className={`form-control  ${
                    formik.touched.centerRemark && formik.errors.centerRemark
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("centerRemark")}
                />
                {formik.touched.centerRemark && formik.errors.centerRemark && (
                  <div className="invalid-feedback">
                    {formik.errors.centerRemark}
                  </div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Parent Remark</label>
                <textarea
                  rows={3}
                  className={`form-control`}
                  {...formik.getFieldProps("parentRemark")}
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="btn btn-button btn-sm">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default TransferOutModal;
