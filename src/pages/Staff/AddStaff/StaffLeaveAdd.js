import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  year: Yup.string().required("*year is required!"),

  annualLeave: Yup.string()
    .matches(/^[0-9]+(?:\.[0-9]+)?$/, "*Annual Leave Must be numbers")
    .required("*Annual Leave is required!"),
  medicalLeave: Yup.string()
    .matches(/^[0-9]+$/, "*Medical Leave Must be numbers")
    .required("*Medical Leave is required!"),
  otherLeave: Yup.string()
    .matches(/^[0-9]+$/, "*Other Leave Must be numbers")
    .required("*Other Leave is required!"),
  carryForwardLeave: Yup.string()
    .matches(/^[0-9]+(?:\.[0-9]+)?$/, "*Carry Forward Leave Must be numbers")
    .required("*Carry Forward Leave is required!"),
});
const StaffLeaveAdd = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        year: formData.year,
        annualLeave: formData.annualLeave,
        medicalLeave: formData.medicalLeave,
        otherLeave: formData.otherLeave,
        carryForwardLeave: formData.carryForwardLeave,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
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
        }finally {
          setLoadIndicators(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      staffLeaveAdd: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit}>
        <section>
          <div className="container" style={{ minHeight: "95vh" }}>
            <p className="headColor my-4">Leave Information</p>
            <div class="row">
              <div class="col-md-6 col-12 mb-2">
                <label>
                  Year<span class="text-danger">*</span>
                </label>
                <input
                  type="date"
                  class="form-control    mt-3 "
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
              </div>
              <div class="col-md-6 col-12 mb-2">
                <label>
                  Annual Leave<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control    mt-3"
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
              <div class="col-md-6 col-12 mb-2 mt-3 ">
                <label>
                  Medical Leave<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control    mt-3 "
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
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Other Leave<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control    mt-3"
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
              <div class="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Carry Forward Leave<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control    mt-3"
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
