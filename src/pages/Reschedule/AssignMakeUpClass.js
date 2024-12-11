import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPlusCircle } from "react-icons/fa";
function AssignMakeUpClass() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    studentId: Yup.string().required("*Student Id is Required"),
    studentName: Yup.string().required("*Student Name is Required"),
    center: Yup.string().required("*Centre is Required"),
    course: Yup.string().required("*Course is Required"),
    class: Yup.string().required("*Class is Required"),
    batchFrom: Yup.string().required("*Batch From is Required"),
    batchTo: Yup.string().required("*Batch To is Required"),
    teacher: Yup.string().required("*Teacher is Required"),
  });

  const formik = useFormik({
    initialValues: {
      studentId: "",
      studentName: "",
      center: "",
      course: "",
      class: "",
      batchFrom: "",
      batchTo: "",
      teacher: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <button type="button" class="btn text-success fs-4" onClick={handleShow}>
        <FaPlusCircle />
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Assign MakeUp Class</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Body>
            <div className="container">
              <div className="row ">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Student ID<span className="text-danger">*</span>
                  </label>
                  <div class="input-group mb-3">
                    <select
                      className={`form-select  ${
                        formik.touched.studentId && formik.errors.studentId
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("studentId")}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="AL1">AL1</option>
                      <option value="AL2">AL2</option>
                    </select>
                    {formik.touched.studentId && formik.errors.studentId && (
                      <div className="invalid-feedback">
                        {formik.errors.studentId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Student Name<span className="text-danger">*</span>
                  </label>
                  <div class="input-group mb-3">
                    <select
                      className={`form-select  ${
                        formik.touched.studentName && formik.errors.studentName
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("studentName")}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Student1">Student1</option>
                      <option value="Student2">Student2</option>
                    </select>
                    {formik.touched.studentName &&
                      formik.errors.studentName && (
                        <div className="invalid-feedback">
                          {formik.errors.studentName}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Centre<span className="text-danger">*</span>
                  </label>
                  <div class="input-group mb-3">
                    <select
                      className={`form-select  ${
                        formik.touched.center && formik.errors.center
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("center")}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Arty Learning @HG">
                        Arty Learning @HG
                      </option>
                      <option value="Arty Learning @HK">
                        Arty Learning @HK
                      </option>
                    </select>
                    {formik.touched.center && formik.errors.center && (
                      <div className="invalid-feedback">
                        {formik.errors.center}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Course<span className="text-danger">*</span>
                  </label>
                  <div class="input-group mb-3">
                    <select
                      className={`form-select  ${
                        formik.touched.course && formik.errors.course
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("course")}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Data Science">Data Science</option>
                      <option value="Full Stack Developer">
                        Full Stack Developer
                      </option>
                    </select>
                    {formik.touched.course && formik.errors.course && (
                      <div className="invalid-feedback">
                        {formik.errors.course}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6 col-12 d-flex flex-column justify-content-end mb-2">
                  <label className="form-label">
                    Class<span className="text-danger">*</span>
                  </label>
                  <div class="input-group mb-3">
                    <select
                      className={`form-select  ${
                        formik.touched.class && formik.errors.class
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("class")}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                    </select>
                    {formik.touched.class && formik.errors.class && (
                      <div className="invalid-feedback">
                        {formik.errors.class}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Batch</label>
                  <div className="row">
                    <div className="col-md-6 col-12 ">
                      <label className="form-label">
                        From<span className="text-danger">*</span>
                      </label>
                      <div class="input-group mb-3">
                        <input
                          type="time"
                          className={`form-control  ${
                            formik.touched.batchFrom && formik.errors.batchFrom
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("batchFrom")}
                        />
                        {formik.touched.batchFrom &&
                          formik.errors.batchFrom && (
                            <div className="invalid-feedback">
                              {formik.errors.batchFrom}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-md-6 col-12 ">
                      <label className="form-label">
                        To<span className="text-danger">*</span>
                      </label>
                      <div class="input-group mb-3">
                        <input
                          type="time"
                          className={`form-control  ${
                            formik.touched.batchFrom && formik.errors.batchTo
                              ? "is-invalid"
                              : ""
                          }`}
                          {...formik.getFieldProps("batchTo")}
                        />
                        {formik.touched.batchTo && formik.errors.batchTo && (
                          <div className="invalid-feedback">
                            {formik.errors.batchTo}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Teacher<span className="text-danger">*</span>
                  </label>
                  <div class="input-group mb-3">
                    <select
                      className={`form-select  ${
                        formik.touched.teacher && formik.errors.teacher
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("teacher")}
                      aria-label="Default select example"
                    >
                      <option selected></option>
                      <option value="Arty Learning @HG">
                        Arty Learning @HG
                      </option>
                      <option value="Arty Learning @HK">
                        Arty Learning @HK
                      </option>
                    </select>
                    {formik.touched.teacher && formik.errors.teacher && (
                      <div className="invalid-feedback">
                        {formik.errors.teacher}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button
                className="btn btn-sm btn-border bg-light text-dark"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default AssignMakeUpClass;
