import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIds from "../List/CourseList";
import CenterManager from "./CenterManager";

function CenterManagerAdd() {
  const navigate = useNavigate();
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      setCenterData(centerData);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    // centerId: Yup.string().required("*Centre Name is required"),
    // courseId: Yup.string().required("*Course Name is required"),
    centerManagerName: Yup.string().required("*Class Name is required"),
    email: Yup.string().required("*Class Type is required"),
    phone: Yup.string().required("*Class Type is required"),
    desgination: Yup.string().required("*Class Type is required"),
    // durationInHrs: Yup.number().required("*Duration is required"),
  });
  const formik = useFormik({
    initialValues: {
        centerManagerName: "",
        email: "",
        phone: "",
        desgination: "",
      
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const selectedValue = formik.values.centerId; // Assuming formik is in scope
      let selectedOptionName = "";

      centerData.forEach((center) => {
        if (parseInt(selectedValue) === center.id) {
          selectedOptionName = center.centerNames || "--";
        }
      });

      values.centerName = selectedOptionName;

      console.log(values);

      try {
        const response = await api.post("/createCourseClassListings", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/class");
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

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/class">
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
                Save
              </button>
        </div>
        <div className="container">
          <div className="row py-4">
            {/* <div class="col-md-6 col-12 mb-4">
              <lable class="">
                Centre<span class="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("centerId")}
                name="centerId"
                className={`form-select   ${formik.touched.centerId && formik.errors.centerId
                    ? "is-invalid"
                    : ""
                  }`}
                aria-label="Default select example"
                class="form-select "
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
                <div className="invalid-feedback">{formik.errors.centerId}</div>
              )}
            </div> */}
            {/* <div class="col-md-6 col-12 mb-4">
              <label>
                Course<span class="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("courseId")}
                name="courseId"
                className={`form-select   ${formik.touched.courseId && formik.errors.courseId
                    ? "is-invalid"
                    : ""
                  }`}
                aria-label="Default select example"
                class="form-select "
              >
                <option selected></option>
                {courseData &&
                  courseData.map((courseId) => (
                    <option key={courseId.id} value={courseId.id}>
                      {courseId.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.courseId && formik.errors.courseId && (
                <div className="invalid-feedback">{formik.errors.courseId}</div>
              )}
            </div> */}
            <div class="col-md-6 col-12 mb-4">
              <label>
                CenterManager Name<span class="text-danger">*</span>
              </label>
              <input
                name="className"
                class="form-control "
                type="text"
                className={`form-control  ${formik.touched.className && formik.errors.className
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("className")}
              />
              {formik.touched.className && formik.errors.className && (
                <div className="invalid-feedback">
                  {formik.errors.className}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Email<span class="text-danger">*</span>
              </label>
              <input
                name="className"
                class="form-control "
                type="text"
                className={`form-control  ${formik.touched.className && formik.errors.className
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("className")}
              />
              {formik.touched.className && formik.errors.className && (
                <div className="invalid-feedback">
                  {formik.errors.className}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Phone<span class="text-danger">*</span>
              </label>
              <input
                name="className"
                class="form-control "
                type="text"
                className={`form-control  ${formik.touched.className && formik.errors.className
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("className")}
              />
              {formik.touched.className && formik.errors.className && (
                <div className="invalid-feedback">
                  {formik.errors.className}
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-4">
              <label>
                Desigination<span class="text-danger">*</span>
              </label>
              <input
                name="className"
                class="form-control "
                type="text"
                className={`form-control  ${formik.touched.className && formik.errors.className
                    ? "is-invalid"
                    : ""
                  }`}
                {...formik.getFieldProps("className")}
              />
              {formik.touched.className && formik.errors.className && (
                <div className="invalid-feedback">
                  {formik.errors.className}
                </div>
              )}
            </div>
           
           
           
           
           
          </div>
        </div>
      </form>
    </div>
  );
}

export default CenterManagerAdd;
