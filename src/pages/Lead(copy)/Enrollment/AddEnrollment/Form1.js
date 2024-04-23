import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nameOfChild: Yup.string().required("*Name is required"),
  gender: Yup.string().required("*Gender is required"),
  // childOfBirth: Yup.date().required("*Date is required"),
  childOfBirth: Yup.date()
  .required("Date of Birth is required")
  .max(new Date(), "Date of Birth cannot be in the future"),
  allergy: Yup.string().required("*Allergy is required"),
  ethinicGroup: Yup.string().required("*Ethnic group is required"),
  schoolType: Yup.string().required("*School type is required"),
  nameOfSchool: Yup.string().required("*School Name is required"),
  nameOfChildrenInTotal: Yup.string().required("*Name of Children is required"),
  fathersFullName: Yup.string().required("*Father Name is required"),
});

const Form1 = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        nameOfChild: formData.nameOfChild || "",
        artyLearningBranch: formData.artyLearningBranch,
        gender: formData.gender || "",
        childOfBirth: formData.childOfBirth || "",
        allergy: formData.allergy || "",
        ethinicGroup: formData.ethinicGroup || "",
        schoolType: formData.schoolType || "",
        nameOfSchool: formData.nameOfSchool || "",
        nameOfChildrenInTotal: formData.nameOfChildrenInTotal || "",
        fathersFullName: formData.fathersFullName || "",
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        setFormData((prv) => ({ ...prv, ...data }));
        // console.log("form parent",formData );
        // console.log("data", data);
      },
    });
    const handleNextStep = () => {
      // e.preventDefault()
      formik.validateForm().then((errors) => {
        formik.handleSubmit();
        if (Object.keys(errors).length === 0) {
          handleNext();
        }
      });
    };
    useImperativeHandle(ref, () => ({
      form1: handleNextStep,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-4">
          <h5 className="headColor  mb-5">Enrollment Form</h5>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Name Of Child<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control "
                  name="nameOfChild"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nameOfChild}
                />
                {formik.touched.nameOfChild && formik.errors.nameOfChild && (
                  <div className="error text-danger ">
                    <small>{formik.errors.nameOfChild}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 ">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Arty Learning Branch
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    value="Hougang (806)"
                    name="artyLearningBranch"
                    type="radio"
                    checked={formik.values.artyLearningBranch === "Hougang (806)"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Hougang (806)
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input mx-2"
                    value="Ang Mo Kio (728)"
                    name="artyLearningBranch"
                    type="radio"
                    checked={formik.values.artyLearningBranch === "Ang Mo Kio (728)"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Ang Mo Kio (728)
                  </label>
                </div>
              </div>
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
                  name="childOfBirth"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.childOfBirth}
                />
                {formik.touched.childOfBirth && formik.errors.childOfBirth && (
                  <div className="error text-danger ">
                    <small>{formik.errors.childOfBirth}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 col-12">
              <div className="mb-3">
                <div>
                  <label for="exampleFormControlInput1" className="form-label">
                    Allergy / Medical Condition(For Instance: Asthma)
                    <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="">
                  <textarea
                    type="text"
                    name="allergy"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.allergy}
                  />
                  {formik.touched.allergy && formik.errors.allergy && (
                    <div className="error text-danger ">
                      <small>{formik.errors.allergy}</small>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-12 ">
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
                    name="ethinicGroup"
                    value="chinese"
                    checked={formik.values.ethinicGroup === "chinese"}
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
                    name="ethinicGroup"
                    value="malay"
                    checked={formik.values.ethinicGroup === "malay"}
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
                    name="ethinicGroup"
                    value="indian"
                    checked={formik.values.ethinicGroup === "indian"}
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
                    name="ethinicGroup"
                    value="eurasian"
                    checked={formik.values.ethinicGroup === "eurasian"}
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
                    name="ethinicGroup"
                    value="others"
                    checked={formik.values.ethinicGroup === "others"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Others
                  </label>
                </div>
                {formik.touched.ethinicGroup && formik.errors.ethinicGroup && (
                  <div className="error text-danger ">
                    <small>{formik.errors.ethinicGroup}</small>
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
                    value="childacre"
                    checked={formik.values.schoolType === "childacre"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" for="inlineRadio1">
                    Childacre
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schoolType"
                    value="kindergaten"
                    checked={formik.values.schoolType === "kindergaten"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-check-label" for="inlineRadio2">
                    Kindergaten
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="schoolType"
                    value="others"
                    checked={formik.values.schoolType === "others"}
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
                  Name Of children In Total<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="nameOfChildrenInTotal"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nameOfChildrenInTotal}
                />
                {formik.touched.nameOfChildrenInTotal && formik.errors.nameOfChildrenInTotal && (
                  <div className="error text-danger ">
                    <small>{formik.errors.nameOfChildrenInTotal}</small>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6 col-12 ">
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
                {formik.touched.fathersFullName && formik.errors.fathersFullName && (
                  <div className="error text-danger ">
                    <small>{formik.errors.fathersFullName}</small>
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

export default Form1;
