import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function InvoicePayment() {
  const validationSchema = Yup.object({
    studentname: Yup.string().required("*Select a student name"),
    studentid: Yup.string().required("*Select a Student ID"),
    center: Yup.string().required("*Select a Centre"),
    student: Yup.string().required("*Select a Student"),
    paymentdate: Yup.string().required("*Payment Date"),
    paymentmethod: Yup.string().required("*Select a Payment Method"),
    amount: Yup.number().typeError("*Must be a Number"),
    receiptno: Yup.number().typeError("*Must be a Number"),
  });
  const formik = useFormik({
    initialValues: {
      studentname: "",
      studentid: "",
      center: "",
      student: "",
      paymentdate: "",
      paymentmethod: "",
      paymentreference: "",
      remark: "",
      amount: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });
  return (
    <div className="container-fluid my-5 minHeight">
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow border-0 minHeight">
          <div className="container">
            <div className="row py-4">
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Student Name<span class="text-danger">*</span>
                </label>
                <input
                  name="studentname"
                  class="form-control"
                  type="text"
                  className={`form-select  ${
                    formik.touched.studentname && formik.errors.studentname
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("studentname")}
                />
                {formik.touched.studentname && formik.errors.studentname && (
                  <div className="invalid-feedback">
                    {formik.errors.studentname}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Student ID<span class="text-danger">*</span>
                </label>
                <input
                  name="studentid"
                  class="form-control "
                  type="text"
                  className={`form-select  ${
                    formik.touched.studentid && formik.errors.studentid
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("studentid")}
                />
                {formik.touched.studentid && formik.errors.studentid && (
                  <div className="invalid-feedback">
                    {formik.errors.studentid}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                Centre<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("center")}
                  name="center"
                  className={`form-select   ${
                    formik.touched.center && formik.errors.center
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  class="form-select "
                >
                  <option selected></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                {formik.touched.center && formik.errors.center && (
                  <div className="invalid-feedback">{formik.errors.center}</div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Student<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("student")}
                  name="student"
                  className={`form-select   ${
                    formik.touched.student && formik.errors.student
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  class="form-select "
                >
                  <option selected></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                {formik.touched.student && formik.errors.student && (
                  <div className="invalid-feedback">
                    {formik.errors.student}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Payment Date<span class="text-danger">*</span>
                </label>
                <input
                  name="paymentdate"
                  type="date"
                  className={`form-select  ${
                    formik.touched.paymentdate && formik.errors.paymentdate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("paymentdate")}
                />
                {formik.touched.paymentdate && formik.errors.paymentdate && (
                  <div className="invalid-feedback">
                    {formik.errors.paymentdate}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>
                  Payment Method<span class="text-danger">*</span>
                </label>
                <select
                  {...formik.getFieldProps("paymentmethod")}
                  name="paymentmethod"
                  className={`form-select   ${
                    formik.touched.paymentmethod && formik.errors.paymentmethod
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  class="form-select "
                >
                  <option selected></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                {formik.touched.paymentmethod &&
                  formik.errors.paymentmethod && (
                    <div className="invalid-feedback">
                      {formik.errors.paymentmethod}
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>Payment Reference</label>
                <input
                  name="paymentreference"
                  class="form-control "
                  type="text"
                  className={`form-control  ${
                    formik.touched.paymentreference &&
                    formik.errors.paymentreference
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("paymentreference")}
                />
                {formik.touched.paymentreference &&
                  formik.errors.paymentreference && (
                    <div className="invalid-feedback">
                      {formik.errors.paymentreference}
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>Receipt No</label>
                <input
                  name="receiptno"
                  class="form-control "
                  type="text"
                  className={`form-control  ${
                    formik.touched.receiptno && formik.errors.receiptno
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("receiptno")}
                />
                {formik.touched.receiptno && formik.errors.receiptno && (
                  <div className="invalid-feedback">
                    {formik.errors.receiptno}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>Remark</label>
                <textarea
                  rows="3"
                  name="remark"
                  class="form-control "
                  type="text"
                  className={`form-control  ${
                    formik.touched.remark && formik.errors.remark
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("remark")}
                />
                {formik.touched.remark && formik.errors.remark && (
                  <div className="invalid-feedback">{formik.errors.remark}</div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-4">
                <label>Amount</label>
                <input
                  name="amount"
                  class="form-control "
                  type="text"
                  className={`form-control  ${
                    formik.touched.amount && formik.errors.amount
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("amount")}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <div className="invalid-feedback">{formik.errors.amount}</div>
                )}
              </div>
            </div>
            <div className="row mt-5">
              <div className="col d-flex justify-content-end my-5">
                <Link to={`/invoice/view/`}>
                  <button type="button" className="btn btn-border btn-sm mx-3">
                    Back
                  </button>
                </Link>
                <button type="submit" className="btn btn-button btn-sm">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InvoicePayment;
