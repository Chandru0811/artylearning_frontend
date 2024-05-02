import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  termsAndConditionSignatureDate: Yup.string().required(
    "*Signature Date is required!"
  ),
  agree: Yup.string().required("*Agree Terms and conditions is required!"),
});

const EditTermsAndCondition = forwardRef(
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
          if (formData.stdTermsAndConditionId !== null) {
              // console.log("Emergency Contact ID:", formData.stdTermsAndConditionId);
              const response = await api.put(
                  `/updateStudentTermsAndCondition/${formData.stdTermsAndConditionId}`,
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
              } else {
                  toast.error(response.data.message);
              }
          } else {
              const response = await api.post(
                  `/createStudentTermsAndConditions/${formData.id}`,
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
              } else {
                  toast.error(response.data.message);
              }
          }
      } catch (error) {
          toast.error(error);
      }


        // try {
        //   const response = await api.post(
        //     `/createStudentTermsAndConditions/${formData.student_id}`,
        //     data,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     }
        //   );
        //   if (response.status === 201) {
        //     toast.success(response.data.message);
        //     setFormData((prv) => ({ ...prv, ...data }));
        //     // console.log("Form data is ",formData)
        //     navigate("/student");
        //   } else {
        //     toast.error(response.data.message);
        //   }
        // } catch (error) {
        //   toast.error(error);
        // }
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllStudentDetails/${formData.id}`
          );
          if (
            response.data.studentTermsAndConditions &&
            response.data.studentTermsAndConditions.length > 0
          ) {
            formik.setValues({
              ...response.data.studentTermsAndConditions[0],
              stdTermsAndConditionId: response.data.studentTermsAndConditions[0].id,
              termsAndConditionSignatureDate : response.data.studentTermsAndConditions[0].termsAndConditionSignatureDate.substring(0,10),
            });
          } else {
            // If there are no emergency contacts, set default values or handle the case as needed
            formik.setValues({
              stdTermsAndConditionId: null,
              parentSignature: null || "",
              termsAndConditionSignatureDate: "",
              agree: "",
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      termsAndCondition: formik.handleSubmit,
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

export default EditTermsAndCondition;
