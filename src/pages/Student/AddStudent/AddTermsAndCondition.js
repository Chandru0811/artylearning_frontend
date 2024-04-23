import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  termsAndConditionSignatureDate: Yup.string().required(
    "*Signature Date is required!"
  ),
});

const AddTermsAndCondition = forwardRef(
  ({ formData, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        parentSignature: null || "",
        termsAndConditionSignatureDate:
          formData.termsAndConditionSignatureDate || "",
        agree: formData.agree || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        data.parentSignature = null;
        try {
          const response = await api.post(
            `/createStudentTermsAndConditions/${formData.student_id}`,
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            // console.log("Form data is ",formData)
            navigate("/student");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      },
    });

    // const handleNextStep = () => {
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };

    useImperativeHandle(ref, () => ({
      TermsAndCondition: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form onSubmit={formik.handleSubmit}>
          <div className="border-0 mb-5">
            <div className="mb-5 ">
              <div className="border-0 my-2 px-2">
                <p class="headColor">Terms & Condition</p>
                <div className="container py-3">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="text-start">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Parent Signature</small>
                        </label>
                        <br />
                        <input
                          type="file"
                          name="parentSignature"
                          className="form-control"
                          // onChange={(event) => {
                          //   formik.setFieldValue(
                          //     "parentSignature",
                          //     event.currentTarget.parentSignatures[0]
                          //   );
                          // }}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 px-5">
                      <div className="text-start mt-2">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Signature Date</small>
                          <span className="text-danger">*</span>
                        </label>
                        <br />
                        <input
                          className="form-control "
                          type="date"
                          name="termsAndConditionSignatureDate"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.termsAndConditionSignatureDate}
                        />
                        {formik.touched.termsAndConditionSignatureDate &&
                          formik.errors.termsAndConditionSignatureDate && (
                            <div className="text-danger">
                              <small>
                                {formik.errors.termsAndConditionSignatureDate}
                              </small>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="agree"
                      checked={formik.values.agree}
                      onChange={(e) => {
                        const newValue = e.target.checked;
                        formik.setFieldValue("agree", newValue);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <small>
                      By submitting this form, I confrim that I have read and
                      agree to Arty Learning's&nbsp;
                      <span style={{ color: "#ff7500" }}>
                        Terms & Conditions.
                      </span>
                    </small>
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

export default AddTermsAndCondition;
