import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllCentersWithIds from "../List/CenterList";

function StudentTransferOut() {
  const { id } = useParams();
  // const [data, setData] = useState({});
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = Yup.object({
    courseId: Yup.string().required("*Current Course is required"),
    // currentClass: Yup.string().required("*Current Class is required"),
    lastLessonDate: Yup.string().required("*Last Lesson Date  is required"),
    centerId: Yup.string().required("*Transfer To is required"),
    reason: Yup.string().required("*Reason is required"),
    centerRemark: Yup.string()
  .required("*Leave Reason is required")
  .max(200, "*The maximum length is 200 characters"),
  parentRemark: Yup.string()
  .notRequired("*Leave Reason is required")
  .max(200, "*The maximum length is 200 characters"),
  });

  const fetchData = async () => {
    try {
      const course = await fetchAllCoursesWithIds();
      const center = await fetchAllCentersWithIds();
      setCourseData(course);
      setCenterData(center);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      courseId: "",
      // currentClass: "",
      lastLessonDate: "",
      centerId: "",
      preferTiming: "",
      preferDays: "",
      preferStartDate: "",
      reason: "",
      otherReason: "",
      centerRemark: "",
      parentRemark: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log(values);
      try {
        const response = await api.put(`/updateStudentDetail/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate(`/student/view/${id}`);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error fetching Data");
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
        console.log("Response is ", response.data);
        if (response.data.centerId && response.data.centerId) {
          // setData(response.data);
          const formattedResponseData = {
            courseId: response.data.studentCourseDetailModels[0].courseId,
            centerId: response.data.centerId,
          };
          formik.setValues(formattedResponseData);
        }
      } catch (error) {
        console.log("Error Fetching Form Data");
      } finally {
        setLoadIndicator(false);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
       <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to={`/student/view/${id}`}>
            <button type="button " className="btn btn-sm btn-border   ">
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
          <div className="row py-4">
            <div className="col-md-6 col-12 mb-2">
              <lable className="">
                Current Course<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("courseId")}
                name="courseId"
                className={`form-control   ${
                  formik.touched.courseId && formik.errors.courseId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                className="form-select "
              >
                <option></option>
                {courseData &&
                  courseData.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseNames}
                    </option>
                  ))}
              </select>
              {formik.touched.courseId && formik.errors.courseId && (
                <div className="invalid-feedback">{formik.errors.courseId}</div>
              )}
            </div>
            {/* <div className="col-md-6 col-12 mb-2">
              <lable className="">
                Current Class<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("currentClass")}
                name="currentClass"
                className={`form-control   ${
                  formik.touched.currentClass && formik.errors.currentClass
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                className="form-select "
              >
                <option selected></option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              {formik.touched.currentClass && formik.errors.currentClass && (
                <div className="invalid-feedback">
                  {formik.errors.currentClass}
                </div>
              )}
            </div> */}
            <div className="col-md-6 col-12 mb-2">
              <lable className="">
                Last Lesson Date<span className="text-danger">*</span>
              </lable>
              <input
                type="date"
                onFocus={(e) => e.target.showPicker()}
                {...formik.getFieldProps("lastLessonDate")}
                name="lastLessonDate"
                className={`form-control   ${
                  formik.touched.lastLessonDate && formik.errors.lastLessonDate
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formik.touched.lastLessonDate &&
                formik.errors.lastLessonDate && (
                  <div className="invalid-feedback">
                    {formik.errors.lastLessonDate}
                  </div>
                )}
            </div>
            <div className="col-md-6 col-12 mb-2">
              <lable className="">
                Transfer To<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("centerId")}
                name="centerId"
                className={`form-control   ${
                  formik.touched.centerId && formik.errors.centerId
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                className="form-select "
              >
                <option></option>
                {centerData &&
                  centerData.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.centerNames}
                    </option>
                  ))}
              </select>
              {formik.touched.centerId && formik.errors.centerId && (
                <div className="invalid-feedback">{formik.errors.centerId}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-2 ">
              <label>Prefer Timing</label>
              <input
                className="form-control "
                name="preferTiming"
                {...formik.getFieldProps("preferTiming")}
                type="time"
     
              />
            </div>
            {/* <div className="col-md-6 col-12 mb-2 ">
              <label>Prefer Days </label>
              <input
                className="form-control "
                name="preferDays"
                {...formik.getFieldProps("preferDays")}
                type="text"
              />
            </div> */}
            <div className="col-md-6 col-12 mb-2">
              <lable className="">Prefer Days</lable>
              <select
                {...formik.getFieldProps("preferDays")}
                name="preferDays"
                className={`form-select ${
                  formik.touched.preferDays && formik.errors.preferDays
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                className="form-select "
              >
                <option selected></option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              {formik.touched.preferDays && formik.errors.preferDays && (
                <div className="invalid-feedback">
                  {formik.errors.preferDays}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2">
              <label>Prefer Start date</label>
              <input
                type="date"
                onFocus={(e) => e.target.showPicker()}
                name="preferStartDate"
                className="form-control "
                {...formik.getFieldProps("preferStartDate")}
              />
            </div>
            <div className="col-md-6 col-12 mb-2">
              <lable className="">
                Reason<span className="text-danger">*</span>
              </lable>
              <select
                {...formik.getFieldProps("reason")}
                name="reason"
                className={`form-select   ${
                  formik.touched.reason && formik.errors.reason
                    ? "is-invalid"
                    : ""
                }`}
                aria-label="Default select example"
                className="form-select "
              >
                <option selected></option>
                <option value="Relocation">Relocation</option>
                <option value="Convenience">Convenience</option>
                <option value="Facility Upgrade">Facility Upgrade</option>
                <option value="Schedule Conflict">Schedule Conflict</option>
                <option value="Special Requirements">
                  Special Requirements
                </option>
              </select>
              {formik.touched.reason && formik.errors.reason && (
                <div className="invalid-feedback">{formik.errors.reason}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-2 ">
              <label>Othet Reason</label>
              <input
                className="form-control "
                type="text"
                {...formik.getFieldProps("otherReason")}
                name="otherReason"
              />
            </div>
            <div className="col-md-6 col-12 mb-2 "></div>
            <div className="col-12 mb-2 ">
              <label>
                Centre Remark<span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control "
                type="text"
                rows="4"
                name="centerRemark"
                className={`form-control  ${
                  formik.touched.centerRemark && formik.errors.centerRemark
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("centerRemark")}
              />
              {formik.touched.centerRemark && formik.errors.centerRemark && (
                <div className="invalid-feedback">
                  {formik.errors.centerRemark}
                </div>
              )}
            </div>
            <div className=" col-12 mb-2 ">
              <lable>Parent Remark</lable>
              <textarea
                className="form-control"
                {...formik.getFieldProps("parentRemark")}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default StudentTransferOut;
