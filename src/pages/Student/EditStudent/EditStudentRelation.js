import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllStudentListByCenter from "../../List/StudentListByCenter";

const validationSchema = Yup.object().shape({});

const EditStudentRelation = forwardRef(
  ({ formData, setFormData, setLoadIndicators, handleNext }, ref) => {
    const [centerData, setCenterData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const userName = localStorage.getItem("userName");

    console.log("Formdata ID:", formData.id);
    const fetchData = async () => {
      try {
        const centerData = await fetchAllCentersWithIds();
        setCenterData(centerData);
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchStudent = async (centerId) => {
      try {
        const student = await fetchAllStudentListByCenter(centerId);
        setStudentData(student);
      } catch (error) {
        toast.error(error);
      }
    };

    const handleCenterChange = (event) => {
      const newStudentRelationCenter = event.target.value;
      setStudentData([]);
      formik.setFieldValue("studentRelationCenter", newStudentRelationCenter);
      fetchStudent(newStudentRelationCenter);
    };

    const formik = useFormik({
      initialValues: {
        studentRelationCenter: formData.studentRelationCenter || "",
        studentRelation: formData.studentRelation || "",
        studentRelationStudentName: formData.studentRelationStudentName || "",
        studentId: formData.id || "",
        updatedBy: userName,
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          if (data.stdRealtionId !== null) {
            const response = await api.put(
              `/updateStudentRelation/${data.stdRealtionId}`,
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
            const payload = {
              studentRelationCenter: data.studentRelationCenter,
              studentRelation: data.studentRelation,
              studentRelationStudentName: data.studentRelationStudentName,
              studentId: formData.id || "",
            };
            const response = await api.post(
              `/createStudentRelations`,
              payload,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 201) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...data }));
              handleNext();
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`/getAllStudentById/${formData.id}`);
          // console.log(response.data.studentRelationModels)
          if (
            response.data.studentRelationModels &&
            response.data.studentRelationModels.length > 0
          ) {
            const data = response.data.studentRelationModels[0];
            formik.setValues({
              ...data,
              stdRealtionId: data.id,
            });
            if (data.studentRelationCenter) {
              fetchStudent(data.studentRelationCenter);
            }
          } else {
            // If there are no emergency contacts, set default values or handle the case as needed
            formik.setValues({
              stdRealtionId: null,
              studentRelationCenter: "",
              studentRelation: "",
              studentRelationStudentName: "",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.id]);

    useImperativeHandle(ref, () => ({
      Studentrelation: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <div className="border-0 mb-5">
            <div className="mb-5">
              <div className="border-0 my-2 px-2">
                <p class="headColor">Student Relation</p>
                <div className="container py-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-start">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Centre</small>
                        </label>
                        <br />
                        <select
                          {...formik.getFieldProps("studentRelationCenter")}
                          name="studentRelationCenter"
                          className={`form-select ${
                            formik.touched.studentRelationCenter &&
                            formik.errors.studentRelationCenter
                              ? "is-invalid"
                              : ""
                          }`}
                          onBlur={formik.handleBlur}
                          onChange={handleCenterChange}
                        >
                          <option selected></option>
                          {centerData &&
                            centerData.map((studentRelationCenter) => (
                              <option
                                key={studentRelationCenter.id}
                                value={studentRelationCenter.id}
                              >
                                {studentRelationCenter.centerNames}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Relation</small>
                        </label>
                        <br />
                        <select
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.studentRelation}
                          className="form-select "
                          name="studentRelation"
                        >
                          <option value=""></option>
                          <option value="Mother">Mother</option>
                          <option value="Father">Father</option>
                          <option value="Brother">Brother</option>
                          <option value="Sister">Sister</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-start">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Student Name</small>
                          {/* <span className="text-danger">*</span> */}
                        </label>
                        <br />
                        <select
                          {...formik.getFieldProps(
                            "studentRelationStudentName"
                          )}
                          className={`form-select ${
                            formik.touched.studentRelationStudentName &&
                            formik.errors.studentRelationStudentName
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option selected></option>
                          {/* {studentData &&
                            studentData.map((student) => (
                              <option
                                key={student.id}
                                value={student.studentNames}
                              >
                                {student.studentNames}
                              </option>
                            ))} */}
                          {studentData &&
                            studentData
                              .filter(
                                (student) => student.id !== formData.student_id
                              ) // Filter students with matching id
                              .map((student) => (
                                <option key={student.id} value={student.id}>
                                  {student.studentNames}{" "}
                                  {/* Display the student name */}
                                </option>
                              ))}
                        </select>
                        {formik.touched.studentRelationStudentName &&
                          formik.errors.studentRelationStudentName && (
                            <div className="text-danger">
                              <small>
                                {formik.errors.studentRelationStudentName}
                              </small>
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
export default EditStudentRelation;
