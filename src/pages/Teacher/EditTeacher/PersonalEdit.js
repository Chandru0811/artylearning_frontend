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
  teacherName: Yup.string().required("*Teacher Name is required"),
  dateOfBirth: Yup.date()
    .required("*Date of Birth is required")
    .max(new Date(), "*Date of Birth cannot be in the future"),
  idTypeId: Yup.string().required("*Id Type is required"),
  idNo: Yup.string().required("*Id No is required"),
  // email: Yup.string().email("*Invalid Email").required("*Email is required"),
  nationalityId: Yup.string().required("*Nationality is required"),
  citizenship: Yup.string().required("*Citizenship is required"),
});
const PersonalEdit = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [idTypeData, setIdTypeData] = useState(null);
    const [nationalityData, setNationalityData] = useState(null);
    const userName = localStorage.getItem("userName");

    // const formik = useFormik({
    //   initialValues: {
    //     teacherName: formData.teacherName || "",
    //     dateOfBirth: formData.dateOfBirth || "",
    //     idTypeId: formData.idTypeId || "",
    //     idNo: formData.idNo || "",
    //     age : 0,
    //     email: formData.email || "",
    //     citizenship: formData.citizenship || "",
    //     nationality: formData.nationality || "",
    //     photo: formData.photo || "",
    //     shortIntroduction: formData.shortIntroduction || "",
    //     gender: formData.gender || "",
    //   },
    //   validationSchema: validationSchema,
    //   onSubmit: async (data) => {
    //     setLoadIndicators(true);
    //     setFormData((prv) => ({ ...prv, ...data }));
    //     try {
    //       const formDatas = new FormData();
    //       formDatas.append("teacherName", data.teacherName);
    //       formDatas.append("dateOfBirth", data.dateOfBirth);
    //       formDatas.append("idTypeId", data.idTypeId);
    //       formDatas.append("idNo", data.idNo);
    //       formData.append("age", 25);
    //       formDatas.append("citizenship", data.citizenship);
    //       formDatas.append("shortIntroduction", data.shortIntroduction);
    //       formDatas.append("gender", data.gender);
    //       formDatas.append("role", data.role);
    //       formDatas.append("updatedBy", userName);
    //       const response = await api.put(
    //         `/updateUser/${formData.staff_id}`,
    //         data,
    //         {
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       );
    //       if (response.status === 200) {
    //         toast.success(response.data.message);
    //         setFormData((prv) => ({ ...prv, ...data }));
    //         handleNext();
    //         console.log("Api Data:", formData);
    //       } else {
    //         toast.error(response.data.message);
    //       }
    //     } catch (error) {
    //       if (error?.response?.status === 409) {
    //         toast.warning("ID Number already exists!");
    //       } else {
    //         toast.error(error?.response?.data?.message);
    //       }
    //     } finally {
    //       setLoadIndicators(false);
    //     }
    //   },
    // });

    const formik = useFormik({
      initialValues: {
        teacherName: formData.teacherName || "",
        dateOfBirth: formData.dateOfBirth || "",
        idTypeId: formData.idTypeId || "",
        idNo: formData.idNo || "",
        nationality: formData.nationality || "",
        nationalityId: formData.nationalityId || "",
        citizenship: formData.citizenship || "",
        photo: formData.photo || "",
        employeeType: null || null,
        countryId: formData.countryId,
        nationality: formData.nationality || "",
        age: 0,
        shortIntroduction: formData.shortIntroduction || "",
        gender: formData.gender || "",
        email: formData.email || "",
        password: formData.password || "",
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUserById/${formData.staff_id}`
          );
          const dateOfBirth = response.data.dateOfBirth.substring(0, 10);
          const role = response.data.role;
          setFormData((prev) => ({
            ...prev,
            ...response.data,
            role: role, // Include role in formData
          }));
          // console.log(response)
          formik.setValues({
            ...response.data,
            dateOfBirth: dateOfBirth,
            shortIntroduction: formData.shortIntroduction || "",
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      getData();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
      personalEdit: formik.handleSubmit,
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
                    nationalityData.map((countryId) => (
                      <option key={countryId.id} value={countryId.id}>
                        {countryId.country}
                      </option>
                    ))}
                </select>
                {formik.touched.countryId && formik.errors.countryId && (
                  <div className="error text-danger">
                    <small>{formik.errors.countryId}</small>
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

export default PersonalEdit;
