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
    const [centerData, setCenterData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const userName = localStorage.getItem("userName");

    useEffect(() => {
      // Fetch center data when component mounts
      const fetchCenterData = async () => {
        try {
          const data = await fetchAllCentersWithIds();
          setCenterData(data);
        } catch (error) {
          toast.error(error.message || "Failed to load centers.");
        }
      };
      fetchCenterData();
    }, []);

    const fetchStudent = async (centerId) => {
      try {
        const students = await fetchAllStudentListByCenter(centerId);
        setStudentData(students);
      } catch (error) {
        toast.error(error.message || "Failed to load students.");
      }
    };

    const handleCenterChange = (event) => {
      const selectedCenterId = event.target.value;
      setStudentData([]);
      formik.setFieldValue("studentRelationCenter", selectedCenterId);
      fetchStudent(selectedCenterId);
    };

    const formik = useFormik({
      initialValues: {
        studentRelationCenter: formData.studentRelationCenter || "",
        centerId: formData.centerId || "",
        studentRelation: formData.studentRelation || "",
        StudentRelationStudentName: formData.StudentRelationStudentName || "",
        studentId: formData.id || "",
        updatedBy: userName,
      },
      validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          if (data.stdRelationId) {
            const response = await api.put(
              `/updateStudentRelation/${data.stdRelationId}`,
              data,
              { headers: { "Content-Type": "application/json" } }
            );
            toast[response.status === 200 ? "success" : "error"](
              response.data.message
            );
            handleNext();
          } else {
            const payload = {
              studentRelationCenter: data.studentRelationCenter,
              studentRelation: data.studentRelation,
              StudentRelationStudentName: data.StudentRelationStudentName,
              studentId: formData.id,
            };
            const response = await api.post(
              `/createStudentRelations`,
              payload,
              { headers: { "Content-Type": "application/json" } }
            );
            toast[response.status === 201 ? "success" : "error"](
              response.data.message
            );
            setFormData((prev) => ({ ...prev, ...data }));
            handleNext();
          }
        } catch (error) {
          toast.error(error.message || "Failed to save data.");
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useEffect(() => {
      const fetchStudentData = async () => {
        try {
          const response = await api.get(`/getAllStudentById/${formData.id}`);
          if (response.data.studentRelationModels?.length) {
            const studentInfo = response.data.studentRelationModels[0];
            formik.setValues({
              centerId: studentInfo.studentRelationCenter,
              StudentRelationStudentName:
                studentInfo.studentRelationStudentName,
              studentRelation: studentInfo.studentRelation,
              stdRelationId: studentInfo.id,
            });
            if (studentInfo.studentRelationCenter) {
              fetchStudent(studentInfo.studentRelationCenter);
            }
          } else {
            formik.resetForm();
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };
      fetchStudentData();
    }, [formData.id]);

    useImperativeHandle(ref, () => ({
      Studentrelation: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) e.preventDefault();
          }}
        >
          <div className="border-0 mb-5">
            <div className="mb-5">
              <div className="border-0 my-2 px-2">
                <p className="headColor">Student Relation</p>
                <div className="container py-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-start">
                        <label
                          htmlFor="studentRelationCenter"
                          className="mb-1 fw-medium"
                        >
                          <small>Centre</small>
                        </label>
                        <select
                          {...formik.getFieldProps("studentRelationCenter")}
                          className={`form-select ${
                            formik.touched.studentRelationCenter &&
                            formik.errors.studentRelationCenter
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={handleCenterChange}
                        >
                          <option value=""></option>
                          {centerData.map((center) => (
                            <option key={center.id} value={center.id}>
                              {center.centerNames}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-start mt-2">
                        <label
                          htmlFor="studentRelation"
                          className="mb-1 fw-medium"
                        >
                          <small>Relation</small>
                        </label>
                        <select
                          {...formik.getFieldProps("studentRelation")}
                          className="form-select"
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
                        <label
                          htmlFor="StudentRelationStudentName"
                          className="mb-1 fw-medium"
                        >
                          <small>Student Name</small>
                        </label>
                        <select
                          {...formik.getFieldProps(
                            "StudentRelationStudentName"
                          )}
                          className={`form-select ${
                            formik.touched.StudentRelationStudentName &&
                            formik.errors.StudentRelationStudentName
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="" disabled></option>
                          {studentData
                            .filter((student) => student.id !== formData.id)
                            .map((student) => (
                              <option key={student.id} value={student.id}>
                                {student.studentNames}
                              </option>
                            ))}
                        </select>
                        {formik.touched.StudentRelationStudentName &&
                          formik.errors.StudentRelationStudentName && (
                            <div className="text-danger">
                              <small>
                                {formik.errors.StudentRelationStudentName}
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
