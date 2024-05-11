import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});
const LoginAdd = forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
  const formik = useFormik({
    initialValues: {
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicators(true);
      try {
        const response = await api.post(
          `/createUserLoginInfo/${formData.user_id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...values }));
          handleNext();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicators(false);
      }
    },
  });

  useImperativeHandle(ref, () => ({
    loginAdd: formik.handleSubmit,
  }));

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container" style={{ minHeight: "60vh" }}>
        <p className="headColor my-4">Login Information</p>
        <div class="row">
            <div class="col-md-6 col-12 mb-2">
              <div className="mb-3">
                <label>
                  Password<span class="text-danger">*</span>
                </label>
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
                      borderRadius: "3px",
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
                    style={{ cursor: "pointer", borderRadius: "3px" }}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>
            </div>
             <div class="col-md-6 col-12 mb-2">
              <div className="mb-3">
                <label>
                  Confirm Password<span class="text-danger">*</span>
                </label>
                <div className={`input-group mb-3`}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password"
                    className={`form-control ${
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{
                      borderRadius: "3px",
                      borderRight: "none",
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                    name="confirmPassword"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <span
                    className={`input-group-text iconInputBackground`}
                    id="basic-addon1"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer", borderRadius: "3px" }}
                  >
                    {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </span>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
      </div>
    </form>
  );
});

export default LoginAdd;
