import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllLevelsWithIds from "../List/LevelList";
import fetchAllSubjectsWithIds from "../List/SubjectList";

function CourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [centerData, setCenterData] = useState(null);
  const [levelData, setLevelData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
const [loadIndicator, setLoadIndicator] = useState(false);
  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const levelData = await fetchAllLevelsWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      setCenterData(centerData);
      setLevelData(levelData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    centerId: Yup.string().required("*Select the Centre Name"),
    courseName: Yup.string().required("*Course Name is required"),
    courseCode: Yup.string().required("*Course Code is required"),
    subjectId: Yup.string().required("*Select the Subject"),
    levelId: Yup.string().required("*Select the Level"),
    minClassSize: Yup.number().typeError("*Must be a Number"),
    maxClassSize: Yup.number().typeError("*Must be a Number"),
    courseType: Yup.string().required("*Select the Course Type"),
    status: Yup.string().required("*Status is required"),
    classReplacementAllowed: Yup.string().required(
      "*Select the Class Replacement Allowed"
    ),
    replacementLessonStudentBuffer: Yup.number().notRequired(""),
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
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
      classReplacementAllowed: false,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      console.log(values);
      values.classReplacementAllowed = values.classReplacementAllowed === true;
      try {
        const response = await api.put(`/updateCourses/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/course");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicator(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCoursesById/${id}`);
        formik.setValues({
          ...response.data,
          classReplacementAllowed:
            response.data.classReplacementAllowed || false,
        });
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="courseAdd">
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
            <Link to="/course">
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
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Centre Name<span class="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <select
                    {...formik.getFieldProps("centerId")}
                    class={`form-select  ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    {centerData &&
                      centerData.map((centerId) => (
                        <option key={centerId.id} value={centerId.id}>
                          {centerId.centerNames}
                        </option>
                      ))}
                  </select>
                  {formik.touched.centerId && formik.errors.centerId && (
                    <div className="invalid-feedback">
                      {formik.errors.centerId}
                    </div>
                  )}
                </div>
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Course Name<span class="text-danger">*</span>
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
            </div>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Course Code<span class="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
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
              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Subject<span class="text-danger">*</span>
                </lable>
                <select
                  class={`form-select  ${
                    formik.touched.subjectId && formik.errors.subjectId
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("subjectId")}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  {subjectData &&
                    subjectData.map((subjectId) => (
                      <option key={subjectId.id} value={subjectId.id}>
                        {subjectId.subjects}
                      </option>
                    ))}
                </select>
                {formik.touched.subjectId && formik.errors.subjectId && (
                  <div className="invalid-feedback">
                    {formik.errors.subjectId}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Level<span class="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <select
                    {...formik.getFieldProps("levelId")}
                    class={`form-select  ${
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
                          {levelId.levels}
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
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">Min Class Size</lable>
                <input
                  type="text"
                  className={`form-control iconInput  `}
                  {...formik.getFieldProps("minClassSize")}
                  placeholder=""
                />
                {formik.touched.minClassSize && formik.errors.minClassSize && (
                  <div className="text-danger" style={{ fontSize: ".875em" }}>
                    {formik.errors.minClassSize}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">Max Class Size</lable>
                <input
                  type="text"
                  className={`form-control iconInput  `}
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
                    formik.touched.replacementLessonStudentBuffer && formik.errors.replacementLessonStudentBuffer
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("replacementLessonStudentBuffer")}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">Color Code</lable>
                <div class="input-group mb-3">
                  <div className="input-group-text inputGroup">
                    <input
                      type="color"
                      {...formik.getFieldProps("colorCode")}
                      className="form-control-color circle"
                    />
                  </div>
                  <input
                    type="text"
                    className={`form-control iconInput `}
                    value={formik.values.colorCode}
                  />
                </div>
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Course Type<span class="text-danger">*</span>
                </lable>
                <div class="d-flex mt-2">
                  <input
                    class="form-check-input me-3"
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
                    class="form-check-input mx-3"
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
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">Duration(Hr)</lable>
                <div class="input-group mb-3">
                  <select
                    {...formik.getFieldProps("durationInHrs")}
                    class="form-select iconInput "
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="">Duration(Mins)</lable>
                <div class="input-group mb-3">
                  <select
                    {...formik.getFieldProps("durationInMins")}
                    class="form-select iconInput "
                    aria-label="Default select example"
                  >
                    <option selected></option>
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Status<span class="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <select
                    {...formik.getFieldProps("status")}
                    class={`form-select  ${
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
                  {formik.touched.status && formik.errors.status && (
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="">
                  Class Replacement Allowed<span class="text-danger">*</span>
                </lable>
                <div class="d-flex mt-2">
                  <input
                    class="form-check-input me-3"
                    value={true}
                    name="classReplacementAllowed"
                    type="radio"
                    onChange={() =>
                      formik.setFieldValue("classReplacementAllowed", true)
                    }
                    checked={formik.values.classReplacementAllowed === true}
                  />
                  <p className="my-0 me-1">Yes</p>
                  <input
                    class="form-check-input mx-3"
                    value="No"
                    name="classReplacementAllowed"
                    type="radio"
                    onChange={() =>
                      formik.setFieldValue("classReplacementAllowed", false)
                    }
                    checked={formik.values.classReplacementAllowed === false}
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
                 placeholder="">

                </textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CourseEdit;
