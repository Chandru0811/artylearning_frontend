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
  signatureDate: Yup.string().required("*Signature Date is required")
});

const AddcourseDetail = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const [courseData, setCourseData] = useState(null);

    const formik = useFormik({
      initialValues: {
        courseId: formData.courseId || "",
        startDate: formData.startDate || "",
        startTime: formData.startTime || "",
        file: null || "",
        courseDay: formData.courseDay || "",
        endDate: formData.endDate || "",
        endTime: formData.endTime || "",
        signatureDate:formData.signatureDate || ""
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          const formDatas = new FormData();

          // Append each form field to FormData object
          formDatas.append("courseId", data.courseId);
          formDatas.append("courseName", data.courseId);
          formDatas.append("startDate", data.startDate);
          formDatas.append("startTime", data.startTime);
          formDatas.append("file", data.file);
          formDatas.append("courseDay", data.courseDay);
          formDatas.append("endDate", data.endDate);
          formDatas.append("endTime", data.endTime);
          formDatas.append("signatureDate", data.signatureDate);
          formDatas.append("studentDetailId ", formData.student_id); // Assuming formDatas.student_id is defined

          // You don't need to set parentSignature to null in formDatas, it's already null if not set

          const response = await api.post(
            `/createStudentCourseDetails`,
            formDatas
          );

          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }finally {
          setLoadIndicators(false);
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

    useImperativeHandle(ref, () => ({
      CourseDetail: formik.handleSubmit,
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
                          className="form-control "
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
                          name="file"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "file",
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
                          <small>Signature Date<span className="text-danger">*</span></small>
                        </label>
                        <br />
                        <input
                          className="form-control  form-contorl-sm"
                          name="signatureDate"
                          type="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.signatureDate}
                        />
                        {formik.touched.signatureDate && formik.errors.signatureDate && (
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

export default AddcourseDetail;