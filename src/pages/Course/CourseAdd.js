import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import fetchAllLevelBySubjectsWithIds from "../List/LevelListBySubject";
import { MultiSelect } from "react-multi-select-component";

const validationSchema = Yup.object({
  centerId: Yup.array().min(1, "*At least one Centre must be selected"),
  courseName: Yup.string().required("*Course Name is required"),
  courseCode: Yup.string().required("*Course Code is required"),
  subjectId: Yup.string().required("*Select the Subject"),
  levelId: Yup.string().required("*Select the Level"),
  minClassSize: Yup.number().typeError("*Must be a Number"),
  maxClassSize: Yup.number().typeError("*Must be a Number"),
  courseType: Yup.string().required("*Select the Course Type"),
  durationInHrs: Yup.string().required("*Select the Duration In Hrs"),
  durationInMins: Yup.string().required("*Select the Duration In Mins"),
  status: Yup.string().required("*Status is required"),
  classReplacementAllowed: Yup.string().required(
    "*Select the Class Replacement Allowed"
  ),
  replacementLessonStudentBuffer: Yup.number().typeError("*Must be a Number"),
  description: Yup.string()
    .notRequired()
    .max(200, "*The maximum length is 200 characters"),
});

function CourseAdd({ onSuccess }) {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState([]);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const colorInputRef = useRef(null);
  console.log("Center Data", centerData);
  const [levelData, setLevelData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const centerOptions = centerData?.map((center) => ({
    label: center.centerNames,
    value: center.id,
  }));
  const userName = localStorage.getItem("userName");

  const formik = useFormik({
    initialValues: {
      centerId: [],
      courseName: "",
      courseCode: "",
      subjectId: "",
      levelId: "",
      minClassSize: "",
      maxClassSize: "",
      replacementLessonStudentBuffer: "",
      colorCode: "",
      courseType: "",
      durationInHrs: "",
      durationInMins: "",
      status: "",
      classReplacementAllowed: "",
      description: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log(values);
      try {
        const classReplacementAllowed =
          values.classReplacementAllowed === "Yes" ? true : false;
        const updatedData = {
          ...values,
          classReplacementAllowed: classReplacementAllowed,
        };
        const response = await api.post("/createCourses", updatedData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(values);
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/course");
          onSuccess();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
    validateOnChange: false, // Enable validation on change
    validateOnBlur: true, // Enable validation on blur
  });

  // Function to scroll to the first error field
  const scrollToError = (errors) => {
    const errorField = Object.keys(errors)[0]; // Get the first error field
    const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus(); // Set focus to the error element
    }
  };

  // Watch for form submit and validation errors
  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors);
    }
  }, [formik.submitCount, formik.errors]);
  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchSubject = async () => {
    try {
      const subjectData = await fetchAllSubjectsWithIds();
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchLevels = async (subjectId) => {
    try {
      const subject = await fetchAllLevelBySubjectsWithIds(subjectId);
      setLevelData(subject);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSubjectChange = (event) => {
    setLevelData(null);
    const subject = event.target.value;
    formik.setFieldValue("subjectId", subject);
    fetchLevels(subject);
  };

  useEffect(() => {
    fetchData();
    fetchSubject();
  }, []);
  const handleColorPickerClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/course" className="custom-breadcrumb">
            &nbsp;Course{" "}
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Course Add
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex justify-content-between align-items-center p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2 text-muted">Add Course</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/course">
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
                <span className="fw-medium">Save</span>
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-md-6 col-12 mb-4">
                <label className="form-label">
                  Centre<span className="text-danger">*</span>
                </label>
                <MultiSelect
                  options={centerOptions}
                  value={selectedCenters}
                  onChange={(selected) => {
                    setSelectedCenters(selected);
                    formik.setFieldValue(
                      "centerId",
                      selected.map((option) => option.value)
                    );
                  }}
                  labelledBy="Select Centers"
                  className={`form-multi-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Color Code</lable>
                <div className="input-group mb-3">
                  <div className="input-group-text inputGroup">
                    <input
                      type="color"
                      {...formik.getFieldProps("colorCode")}
                      className="form-control-color circle"
                      ref={colorInputRef}
                    />
                  </div>
                  <input
                    type="text"
                    className={`form-control iconInput`}
                    value={formik.values.colorCode}
                    onClick={handleColorPickerClick}
                    onChange={(e) =>
                      formik.setFieldValue("colorCode", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Subject<span className="text-danger">*</span>
                </lable>
                <select
                  className={`form-select  ${
                    formik.touched.subjectId && formik.errors.subjectId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("subjectId")}
                  onChange={handleSubjectChange}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  {subjectData &&
                    subjectData.map((subject) => (
                      <option key={subject.subjectId} value={subject.id}>
                        {subject.subjects}
                      </option>
                    ))}
                </select>
                {formik.touched.subjectId && formik.errors.subjectId && (
                  <div className="invalid-feedback">
                    {formik.errors.subjectId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Level<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <select
                    {...formik.getFieldProps("levelId")}
                    className={`form-select  ${
                      formik.touched.levelId && formik.errors.levelId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    {levelData &&
                      levelData.map((levelId) => (
                        <option key={levelId.id} value={levelId.id}>
                          {levelId.level}
                        </option>
                      ))}
                  </select>
                  {formik.touched.levelId && formik.errors.levelId && (
                    <div className="invalid-feedback">
                      {formik.errors.levelId}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Course Name<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.courseName && formik.errors.courseName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("courseName")}
                />
                {formik.touched.courseName && formik.errors.courseName && (
                  <div className="invalid-feedback">
                    {formik.errors.courseName}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Course Code<span className="text-danger">*</span>
                </lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.courseCode && formik.errors.courseCode
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("courseCode")}
                  />
                  {formik.touched.courseCode && formik.errors.courseCode && (
                    <div className="invalid-feedback">
                      {formik.errors.courseCode}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Max Class Size</lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.maxClassSize && formik.errors.maxClassSize
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("maxClassSize")}
                  placeholder=""
                />
                {formik.touched.maxClassSize && formik.errors.maxClassSize && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.maxClassSize}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">Replacement Lesson Student Buffer</lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.replacementLessonStudentBuffer &&
                    formik.errors.replacementLessonStudentBuffer
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("replacementLessonStudentBuffer")}
                />
                {formik.touched.replacementLessonStudentBuffer &&
                  formik.errors.replacementLessonStudentBuffer && (
                    <div className="text-danger" style={{ fontSize: ".875em" }}>
                      {formik.errors.replacementLessonStudentBuffer}
                    </div>
                  )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Min Class Size</lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.minClassSize && formik.errors.minClassSize
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("minClassSize")}
                  placeholder=""
                />
                {formik.touched.minClassSize && formik.errors.minClassSize && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.minClassSize}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">
                  Course Type<span className="text-danger">*</span>
                </lable>
                <div className="d-flex mt-2">
                  <input
                    className="form-check-input me-3"
                    value="Normal"
                    name="courseType"
                    type="radio"
                    id="inlineRadio1"
                    onChange={formik.handleChange}
                    checked={formik.values.courseType === "Normal"}
                  />
                  <p className="my-0 me-1" for="inlineRadio1">
                    Normal
                  </p>
                  <input
                    className="form-check-input mx-3"
                    value="Holiday"
                    name="courseType"
                    type="radio"
                    id="inlineRadio2"
                    onChange={formik.handleChange}
                    checked={formik.values.courseType === "Holiday"}
                  />
                  <p className="my-0 me-1" for="inlineRadio1">
                    Holiday
                  </p>
                </div>
                {formik.errors.courseType && formik.touched.courseType && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.courseType}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">Duration(Hrs)</lable>
                <span className=" text-danger">*</span>
                <div className="input-group ">
                  <select
                    {...formik.getFieldProps("durationInHrs")}
                    className="form-select iconInput "
                    aria-label="Default select example"
                  >
                  <option></option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  </select>
                </div>
                {formik.errors.durationInHrs &&
                  formik.touched.durationInHrs && (
                    <div className="text-danger" style={{ fontSize: ".875em" }}>
                      {formik.errors.durationInHrs}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable className="">Duration(Mins)</lable>
                <span className="text-danger">*</span>
                <div className="input-group">
                  <select
                    {...formik.getFieldProps("durationInMins")}
                    className="form-select iconInput "
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
                {formik.errors.durationInMins &&
                  formik.touched.durationInMins && (
                    <div className="text-danger" style={{ fontSize: ".875em" }}>
                      {formik.errors.durationInMins}
                    </div>
                  )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Status<span className="text-danger">*</span>
                </lable>
                <div className="input-group ">
                  <select
                    {...formik.getFieldProps("status")}
                    className={`form-select  ${
                      formik.touched.status && formik.errors.status
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                {formik.errors.status && formik.touched.status && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.status}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <lable>
                  Class Replacement Allowed
                  <span className="text-danger">*</span>
                </lable>
                <div className="d-flex mt-2">
                  <input
                    className="form-check-input me-3"
                    value="Yes"
                    name="classReplacementAllowed"
                    type="radio"
                    onChange={formik.handleChange}
                    checked={formik.values.classReplacementAllowed === "Yes"}
                  />
                  <p className="my-0 me-1">Yes</p>
                  <input
                    className="form-check-input mx-3"
                    value="No"
                    name="classReplacementAllowed"
                    type="radio"
                    onChange={formik.handleChange}
                    checked={formik.values.classReplacementAllowed === "No"}
                  />
                  <p className="my-0 me-1">No</p>
                </div>
                {formik.errors.classReplacementAllowed &&
                  formik.touched.classReplacementAllowed && (
                    <div className="text-danger" style={{ fontSize: ".875em" }}>
                      {formik.errors.classReplacementAllowed}
                    </div>
                  )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 my-3">
                <lable className="">Description</lable>
                <textarea
                  type="text"
                  className={`form-control pb-5`}
                  {...formik.getFieldProps("description")}
                  placeholder=""
                ></textarea>
                {formik.errors.description && formik.touched.description && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CourseAdd;
