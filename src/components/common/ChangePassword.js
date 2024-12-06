import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";

function ChangePassword({ onLogout }) {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const togglePasswordVisibility = (type) => {
    if (type === "new") setShowPassword(!showPassword);
    if (type === "confirm") setConfirmPassword(!confirmPassword);
    if (type === "old") setOldPassword(!oldPassword);
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("*Enter a valid email address")
    //   .required("*Email is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain 8 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("*New password is required"),
    confirmPassword: Yup.string()
      .required("*Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    oldPassword: Yup.string().required("*Old password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Submitting values:", values);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("oldPassword", values.oldPassword);
      formData.append("newPassword", values.newPassword);
      formData.append("confirmPassword", values.confirmPassword);

      try {
        const response = await api.post(`/changePassword`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          onLogout();
          toast.success(response.data.message);
          setShowModal(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.warning("Error changing password");
      }
    },
  });

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          setShowModal(true);
          formik.resetForm();
        }}
        className="my-3 btn btn-danger"
      >
        Change Password
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            {/* <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={oldPassword ? "text" : "password"}
                  {...formik.getFieldProps("oldPassword")}
                  isInvalid={
                    formik.touched.oldPassword && formik.errors.oldPassword
                  }
                />
                <button
                  type="button"
                  className="btn border"
                  onClick={() => togglePasswordVisibility("old")}
                >
                  {oldPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.oldPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("newPassword")}
                  isInvalid={
                    formik.touched.newPassword && formik.errors.newPassword
                  }
                />
                <button
                  type="button"
                  className="btn border"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.newPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={confirmPassword ? "text" : "password"}
                  {...formik.getFieldProps("confirmPassword")}
                  isInvalid={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                />
                <button
                  type="button"
                  className="btn border"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {confirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" className="btn btn-danger">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChangePassword;
