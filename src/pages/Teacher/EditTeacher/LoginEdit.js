import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^\S*$/, "*Password must not contain spaces.")
    .required("*Enter the valid Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});

const LoginEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");

    const formik = useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
        updatedBy: userName,
      },
      validationSchema: validationSchema,
      // onSubmit: async (data) => {
      //   try {
      //     const response = await api.put(
      //       `/updateUserLoginInfo/${data.loginId}`,
      //       data,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     if (response.status === 200) {
      //       toast.success(response.data.message);
      //       setFormData((prv) => ({ ...prv, ...data }));
      //       handleNext();
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //   } catch (error) {
      //     toast.error(error);
      //   }
      // },

      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.updatedBy = userName;
        console.log("Api Data:", values);
        try {
          if (values.loginId !== null) {
            const response = await api.put(
              `/updateUserLoginInfo/${values.loginId}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...values }));
              handleNext();
            } else {
              toast.error(response.data.message);
            }
          } else {
            const response = await api.post(
              `/createUserLoginInfo/${formData.staff_id}`,
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
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    // useEffect(() => {
    //   const getData = async () => {
    //     const response = await api.get(`/getAllUsersById/${formData.staff_id}`);
    //     formik.setValues({
    //       ...response.data.userLoginInfoModels[0],
    //       loginId: response.data.userLoginInfoModels[0].id,
    //     });
    //   };
    //   getData();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUserById/${formData.staff_id}`
          );
          if (
            response.data.userLoginInfoModels &&
            response.data.userLoginInfoModels.length > 0
          ) {
            formik.setValues({
              ...response.data.userLoginInfoModels[0],
              loginId: response.data.userLoginInfoModels[0].id,
            });
          } else {
            formik.setValues({
              loginId: null,
              password: "",
              confirmPassword: "",
            });
            // console.log("Login ID:", formik.values.loginId);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      loginEdit: formik.handleSubmit,
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
        <div className="container-fluid" style={{ minHeight: "50vh" }}>
          <p className="headColor my-4">Login Information</p>
          <div className="row">
            <div className="col-md-6 col-12 mb-2">
              <div className="mb-3">
                <label>
                  Password<span className="text-danger">*</span>
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
            <div className="col-md-6 col-12 mb-2">
              <div className="mb-3">
                <label>
                  Confirm Password<span className="text-danger">*</span>
                </label>
                <div className={`input-group mb-3`}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter confirm password"
                    className={`form-control ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
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
                    {showConfirmPassword ? (
                      <IoEyeOffOutline />
                    ) : (
                      <IoEyeOutline />
                    )}
                  </span>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
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
  }
);

export default LoginEdit;
