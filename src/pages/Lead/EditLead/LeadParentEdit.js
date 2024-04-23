import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  parentName: Yup.string().required("*Parent Name is required!"),
  parentEmail: Yup.string()
    .email("*Invalid Email")
    .required("*Email is required!"),
  parentMobileNumber: Yup.string()
    .matches(
      /^(?:\+?65)?\s?(?:\d{4}\s?\d{4}|\d{3}\s?\d{3}\s?\d{4})$/,
      "Invalid Phone Number"
    )
    .required("Phone Number is required!"),
  relation: Yup.string().required("*Select Relation!"),
});

const LeadParentEdit = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        parentName: formData.parentName || "",
        parentEmail: formData.parentEmail || "",
        parentMobileNumber: formData.parentMobileNumber || "",
        relation: formData.relation || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
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
        }
      },
    });

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`/getAllLeadInfoById/${formData.id}`);
          formik.setValues(response.data);
        } catch (error) {
          toast.error("Error Fetch Data ", error);
        }
      };
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      parentInfo: formik.handleSubmit,
    }));

    return (
      <section>
        <form onSubmit={formik.handleSubmit}>
          <div className="container-fluid">
            <div class="row  px-1">
              <div className="py-3">
                <p className="headColor">Parent Information</p>
              </div>
              <div class="col-md-6 col-12 mb-3">
                <label>
                  Parent Name<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="parentName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentName}
                />
                {formik.touched.parentName && formik.errors.parentName && (
                  <div className="error text-danger">
                    <small>{formik.errors.parentName}</small>
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 ">
                <label>
                  Parent Email <span class="text-danger">*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  name="parentEmail"
                  value={formik.values.parentEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.parentEmail && formik.errors.parentEmail && (
                  <div className="error text-danger ">
                    <small>{formik.errors.parentEmail}</small>
                  </div>
                )}
              </div>

              <div class="col-md-6 col-12">
                <label>
                  Parent Mobile Number<span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="parentMobileNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentMobileNumber}
                />
                {formik.touched.parentMobileNumber &&
                  formik.errors.parentMobileNumber && (
                    <div className="error text-danger ">
                      <small>{formik.errors.parentMobileNumber}</small>
                    </div>
                  )}
              </div>
              <div class="col-md-6 col-12  ">
                <label>
                  Relation<span class="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="relation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.relation}
                >
                  <option value=""></option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>
                {formik.touched.relation && formik.errors.relation && (
                  <div className="error text-danger">
                    <small>{formik.errors.relation}</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    );
  }
);

export default LeadParentEdit;
