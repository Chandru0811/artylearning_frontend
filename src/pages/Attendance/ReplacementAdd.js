import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../config/URL";
import { toast } from "react-toastify";

function ReplacementAdd({ studentId, setIsReplacement, attendanceData }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [Data, setData] = useState(null);
  console.log("attendanceData", attendanceData);

  const validationSchema = Yup.object({
    studentName: Yup.string().required("*Student Name is required"),
    studentId: Yup.string().required("*student ID is required"),
    course: Yup.string().required("*Course is required"),
    classCode: Yup.string().required("*Class Code is required"),
    absentDate: Yup.string().required("*Absent Date is required"),
    absentReason: Yup.string().required("*Absent Reason is required"),
  });

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
    setData(null);
  };

  const handleShow = () => {
    // fetchData();
    setShow(true);
    setIsModified(false);
  };

  useEffect(() => {
    // fetchData();
  }, [show]);

  const formik = useFormik({
    initialValues: {
      studentName: attendanceData[0]?.students[0]?.studentName,
      studentId: attendanceData[0]?.students[0]?.studentId,
      course: attendanceData[0]?.course,
      classCode: attendanceData[0]?.classCode,
      absentDate: new Date().toISOString().split("T")[0],
      preferredDay: "",
      preferredTiming: "",
      absentReason: "",
      otherReason: "",
      centerId: attendanceData[0]?.centerId,
      createdBy: "",
      classId: attendanceData[0]?.classId,
      courseId: attendanceData[0]?.courseId,
      file: null,
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("values", values);
      setIsReplacement((prv) => ({ ...prv, id: studentId, valid: true }));
      // const payload = {
      //   ...values,
      //   // createdBy: createdBy,
      //   centerId: values.centerId,
      //   classId: values.classId,
      //   courseId: values.courseId,
      // };
      const formData = new FormData();
      formData.append("studentName", values.studentName);
      formData.append("studentId", values.studentId);
      formData.append("course", values.course);
      formData.append("classCode", values.classCode);
      formData.append("absentDate", values.absentDate);
      formData.append("preferredDay", values.preferredDay);
      formData.append("preferredTiming", values.preferredTiming);
      formData.append("absentReason", values.absentReason);
      formData.append("otherReason", values.otherReason);
      formData.append("remark", values.remark);
      formData.append("file", values.file);
      formData.append("centerId", values.centerId);
      formData.append("classId", values.classId);
      formData.append("courseId", values.courseId);
      try {
        const response = await api.post(
          "/createStudentReplacementClass",
          formData
        );
        if (response.status === 201) {
          // onSuccess();
          handleClose();
          toast.success(response.data.message);
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

  return (
    <>
      <div className="mb-3 d-flex justify-content-end">
        <label className="radio-button">
          <button
            type="button"
            className="btn btn-button2 btn-sm mt-3"
            onClick={handleShow}
            style={{ backgroundColor: "#fa994af5" }}
          >
            Replacement Lesson Class
          </button>
        </label>
      </div>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add Replacement Class</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Student Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    className={`form-control  ${
                      formik.touched.studentName && formik.errors.studentName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("studentName")}
                  />
                  {formik.touched.studentName && formik.errors.studentName && (
                    <div className="invalid-feedback">
                      {formik.errors.studentName}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Student ID<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    className={`form-control  ${
                      formik.touched.studentId && formik.errors.studentId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("studentId")}
                  />
                  {formik.touched.studentId && formik.errors.studentId && (
                    <div className="invalid-feedback">
                      {formik.errors.studentId}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Course<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    className={`form-control  ${
                      formik.touched.course && formik.errors.course
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("course")}
                  />
                  {formik.touched.course && formik.errors.course && (
                    <div className="invalid-feedback">
                      {formik.errors.course}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Class Code<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    className={`form-control  ${
                      formik.touched.classCode && formik.errors.classCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("classCode")}
                  />
                  {formik.touched.classCode && formik.errors.classCode && (
                    <div className="invalid-feedback">
                      {formik.errors.classCode}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Preferred Day<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("preferredDay")}
                    class={`form-select  ${
                      formik.touched.preferredDay && formik.errors.preferredDay
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="MONDAY">MONDAY</option>
                    <option value="TUESDAY">TUESDAY</option>
                    <option value="WEDNESDAY">WEDNESDAY</option>
                    <option value="THURSDAY">THURSDAY</option>
                    <option value="FRIDAY">FRIDAY</option>
                    <option value="SATURDAY">SATURDAY</option>
                    <option value="SUNDAY">SUNDAY</option>
                  </select>
                  {formik.touched.preferredDay &&
                    formik.errors.preferredDay && (
                      <div className="invalid-feedback">
                        {formik.errors.preferredDay}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Preferred Timing<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("preferredTiming")}
                    class={`form-select  ${
                      formik.touched.preferredTiming &&
                      formik.errors.preferredTiming
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="1.00">1.00 hr</option>
                    <option value="2.30">2.30 hr</option>
                    <option value="3.30">3.30 hr</option>
                    <option value="4.30">4.30 hr</option>
                  </select>
                  {formik.touched.preferredTiming &&
                    formik.errors.preferredTiming && (
                      <div className="invalid-feedback">
                        {formik.errors.preferredTiming}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Absent Date<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={formik.values.absentDate}
                    className={`form-control ${
                      formik.touched.absentDate && formik.errors.absentDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("absentDate")}
                  />
                  {formik.touched.absentDate && formik.errors.absentDate && (
                    <div className="invalid-feedback">
                      {formik.errors.absentDate}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Absent Reason<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("absentReason")}
                    class={`form-select  ${
                      formik.touched.absentReason && formik.errors.absentReason
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected></option>
                    <option value="HOLIDAY">HOLIDAY</option>
                    <option value="STUDENT_SICK">STUDENT_SICK</option>
                  </select>
                  {formik.touched.absentReason &&
                    formik.errors.absentReason && (
                      <div className="invalid-feedback">
                        {formik.errors.absentReason}
                      </div>
                    )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Other Reason<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.otherReason && formik.errors.otherReason
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("otherReason")}
                  />
                  {formik.touched.otherReason && formik.errors.otherReason && (
                    <div className="invalid-feedback">
                      {formik.errors.otherReason}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Document<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    className={`form-control ${
                      formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={(event) =>
                      formik.setFieldValue("file", event.currentTarget.files[0])
                    }
                  />
                  {formik.touched.file && formik.errors.file && (
                    <div className="invalid-feedback">{formik.errors.file}</div>
                  )}
                </div>
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">
                    Remark<span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="file"
                    className={`form-control  ${
                      formik.touched.remark && formik.errors.remark
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("remark")}
                  />
                  {formik.touched.remark && formik.errors.remark && (
                    <div className="invalid-feedback">
                      {formik.errors.remark}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
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
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default ReplacementAdd;
