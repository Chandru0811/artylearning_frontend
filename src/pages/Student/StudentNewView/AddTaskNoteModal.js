import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { FaPlus } from "react-icons/fa";

function AddTaskNoteModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const validationSchema = yup.object().shape({
    category: yup.string().required("*Select a Category"),
    description: yup.string().required("*Description is required"),
    status: yup.string().required("*Select a Status"),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      description: "",
      remarks: "",
      status: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Change Password Datas:", values);
    },
  });

  return (
    <>
      <button className='btn btn-success btn-sm' type='button' onClick={handleShow}>
        <FaPlus /> Add Task Note
      </button>
      <Modal
        show={show}
        centered
        onHide={handleClose}
      >
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Add Task Note</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">
                  Category<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${formik.touched.category && formik.errors.category
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("category")}
                >
                  <option selected>Select Category</option>
                  <option value="Transport arrangement">Transport arrangement</option>
                  <option value="Student progress Enquiry">Student progress Enquiry</option>
                  <option value="Special Care">Special Care</option>
                  <option value="Payment Instruction">Payment Instruction</option>
                  <option value="Medical Condition">Medical Condition</option>
                  <option value="Family Situation">Family Situation</option>
                  <option value="Behaviour related">Behaviour related</option>
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="invalid-feedback">
                    {formik.errors.category}
                  </div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea rows={5}
                  className={`form-control ${formik.touched.description && formik.errors.description ? "is-invalid" : ""}`}
                  {...formik.getFieldProps("description")}
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Remarks
                </label>
                <textarea rows={5}
                  className={`form-control`}
                  {...formik.getFieldProps("remarks")}
                ></textarea>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Status<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${formik.touched.status && formik.errors.status
                      ? "is-invalid"
                      : ""
                    }`}
                  {...formik.getFieldProps("status")}
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
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AddTaskNoteModal;