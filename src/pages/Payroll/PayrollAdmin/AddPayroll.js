import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  centreName: Yup.string().required("*Centre name is required"),
  employeeName: Yup.string().required("*Employee name is required"),
  grossPay: Yup.number()
    .required("*Gross pay is required")
    .typeError("Gross pay must be a number"),
  bonus: Yup.number()
    .required("*Bonus is required")
    .typeError("Bonus must be a number"),
  deduction: Yup.number()
    .required("*Deduction is required")
    .typeError("Deduction must be a number"),
  netPay: Yup.number()
    .required("*Net pay is required")
    .typeError("Net pay must be a number"),
  status: Yup.string().required("*Status is required"),
});

function AddPayroll() {
  const formik = useFormik({
    initialValues: {
      centreName: "",
      employeeName: "",
      grossPay: "",
      bonus: "",
      deduction: "",
      netPay: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-end">
              <Link to="/payrolladmin">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button type="submit" className="btn btn-sm btn-button">
                Save
              </button>
            </div>
          </div>

          <div className="row mt-3">
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Centre Name<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.centreName && formik.errors.centreName
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("centreName")}
                />
                {formik.touched.centreName && formik.errors.centreName && (
                  <div className="invalid-feedback">
                    {formik.errors.centreName}
                  </div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Employee Name<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.employeeName && formik.errors.employeeName
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("employeeName")}
                />
                {formik.touched.employeeName && formik.errors.employeeName && (
                  <div className="invalid-feedback">
                    {formik.errors.employeeName}
                  </div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Gross Pay<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.grossPay && formik.errors.grossPay
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("grossPay")}
                />
                {formik.touched.grossPay && formik.errors.grossPay && (
                  <div className="invalid-feedback">
                    {formik.errors.grossPay}
                  </div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Bonus<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.bonus && formik.errors.bonus
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("bonus")}
                />
                {formik.touched.bonus && formik.errors.bonus && (
                  <div className="invalid-feedback">{formik.errors.bonus}</div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Deduction<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.deduction && formik.errors.deduction
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("deduction")}
                />
                {formik.touched.deduction && formik.errors.deduction && (
                  <div className="invalid-feedback">
                    {formik.errors.deduction}
                  </div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Net Pay<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.netPay && formik.errors.netPay
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("netPay")}
                />
                {formik.touched.netPay && formik.errors.netPay && (
                  <div className="invalid-feedback">{formik.errors.netPay}</div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Status<span className="text-danger">*</span>
                </lable>
                <select
                  {...formik.getFieldProps("status")}
                  className={`form-select    ${
                    formik.touched.status && formik.errors.status
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="Apporved">Apporved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Pending">Pending</option>
                </select>

                {formik.touched.status && formik.errors.status && (
                  <div className="invalid-feedback">{formik.errors.status}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPayroll;
