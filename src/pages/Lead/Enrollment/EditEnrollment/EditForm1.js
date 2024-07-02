import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../../config/URL";
import { toast } from "react-toastify";
import fetchAllSubjectsWithIds from "../../../List/SubjectList";

const validationSchema = Yup.object().shape({
  studentName: Yup.string().required("*Name is required"),
  subject: Yup.string().required("*Subject is required"), // Adding validation for subject field
  gender: Yup.string().required("*Gender is required"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  medicalCondition: Yup.string().required("*Medical Condition is required"),
  ethnicGroup: Yup.string().required("*Ethnic group is required"),
  schoolType: Yup.string().required("*School type is required"),
  nameOfSchool: Yup.string().required("*School Name is required"),
  nameOfChildrenInTotal: Yup.number()
    .typeError("*Enter a valid number")
    .required("*Name of Children is required"),
  // fathersFullName: Yup.string().required("*Father Name is required"),
  leadStatus: Yup.string().required("*Status is required"),
});

const EditForm1 = forwardRef(({ formData, setFormData, handleNext }, ref) => {
  const [subjectData, setSubjectData] = useState(null);

  const formik = useFormik({
    initialValues: {
      studentName: "",
      subject: "",
      gender: "",
      dateOfBirth: "",
      medicalCondition: "",
      ethnicGroup: "",
      schoolType: "",
      nameOfSchool: "",
      nameOfChildrenInTotal: "",
      fathersFullName: "",
      leadStatus: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      try {
        const response = await api.put(`/updateLeadInfo/${formData.id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...data }));
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
    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
      const dateOfBirth =
        response.data.dateOfBirth && response.data.dateOfBirth.substring(0, 10);
      formik.setValues({
        ...response.data,
        dateOfBirth: dateOfBirth,
      });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    editForm1: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container py-4">
        <h5 className="headColor mb-5">Student Information</h5>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name Of Child<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control "
                name="studentName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.studentName}
              />
              {formik.touched.studentName && formik.errors.studentName && (
                <div className="error text-danger ">
                  <small>{formik.errors.studentName}</small>
                </div>
              )}
            </div>
          </div>
          <div class="col-md-6 col-12 mb-2">
            <label className="form-label">Subject</label>
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
          <div className="col-md-6 col-12 ">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  Gender<span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  value="Male"
                  name="gender"
                  type="radio"
                  checked={formik.values.gender === "Male"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input mx-2"
                  value="Female"
                  name="gender"
                  type="radio"
                  checked={formik.values.gender === "Female"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Female
                </label>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="error text-danger ">
                  <small>{formik.errors.gender}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Child’s Date of Birth<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                <div className="error text-danger ">
                  <small>{formik.errors.dateOfBirth}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-12">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  Allergy / Medical Condition (For Instance: Asthma)
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="">
                <textarea
                  type="text"
                  name="medicalCondition"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.medicalCondition}
                />
                {formik.touched.medicalCondition &&
                  formik.errors.medicalCondition && (
                    <div className="error text-danger ">
                      <small>{formik.errors.medicalCondition}</small>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12 ">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInpu  t1" className="form-label">
                  Ethnic Group<span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ethnicGroup"
                  value="CHINESE"
                  checked={formik.values.ethnicGroup === "CHINESE"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Chinese
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ethnicGroup"
                  value="MALAY"
                  checked={formik.values.ethnicGroup === "MALAY"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Malay
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ethnicGroup"
                  value="INDIA"
                  checked={formik.values.ethnicGroup === "INDIA"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Indian
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ethnicGroup"
                  value="EURASIAN"
                  checked={formik.values.ethnicGroup === "EURASIAN"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Eurasian
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="ethnicGroup"
                  value="OTHERS"
                  checked={formik.values.ethnicGroup === "OTHERS"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Others
                </label>
              </div>
              {formik.touched.ethnicGroup && formik.errors.ethnicGroup && (
                <div className="error text-danger ">
                  <small>{formik.errors.ethnicGroup}</small>
                </div>
              )}
            </div>
          </div>
          <div class="col-md-6 col-12 mb-4">
            <label>
              Status<span class="text-danger">*</span>
            </label>
            <select
              className={`form-select  ${
                formik.touched.leadStatus && formik.errors.leadStatus
                  ? "is-invalid"
                  : ""
              }`}
              name="leadStatus"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.leadStatus}
            >
              <option></option>
              <option value="Pending">Pending</option>
              <option value="Arranging assessment">Arranging assessment</option>
              <option value="Assessment confirmed">Assessment confirmed</option>
              <option value="Waiting for payment">Waiting for payment</option>
              <option value="Rejected">Rejected</option>
              <option value="KIV">KIV</option>
            </select>
            {formik.touched.leadStatus && formik.errors.leadStatus && (
              <div className="invalid-feedback">{formik.errors.leadStatus}</div>
            )}
          </div>
          <div className="col-md-6 col-12">
            <div className="mb-3">
              <div>
                <label for="exampleFormControlInput1" className="form-label">
                  School Type<span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="schoolType"
                  value="CHILDCARE"
                  checked={formik.values.schoolType === "CHILDCARE"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio1">
                  Childcare
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="schoolType"
                  value="KINDERGARTEN"
                  checked={formik.values.schoolType === "KINDERGARTEN"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Kindergarten
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="schoolType"
                  value="OTHERS"
                  checked={formik.values.schoolType === "OTHERS"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" for="inlineRadio2">
                  Others
                </label>
              </div>
              {formik.touched.schoolType && formik.errors.schoolType && (
                <div className="error text-danger ">
                  <small>{formik.errors.schoolType}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 ">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name Of School<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="nameOfSchool"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nameOfSchool}
              />
              {formik.touched.nameOfSchool && formik.errors.nameOfSchool && (
                <div className="error text-danger ">
                  <small>{formik.errors.nameOfSchool}</small>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6 col-12 ">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name Of Children In Total
                <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="nameOfChildrenInTotal"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nameOfChildrenInTotal}
              />
              {formik.touched.nameOfChildrenInTotal &&
                formik.errors.nameOfChildrenInTotal && (
                  <div className="error text-danger ">
                    <small>{formik.errors.nameOfChildrenInTotal}</small>
                  </div>
                )}
            </div>
          </div>
          {/* <div className="col-md-6 col-12 ">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Father's Full Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="fathersFullName"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fathersFullName}
              />
              {formik.touched.fathersFullName &&
                formik.errors.fathersFullName && (
                  <div className="error text-danger ">
                    <small>{formik.errors.fathersFullName}</small>
                  </div>
                )}
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
});

export default EditForm1;
