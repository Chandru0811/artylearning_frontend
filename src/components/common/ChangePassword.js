import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ChangePassword({ onLogout }) {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [oldPassword, setConfirmOldPassword] = useState(false);
  const navigate = useNavigate();

  const PasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const ConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setConfirmPassword(!confirmPassword);
  };

  const ConfirmOldPasswordVisibility = (e) => {
    e.preventDefault();
    setConfirmOldPassword(!oldPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "*Enter a valid email address"
      )
      .required("*Email is required"),
    newPassword: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one Special Case Character"
      )
      .required("*Please Enter your new password"),
    confirmPassword: Yup.string()
      .required("*Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    // oldPassword: Yup.string()
    //   .matches(
    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one Special Case Character"
    //   )
    //   .required("*Please Enter your current password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
      oldPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
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
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.warning(error);
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div
          className=" col-12 p-5"
          //   style={{
          //     backgroundColor: "#fce6cf",
          //   }}
        >
          <div className="row">
            <div className="text-center"></div>
            <h5 className="pb-4 text-center">Change Password</h5>
            <h6 className="text-center">
              Your new password must be different from previously used Password
            </h6>

            <hr></hr>
            <div className="text-center my-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="form mb-3 ">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form d-flex justify-content-center">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email"
                          style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            style={{
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                            }}
                            className={`form-control ${
                              formik.touched.email && formik.errors.email
                                ? ""
                                : ""
                            }`}
                            {...formik.getFieldProps("email")}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div className="text-danger">
                              {formik.errors.email}
                            </div>
                          )}
                        </FloatingLabel>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <FloatingLabel
                        controlId="floatingOldPassword"
                        label="Old Password"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type={oldPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }}
                          className={`form-control ${
                            formik.touched.oldPassword &&
                            formik.errors.oldPassword
                              ? ""
                              : ""
                          }`}
                          {...formik.getFieldProps("oldPassword")}
                        />
                        {oldPassword ? (
                          <RiEyeOffLine
                            onClick={ConfirmOldPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(35% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <RiEyeLine
                            onClick={ConfirmOldPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(35% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {formik.touched.oldPassword &&
                          formik.errors.oldPassword && (
                            <div className="text-danger">
                              {formik.errors.oldPassword}
                            </div>
                          )}
                      </FloatingLabel>
                    </div>
                    <div className="col-md-6 col-12">
                      <FloatingLabel
                        controlId="floatingPassword"
                        label="New Password"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }}
                          className={`form-control ${
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                              ? ""
                              : ""
                          }`}
                          {...formik.getFieldProps("newPassword")}
                        />
                        {showPassword ? (
                          <RiEyeOffLine
                            onClick={PasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(35% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <RiEyeLine
                            onClick={PasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(35% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {formik.touched.newPassword &&
                          formik.errors.newPassword && (
                            <div className="text-danger">
                              {formik.errors.newPassword}
                            </div>
                          )}
                      </FloatingLabel>
                    </div>
                    <div className="col-md-6 col-12">
                      <FloatingLabel
                        controlId="floatingConfirmPassword"
                        label="Confirm Password"
                        style={{ color: "rgb(0,0,0,0.9)", width: "100%" }}
                        className="mb-3"
                      >
                        <Form.Control
                          type={confirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          style={{
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }}
                          className={`form-control ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? ""
                              : ""
                          }`}
                          {...formik.getFieldProps("confirmPassword")}
                        />
                        {confirmPassword ? (
                          <RiEyeOffLine
                            onClick={ConfirmPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(35% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        ) : (
                          <RiEyeLine
                            onClick={ConfirmPasswordVisibility}
                            style={{
                              position: "absolute",
                              right: "15px",
                              top: "calc(35% - 8px)",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {formik.touched.confirmPassword &&
                          formik.errors.confirmPassword && (
                            <div className="text-danger">
                              {formik.errors.confirmPassword}
                            </div>
                          )}
                      </FloatingLabel>
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <button
                    className="btn btn-button btn-sm"
                    style={{ width: "10%" }}
                    id="registerButton"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className="col-lg-3 col-md-2 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChangePassword;
