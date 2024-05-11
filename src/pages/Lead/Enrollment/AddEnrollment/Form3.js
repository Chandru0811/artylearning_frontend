import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  fathersFullName: Yup.string().required("*Father Full Name is required"),
  fathersOccupation: Yup.string().required("*Father Occupation is required"),
  fathersDateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  fathersMobileNumber: Yup.string()
    .matches(/^(?:\+?65)?\s?\d{8,15}$/, "Invalid Phone Number")
    .required("*Mobile Number is required"),
  fathersEmailAddress: Yup.string()
    .email("*Invalid Email")
    .required("*Email is required"),
  monthlyIncomeOfFather: Yup.string().required("*Father Income is required"),

  mothersFullName: Yup.string().required("*Mother Name is required"),
  mothersOccupation: Yup.string().required("*Mother Occupation is required"),
  mothersDateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  mothersMobileNumber: Yup.string()
    .matches(/^(?:\+?65)?\s?\d{8,15}$/, "Invalid Phone Number")
    .required("*Mobile Number is required"),
  mothersEmailAddress: Yup.string()
    .email("*Invalid Email")
    .required("*Email is required"),
  monthlyIncomeOfMother: Yup.string().required("*Mother Income is required"),
  primaryContact: Yup.string()
    .oneOf(["father", "mother"])
    .required("*Primary Contact is required"),
});

const Form3 = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        fathersFullName: formData.fathersFullName || "",
        fathersOccupation: formData.fathersOccupation || "",
        fathersDateOfBirth: formData.fathersDateOfBirth || "",
        fathersMobileNumber: formData.fathersMobileNumber || "",
        fathersEmailAddress: formData.fathersEmailAddress || "",
        monthlyIncomeOfFather: formData.monthlyIncomeOfFather || "",
        mothersFullName: formData.mothersFullName || "",
        mothersOccupation: formData.mothersOccupation || "",
        mothersDateOfBirth: formData.mothersDateOfBirth || "",
        mothersMobileNumber: formData.mothersMobileNumber || "",
        mothersEmailAddress: formData.mothersEmailAddress || "",
        monthlyIncomeOfMother: formData.monthlyIncomeOfMother || "",
        primaryContact: formData.primaryContact || false,
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        const primarycontactFather = data.primaryContact === "father";
        const primarycontactMother = data.primaryContact === "mother";
        data.primaryContactFather = primarycontactFather ? true : false;
        data.primaryContactMother = primarycontactMother ? true : false;
        console.log(data);
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.lead_id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      form3: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-4">
          <h5 className="headColor mb-5">Parent Information</h5>
          <div className="row">
            {" "}
            <div className="col-12 mb-3">
              <div className="row">
                <div className="col-6">
                  <h6>Mother's Info</h6>
                </div>
                <div className="col-6 text-end">
                  <label className="form-label">Primary Contact</label>
                  <input
                    type="radio"
                    name="primaryContact"
                    className="form-check-input mx-2"
                    value="mother"
                    checked={formik.values.primaryContact === "mother"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.primaryContact &&
                    formik.errors.primaryContact && (
                      <div className="error text-danger ">
                        <small>{formik.errors.primaryContact}</small>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mother's Full Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mothersFullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mothersFullName}
                />
                {formik.touched.mothersFullName &&
                  formik.errors.mothersFullName && (
                    <div className="error text-danger ">
                      <small>{formik.errors.mothersFullName}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mother's Occupation<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mothersOccupation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mothersOccupation}
                />
                {formik.touched.mothersOccupation &&
                  formik.errors.mothersOccupation && (
                    <div className="error text-danger ">
                      <small>{formik.errors.mothersOccupation}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mother's Date Of Birth<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="mothersDateOfBirth"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mothersDateOfBirth}
                />
                {formik.touched.mothersDateOfBirth &&
                  formik.errors.mothersDateOfBirth && (
                    <div className="error text-danger ">
                      <small>{formik.errors.mothersDateOfBirth}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mother's Mobile Number<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mothersMobileNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mothersMobileNumber}
                />
                {formik.touched.mothersMobileNumber &&
                  formik.errors.mothersMobileNumber && (
                    <div className="error text-danger ">
                      <small>{formik.errors.mothersMobileNumber}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Mother's Email Address<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="mothersEmailAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mothersEmailAddress}
                />
                {formik.touched.mothersEmailAddress &&
                  formik.errors.mothersEmailAddress && (
                    <div className="error text-danger ">
                      <small>{formik.errors.mothersEmailAddress}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Mother's Monthly Income<span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="monthlyIncomeOfMother"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.monthlyIncomeOfMother}
              >
                <option selected></option>
                <option value="$0_$1000">$0 - $1,000</option>
                <option value="$1001_$2000">$1,001 - $2,000</option>
                <option value="$2001_$3000">$2001 - $3,000</option>
                <option value="$3001_$4000">$3,001 - $4,000</option>
                <option value="$4001_$5000">$4001 - $5,000</option>
                <option value="$5001_$6000">$5,001 - $6,000</option>
                <option value="$6001_$7000">$6001 - $7,000</option>
                <option value="$7001_$8000">$7,001 - $8,000</option>
                <option value="$8001_$9000">$8001 - $9,000</option>
                <option value="$9001_$10000">$9,001 - $10,000</option>
                <option value="ABOVE_$10000">Above $10,000</option>
                <option value="PREFER_NOT_TO_DISCLOSE">
                  Prefer Not To Disclose
                </option>
              </select>
              {formik.touched.monthlyIncomeOfMother &&
                formik.errors.monthlyIncomeOfMother && (
                  <div className="error text-danger">
                    <small>{formik.errors.monthlyIncomeOfMother}</small>
                  </div>
                )}
            </div>
            <div className="col-12 mb-3">
              <div className="row">
                <div className="col-6">
                  <h6>Father's Info</h6>
                </div>
                <div className="col-6 text-end">
                  <label className="form-label">Primary Contact</label>
                  <input
                    type="radio"
                    name="primaryContact"
                    className="form-check-input mx-2"
                    value="father"
                    checked={formik.values.primaryContact === "father"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.primaryContact &&
                    formik.errors.primaryContact && (
                      <div className="error text-danger ">
                        <small>{formik.errors.primaryContact}</small>
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Father's Full Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fathersFullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fathersFullName}
                />
                {formik.touched.fathersFullName &&
                  formik.errors.fathersFullName && (
                    <div className="error text-danger ">
                      <small>{formik.errors.fathersFullName}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Father's Occupation<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fathersOccupation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fathersOccupation}
                />
                {formik.touched.fathersOccupation &&
                  formik.errors.fathersOccupation && (
                    <div className="error text-danger ">
                      <small>{formik.errors.fathersOccupation}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Father's Date Of Birth<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="fathersDateOfBirth"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fathersDateOfBirth}
                />
                {formik.touched.fathersDateOfBirth &&
                  formik.errors.fathersDateOfBirth && (
                    <div className="error text-danger ">
                      <small>{formik.errors.fathersDateOfBirth}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Father's Mobile Number<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fathersMobileNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fathersMobileNumber}
                />
                {formik.touched.fathersMobileNumber &&
                  formik.errors.fathersMobileNumber && (
                    <div className="error text-danger ">
                      <small>{formik.errors.fathersMobileNumber}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Father's Email Address<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="fathersEmailAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fathersEmailAddress}
                />
                {formik.touched.fathersEmailAddress &&
                  formik.errors.fathersEmailAddress && (
                    <div className="error text-danger ">
                      <small>{formik.errors.fathersEmailAddress}</small>
                    </div>
                  )}
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Father's Monthly Income<span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                name="monthlyIncomeOfFather"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.monthlyIncomeOfFather}
              >
                <option selected></option>
                <option value="$0_$1000">$0 - $1,000</option>
                <option value="$1001_$2000">$1,001 - $2,000</option>
                <option value="$2001_$3000">$2001 - $3,000</option>
                <option value="$3001_$4000">$3,001 - $4,000</option>
                <option value="$4001_$5000">$4001 - $5,000</option>
                <option value="$5001_$6000">$5,001 - $6,000</option>
                <option value="$6001_$7000">$6001 - $7,000</option>
                <option value="$7001_$8000">$7,001 - $8,000</option>
                <option value="$8001_$9000">$8001 - $9,000</option>
                <option value="$9001_$10000">$9,001 - $10,000</option>
                <option value="ABOVE_$10000">Above $10,000</option>
                <option value="PREFER_NOT_TO_DISCLOSE">
                  Prefer Not To Disclose
                </option>
              </select>
              {formik.touched.monthlyIncomeOfFather &&
                formik.errors.monthlyIncomeOfFather && (
                  <div className="error text-danger">
                    <small>{formik.errors.monthlyIncomeOfFather}</small>
                  </div>
                )}
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default Form3;
