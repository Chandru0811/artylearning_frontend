import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosSettings } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function PasswordModal({password}) {
  const [show, setShow] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);


  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    formik.resetForm();
    setShow(true);
  };

  const validationSchema = yup.object().shape({
    password:yup
    .string()
    .matches(/^\S*$/, "*Password must not contain spaces.")
    .required("*Enter the valid Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Change Password Datas:", values);
      const formData = new FormData();
      formData.append("email", password);
      formData.append("newPassword", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      try {
        setLoadIndicator(true);
        const response = await api.post(`/changePasswordForAdmin`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          toast.success(response.data.message);
          setShow(false);
          formik.resetForm();
          //   onLogout();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // toast.warning("Error changing password");
        toast.error(error.data.message);
      }finally{
        setLoadIndicator(false);
      }
    },
  });

  return (
    <>
      <p className="stdSettings my-1 me-2" onClick={handleShow}>
        <IoIosSettings /> Change Password
      </p>
      <Modal show={show} centered onHide={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Change Password</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row psd">
              <div className="col-12 mb-3">
                <label className="form-label">
                  New Password<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("password")}
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    className={`form-control ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
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
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default PasswordModal;
