import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Logo from "../../assets/clientimage/Logo.png";
import api from "../../config/URL";

function Login({ onLogin }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if already logged in, redirect to dashboard
  //   const isAuthenticated = localStorage.getItem("isAuthenticated");
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup
    .string()
    .matches(/^\S*$/, "*Password must not contain spaces.")
    .required("*Enter the valid Password"),
});


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post(`smsLogin`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const { role } = response.data;
          if (role === "SMS_PARENT") {
            toast.warning(
              "You don't have access to the website. Please log in using Artylearning mobile app."
            );
          } else {
            // Proceed with login for other roles
            toast.success(response.data.message);
            localStorage.setItem("roleId", response.data.roleId);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userName", response.data.role);
            localStorage.setItem("loginUserId", response.data.loginUserId);
            localStorage.setItem("email", values.email);
            localStorage.setItem("centerId", response.data.centerIds[0]);
            onLogin(response.data.roleId);
            navigate("/dashboard");
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          toast.warning("Wrong username or password!");
        } else {
          toast.error(error?.response?.data?.message);
        }
      }

      resetForm();
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row">
          <div className="offset-md-3 col-md-6 col-12">
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <img
                className="img-fluid mb-4"
                src={Logo}
                width={200}
                alt="Logo"
              />
              <div
                className="card p-3 shadow"
                style={{
                  width: "100%",
                  borderRadius: "15px",
                  border: "none",
                }}
              >
                <div className="card-body">
                  <h3 className="card-title text-center mb-4">Login</h3>
                  <form
                    onSubmit={formik.handleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !formik.isSubmitting) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Email address
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          formik.touched.email && formik.errors.email
                            ? "is-invalid"
                            : ""
                        }`}
                        style={{
                          borderRadius: "8px",
                          borderColor:
                            formik.touched.email && formik.errors.email
                              ? "red"
                              : "#ced4da",
                        }}
                        placeholder="Enter email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-medium">Password</label>
                      <div className={`input-group mb-3`}>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className={`form-control ${
                            formik.touched.password && formik.errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{
                            borderRadius: "8px",
                            borderColor:
                              formik.touched.password && formik.errors.password
                                ? "red"
                                : "#ced4da",
                            borderRight: "none",
                            borderTopRightRadius: "0px",
                            borderBottomRightRadius: "0px",
                          }}
                          name="password"
                          {...formik.getFieldProps("password")}
                        />
                        <span
                          className={`input-group-text iconInputBackground`}
                          id="basic-addon1"
                          onClick={togglePasswordVisibility}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {showPassword ? (
                            <IoEyeOffOutline />
                          ) : (
                            <IoEyeOutline />
                          )}
                        </span>
                        {formik.touched.password && formik.errors.password && (
                          <div className="invalid-feedback">
                            {formik.errors.password}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-end">
                      <Link
                        to="/password"
                        className="text-muted fw-medium"
                        style={{ textDecoration: "none", fontSize: "14px" }}
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-danger mt-4"
                      style={{
                        width: "100%",
                        height: "45px",
                        borderRadius: "8px",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
