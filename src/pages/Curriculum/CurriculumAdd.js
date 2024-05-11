import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import api from "../../config/URL";

function CurriculumAdd({ onSuccess, course_id }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    curriculumCode: Yup.string().required("*Curriculum Code is required"),
    lessonNo: Yup.string().required("*Lesson No is required"),
    status: Yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      curriculumCode: "",
      lessonNo: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log(values);
      values.courseId = course_id;
      try {
        const response = await api.post("/createCourseCurriculumCode", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          // navigate("/curriculum");
          onSuccess();
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

  return (
    <>
      <div className="mb-5 mt-3 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          Add <i class="bx bx-plus"></i>
        </button>
      </div>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Add Curriculum</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Lesson No<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("lessonNo")}
                    class={`form-select  ${
                      formik.touched.lessonNo && formik.errors.lessonNo
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option value="" selected></option>
                    {Array.from({ length: 150 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  {formik.touched.lessonNo && formik.errors.lessonNo && (
                    <div className="invalid-feedback">
                      {formik.errors.lessonNo}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Curriculum Code<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.curriculumCode &&
                      formik.errors.curriculumCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("curriculumCode")}
                  />
                  {formik.touched.curriculumCode &&
                    formik.errors.curriculumCode && (
                      <div className="invalid-feedback">
                        {formik.errors.curriculumCode}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Status<span className="text-danger">*</span>
                  </label>
                  <select
                    {...formik.getFieldProps("status")}
                    class={`form-select  ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" type="submit"disabled={loadIndicator}
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

export default CurriculumAdd;
