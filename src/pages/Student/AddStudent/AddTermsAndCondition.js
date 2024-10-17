import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import SignatureCanvas from "react-signature-canvas";

const validationSchema = Yup.object().shape({
  termsAndConditionSignatureDate: Yup.string().required(
    "*Signature Date is required"
  ),
  agree: Yup.boolean()
    .oneOf([true], "*You Must Accept Terms and conditions is required")
    .required("*You Must Accept Terms and conditions is required"),
});

const AddTermsAndCondition = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");

    const [sign, setSign] = useState();
    const [url, setUrl] = useState();

    const handleClear = () => {
      sign.clear();
      setUrl("");
    };

    const handleGenerate = () => {
      setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
      console.log("Sign :", sign);
    };

    const formik = useFormik({
      initialValues: {
        file: null || "",
        termsAndConditionSignatureDate:
          formData.termsAndConditionSignatureDate || "",
        agree: formData.agree || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        setLoadIndicators(true);
        const formDatas = new FormData();

        // Check if the URL (signature) exists
        if (!url) {
          // If no signature, append an empty string or null for the file
          formDatas.append("file", ""); // This will send an empty file field
        } else {
          // Generate a random number for file name if signature exists
          const randomNumber = Math.floor(Math.random() * 1000);
          // Convert signature URL to Blob
          const apiResponse = await fetch(url);
          const blob = await apiResponse.blob();

          formDatas.append("file", blob, `${randomNumber}Signature.png`);
        }

        // Generate a random number
        // const randomNumber = Math.floor(Math.random() * 1000);
        // Convert URL to Blob
        // const apiResponse = await fetch(url);
        // const blob = await apiResponse.blob();
        // formDatas.append("file", blob, `${randomNumber}Signature.png` || null);

        formDatas.append(
          "termsAndConditionSignatureDate",
          data.termsAndConditionSignatureDate
        );
        formDatas.append("agree", data.agree);
        formDatas.append("studentDetailId", formData.student_id);
        formDatas.append("createdBy", userName);

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
            const studentId = formData.student_id;
            navigate(`/invoice/add?studentID=${studentId}`);
            try {
              const response = await api.put(
                `/updateLeadInfo/${formData.LeadId}`,
                {
                  leadStatus: formData.LeadStatus,
                }
              );
              if (response === 200) {
                console.log("Lead Status CONFIRMED");
              } else {
                console.log("Lead Status Not CONFIRMED");
              }
            } catch {
              console.log("Lead Status Not CONFIRMED");
            }
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
      validateOnBlur: true,   // Enable validation on blur
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
      TermsAndCondition: formik.handleSubmit,
    }));

    return (
      <div className="container-fluid">
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <div className="border-0 mb-5">
            <div className="mb-5 ">
              <div className="border-0 my-2 px-2">
                <p class="headColor">Terms & Condition</p>
                <div className="container py-3">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      {/* <div className="text-start">
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
                      </div> */}
                      {/* SignatureCanvas */}
                      <div className="text-start mt-3">
                        <label htmlFor="" className="mb-1 fw-medium">
                          <small>Parent Signature</small>
                        </label>
                        <br />
                        <div
                          style={{
                            width: 423,
                            height: 150,
                          }}
                          className="border border-secondary rounded-2"
                        >
                          <SignatureCanvas
                            canvasProps={{
                              width: 423,
                              height: 150,
                              className: "sigCanvas",
                            }}
                            name="file"
                            ref={(data) => setSign(data)}
                          />
                        </div>
                        <br />
                        <button
                          type="button"
                          style={{ height: "30px", width: "60px" }}
                          onClick={handleClear}
                          className="btn btn-sm"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          style={{ height: "30px", width: "60px" }}
                          onClick={handleGenerate}
                          className="btn btn-sm"
                        >
                          Save
                        </button>

                        <br />
                        <br />
                        <img src={url} />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="text-start mt-2">
                        <label className="mb-1 fw-medium">
                          <small>
                            Signature Date<span className="text-danger">*</span>
                          </small>
                        </label>
                        <br />
                        <input
                          className="form-control  form-contorl-sm"
                          name="termsAndConditionSignatureDate"
                          type="date"
                          // onFocus={(e) => e.target.showPicker()}
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
