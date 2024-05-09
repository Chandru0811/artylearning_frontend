import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/custom.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../List/CourseList";

function StudentRegisterCourse() {
  const validationSchema = Yup.object({
    courseId: Yup.string().required("*Select the courseId"),
    courseDay: Yup.string().required("*Course day is required"),
    startDate: Yup.string().required("*Start date is required"),
    endDate: Yup.string().required("*End date is required"),
    startTime: Yup.string().required("*Start time is required"),
    endTime: Yup.string().required("*End time is required"),
  });
  const [data, setData] = useState({});
  const [courseData, setCourseData] = useState(null);

  const { id } = useParams();
  //   const id = 38;
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const centers = await fetchAllCoursesWithIds();
      setCourseData(centers);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      courseId: "",
      courseDay: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const course = values.courseId;

      try {
        if (
          data &&
          data.studentCourseDetailModels &&
          data.studentCourseDetailModels.length > 0
        ) {
          const response = await api.put(
            `/updateStudentCourseDetail/${data.studentCourseDetailModels[0].id}`,
            { ...values, course },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            navigate("/student");
          } else {
            toast.error(response.data.message);
          }
        } else {
          const requestData = {
            ...values,
            studentId: id,
            course: values.courseId,
          };
          const response = await api.post(
            `/createStudentCourseDetails`,
            requestData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            navigate("/student");
          } else {
            toast.error(response.data.message);
          }
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${id}`);
        if (response.data.studentCourseDetailModels.length > 0) {
          setData(response.data);
          const formattedResponseData = {
            ...response.data.studentCourseDetailModels[0],
            startDate:
              response.data.studentCourseDetailModels[0].startDate.substring(
                0,
                10
              ),
            endDate:
              response.data.studentCourseDetailModels[0].endDate.substring(
                0,
                10
              ),
            courseDay:
              response.data.studentCourseDetailModels[0].courseDay.substring(
                0,
                10
              ),
          };
          formik.setValues(formattedResponseData);
        } else {
          console.log("Value not present in the table");
        }
      } catch (error) {
        toast.error("Error Fetching Form Data");
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
            <Link to={`/student/view/${id}`}>
              <button type="button" className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-button btn-sm ">
              Save
            </button>
          </div>
          <div className="container">
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Course<span class="text-danger">*</span>
                </lable>
                <select
                  {...formik.getFieldProps("courseId")}
                  class={`form-select  ${
                    formik.touched.courseId && formik.errors.courseId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option disabled></option>
                  {courseData &&
                    courseData.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseNames}
                      </option>
                    ))}
                </select>
                {formik.touched.courseId && formik.errors.courseId && (
                  <div className="invalid-feedback">
                    {formik.errors.courseId}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">
                  Course Day<span class="text-danger">*</span>
                </lable>
                <input
                  type="date"
                  className={`form-control  ${
                    formik.touched.courseDay && formik.errors.courseDay
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("courseDay")}
                />
                {formik.touched.courseDay && formik.errors.courseDay && (
                  <div className="invalid-feedback">
                    {formik.errors.courseDay}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">
                  Start Date<span class="text-danger">*</span>
                </lable>
                <input
                  type="date"
                  className={`form-control  ${
                    formik.touched.startDate && formik.errors.startDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("startDate")}
                />
                {formik.touched.startDate && formik.errors.startDate && (
                  <div className="invalid-feedback">
                    {formik.errors.startDate}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">
                  End Date<span class="text-danger">*</span>
                </lable>
                <input
                  type="date"
                  class={`form-control  ${
                    formik.touched.endDate && formik.errors.endDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("endDate")}
                />
                {formik.touched.endDate && formik.errors.endDate && (
                  <div className="invalid-feedback">
                    {formik.errors.endDate}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">
                  Start Time<span class="text-danger">*</span>
                </lable>
                <input
                  type="time"
                  class={`form-control  ${
                    formik.touched.startTime && formik.errors.startTime
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("startTime")}
                />
                {formik.touched.startTime && formik.errors.startTime && (
                  <div className="invalid-feedback">
                    {formik.errors.startTime}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable class="form-lable">
                  End Time<span class="text-danger">*</span>
                </lable>
                <input
                  type="time"
                  class={`form-control  ${
                    formik.touched.endTime && formik.errors.endTime
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("endTime")}
                />
                {formik.touched.endTime && formik.errors.endTime && (
                  <div className="invalid-feedback">
                    {formik.errors.endTime}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default StudentRegisterCourse;
