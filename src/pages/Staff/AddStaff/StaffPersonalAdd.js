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
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import fetchAllNationality from "../../List/NationalityAndCountryList";

const validationSchema = Yup.object().shape({
  teacherName: Yup.string().required("*Staff Name is required"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  idTypeId: Yup.string().required("*Id Type is required"),
  idNo: Yup.string().required("*Id No is required"),
  nationalityId: Yup.string().required("*Nationality is required"),
  citizenship: Yup.string().required("*Citizenship is required"),
  role: Yup.string().required("*Role is required"),
  file: Yup.mixed().required("*Photo is required"),
  password: Yup.string()
    .min(8, "*Password must be at least 8 characters")
    .required("*Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
const StaffPersonalAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [idTypeData, setIdTypeData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const userName = localStorage.getItem("userName");
    const [nationalityData, setNationalityData] = useState(null);

    const formik = useFormik({
      initialValues: {
        role: formData.role || "",
        teacherName: formData.teacherName || "",
        dateOfBirth: formData.dateOfBirth || "",
        idTypeId: formData.idTypeId || "",
        idNo: formData.idNo || "",
        file: formData.file || "",
        shortIntroduction: formData.shortIntroduction || "",
        gender: formData.gender || "",
        email: formData.email || "",
        password: formData.password || "",
        confirmPassword: formData.confirmPassword || "",
        nationality: formData.nationality || "",
        citizenship: formData.citizenship || "",
        nationalityId: formData.nationalityId || "",
      },
      validationSchema: validationSchema,
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
          formData.append("idNo", values.idNo);
          formData.append("age", 25);
          formData.append("shortIntroduction", values.shortIntroduction);
          formData.append("gender", values.gender);
          formData.append("file", values.file);
          formData.append("email", values.email);
          formData.append("password", values.password);
          formData.append("confirmPassword", values.confirmPassword);
          formData.append("citizenship", values.citizenship);
          formData.append("nationality", nationalityName.nationality);
          formData.append("nationalityId", values.nationalityId);
          formData.append("createdBy", userName);

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
      staffPersonalAdd: formik.handleSubmit,
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
        <div className="pb-4">
          <p class="headColor">Personal Information</p>
          <div class="container row d-flex my-4">
            <div class="form-group  col-sm ">
              <label>Staff Name</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                class="form-control "
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
            <div class="form-group col-sm">
              <label>Date of Birth</label>
              <span className="text-danger">*</span>
              <input
                type="date"
                class="form-control"
                name="dateOfBirth"
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

          <div class="container row d-flex my-4 justify-align-content-around">
            <div class="form-group col-sm">
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
            <div class="form-group col-sm ">
              <label>ID No</label>
              <span className="text-danger">*</span>
              <input
                type="text"
                class="form-control "
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
          </div>

          <div class="container row d-flex my-4 justify-align-content-around">
            <div class="form-group col-sm">
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
              {formik.touched.nationalityId && formik.errors.nationalityId && (
                <div className="error text-danger">
                  <small>{formik.errors.nationalityId}</small>
                </div>
              )}
            </div>
            <div class="form-group col-sm">
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
                <option value="1st Year PR">1st Year PR</option>
                <option value="2nd Year PR">2nd Year PR</option>
                <option value="3rd Year PR">3rd Year PR</option>
                {/* {nationalityData &&
                  nationalityData.map((citizenship) => (
                    <option
                      key={citizenship.id}
                      value={citizenship.citizenship}
                    >
                      {citizenship.citizenship}
                    </option>
                  ))} */}
              </select>
              {formik.touched.citizenship && formik.errors.citizenship && (
                <div className="error text-danger">
                  <small>{formik.errors.citizenship}</small>
                </div>
              )}
            </div>
          </div>

          <div class="container row d-flex my-3 justify-align-content-around">
            <div class="form-group  col-sm ">
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
              {formik.touched.file && !formik.values.file && (
                <div className="error text-danger">
                  <small>Photo is required</small>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <label>
                Email ID<span class="text-danger">*</span>
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
            <div class="col-md-6 col-12 mb-2 mt-3">
              <div className="mb-3">
                <label>
                  Password<span class="text-danger">*</span>
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
            <div class="col-md-6 col-12 mb-2 mt-3">
              <div className="mb-3">
                <label>
                  Confirm Password<span class="text-danger">*</span>
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
            {/* <div class="container row d-flex my-3 justify-align-content-around"> */}
            <div class="form-group col-sm">
              <label>Role</label>
              <span className="text-danger">*</span>
              <select
                type="text"
                class="form-select"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
              >
                <option value=""></option>
                <option value={"staff"}>Staff</option>
                <option value={"branch_admin"}>Branch Admin</option>
                <option value={"staff_admin"}>Staff Admin</option>
                <option value={"center_manager"}>Centre Manager</option>
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="error text-danger ">
                  <small>{formik.errors.role}</small>
                </div>
              )}
            </div>
            <div class="form-group  col-sm ms-2">
              <label className="mb-3">Gender</label>
              <div className="d-flex align-items-center justify-content-start">
                <div className="me-4">
                  <input
                    type="radio"
                    className="form-check-input mx-2"
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
                <input
                  class="form-check-input mx-2"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formik.values.gender === "Male"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="form-check-label" htmlFor="yes">
                  Male
                </label>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div class="container row d-flex justify-content-start align-items-center">
            <div class="form-group  col-sm ">
              <label
                for="exampleFormControlTextarea1 "
                class="form-label d-flex "
              >
                Short Introduction
              </label>
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
      </form>
    );
  }
);

export default StaffPersonalAdd;
