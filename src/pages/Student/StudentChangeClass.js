import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function StudentChangeClass() {
  const validationSchema = Yup.object({
    currentCourse: Yup.string().required("*Select a Current Course"),
    currentClass: Yup.string().required("*Select a Current Class"),
    lastLessonDate: Yup.string().required("*Select a Last Lesson Date"),
    preferStartDate: Yup.date().required("*Prefer Start Date is required"),
    reason: Yup.string().required("*Select a Reason"),
    centerRemark: Yup.string()
      .required("*Leave Reason is required")
      .max(200, "*The maximum length is 200 characters"),
    parentRemark: Yup.string()
      .notRequired("*Leave Reason is required")
      .max(200, "*The maximum length is 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      currentCourse: "",
      currentClass: "",
      lastLessonDate: "",
      preferDays: "",
      preferTiming: "",
      preferStartDate: "",
      reason: "",
      otherReason: "",
      centerRemark: "",
      parentRemark: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
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
          <Link to="/student/view">
            <button type="button" className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          {/* {/ <Link to="/student"> /} */}
          <button type="submit" className="btn btn-button btn-sm ">
            Save
          </button>
          {/* {/ </Link> /} */}
        </div>
        <div className="container">
          <div className="row py-4">
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Current Course<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("currentCourse")}
                class={`form-select ${
                  formik.touched.currentCourse && formik.errors.currentCourse
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected></option>
                <option value="Art Pursuers">Art Pursuers</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.currentCourse && formik.errors.currentCourse && (
                <div className="invalid-feedback">
                  {formik.errors.currentCourse}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Current Class<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("currentClass")}
                class={`form-select  ${
                  formik.touched.currentClass && formik.errors.currentClass
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected></option>
                <option value="AP/SAT_13012024_9AM/Sat/1">
                  AP/SAT_13012024_9AM/Sat/1
                </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.currentClass && formik.errors.currentClass && (
                <div className="invalid-feedback">
                  {formik.errors.currentClass}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Last Lesson Date<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("lastLessonDate")}
                class={`form-select ${
                  formik.touched.lastLessonDate && formik.errors.lastLessonDate
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected> </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.lastLessonDate &&
                formik.errors.lastLessonDate && (
                  <div className="invalid-feedback">
                    {formik.errors.lastLessonDate}
                  </div>
                )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <lable class="">Prefer Days</lable>
              <input
                type="text"
                {...formik.getFieldProps("preferDays")}
                className="form-control"
              />
            </div>
            <div class="col-md-6 col-12 mb-2 ">
              <label>Prefer Timing</label>
              <input
                class="form-control "
                {...formik.getFieldProps("preferTiming")}
                type="text"
              />
            </div>
            <div class="col-md-6 col-12 mb-2">
              <label>
                Prefer Start date<span class="text-danger">*</span>
              </label>
              <input
                type="date"
                onFocus={(e) => e.target.showPicker()}
                class={`form-control  ${
                  formik.touched.preferStartDate &&
                  formik.errors.preferStartDate
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("preferStartDate")}
              />
              {formik.touched.preferStartDate &&
                formik.errors.preferStartDate && (
                  <div className="invalid-feedback">
                    {formik.errors.preferStartDate}
                  </div>
                )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <lable class="">
                Reason<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("reason")}
                class={`form-select  ${
                  formik.touched.reason && formik.errors.reason
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
              >
                <option selected> </option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.reason && formik.errors.reason && (
                <div className="invalid-feedback">{formik.errors.reason}</div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2 ">
              <label>Other Reason </label>
              <input
                class="form-control "
                {...formik.getFieldProps("otherReason")}
                type="text"
              />
            </div>

            <div class="col-12 mb-2 ">
              <label>
                Centre Remark<span class="text-danger">*</span>
              </label>
              <textarea
                class={`form-control  ${
                  formik.touched.centerRemark && formik.errors.centerRemark
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("centerRemark")}
                type="text"
                rows="4"
              />
              {formik.touched.centerRemark && formik.errors.centerRemark && (
                <div className="invalid-feedback">
                  {formik.errors.centerRemark}
                </div>
              )}
            </div>
            <div class=" col-12 mb-2 ">
              <label>Parent Remark</label>
              <textarea
                class="form-control "
                {...formik.getFieldProps("parentRemark")}
                type="text"
                rows="4"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentChangeClass;
