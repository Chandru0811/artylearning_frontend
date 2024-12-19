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

const validationSchema = Yup.object().shape({
  teacherName: Yup.string().required("*Staff Name is required"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  idTypeId: Yup.string().required("*Id Type is required"),
  idNo: Yup.string().required("*Id No is required"),
  nationalityId: Yup.string().required("*Nationality is required"),
  citizenship: Yup.string().required("*Citizenship is required"),
  status: Yup.string().required("*Status is required"),

  // file: Yup.string().required("*Photo is required!"),
});
const StaffPersonalEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");

    const [idTypeData, setIdTypeData] = useState(null);
    const [nationalityData, setNationalityData] = useState(null);

    const formik = useFormik({
      initialValues: {
        teacherName: formData.teacherName || "",
        dateOfBirth: formData.dateOfBirth || "",
        idTypeId: formData.idTypeId || "",
        idNo: formData.idNo || "",
        photo: formData.photo || "",
        employeeType: null || null,
        nationality: formData.nationality || "",
        citizenship: formData.citizenship || "",
        age: 0,
        shortIntroduction: formData.shortIntroduction || "",
        gender: formData.gender || "",
        email: formData.email || "",
        password: formData.password || "",
        countryId: formData.countryId || "",
        nationality: formData.nationality || "",
        nationalityId: formData.nationalityId || "",
        status: formData.status || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        setFormData((prev) => ({ ...prev, ...data }));
        let nationalityName;
        if (data.nationalityId)
          nationalityName = nationalityData.find(
            (prv) => prv.id === parseInt(data.nationalityId)
          );
        data.nationality = nationalityName.citizenship;

        try {
          const response = await api.put(
            `/updateUser/${formData.staff_id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData((prev) => ({ ...prev, ...data }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          if (error?.response?.status === 409) {
            toast.warning("ID Number already exists!");
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUserById/${formData.staff_id}`
          );
          const dateOfBirth = response.data.dateOfBirth.substring(0, 10);
          formik.setValues({
            ...response.data,
            dateOfBirth: dateOfBirth,
            shortIntroduction: response.data.shortIntroduction || " ",
          });
        } catch (error) {
          toast.error("Error Fetching Data");
        }
      };
      getData();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      staffPersonalEdit: formik.handleSubmit,
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
            <div class="col-md-6 col-12 mb-3">
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
            </div>
            <div class="col-md-6 col-12 mb-3">
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
            <div class="col-md-6 col-12 mb-3">
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
            </div>
            <div class="col-md-6 col-12 mb-3">
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
            <div class="col-md-6 col-12 mb-3">
              <div class="form-group col-sm">
                <label>Country</label>
                <span className="text-danger">*</span>
                <select
                  className="form-select"
                  name="countryId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.countryId}
                >
                  <option selected></option>
                  {nationalityData &&
                    nationalityData.map((nationalityId) => (
                      <option key={nationalityId.id} value={nationalityId.id}>
                        {nationalityId.country}
                      </option>
                    ))}
                </select>
                {formik.touched.countryId && formik.errors.countryId && (
                  <div className="error text-danger">
                    <small>{formik.errors.countryId}</small>
                  </div>
                )}
              </div>
            </div>
            <div class="col-md-6 col-12 mb-3">
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
                {formik.touched.nationalityId &&
                  formik.errors.nationalityId && (
                    <div className="error text-danger">
                      <small>{formik.errors.nationalityId}</small>
                    </div>
                  )}
              </div>
            </div>
            <div class="col-md-6 col-12 mb-3">
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
            <div class="col-md-6 col-12 mb-3">
              <div class="form-group col-sm">
                <label>Status</label>
                <span className="text-danger">*</span>
                <select
                  type="text"
                  class="form-select"
                  name="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option value=""></option>
                  <option value={"ACTIVE"}>Active</option>
                  <option value={"INACTIVE"}>Inactive</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="error text-danger ">
                    <small>{formik.errors.status}</small>
                  </div>
                )}
              </div>
            </div>
            <div class="col-md-6 col-12 mb-3">
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
            </div>
            <div class="col-md-12 col-12 mb-3">
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
        </div>
      </form>
    );
  }
);

export default StaffPersonalEdit;
