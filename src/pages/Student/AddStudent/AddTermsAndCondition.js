import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  termsAndConditionSignatureDate: Yup.string().required("*Signature Date is required"),
  agree: Yup.boolean().oneOf([true], "*Agree Terms and conditions is required").required(),
  
});

const AddTermsAndCondition = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
        file: null || "",
        termsAndConditionSignatureDate: formData.termsAndConditionSignatureDate || "",
        agree: formData.agree || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        const formDatas = new FormData();
        formDatas.append("file", data.file);
        formDatas.append("termsAndConditionSignatureDate", data.termsAndConditionSignatureDate);
        formDatas.append("agree", data.agree);
        formDatas.append("studentDetailId", formData.student_id);

        try {
          const response = await api.post(
            `/createStudentTermsAndConditions`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (response.status === 201) {
            toast.success(response.data.message);
            setFormData((prv) => ({ ...prv, ...data }));
            navigate("/student");
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
                    <div className="col-md-6 col-12">
                      <div className="text-start">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Parent Signature</small>
                        </label>
                        <br />
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "file",
                              event.currentTarget.files[0]
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="text-start mt-2">
                        <label className="mb-1 fw-medium">
                          <small>Signature Date<span className="text-danger">*</span></small>
                        </label>
                        <br />
                        <input
                          className="form-control  form-contorl-sm"
                          name="termsAndConditionSignatureDate"
                          type="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.termsAndConditionSignatureDate}
                        />
                        {formik.touched.termsAndConditionSignatureDate && formik.errors.termsAndConditionSignatureDate && (
                      <div className="text-danger">
                        <small>{formik.errors.termsAndConditionSignatureDate}</small>
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
                      By submitting this form, I confirm that I have read and
                      agree to Arty Learning's&nbsp;
                      <span style={{ color: "#ff7500" }}>
                        Terms & Conditions.
                      </span>
                    </small>
                    {formik.touched.agree && formik.errors.agree && (
                      <div className="text-danger">
                        <small>{formik.errors.agree}</small>
                      </div>
                    )}
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