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
import fetchAllIDTypeWithIds from "../../List/IDTypeList";
import fetchAllNationality from "../../List/NationalityAndCountryList";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  teacherName: Yup.string().required("*Teacher Name is required"),
  role: Yup.string().required("*Role is required"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  idTypeId: Yup.string().required("*Id Type is required"),
  idNo: Yup.string().required("*Id No is required"),
  nationality: Yup.string().required("*Nationality is required"),
  citizenship: Yup.string().required("*Citizenship is required"),
  email: Yup.string().email("*Invalid Email").required("*Email is required"),
  // shortIntroduction: Yup.string().required("*Short Introduction is required!"),
  gender: Yup.string().required("*Gender is required"),
  file: Yup.string().required("*Photo is required"),
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});
const PersonalAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [idTypeData, setIdTypeData] = useState(null);
    const [nationalityData, setNationalityData] = useState(null);
    const userName = localStorage.getItem("userName");

    const formik = useFormik({
      initialValues: {
        role: formData.role,
        teacherName: formData.teacherName,
        dateOfBirth: formData.dateOfBirth,
        idTypeId: formData.idTypeId,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        idNo: formData.idNo,
        citizenship: formData.citizenship,
        nationality: formData.nationality || "",
        nationalityId: formData.nationalityId || "",
        file: null || "",
        shortIntroduction: formData.shortIntroduction,
        gender: formData.gender,
        createdBy: userName,
      },
      // validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);

        try {
          const formData = new FormData();
          let nationalityName;
          if (values.nationalityId)
            nationalityName = nationalityData.find(
              (prv) => prv.id === parseInt(values.nationalityId)
            );
          // Add each data field manually to the FormData object
          formData.append("role", values.role);
          formData.append("teacherName", values.teacherName);
          formData.append("dateOfBirth", values.dateOfBirth);
          formData.append("idTypeId", values.idTypeId);
          formData.append("email", values.email);
          formData.append("password", values.password);
          formData.append("idNo", values.idNo);
          formData.append("age", 25);
          formData.append("citizenship", values.citizenship);
          formData.append("shortIntroduction", values.shortIntroduction);
          formData.append("gender", values.gender);
          formData.append("nationality", nationalityName.nationality);
          formData.append("nationalityId", values.nationalityId);
          formData.append("file", values.file);

          const response = await api.post(
            "/createUserWithProfileImage",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 201) {
            const user_id = response.data.user_id;
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values, user_id }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          if (error?.response?.status === 409) {
            toast.warning(error?.response?.data?.message);
          } else {
            toast.error(error?.response?.data?.message);
          }
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

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    const fetchIDTypeData = async () => {
      try {
        const idTypeData = await fetchAllIDTypeWithIds();
        setIdTypeData(idTypeData);
      } catch (error) {
        toast.error(error);
      }
    };

    const fetchCitizenShipData = async () => {
      try {
        const nationalityData = await fetchAllNationality();
        setNationalityData(nationalityData);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      fetchIDTypeData();
      fetchCitizenShipData();
    }, []);

    useImperativeHandle(ref, () => ({
      personalAdd: formik.handleSubmit,
    }));

    return (
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <section>
          <div className="container">
            <p className="headColor my-4">Personal Information</p>
            <div className="row">
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Teacher Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="teacherName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.teacherName}
                />
                {formik.touched.teacherName && formik.errors.teacherName && (
                  <div className="error text-danger ">
                    <small>{formik.errors.teacherName}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Date Of Birth<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  // onFocus={(e) => e.target.showPicker()}
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
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>ID Type</label>
                <span className="text-danger">*</span>
                <select
                  type="text"
                  className="form-select"
                  name="idTypeId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idTypeId}
                >
                  <option value=""></option>
                  {idTypeData &&
                    idTypeData.map((idTypeId) => (
                      <option key={idTypeId.id} value={idTypeId.id}>
                        {idTypeId.idType}
                      </option>
                    ))}
                </select>
                {formik.touched.idTypeId && formik.errors.idTypeId && (
                  <div className="error text-danger ">
                    <small>{formik.errors.idTypeId}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  ID No<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="idNo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idNo}
                />
                {formik.touched.idNo && formik.errors.idNo && (
                  <div className="error text-danger ">
                    <small>{formik.errors.idNo}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>Citizenship</label>
                <span className="text-danger">*</span>
                <select
                  className="form-select"
                  name="citizenship"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.citizenship}
                >
                  <option selected></option>
                  {nationalityData &&
                    nationalityData.map((citizenship) => (
                      <option
                        key={citizenship.id}
                        value={citizenship.citizenship}
                      >
                        {citizenship.citizenship}
                      </option>
                    ))}
                </select>
                {formik.touched.citizenship && formik.errors.citizenship && (
                  <div className="error text-danger">
                    <small>{formik.errors.citizenship}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>Nationality</label>
                <span className="text-danger">*</span>
                <select
                  className="form-select"
                  name="nationalityId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nationalityId}
                >
                  <option selected></option>
                  {nationalityData &&
                    nationalityData.map((nationalityId) => (
                      <option key={nationalityId.id} value={nationalityId.id}>
                        {nationalityId.nationality}
                      </option>
                    ))}
                </select>
                {formik.touched.nationalityId &&
                  formik.errors.nationalityId && (
                    <div className="error text-danger">
                      <small>{formik.errors.nationalityId}</small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>Photo</label>
                <span className="text-danger">*</span>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="error text-danger">
                    <small>{formik.errors.file}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Email ID<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error text-danger ">
                    <small>{formik.errors.email}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <div className="mb-3">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <div className={`input-group mb-3`}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className={`form-control ${
                        formik.touched.password && formik.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{
                        borderRadius: "3px",
                        borderRight: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                      name="password"
                      {...formik.getFieldProps("password")}
                    />
                    <span
                      className={`input-group-text iconInputBackground`}
                      id="basic-addon1"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer", borderRadius: "3px" }}
                    >
                      {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                    </span>
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <div className="mb-3">
                  <label>
                    Confirm Password<span className="text-danger">*</span>
                  </label>
                  <div className={`input-group mb-3`}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      className={`form-control ${
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                          ? "is-invalid"
                          : ""
                      }`}
                      style={{
                        borderRadius: "3px",
                        borderRight: "none",
                        borderTopRightRadius: "0px",
                        borderBottomRightRadius: "0px",
                      }}
                      name="confirmPassword"
                      {...formik.getFieldProps("confirmPassword")}
                    />
                    <span
                      className={`input-group-text iconInputBackground`}
                      id="basic-addon1"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ cursor: "pointer", borderRadius: "3px" }}
                    >
                      {showConfirmPassword ? (
                        <IoEyeOffOutline />
                      ) : (
                        <IoEyeOutline />
                      )}
                    </span>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Gender<span className="text-danger">*</span>
                </label>
                <div className="d-flex mt-2 gap-3 mt-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="male"
                      name="gender"
                      value="Male"
                      checked={formik.values.gender === "Male"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="female"
                      name="gender"
                      value="Female"
                      checked={formik.values.gender === "Female"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="error text-danger ">
                    <small>{formik.errors.gender}</small>
                  </div>
                ) : null}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>Role</label>
                <span className="text-danger">*</span>
                <select
                  className="form-select"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                >
                  <option value=""></option>
                  <option value="teacher">Teacher</option>
                  <option value="freelancer">Freelancer</option>
                </select>
                {formik.touched.role && formik.errors.role && (
                  <div className="error text-danger">
                    <small>{formik.errors.role}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-12">
                <label>Short Introduction</label>
                <textarea
                  type="text"
                  className="form-control"
                  rows="4"
                  name="shortIntroduction"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.shortIntroduction}
                />
                {formik.touched.shortIntroduction &&
                  formik.errors.shortIntroduction && (
                    <div className="error text-danger ">
                      <small>{formik.errors.shortIntroduction}</small>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </form>
    );
  }
);

export default PersonalAdd;
