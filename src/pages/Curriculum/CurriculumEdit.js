import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";

function CurriculumEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log(values);
      try {
        const response = await api.put(
          `/updateCourseCurriculumCode/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
      finally {
              setLoadIndicator(false);
            }
    },
  });

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/getAllCourseCurriculumCodesById/${id}`);
      formik.setValues(response.data);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Edit Curriculum</Modal.Title>
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
                    {...formik.getFieldProps("curriculumCode")}
                    className={`form-control  ${
                      formik.touched.curriculumCode &&
                      formik.errors.curriculumCode
                        ? "is-invalid"
                        : ""
                    }`}
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
                    <option value=""></option>
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
              <Button variant="secondary" onClick={handleClose}>
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
                Update
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default CurriculumEdit;
