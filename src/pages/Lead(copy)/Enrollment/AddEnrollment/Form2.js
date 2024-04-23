import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fathersOccupation: Yup.string().required("*Father Occupation is required"),
  // fathersDateOfBirth: Yup.date().required("*Date of Birth is required"),
  fathersDateOfBirth: Yup.date()
  .required("Date of Birth is required")
  .max(new Date(), "Date of Birth cannot be in the future"),
  fathersMobileNumber: Yup.string().matches(
    /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
    "Invalid Phone Number").required("*Mobile Number is required"),
  fathersEmailAddress: Yup.string().email("*Invalid Email").required("*Email is required!"),
  monthlyIncomeOfFather: Yup.string().required("*Father Income is required"),

  mothersFullName: Yup.string().required("*Mother Name is required"),
  mothersOccupation: Yup.string().required("*Mother Occupation is required"),
  // mothersDateOfBirth: Yup.date().required("*Date of Birth is required"),
  mothersDateOfBirth: Yup.date()
  .required("Date of Birth is required")
  .max(new Date(), "Date of Birth cannot be in the future"),
  motherMobileNumber: Yup.string().matches(
    /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
    "Invalid Phone Number"
  ).required("*Mobile Number is required"),
  motherEmailAddress: Yup.string().email("*Invalid Email").required("*Email is required!"),
  monthlyIncomeOfMother: Yup.string().required("*Mother Income is required"),

});

const Form2 = forwardRef(({ formData, setFormData, handleNext }, ref) => {

  const formik = useFormik({
    initialValues: {
      fathersOccupation: formData.fathersOccupation || "",
      fathersDateOfBirth: formData.fathersDateOfBirth || "",
      fathersMobileNumber: formData.fathersMobileNumber || "",
      fathersEmailAddress: formData.fathersEmailAddress || "",
      monthlyIncomeOfFather: formData.monthlyIncomeOfFather || "",
      mothersFullName: formData.mothersFullName || "",
      mothersOccupation: formData.mothersOccupation || "",
      mothersDateOfBirth: formData.mothersDateOfBirth || "",
      motherMobileNumber: formData.motherMobileNumber || "",
      motherEmailAddress: formData.motherEmailAddress || "",
      monthlyIncomeOfMother: formData.monthlyIncomeOfMother || "",

      // address: "",
      // postalCode: "",
      // nameOfEmergency: "",
      // emergencyContactPerson: "",
      // emergencyContactNumber: "",
      // relationToChild: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      setFormData((prv) => ({ ...prv, ...data }));
      // console.log("form parent",formData );
      // console.log("data", data);
    },
  });

  const handleNextStep = () => {
    // e.preventDefault()
    formik.validateForm().then((errors) => {
      formik.handleSubmit();
      if (Object.keys(errors).length === 0) {
        handleNext();
      }
    });
  };

  useImperativeHandle(ref, () => ({
    form2: handleNextStep,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Father's Occupation<span className="text-danger">*</span>
              </label>
              <input type="text"
                className="form-control"
                name="fathersOccupation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathersOccupation}
              />
              {formik.touched.fathersOccupation && formik.errors.fathersOccupation && (
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
              <input type="date"
                className="form-control"
                name="fathersDateOfBirth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathersDateOfBirth}
              />
              {formik.touched.fathersDateOfBirth && formik.errors.fathersDateOfBirth && (
                <div className="error text-danger ">
                  <small>{formik.errors.fathersDateOfBirth}</small>
                </div>
              )}</div>

          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Father's Mobile Number<span className="text-danger">*</span>
              </label>
              <input type="text"
                className="form-control"
                name="fathersMobileNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathersMobileNumber}
              />
              {formik.touched.fathersMobileNumber && formik.errors.fathersMobileNumber && (
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
              <input type="email" className="form-control"
                name="fathersEmailAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathersEmailAddress}
              />
              {formik.touched.fathersEmailAddress && formik.errors.fathersEmailAddress && (
                <div className="error text-danger ">
                  <small>{formik.errors.fathersEmailAddress}</small>
                </div>
              )}</div>
          </div>
          <div className="col-md-12 col-12 ">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  Monthly Income Of Father<span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$0 - $1,000"
                  checked={formik.values.monthlyIncomeOfFather === "$0 - $1,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $0 - $1,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$1,001 - $2,000"
                  checked={formik.values.monthlyIncomeOfFather === "$1,001 - $2,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $1,001 - $2,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$2001 - $3,000"
                  checked={formik.values.monthlyIncomeOfFather === "$2001 - $3,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $2001 - $3,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$3,001 - $4,000"
                  checked={formik.values.monthlyIncomeOfFather === "$3,001 - $4,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $3,001 - $4,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$4001 - $5,000"
                  checked={formik.values.monthlyIncomeOfFather === "$4001 - $5,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $4001 - $5,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$5,001 - $6,000"
                  checked={formik.values.monthlyIncomeOfFather === "$5,001 - $6,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $5,001 - $6,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$6001 - $7,000"
                  checked={formik.values.monthlyIncomeOfFather === "$6001 - $7,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $6001 - $7,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$7,001 - $8,000"
                  checked={formik.values.monthlyIncomeOfFather === "$7,001 - $8,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $7,001 - $8,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$8001 - $9,000"
                  checked={formik.values.monthlyIncomeOfFather === "$8001 - $9,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $8001 - $9,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="$9,001 - $10,000"
                  checked={formik.values.monthlyIncomeOfFather === "$9,001 - $10,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $9,001 - $10,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="Above $10,000"
                  checked={formik.values.monthlyIncomeOfFather === "Above $10,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Above $10,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfFather"
                  value="Prefer Not To Disclose"
                  checked={formik.values.monthlyIncomeOfFather === "Prefer Not To Disclose"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Prefer Not To Disclose
                </label>
              </div>
              {formik.touched.monthlyIncomeOfFather && formik.errors.monthlyIncomeOfFather && (
                  <div className="error text-danger ">
                    <small>{formik.errors.monthlyIncomeOfFather}</small>
                  </div>
                )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Mother's Full Name<span className="text-danger">*</span>
              </label>
              <input type="text"
                className="form-control"
                name="mothersFullName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mothersFullName}
              />
              {formik.touched.mothersFullName && formik.errors.mothersFullName && (
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
              <input type="text"
                className="form-control"
                name="mothersOccupation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mothersOccupation}
              />
              {formik.touched.mothersOccupation && formik.errors.mothersOccupation && (
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
              <input type="date"
                className="form-control"
                name="mothersDateOfBirth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mothersDateOfBirth}
              />
              {formik.touched.mothersDateOfBirth && formik.errors.mothersDateOfBirth && (
                <div className="error text-danger ">
                  <small>{formik.errors.mothersDateOfBirth}</small>
                </div>
              )}</div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Mother's Mobile Number<span className="text-danger">*</span>
              </label>
              <input type="text"
                className="form-control"
                name="motherMobileNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherMobileNumber}
              />
              {formik.touched.motherMobileNumber && formik.errors.motherMobileNumber && (
                <div className="error text-danger ">
                  <small>{formik.errors.motherMobileNumber}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Mother's Email Address<span className="text-danger">*</span>
              </label>
              <input type="email"
                className="form-control"
                name="motherEmailAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherEmailAddress}
              />
              {formik.touched.motherEmailAddress && formik.errors.motherEmailAddress && (
                <div className="error text-danger ">
                  <small>{formik.errors.motherEmailAddress}</small>
                </div>
              )}</div>
          </div>
          <div className="col-md-12 col-12 ">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  Monthly Income Of Mother<span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check form-check-inline">
              <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$0 - $1,000"
                  checked={formik.values.monthlyIncomeOfMother === "$0 - $1,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $0 - $1,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$1,001 - $2,000"
                  checked={formik.values.monthlyIncomeOfMother === "$1,001 - $2,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $1,001 - $2,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$2001 - $3,000"
                  checked={formik.values.monthlyIncomeOfMother === "$2001 - $3,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $2001 - $3,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$3,001 - $4,000"
                  checked={formik.values.monthlyIncomeOfMother === "$3,001 - $4,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $3,001 - $4,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$4001 - $5,000"
                  checked={formik.values.monthlyIncomeOfMother === "$4001 - $5,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $4001 - $5,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$5,001 - $6,000"
                  checked={formik.values.monthlyIncomeOfMother === "$5,001 - $6,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $5,001 - $6,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$6001 - $7,000"
                  checked={formik.values.monthlyIncomeOfMother === "$6001 - $7,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $6001 - $7,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$7,001 - $8,000"
                  checked={formik.values.monthlyIncomeOfMother === "$7,001 - $8,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $7,001 - $8,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$8001 - $9,000"
                  checked={formik.values.monthlyIncomeOfMother === "$8001 - $9,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  $8001 - $9,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="$9,001 - $10,000"
                  checked={formik.values.monthlyIncomeOfMother === "$9,001 - $10,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  $9,001 - $10,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="Above $10,000"
                  checked={formik.values.monthlyIncomeOfMother === "Above $10,000"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Above $10,000
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="monthlyIncomeOfMother"
                  value="Prefer Not To Disclose"
                  checked={formik.values.monthlyIncomeOfMother === "Prefer Not To Disclose"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Prefer Not To Disclose
                </label>
                </div>
                {formik.touched.monthlyIncomeOfMother && formik.errors.monthlyIncomeOfMother && (
                  <div className="error text-danger ">
                    <small>{formik.errors.monthlyIncomeOfMother}</small>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
    </form >
  );
}
);
export default Form2;
