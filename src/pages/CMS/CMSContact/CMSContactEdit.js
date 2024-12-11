import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
// import api from "../../config/URL";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function CMSContactEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    centerName: Yup.string().required("*Centre Name is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*Enter a valid email address"
      )
      .required("*Email is required"),
    address: Yup.string().required("*Address is required"),
    map: Yup.string().required("*Google Address is required"),
    mobileNo: Yup.string()
      .matches(
        /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
        "*Invalid Phone Number"
      )
      .required("*Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      centerName: "",
      email: "",
      address: "",
      map: "",
      mobileNo: "",
      updatedBy: userName,
    },
    // validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateContactUsSave/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          onSuccess();
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
  const getData = async () => {
    if (id) {
      try {
        const response = await api.get(`/getContactUsSaveById/${id}`);
        formik.setValues(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    }
  };
  // useEffect(() => {
  // getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [show]);

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
          <Modal.Title className="headColor">Edit Contact</Modal.Title>
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
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Centre Name</label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.centerName && formik.errors.centerName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("centerName")}
                  />
                  {formik.touched.centerName && formik.errors.centerName && (
                    <div className="invalid-feedback">
                      {formik.errors.centerName}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Mobile</label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.mobileNo && formik.errors.mobileNo
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("mobileNo")}
                  />
                  {formik.touched.mobileNo && formik.errors.mobileNo && (
                    <div className="invalid-feedback">
                      {formik.errors.mobileNo}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Address</label>
                  <textarea
                    type="text"
                    className={`form-control  ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : ""
                    }`}
                    rows="3"
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">Google Address</label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.map && formik.errors.map
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("map")}
                  />
                  {formik.touched.map && formik.errors.map && (
                    <div className="invalid-feedback">{formik.errors.map}</div>
                  )}
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
              <button
                type="submit"
                onSubmit={formik.handleSubmit}
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default CMSContactEdit;
