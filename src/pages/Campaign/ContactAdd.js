import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function ContactAdd() {
  const validationSchema = Yup.object({
    studentId: Yup.number().required("* Student Name  is required"),
    StudentName: Yup.string().required("* Course Name is required"),
    emailId: Yup.string().email().required("* Email is required"),
    parentName: Yup.string().required("* Parent Name  is required"),
    parentNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Invalid phone number"),
  });

  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const formik = useFormik({
    initialValues: {
      studentId: "",
      StudentName: "",
      emailId: "",
      parentName: "",
      parentNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [color, setColor] = useState("");
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const rgbaColor = color ? hexToRGBA(color, 1) : "";

  return (
    <section className="AddCampaign">
      <div className="container">
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
            <Link to="/campaign/contact">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-button btn-sm ">
              Save
            </button>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Student ID<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.studentId && formik.errors.studentId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("studentId")}
                />
                {formik.touched.studentId && formik.errors.studentId && (
                  <div className="invalid-feedback">
                    {formik.errors.studentId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Student Name<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.StudentName && formik.errors.StudentName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("StudentName")}
                />
                {formik.touched.StudentName && formik.errors.StudentName && (
                  <div className="invalid-feedback">
                    {formik.errors.StudentName}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Email ID<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.emailId && formik.errors.emailId
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("emailId")}
                  />
                  {formik.touched.emailId && formik.errors.emailId && (
                    <div className="invalid-feedback">
                      {formik.errors.emailId}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Parent Name<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.parentName && formik.errors.parentName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("parentName")}
                />
                {formik.touched.parentName && formik.errors.parentName && (
                  <div className="invalid-feedback">
                    {formik.errors.parentName}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Parent Number<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.parentNumber && formik.errors.parentNumber
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("parentNumber")}
                />
                {formik.touched.parentNumber && formik.errors.parentNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.parentNumber}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactAdd;
