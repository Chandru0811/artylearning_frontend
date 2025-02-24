import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object().shape({
  // email: Yup.string().email("*Invalid Email").required("*Email is required"),
  contactNumber: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "*Invalid Phone Number"
    )
    .required("*Contact Number is required"),
  address: Yup.string().required("*Address is required"),
  postalCode: Yup.string()
    .matches(/^[0-9]+$/, "*Postal Code Must be numbers")
    .required("*Postal Code is required"),
});
const ContactAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");

    const formik = useFormik({
      initialValues: {
        // email: formData.email,
        contactNumber: formData.contactNumber,
        address: formData.address,
        postalCode: formData.postalCode,
        createdBy: userName,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        values.createdBy = userName;
        try {
          const response = await api.post(
            `/createUserContactInfo/${formData.user_id}`,
            values,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...values }));
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          if (error?.response?.status === 409) {
            toast.warning(error?.response?.data?.message);
          } else {
            toast.error(
              "Error Submiting data ",
              error?.response?.data?.message
            );
          }
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      contactAdd: formik.handleSubmit,
    }));

    return (
      <form onsubmit={formik.handleSubmit}>
        <section>
          <div className="container-fluid">
            <p className="headColor my-4">Contact Information</p>
            <div className="row">
              {/* <div className="col-md-6 col-12 mb-2 mt-3">
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
            </div> */}
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Contact Number<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="contactNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactNumber}
                />
                {formik.touched.contactNumber &&
                  formik.errors.contactNumber && (
                    <div className="error text-danger ">
                      <small>{formik.errors.contactNumber}</small>
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Address<span className="text-danger">*</span>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="address"
                  rows="3"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="error text-danger ">
                    <small>{formik.errors.address}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2 mt-3">
                <label>
                  Postal Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="postalCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postalCode}
                />
                {formik.touched.postalCode && formik.errors.postalCode && (
                  <div className="error text-danger ">
                    <small>{formik.errors.postalCode}</small>
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

export default ContactAdd;
