import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../../List/CourseList";

const validationSchema = Yup.object().shape({
  signatureDate: Yup.string().required("*Signature Date is required!"),
});

const EditCourseDetail = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const [courseData, setCourseData] = useState(null);

    const formik = useFormik({
      initialValues: {
        courseId: formData.courseId || "",
        startDate: formData.startDate || "",
        startTime: formData.startTime || "",
        parentSignature: null || "",
        courseDay: formData.courseDay || "",
        endDate: formData.endDate || "",
        endTime: formData.endTime || "",
        signatureDate: formData.signatureDate || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        data.parentSignature = null;
        try {
          if (data.courseDetailId !== null) {
              const response = await api.put(
                  `/updateStudentCourseDetail/${data.courseDetailId}`,
                  data,
                  {
                      headers: {
                          "Content-Type": "application/json",
                      },
                  }
              );
              if (response.status === 200) {
                  toast.success(response.data.message);
                  handleNext();
              } else {
                  toast.error(response.data.message);
              }
          } else {
              const response = await api.post(
                  `/createStudentCourseDetails/${data.id}`,
                  data,
                  {
                      headers: {
                          "Content-Type": "application/json",
                      },
                  }
              );
              if (response.status === 201) {
                  toast.success(response.data.message);
                  handleNext();
              } else {
                  toast.error(response.data.message);
              }
          }
      } catch (error) {
          toast.error(error);
      }
      },
    });

    const fetchData = async () => {
      try {
        const courseData = await fetchAllCoursesWithIds();
        setCourseData(courseData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllStudentDetails/${formData.id}`
          );
          if (
            response.data.studentCourseDetailModels &&
            response.data.studentCourseDetailModels.length > 0
          ) {
            formik.setValues({
              ...response.data.studentCourseDetailModels[0],
              courseDetailId: response.data.studentCourseDetailModels[0].id,
              startDate: response.data.studentCourseDetailModels[0].startDate.substring(0,10),
              endDate: response.data.studentCourseDetailModels[0].endDate.substring(0,10),
              signatureDate: response.data.studentCourseDetailModels[0].signatureDate.substring(0,10),
              courseDay: response.data.studentCourseDetailModels[0].courseDay.substring(0,10),
            });
          } else {
            // If there are no emergency contacts, set default values or handle the case as needed
            formik.setValues({
              courseDetailId: null,
              courseId:"",
              startDate: "",
              startTime: "",
              parentSignature: null || "",
              courseDay: "",
              endDate: "",
              endTime:"",
              signatureDate: "",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      coursedetail: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className="border-0 mb-5">
            <div className="mb-5">
              <div className="border-0 my-2 px-2">
                <p class="headColor">Course Detail</p>
                <div className="container py-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-start">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Course</small>
                        </label>
                        <br />
                        <select
                          name="courseId"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.courseId}
                          className="form-select"
                        >
                          <option selected></option>
                          {courseData &&
                            courseData.map((courseId) => (
                              <option key={courseId.id} value={courseId.id}>
                                {courseId.courseNames}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Start Date</small>
                        </label>
                        <br />
                        <input
                          className="form-control  form-contorl-sm"
                          name="startDate"
                          type="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.startDate}
                        />
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Start Time</small>
                        </label>
                        <br />
                        <input
                          className="form-control"
                          type="time"
                          name="startTime"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.startTime}
                        />
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Parent Signature</small>
                        </label>
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          name="parentSignature"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "parentSignature",
                              event.currentTarget.files[0]
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 px-5">
                      <div className="text-start">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Course Date</small>
                        </label>
                        <br />
                        <input
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.courseDay}
                          name="courseDay"
                          className="form-control "
                          type="date"
                        />
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>End Date</small>
                        </label>
                        <br />
                        <input
                          className="form-control  form-contorl-sm"
                          name="endDate"
                          type="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.endDate}
                        />
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>End Time</small>
                        </label>
                        <br />
                        <input
                          className="form-control "
                          type="time"
                          name="endTime"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.endTime}
                        />
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Signature Date</small>
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <br />
                        <input
                          className="form-control "
                          type="date"
                          name="signatureDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.signatureDate}
                        />
                        {formik.touched.signatureDate &&
                          formik.errors.signatureDate && (
                            <div className="text-danger">
                              <small>{formik.errors.signatureDate}</small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
);
export default EditCourseDetail;
