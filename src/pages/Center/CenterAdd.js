import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentreManager from "../List/CentreMangerList";

const validationSchema = Yup.object().shape({
  centerName: Yup.string().required("*Centre Name is required"),
  code: Yup.string().required("*Code is required"),
  address: Yup.string().required("*Address is required"),
  zipCode: Yup.number()
    .typeError("*Zip Code must be number")
    .required("*Zip Code is required")
    .positive("*Please enter a valid number")
    .integer("*Zip Code is must be number"),
  mobile: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Mobile Number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "*Enter a valid email address"
    )
    .required("*Email is required"),
  openingDate: Yup.date().required("*Date is required"),
  uenNumber: Yup.string().required("*UEN number is required"),
  gst: Yup.string().required("*Choose an option"),
  taxRegistrationNumber: Yup.string().required("*Tax Registration Number is required"),
  bankName: Yup.string().required("*Bank Name is required"),
  bankBranch: Yup.string().required("*Bank Branch is required"),
  bankAccountNumber: Yup.number()
    .typeError("*Bank Account Number be numeric")
    .required("*Bank Account Number is required")
    .positive("*Please enter a valid number")
    .integer("*Bank Account Number is must be number"),
  bankAccountName: Yup.string().required("*Bank Account Name is required"),
  file: Yup.mixed().required("*File is required"),
  invoiceNotes: Yup.string()
  .notRequired()
  .max(200, "*The maximum length is 200 characters"),
});

function CenterAdd() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [managerData, setmanagerData] = useState(null);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetchTeacher();
  }, []);
  const fetchTeacher = async () => {
    try {
      const manager = await fetchAllCentreManager();
      setmanagerData(manager);
    } catch (error) {
      toast.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      centerName: "",
      code: "",
      centerManager: "",
      address: "",
      zipCode: "",
      mobile: "",
      email: "",
      openingDate: "",
      uenNumber: "",
      gst: "",
      taxRegistrationNumber: "",
      bankName: "",
      bankBranch: "",
      bankAccountNumber: "",
      bankAccountName: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // let selectedTeacherName = "";
      setLoadIndicator(true);
      // managerData.forEach((teacher) => {
      //   if (parseInt(values.centerManager) === teacher.id) {
      //     selectedTeacherName = teacher.userNames || "--";
      //   }
      // });

      // Convert gst value to boolean
      // values.gst = values.gst === "true";
      const formData = new FormData();
      formData.append("centerName", values.centerName);
      formData.append("code", values.code);
      formData.append("userId", values.centerManager);
      formData.append("address", values.address);
      formData.append("zipCode", values.zipCode);
      formData.append("mobile", values.mobile);
      formData.append("email", values.email);
      formData.append("openingDate", values.openingDate);
      formData.append("uenNumber", values.uenNumber);
      formData.append("gst", values.gst);
      formData.append("taxRegistrationNumber", values.taxRegistrationNumber);
      formData.append("bankName", values.bankName);
      formData.append("bankBranch", values.bankBranch);
      formData.append("bankAccountNumber", values.bankAccountNumber);
      formData.append("bankAccountName", values.bankAccountName);
      formData.append("invoiceNotes  ", values.invoiceNotes || " ");
      formData.append("file", values.file);
      formData.append("createdBy", userName);

      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      try {
        const response = await api.post("/createCenters", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/center");
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
  return (
    <div className="container">
       <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/center">
            <button type="button " className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <button
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
            Save
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Centre Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="centerName"
                  className={`form-control  ${
                    formik.touched.centerName && formik.errors.centerName
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("centerName")}
                />
                {formik.touched.centerName && formik.errors.centerName && (
                  <div className="invalid-feedback">
                    {formik.errors.centerName}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Code<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("code")}
                  type="text"
                  className={`form-control  ${
                    formik.touched.code && formik.errors.code
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder=""
                />
                {formik.touched.code && formik.errors.code && (
                  <div className="invalid-feedback">{formik.errors.code}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Centre Manager
              </label>
              <select
                {...formik.getFieldProps("centerManager")}
                name="centerManager"
                className={`form-select  ${
                  formik.touched.centerManager && formik.errors.centerManager
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option selected></option>
                {managerData &&
                  managerData.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.userNames}
                    </option>
                  ))}
              </select>
              {formik.touched.centerManager && formik.errors.centerManager && (
                <div className="invalid-feedback">
                  {formik.errors.centerManager}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control  ${
                    formik.touched.address && formik.errors.address
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("address")}
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
                {formik.touched.address && formik.errors.address && (
                <div className="invalid-feedback">
                  {formik.errors.address}
                </div>
              )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Zip Code<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("zipCode")}
                  type="text"
                  className={`form-control    ${
                    formik.touched.zipCode && formik.errors.zipCode
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className="invalid-feedback">
                    {formik.errors.zipCode}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mobile<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  className={`form-control   ${
                    formik.touched.mobile && formik.errors.mobile
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="invalid-feedback">{formik.errors.mobile}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  type="text"
                  className={`form-control   ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Opening Date<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("openingDate")}
                  type="date"
                  // onFocus={(e) => e.target.showPicker()}
                  className={`form-control   ${
                    formik.touched.openingDate && formik.errors.openingDate
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
                {formik.touched.openingDate && formik.errors.openingDate && (
                  <div className="invalid-feedback">
                    {formik.errors.openingDate}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    GST<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gst"
                    id="inlineRadio1"
                    value="true"
                    onChange={() => formik.setFieldValue("gst", true)}
                    checked={formik.values.gst === true}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Yes
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gst"
                    id="inlineRadio2"
                    value="false"
                    onChange={() => formik.setFieldValue("gst", false)}
                    checked={formik.values.gst === false}
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    No
                  </label>
                </div>
                {formik.errors.gst && formik.touched.gst && (
                  <div className="text-danger  " style={{ fontSize: ".875em" }}>
                    {formik.errors.gst}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  UEN Number<span class="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("uenNumber")}
                  type="text"
                  className={`form-control  ${
                    formik.touched.uenNumber && formik.errors.uenNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.uenNumber && formik.errors.uenNumber && (
                  <div className="invalid-feedback">
                    {formik.errors.uenNumber}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Tax Registration Number<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("taxRegistrationNumber")}
                  type="text"
                  className={`form-control   ${
                    formik.touched.taxRegistrationNumber &&
                    formik.errors.taxRegistrationNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.taxRegistrationNumber &&
                  formik.errors.taxRegistrationNumber && (
                    <div className="invalid-feedback">
                      {formik.errors.taxRegistrationNumber}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Bank Name<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("bankName")}
                  type="text"
                  className={`form-control    ${
                    formik.touched.bankName && formik.errors.bankName
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.bankName && formik.errors.bankName && (
                  <div className="invalid-feedback">
                    {formik.errors.bankName}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Bank Branch<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("bankBranch")}
                  type="text"
                  className={`form-control   ${
                    formik.touched.bankBranch && formik.errors.bankBranch
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.bankBranch && formik.errors.bankBranch && (
                  <div className="invalid-feedback">
                    {formik.errors.bankBranch}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Bank Account Name<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("bankAccountName")}
                  type="text"
                  className={`form-control    ${
                    formik.touched.bankAccountName &&
                    formik.errors.bankAccountName
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.bankAccountName &&
                  formik.errors.bankAccountName && (
                    <div className="invalid-feedback">
                      {formik.errors.bankAccountName}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Bank Account Number<span className="text-danger">*</span>
                </label>
                <input
                  {...formik.getFieldProps("bankAccountNumber")}
                  type="text"
                  className={`form-control    ${
                    formik.touched.bankAccountNumber &&
                    formik.errors.bankAccountNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.bankAccountNumber &&
                  formik.errors.bankAccountNumber && (
                    <div className="invalid-feedback">
                      {formik.errors.bankAccountNumber}
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="text-start mt-2">
                <label htmlFor="" className="mb-1 fw-medium">
                  <small>QR Code</small><span className="text-danger">*</span>
                </label>
                <br />
                <input
                  type="file"
                  name="file"
                  accept=".png"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="error text-danger">
                    <small>{formik.errors.file}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12">
              <label for="exampleFormControlInput1" className="form-label">
                Invoice Notes
              </label>
              <div class="input-group mb-3">
                <textarea
                  name="invoiceNotes"
                  class="form-control"
                  {...formik.getFieldProps("invoiceNotes")}
                  id="invoiceNotes"
                  rows="5"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CenterAdd;
