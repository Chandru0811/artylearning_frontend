import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import api from "../../config/URL";
import { Link, useNavigate } from "react-router-dom";

function CurriculumAdd({ onSuccess, curriculumOutletId, courseId }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName  = localStorage.getItem('userName');
  const navigate = useNavigate();
const navigates = () =>{
  navigate(-1)

}

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    curriculumCode: Yup.string().required("*Curriculum Code is required"),
    lessonNo: Yup.string().required("*Lesson No is required"),
    status: Yup.string().required("*Status is required"),
    curriculumNo: Yup.string().required("*Curriculum No is required"),
    description: Yup.string()
    .notRequired()
    .max(200, "*The maximum length is 200 characters"),
    

  });

  const formik = useFormik({
    initialValues: {
      curriculumCode: "",
      lessonNo: "",
      status: "",
      curriculumNo: "",
      description: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log(values);
      const payload = {
        curriculumOutletId: curriculumOutletId,
        curriculumCode: values.curriculumCode,
        lessonNo: values.lessonNo,
        status: values.status,
        curriculumNo: values.curriculumNo,
        description: values.description,
        courseId: courseId,
      };
      try {
        const response = await api.post(
          `/createCourseCurriculumCode/${curriculumOutletId}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
      <div className="mb-5 mt-4 d-flex justify-content-end">
      {/* <Link to="/course/curriculumoutlet"> */}
            <button type="button " onClick={navigates} className="btn btn-sm btn-border   ">
              Back
            </button>
          {/* </Link> */}
          &nbsp;&nbsp;
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
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
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
                    Curriculum Number<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.curriculumNo && formik.errors.curriculumNo
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("curriculumNo")}
                  />
                  {formik.touched.curriculumNo &&
                    formik.errors.curriculumNo && (
                      <div className="invalid-feedback">
                        {formik.errors.curriculumNo}
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
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    type="text"
                    className={`form-control  ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" type="submit" disabled={loadIndicator}>
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
