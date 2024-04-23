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
import fetchAllSubjectsWithIds from "../../List/SubjectList";

const validationSchema = Yup.object().shape({
  studentName: Yup.string().required("*Student Name is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  subject: Yup.string().required("*Subject is required"),
  gender: Yup.string().required("*Gender is required"),
});

const LeadStudentEdit = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const [subjectData, setSubjectData] = useState(null);
    const formik = useFormik({
      initialValues: {
        studentName: formData.studentName || "",
        dateOfBirth: formData.dateOfBirth || "",
        gender: formData.gender || "",
        subject: formData.subject || "",
      },

      validationSchema: validationSchema,
      onSubmit: async (data) => {
        // console.log("form parent",formData );
        try {
          const response = await api.put(
            `/updateLeadInfo/${formData.id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 200) {
            // const lead_id = response.data.lead_id;
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            // console.log("Form data is ",formData)
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      },
    });

    const fetchData = async () => {
      try {
        const subjectData = await fetchAllSubjectsWithIds();
        setSubjectData(subjectData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
          const dateOfBirth = response.data.dateOfBirth.substring(0, 10);
          formik.setValues({
            ...response.data,
            dateOfBirth: dateOfBirth,
          });
        } catch (error) {
          toast.error("Error Fetch Data ", error);
        }
      };
      getData();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      studentInfo: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="container-fluid">
            <div class="row px-1">
              <div className="py-3">
                <p className="headColor">Student Information</p>
              </div>
              <div class="col-md-6 col-12 mb-3">
                <label>Student Name</label>
                <span className="text-danger">*</span>
                <input
                  type="text"
                  name="studentName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.studentName}
                />
                {formik.touched.studentName && formik.errors.studentName && (
                  <div className="text-danger ">
                    <small>{formik.errors.studentName}</small>
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2">
                <label>Date of Birth</label>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBirth}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <div className="text-danger ">
                    <small>{formik.errors.dateOfBirth}</small>
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12 mb-2">
                <label className="mb-3">Gender</label>
                <span className="text-danger">*</span>
                <div className="d-flex align-items-center justify-content-start">
                  <input
                    className="form-check-input mx-2"
                    value="Male"
                    name="gender"
                    type="radio"
                    checked={formik.values.gender === "Male"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="my-0 me-1">Male</p>
                  <input
                    className="form-check-input mx-2"
                    value="Female"
                    name="gender"
                    type="radio"
                    checked={formik.values.gender === "Female"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="my-0 me-1">Female</p>
                </div>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-danger">
                    {" "}
                    <small>{formik.errors.gender}</small>
                  </div>
                ) : null}
              </div>

              <div class="col-md-6 col-12 mb-2">
                <label>Subject</label>
                <span className="text-danger">*</span>
                <select
                  className="form-select"
                  name="subject"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subject}
                >
                  <option selected></option>
                  {subjectData &&
                    subjectData.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.subjects}
                      </option>
                    ))}
                </select>
                {formik.touched.subject && formik.errors.subject && (
                  <div className="text-danger">
                    <small>{formik.errors.subject}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default LeadStudentEdit;
