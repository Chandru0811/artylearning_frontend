import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  year: Yup.number()
    .min(1990, "*Year is required")
    .max(2050, "*Year is required")
    .required("*Year is required"),

  annualLeave: Yup.string()
    .matches(/^[0-9]+(?:\.[0-9]+)?$/, "*Annual Leave Must be numbers")
    .required("*Annual Leave is required!"),
  medicalLeave: Yup.string()
    .matches(/^[0-9]+$/, "*Medical Leave Must be numbers")
    .required("*Medical Leave is required!"),
  otherLeave: Yup.string()
    .matches(/^[0-9]+$/, "*Other Leave Must be numbers")
    .required("*Other Leave is required"),
  carryForwardLeave: Yup.string()
    .matches(/^[0-9]+(?:\.[0-9]+)?$/, "*Carry Forward Leave Must be numbers")
    .required("*Carry Forward Leave is required"),
});
const StaffLeaveAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");

    const formik = useFormik({
      initialValues: {
        year: formData.year,
        annualLeave: formData.annualLeave,
        medicalLeave: formData.medicalLeave,
        otherLeave: formData.otherLeave,
        carryForwardLeave: formData.carryForwardLeave,
        createdBy: userName,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.createdBy = userName;
        try {
          const response = await api.post(
            `/createUserLeaveCreation/${formData.user_id}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
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

    useImperativeHandle(ref, () => ({
      staffLeaveAdd: formik.handleSubmit,
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
          <div className="container-fluid" style={{ minHeight: "60vh" }}>
            <p className="headColor my-4">Leave Information</p>
            <div className="row">
              {/* <div className="col-md-6 col-12 mb-2">
                <label>
                  Year<span className="text-danger">*</span>
                </label>
                <input
                  type="month"
                  // onFocus={(e)=> e.target.showPicker()}
                  className="form-control mt-3"
                  name="year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                />
                {formik.touched.year && formik.errors.year && (
                  <div className="error text-danger ">
                    <small>{formik.errors.year}</small>
                  </div>
                )}
              </div> */}
              <div className="col-md-6 col-12 mb-2">
                <label>
                  Year<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control mt-3"
                  name="year"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.year}
                  // max={new Date().getFullYear()}
                  step="1"
                  placeholder="YYYY"
                />
                {formik.touched.year && formik.errors.year && (
                  <div className="error text-danger">
                    <small>{formik.errors.year}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-2">
                <label>
                  Annual Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control    mt-3"
                  name="annualLeave"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.annualLeave}
                />
                {formik.touched.annualLeave && formik.errors.annualLeave && (
                  <div className="error text-danger ">
                    <small>{formik.errors.annualLeave}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3 ">
                <label>
                  Medical Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control    mt-3 "
                  name="medicalLeave"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.medicalLeave}
                />
                {formik.touched.medicalLeave && formik.errors.medicalLeave && (
                  <div className="error text-danger ">
                    <small>{formik.errors.medicalLeave}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Other Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control    mt-3"
                  name="otherLeave"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.otherLeave}
                />
                {formik.touched.otherLeave && formik.errors.otherLeave && (
                  <div className="error text-danger ">
                    <small>{formik.errors.otherLeave}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Carry Forward Leave<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control    mt-3"
                  name="carryForwardLeave"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.carryForwardLeave}
                />
                {formik.touched.carryForwardLeave &&
                  formik.errors.carryForwardLeave && (
                    <div className="error text-danger ">
                      <small>{formik.errors.carryForwardLeave}</small>
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

export default StaffLeaveAdd;
