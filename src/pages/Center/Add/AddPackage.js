import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function AddPackage({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = yup.object().shape({
    packageName: yup.string().required("*Package Name is required"),
    noOfLesson: yup.number()
      .integer("Must be an integer")
      .typeError("Must be a number")
      .positive("Must be positive")
      .required("*Number of Lesson is required"),
  });
  const formik = useFormik({
    initialValues: {
      packageName: "",
      noOfLesson: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log("Form values:", values);
      try {
        const response = await api.post(`/createCenterPackages/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
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
      <button
        style={{ whiteSpace: "nowrap", width: "100%" }}
        className="btn btn-normal"
        onClick={handleShow}
      >
        Add Package
      </button>

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Add Package</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Package Name<span className="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${formik.touched.packageName && formik.errors.packageName
                        ? "is-invalid"
                        : ""
                      }`}
                    {...formik.getFieldProps("packageName")}
                  />
                  {formik.touched.packageName && formik.errors.packageName && (
                    <div className="invalid-feedback">
                      {formik.errors.packageName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label>
                  Number of Lesson<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  pattern="^\d+$"
                  className={`form-control ${formik.touched.noOfLesson && formik.errors.noOfLesson
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("noOfLesson")}
                />
                {formik.touched.noOfLesson && formik.errors.noOfLesson && (
                  <div className="invalid-feedback">{formik.errors.noOfLesson}</div>
                )}
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer className="mt-5">
            <Button variant="secondary" onClick={handleClose}>
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
        </form>
      </Modal>
    </>
  );
}

export default AddPackage;
