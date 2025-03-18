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
import fetchAllRaceWithIds from "../../../List/RaceList";
import fetchAllCentersWithIds from "../../../List/CenterList";

const validationSchema = Yup.object().shape({
  studentName: Yup.string().required("*Name is required"),
  subjectId: Yup.string().required("*Subject is required"), // Adding validation for subjectId field
  gender: Yup.string().required("*Gender is required"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      "*Date of Birth must be at least 1 year ago"
    ),
  // medicalCondition: Yup.string().required("*Medical Condition is required"),
  // ethnicGroup: Yup.string().required("*Ethnic group is required"),
  schoolType: Yup.string().required("*School type is required"),
  // nameOfSchool: Yup.string().required("*School Name is required"),
  centerId: Yup.string().required("*Centre is required"),
});

const EditForm1 = forwardRef(
  (
    { formData, setFormData, handleNext, setLoadIndicators, selectedCenter },
    ref
  ) => {
    const [subjectData, setSubjectData] = useState(null);
    const [raceData, setRaceData] = useState(null);
    const [centerData, setCenterData] = useState(null);
    const userName = localStorage.getItem("userName");

    const formik = useFormik({
      initialValues: {
        studentName: "",
        subjectId: "",
        gender: "",
        dateOfBirth: "",
        medicalCondition: "",
        ethnicGroup: "",
        schoolType: "",
        nameOfSchool: "",
        centerId: "",
        // nameOfChildrenInTotal: "",
        fathersFullName: "",
        // leadStatus: "",
        referBy: "",
        updatedBy: userName,
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        data.updatedBy = userName;
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
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
      validateOnChange: false, // Enable validation on change
      validateOnBlur: true, // Enable validation on blur
    });

    // Function to scroll to the first error field
    const scrollToError = (errors) => {
      const errorField = Object.keys(errors)[0]; // Get the first error field
      const errorElement = document.querySelector(`[name="${errorField}"]`); // Find the DOM element
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus(); // Set focus to the error element
      }
    };

    // Watch for form submit and validation errors
    useEffect(() => {
      if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
        scrollToError(formik.errors);
      }
    }, [formik.submitCount, formik.errors]);

    const fetchData = async () => {
      try {
        const subjectData = await fetchAllSubjectsWithIds();
        const raceData = await fetchAllRaceWithIds();
        setRaceData(raceData);
        setSubjectData(subjectData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const fetchCenterData = async () => {
      try {
        const response = await fetchAllCentersWithIds();
        if (Array.isArray(response)) {
          setCenterData(response);
        } else {
          console.error("Invalid data format:", response);
          setCenterData([]);
        }
      } catch (error) {
        toast.error("Failed to fetch center data");
        console.error(error);
      }
    };

    useEffect(() => {
      const getData = async () => {
        const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
        const dateOfBirth =
          response.data.dateOfBirth &&
          response.data.dateOfBirth.substring(0, 10);
        formik.setValues({
          ...response.data,
          dateOfBirth: dateOfBirth,
        });
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      fetchCenterData();
      if (selectedCenter === 0) {
        formik.setFieldValue("centerId", "");
      } else {
        formik.setFieldValue("centerId", selectedCenter); // Set to empty string when selectedCenter is 0
      }
    }, [selectedCenter]);

    useImperativeHandle(ref, () => ({
      editForm1: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-4">
          <h5 className="headColor mb-5">Student Information</h5>
          <div className="row">
            <div className="col-md-6 col-12 d-none">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Centre
                </label>
                <select
                  className="form-select"
                  name="centerId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.centerId}
                  disabled
                >
                  <option value={""}></option>
                  {centerData &&
                    centerData.map((centerId) => (
                      <option key={centerId.id} value={centerId.id}>
                        {centerId.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="error text-danger">
                    <small>{formik.errors.centerId}</small>
                  </div>
                )}
              </div>
            </div>
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
            <div className="col-md-6 col-12 mb-2">
              <label className="form-label">Subject</label>
              <span className="text-danger">*</span>
              <select
                className="form-select"
                name="subjectId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subjectId}
              >
                <option selected></option>
                {/* <option value="ENGLISH">English</option>
              <option value="CHINESE" >Chinese</option> */}
                {subjectData &&
                  subjectData.map((subjectId) => (
                    <option key={subjectId.id} value={subjectId.id}>
                      {subjectId.subjects}
                    </option>
                  ))}
              </select>
              {formik.touched.subjectId && formik.errors.subjectId && (
                <div className="text-danger">
                  <small>{formik.errors.subjectId}</small>
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
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Allergy / Medical Condition (For Instance: Asthma)
                  </label>
                </div>
                <div className="">
                  <input
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
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Refer By
                  </label>
                </div>
                <div className="">
                  <input
                    type="text"
                    name="referBy"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.referBy}
                  />
                  {formik.touched.referBy && formik.errors.referBy && (
                    <div className="error text-danger ">
                      <small>{formik.errors.referBy}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 ">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInpu t1" className="form-label">
                    Ethnic Group
                  </label>
                </div>
                <select
                  name="ethnicGroup"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ethnicGroup}
                  className="form-select"
                >
                  <option selected></option>
                  {raceData &&
                    raceData.map((raceId) => (
                      <option key={raceId.id} value={raceId.race}>
                        {raceId.race}
                      </option>
                    ))}
                </select>
                {formik.touched.ethnicGroup && formik.errors.ethnicGroup && (
                  <div className="error text-danger ">
                    <small>{formik.errors.ethnicGroup}</small>
                  </div>
                )}
              </div>
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
                  Name Of School
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
          </div>
        </div>
      </form>
    );
  }
);

export default EditForm1;
