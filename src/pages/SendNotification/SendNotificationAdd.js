import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../config/URL";
import { toast } from "react-toastify";

function SendNotificationAdd({ onSuccess }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    title: Yup.string().required("*Title is required"),
    message: Yup.string().required("*Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      if(values !== ""){
        handleClose();
        console.log("Response Data",values);
      }else{
        console.log("Response Data",values);
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
          <Modal.Title className="headColor">Add Notification</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">
                    Title<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    className={`form-control  ${
                      formik.touched.title && formik.errors.title
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("title")}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="invalid-feedback">
                      {formik.errors.title}
                    </div>
                  )}
                </div>
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">
                    Message<span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="text"
                    name="message"
                    rows={5}
                    className={`form-control  ${
                      formik.touched.message && formik.errors.message
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("message")}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
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

export default SendNotificationAdd;
