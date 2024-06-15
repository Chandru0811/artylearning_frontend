import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
// import api from "../../config/URL";
import { toast } from "react-toastify";

function CMSContactEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    centreName: Yup.string().required("*Centre Name is required"),
    email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),
    address: Yup.string().required("*Address is required"),
    gooleAddress: Yup.string().required("*Google Address is required"),
    mobile: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      centreName: "Arty Learning @ Hougang",
      email: "artylearning@gmail.com",
      address: "806 Hougang Central, #04-146, Singapore 530806",
      googleAddress: "",
      mobile: "+65 8821 4153",
    },
    validationSchema: validationSchema, // Assign the validation schema
    // onSubmit: async (values) => {
    //   // console.log(values);
    //   setLoadIndicator(true);
    //   try {
    //     const response = await api.put(`/updateCourseLevel/${id}`, values, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     if (response.status === 200) {
    //       onSuccess();
    //       handleClose();
    //       toast.success(response.data.message);
    //     } else {
    //       toast.error(response.data.message);
    //     }
    //   } catch (error) {
    //     toast.error(error);
    //   }finally {
    //     setLoadIndicator(false);
    //   }

    // },
  });

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/getAllCourseLevels/${id}`);
  //       formik.setValues(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data ", error);
  //     }
  //   };

  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
          <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Centre Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.centreName && formik.errors.centreName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("centreName")}
                  />
                  {formik.touched.centreName && formik.errors.centreName && (
                    <div className="invalid-feedback">
                      {formik.errors.centreName}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Email<span className="text-danger">*</span>
                  </label>
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
                  <label className="form-label">
                    Mobile<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.mobile && formik.errors.mobile
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("mobile")}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="invalid-feedback">
                      {formik.errors.mobile}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Address<span className="text-danger">*</span>
                  </label>
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
                  <label className="form-label">
                    Google Address<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.gooleAddress && formik.errors.gooleAddress
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("gooleAddress")}
                  />
                  {formik.touched.gooleAddress && formik.errors.gooleAddress && (
                    <div className="invalid-feedback">
                      {formik.errors.gooleAddress}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
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
