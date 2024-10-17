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
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllRaceWithIds from "../../List/RaceList";
import fetchAllNationalityeWithIds from "../../List/NationalityAndCountryList";
import fetchAllStudentsWithIds from "../../List/StudentList";

const validationSchema = Yup.object().shape({
  centerId: Yup.string().required("*Centre is required"),
  studentName: Yup.string().required("*Student Name is required"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  age: Yup.string().required("*Age is required"),
  gender: Yup.string().required("*Gender is required"),
  schoolType: Yup.string().required("*School Type is required"),
  schoolName: Yup.string().required("*School Name is required"),
  allowMagazine: Yup.string().required("*Select a filed"),
  allowSocialMedia: Yup.string().required("*Select a filed"),
  studentChineseName: Yup.string().required(
    "*Student Chinese Name is required"
  ),
  // profileImage: Yup.string().required("*Select a Profile Image!"),
  // preAssessmentResult: Yup.string().required(
  //   "*Pre-Assessment Result is required!"
  // ),
  remark: Yup.string()
    .max(200, "*The maximum length is 200 characters").notRequired(),
  medicalCondition: Yup.string().required(
    "*Medical Condition Result is required"
  ),
  // nationality: Yup.string().required("*Select a Nationality!"),
  primaryLanguage: Yup.string().required("*Primary Language is required"),
  race: Yup.string().required("*Select a Race"),
  // referByStudent: Yup.string().required("*Refer By Student is required!"),
  // referByParent: Yup.string().required("*Refer By Parent is required!"),
});

const EditStudentDetails = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [centerData, setCenterData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [raceData, setRaceData] = useState(null);
    const [nationalityData, setNationalityData] = useState(null);
    const userName = localStorage.getItem('userName');


    const fetchData = async () => {
      try {
        const centerData = await fetchAllCentersWithIds();
        setCenterData(centerData);

        const studentData = await fetchAllStudentsWithIds();
        setStudentData(studentData);

        const raceData = await fetchAllRaceWithIds();
        setRaceData(raceData);

        const nationality = await fetchAllNationalityeWithIds();
        setNationalityData(nationality);
      } catch (error) {
        toast.error(error);
      }
    };

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      return `${years} years, ${months} months`;
    };

    const formik = useFormik({
      initialValues: {
        centerId: formData.centerId || "",
        studentName: formData.studentName || "",
        studentChineseName: formData.studentChineseName || "",
        profileImage: null || "",
        age: formData.age || "",
        medicalCondition: formData.medicalCondition || "",
        dateOfBirth: formData.dateOfBirth || "",
        gender: formData.gender || "",
        schoolType: formData.schoolType || "",
        schoolName: formData.schoolName || "",
        preAssessmentResult: formData.preAssessmentResult || "",
        race: formData.race || "",
        nationality: formData.nationality || "",
        primaryLanguage: true,
        referByParent: formData.referByParent || "",
        referByStudent: formData.referByStudent || "",
        remark: formData.remark || "",
        allowMagazine: false || "",
        allowSocialMedia: false || "",
        updatedBy: userName,

      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        setFormData((prv) => ({ ...prv, ...data }));
        let selectedCenter = "";

        centerData.forEach((center) => {
          if (parseInt(data.centerId) === center.id) {
            selectedCenter = center.centerNames || "--";
          }
        });

        data.center = selectedCenter;
        try {
          const allowMagazine = data.allowMagazine === "Yes" ? true : false;
          const allowSocialMedia =
            data.allowSocialMedia === "Yes" ? true : false;
          const updatedData = {
            ...data,
            allowMagazine: allowMagazine,
            allowSocialMedia: allowSocialMedia,
          };
          // const formData = new FormData();
          // formData.append("profileImage", data.profileImage);

          const response = await api.put(
            `/updateStudentDetail/${formData.id}`,
            updatedData,
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
      validateOnBlur: true,   // Enable validation on blur
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`/getAllStudentById/${formData.id}`);
          const { allowMagazine, allowSocialMedia, ...otherData } =
            response.data;
          const updatedValues = {
            ...otherData,
            allowMagazine: allowMagazine ? "Yes" : "No",
            allowSocialMedia: allowSocialMedia ? "Yes" : "No",
          };
          formik.setValues(updatedValues);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getData();
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (formik.values.dateOfBirth) {
        formik.setFieldValue("age", calculateAge(formik.values.dateOfBirth));
      }
    }, [formik.values.dateOfBirth]);

    useImperativeHandle(ref, () => ({
      Editstudentdetails: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <div className=" border-0 mb-5">
            <div className="mb-3">
              <p class="headColor">Student Details</p>
              <div className="container">
                <div className="row mt-3">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="text-start mt-2">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Centre</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <select
                        name="centerId"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.centerId}
                        className="form-select"
                      >
                        <option selected></option>
                        {centerData &&
                          centerData.map((centerId) => (
                            <option key={centerId.id} value={centerId.id}>
                              {centerId.centerNames}
                            </option>
                          ))}
                      </select>
                      {formik.touched.centerId && formik.errors.centerId && (
                        <div className="text-danger">
                          <small>{formik.errors.centerId}</small>
                        </div>
                      )}
                    </div>
                    <div className="text-start mt-4">
                      <label className=" fw-medium">
                        <small>
                          Student Chinese Name (put N/A if not applicable)
                          <span className="text-danger">*</span>
                        </small>
                        &nbsp;
                      </label>
                      <br />
                      <input
                        className="form-control "
                        type="text"
                        name="studentChineseName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentChineseName}
                      />
                      {formik.touched.studentChineseName &&
                        formik.errors.studentChineseName && (
                          <div className="text-danger">
                            <small>{formik.errors.studentChineseName}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Date Of Birth</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        className="form-control  form-contorl-sm"
                        name="dateOfBirth"
                        type="date"
                        // onFocus={(e) => e.target.showPicker()}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.dateOfBirth}
                      />
                      {formik.touched.dateOfBirth &&
                        formik.errors.dateOfBirth && (
                          <div className="error text-danger ">
                            <small>{formik.errors.dateOfBirth}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Gender</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <div className="mt-1">
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formik.values.gender === "Male"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span style={{ color: "gray" }}>Male</span> &nbsp;&nbsp;
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formik.values.gender === "Female"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span style={{ color: "gray" }}>Female</span>
                      </div>
                      {formik.touched.gender && formik.errors.gender && (
                        <div className="error text-danger">
                          <small>{formik.errors.gender}</small>
                        </div>
                      )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className="fw-medium">
                        <small>School Type</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <div className="mt-1">
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="schoolType"
                          value="CHILDCARE"
                          checked={formik.values.schoolType === "CHILDCARE"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span style={{ color: "gray" }}>Childcare</span>{" "}
                        &nbsp;&nbsp;
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="schoolType"
                          value="KINDERGARTEN"
                          checked={formik.values.schoolType === "KINDERGARTEN"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span style={{ color: "gray" }}>Kindergarten</span>{" "}
                        &nbsp;&nbsp;
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="schoolType"
                          value="OTHERS"
                          checked={formik.values.schoolType === "OTHERS"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span style={{ color: "gray" }}>Others</span>
                      </div>
                      {formik.touched.schoolType &&
                        formik.errors.schoolType && (
                          <div className="error text-danger">
                            <small>{formik.errors.schoolType}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Pre-Assessment Result</small>
                        {/* <span className="text-danger">*</span> */}
                      </label>
                      <br />
                      <input
                        className="form-control "
                        type="text"
                        name="preAssessmentResult"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.preAssessmentResult}
                      />
                      {formik.touched.preAssessmentResult &&
                        formik.errors.preAssessmentResult && (
                          <div className="error text-danger ">
                            <small>{formik.errors.preAssessmentResult}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Nationality</small>
                        {/* <span className="text-danger">*</span> */}
                      </label>
                      <br />
                      <select
                        name="nationality"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.nationality}
                        className="form-select"
                      >
                        <option selected></option>
                        {nationalityData &&
                          nationalityData.map((nationalityId) => (
                            <option
                              key={nationalityId.id}
                              value={nationalityId.nationality}
                            >
                              {nationalityId.nationality}
                            </option>
                          ))}
                      </select>
                      {formik.touched.nationality &&
                        formik.errors.nationality && (
                          <div className="error text-danger">
                            <small>{formik.errors.nationality}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Refered By Parents</small>
                        {/* <span className="text-danger">*</span> */}
                      </label>
                      <br />
                      <input
                        name="referByParent"
                        className="form-control"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.referByParent}
                      />
                      {formik.touched.referByParent &&
                        formik.errors.referByParent && (
                          <div className="error text-danger ">
                            <small>{formik.errors.referByParent}</small>
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-12 px-5">
                    <div className="text-start mt-2">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>Student Name / as per ID</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        name="studentName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.studentName}
                        className="form-control "
                        type="text"
                      />
                      {formik.touched.studentName &&
                        formik.errors.studentName && (
                          <div className="text-danger">
                            <small>{formik.errors.studentName}</small>
                          </div>
                        )}
                    </div>
                    {/* <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Profile Image</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        type="file"
                        name="profileImage"
                        className="form-control"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "profileImage",
                            event.target.files[0]
                          );
                        }}
                        onBlur={formik.handleBlur}
                      />
                    </div> */}

                    <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Medical Condition</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        className="form-control "
                        type="text"
                        name="medicalCondition"
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
                    <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Age</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        className="form-control "
                        type="text"
                        name="age"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.age}
                        readOnly
                      />
                      {formik.touched.age && formik.errors.age && (
                        <div className="text-danger">
                          <small>{formik.errors.age}</small>
                        </div>
                      )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className="mb-1 fw-medium">
                        <small>School Name</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        name="schoolName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.schoolName}
                        className="form-control "
                        type="text"
                      />
                      {formik.touched.schoolName &&
                        formik.errors.schoolName && (
                          <div className="text-danger">
                            <small>{formik.errors.schoolName}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-3">
                      <label className="mb-1 fw-medium">
                        <small>Race</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <select
                        name="race"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.race}
                        className="form-select"
                      >
                        {raceData &&
                          raceData.map((raceId) => (
                            <option key={raceId.id} value={raceId.race}>
                              {raceId.race}
                            </option>
                          ))}
                      </select>
                      {formik.touched.race && formik.errors.race && (
                        <div className="error text-danger ">
                          <small>{formik.errors.race}</small>
                        </div>
                      )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Primary Language Spoken</small>
                        <span className="text-danger">*</span>
                      </label>
                      <br />
                      <select
                        name="primaryLanguage"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.primaryLanguage}
                        className="form-select"
                      >
                        <option selected></option>
                        <option value="CHINESE">Chinese</option>
                        <option value="ENGLISH">English</option>
                      </select>
                      {formik.touched.primaryLanguage &&
                        formik.errors.primaryLanguage && (
                          <div className="error text-danger ">
                            <small>{formik.errors.primaryLanguage}</small>
                          </div>
                        )}
                    </div>
                    <div className="text-start mt-4">
                      <label htmlFor="" className=" fw-medium">
                        <small>Refer By Student</small>
                        {/* <span className="text-danger">*</span> */}
                      </label>
                      <br />
                      {/* <input
                        className="form-control "
                        type="text"
                        name="referByStudent"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.referByStudent}
                      /> */}
                      <select
                        name="referByStudent"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.referByStudent}
                        className="form-select"
                      >
                        <option selected></option>
                        {studentData &&
                          studentData.map((student) => (
                            <option key={student.id} value={student.id}>
                              {student.studentNames}
                            </option>
                          ))}
                      </select>
                      {formik.touched.referByStudent &&
                        formik.errors.referByStudent && (
                          <div className="error text-danger ">
                            <small>{formik.errors.referByStudent}</small>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="text-start mt-4">
                  <label htmlFor="" className="mb-1 fw-medium">
                    <small>Remark</small>
                  </label>
                  <br />
                  <textarea
                    name="remark"
                    className="form-control "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remark}
                    type="text"
                    style={{
                      height: "7rem",
                    }}
                    maxLength={200}

                  />
                </div>

                <div className="mb-5">
                  <div className="row mt-5">
                    <h6 className="text-start" style={{ color: "#ff7500" }}>
                      Videography/Photography
                    </h6>
                    <div className="col-lg-6 col-sm-12 mt-3 ps-4">
                      <label>
                        <small>
                          <b>
                            Allow display in Facility Bulletin / Magazine /
                            Advert
                          </b>
                        </small>
                        <span className="text-danger">*</span>
                        <div className="text-start mt-2">
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="allowMagazine"
                            value="yes"
                            checked={formik.values.allowMagazine === "yes"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          &nbsp; Yes &nbsp;&nbsp;&nbsp;
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="allowMagazine"
                            value="No"
                            checked={formik.values.allowMagazine === "No"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          &nbsp; No
                          {formik.touched.allowMagazine &&
                            formik.errors.allowMagazine && (
                              <div className="error text-danger">
                                <small>{formik.errors.allowMagazine}</small>
                              </div>
                            )}
                        </div>
                      </label>
                    </div>
                    <div className="col-lg-6 col-sm-12 mt-3">
                      <label>
                        <small>
                          <b>Allow display on Social Media</b>
                        </small>
                        <span className="text-danger">*</span>
                        <div className="text-start mt-2">
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="allowSocialMedia"
                            value="yes"
                            checked={formik.values.allowSocialMedia === "yes"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          &nbsp; Yes &nbsp;&nbsp;&nbsp;
                          <input
                            className="form-check-input mx-2"
                            type="radio"
                            name="allowSocialMedia"
                            value="No"
                            checked={formik.values.allowSocialMedia === "No"}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          &nbsp; No
                          {formik.touched.allowSocialMedia &&
                            formik.errors.allowSocialMedia && (
                              <div className="error text-danger">
                                <small>{formik.errors.allowSocialMedia}</small>
                              </div>
                            )}
                        </div>
                      </label>
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
export default EditStudentDetails;
