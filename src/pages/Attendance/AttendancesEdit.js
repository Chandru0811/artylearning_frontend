import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  studentid: Yup.string().required("*Student ID Name is required"),
  studentrName: Yup.string().required("*Stuent Name is required"),
  attendance: Yup.string().required("*Select the Attendance"),
  temperature: Yup.string().required("*Temperature is required"),
  lesson: Yup.string().required("*Select the Lesson"),
  nextclass: Yup.string().required("*Select the Type"),
  pace: Yup.string().required("*Select the Type"),
});



function AttendancesEdit() {
  const [loadIndicator, setLoadIndicator] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      studentid: "",
      studentrName: "",
      attendance: "",
      lesson: "",
      nextclass: "",
      pace: "",
      remark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      try {
        console.log(data);
        alert("Attendance Update Successfully");
        navigate("/attendance");
      } catch (error) {
        console.error("Error submitting form", error);
        alert("Failed to Create Attendance");
      }finally {
        setLoadIndicator(false);
      }
    },
    // onSubmit: async (data) => {
    //   setLoadIndicator(true);

    //   navigate("/attendance");
    // },finally {
    //   setLoadIndicator(false);
    // }
  });
  useEffect(() => {
    const fetchData = async () => {
      formik.setValues({
        studentid: "S000482",
        studentrName: "CHEN XIN YI",
        attendance: "1",
        temperature: "37",
        lesson: "1",
        nextclass: "competment",
        pace: "Fast",
        remark: "",
      });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-2">
          <Link to="/attendance">
            <button type="button " className="btn btn-sm btn-border   ">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <button type="submit" className="btn btn-button btn-sm" disabled={loadIndicator}>
                {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                Update
              </button>
        </div>
        <div className="container">
          <div className="row py-4">
            <div class="col-md-6 col-12 mb-2">
              <lable className="form-lable">Student ID</lable>
              <span className="text-danger">*</span>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="studentid"
                  className={`form-control  ${
                    formik.touched.studentid && formik.errors.studentid
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("studentid")}
                />
                {formik.touched.studentid && formik.errors.studentid && (
                  <div className="invalid-feedback">
                    {formik.errors.studentid}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 mb-2">
              <lable class="">Student Name</lable>
              <span className="text-danger">*</span>
              <input
                type="text"
                name="studentrName"
                className={`form-control  ${
                  formik.touched.studentrName && formik.errors.studentrName
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Username"
                aria-describedby="basic-addon1"
                {...formik.getFieldProps("studentrName")}
              />
              {formik.touched.studentrName && formik.errors.studentrName && (
                <div className="invalid-feedback">
                  {formik.errors.studentrName}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Attendance
                </label>
                <span className="text-danger">*</span>
                <div className="radio-buttons">
                  <label className="radio-button">
                    <input
                      type="radio"
                      name="attendance"
                      value="1"
                      checked={formik.values.attendance === "1"}
                      onChange={formik.handleChange}
                    />
                    <span className="radio-button-text">Present</span>
                  </label>
                  <label className="radio-button">
                    <input
                      type="radio"
                      name="attendance"
                      value="2"
                      checked={formik.values.attendance === "2"}
                      onChange={formik.handleChange}
                    />
                    <span className="radio-button-text">Absent</span>
                  </label>
                </div>
                {formik.touched.attendance && formik.errors.attendance && (
                  <div className="invalid-feedback">
                    {formik.errors.attendance}
                  </div>
                )}
              </div>
            </div>

            <div class="col-md-6 col-12 mb-2">
              <lable className="form-lable">Body Temperature</lable>
              <span className="text-danger">*</span>
              <div className="input-group mb-3">
                <input
                  type="number"
                  name="temperature"
                  className={`form-control  ${
                    formik.touched.temperature && formik.errors.temperature
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("temperature")}
                />
                {formik.touched.temperature && formik.errors.temperature && (
                  <div className="invalid-feedback">
                    {formik.errors.temperature}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Lesson No
                </label>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("lesson")}
                  className={`form-select    ${
                    formik.touched.lesson && formik.errors.lesson
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
                {formik.touched.lesson && formik.errors.lesson && (
                  <div className="invalid-feedback">{formik.errors.lesson}</div>
                )}
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div>
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Next Class Advice<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nextclass"
                    id="inlineRadio1"
                    value="competment"
                    onChange={formik.handleChange}
                    checked={formik.values.nextclass === "competment"}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    competment
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nextclass"
                    id="inlineRadio2"
                    value="Require Revision"
                    onChange={formik.handleChange}
                    checked={formik.values.nextclass === "Require Revision"}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Require Revision
                  </label>
                </div>
                {formik.errors.nextclass && formik.touched.nextclass && (
                  <div className="text-danger  " style={{ fontSize: ".875em" }}>
                    {formik.errors.nextclass}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Pace<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pace"
                    id="inlineRadio1"
                    value="Fast"
                    onChange={formik.handleChange}
                    checked={formik.values.pace === "Fast"}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Fast
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pace"
                    id="inlineRadio2"
                    value="Normal"
                    onChange={formik.handleChange}
                    checked={formik.values.pace === "Normal"}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Normal
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pace"
                    id="inlineRadio1"
                    value="Slow"
                    onChange={formik.handleChange}
                    checked={formik.values.pace === "Slow"}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Slow
                  </label>
                </div>
                {formik.errors.pace && formik.touched.pace && (
                  <div className="text-danger  " style={{ fontSize: ".875em" }}>
                    {formik.errors.pace}
                  </div>
                )}
              </div>
            </div>

            <div class=" mb-2">
              <lable>Remark</lable>
              <textarea
                class="form-control"
                {...formik.getFieldProps("remark")}
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AttendancesEdit;
