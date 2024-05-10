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
import { useParams } from "react-router-dom";
import BlockImg from "../.././../assets/images/Block_Img1.jpg";

const validationSchema = Yup.object().shape({});

const EditCourseDetail = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const [courseData, setCourseData] = useState(null);
    const [data, setData] = useState([]);
    const { id } = useParams();

    const formik = useFormik({
      initialValues: {
        courseId: formData.courseId || "",
        startDate: formData.startDate || "",
        startTime: formData.startTime || "",
        parentSignature: null || "",
        courseDay: formData.courseDay || "",
        endDate: formData.endDate || "",
        endTime: formData.endTime || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        try {
          if (data.courseDetailId !== null) {
            // console.log("ID :",data.courseDetailId);
            const formDatas = new FormData();
            formDatas.append("courseName", "Arty Dreamers @ RDI");
            formDatas.append("courseId", data.courseId);
            formDatas.append("courseDay", data.courseDay);
            formDatas.append("startDate", data.startDate);
            formDatas.append("endDate", data.endDate);
            formDatas.append("file", data.file);
            formDatas.append("startTime", data.startTime);
            formDatas.append("endTime", data.endTime);
            formDatas.append("studentDetailId", id);
            formDatas.append("detailId", data.courseDetailId);
            const response = await api.put(
              `/updateStudentCourseDetail/${data.courseDetailId}`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              handleNext();
              getData();
            } else {
              toast.error(response.data.message);
            }
          } else {
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
            formDatas.append("studentDetailId", id);
            const response = await api.post(
              `/createStudentCourseDetails/${id}`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 201) {
              toast.success(response.data.message);
              handleNext();
              getData();
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

    const getData = async () => {
      try {
        const response = await api.get(`/getAllStudentDetails/${formData.id}`);
        if (
          response.data.studentCourseDetailModels &&
          response.data.studentCourseDetailModels.length > 0
        ) {
          formik.setValues({
            ...response.data.studentCourseDetailModels[0],
            courseDetailId: response.data.studentCourseDetailModels[0].id,
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
          });
          setData(response.data);
          // console.log("StudentDetails",response.data);
        } else {
          // If there are no emergency contacts, set default values or handle the case as needed
          formik.setValues({
            courseDetailId: null,
            courseId: "",
            startDate: "",
            startTime: "",
            parentSignature: null || "",
            courseDay: "",
            endDate: "",
            endTime: "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchData();
      getData();
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
                          name="file"
                          onChange={(event) => {
                            formik.setFieldValue("file", event.target.files[0]);
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {data.studentCourseDetailModels &&
                          data.studentCourseDetailModels.length > 0 &&
                          data.studentCourseDetailModels.map((parent) => (
                            <div className="container-fluid col-12 p-2">
                              <p className="my-2 d-flex">
                                {parent.parentSignature ? (
                                  <img
                                    src={parent.parentSignature}
                                    onError={(e) => {
                                      e.target.src = BlockImg;
                                    }}
                                    className="img-fluid rounded"
                                    style={{ width: "60%" }}
                                    alt="Parent Signature Img"
                                  />
                                ) : (
                                  <img
                                    src={BlockImg}
                                    className="img-fluid rounded"
                                    style={{ width: "60%" }}
                                    alt="Parent Signature Img"
                                  />
                                )}
                              </p>
                            </div>
                          ))}
                        {(!data.studentCourseDetailModels ||
                          data.studentCourseDetailModels.length === 0) && (
                          <div
                            id="panelsStayOpen-collapseThree"
                            class="accordion-collapse collapse"
                          >
                            <div class="accordion-body">
                              <div className="text-muted">
                                Parent Signature / not available !
                              </div>
                            </div>
                          </div>
                        )}
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
