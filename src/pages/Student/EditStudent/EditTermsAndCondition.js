import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
    const [data, setData] = useState([]);
    const formik = useFormik({
      initialValues: {
        file: null || "",
        termsAndConditionSignatureDate:
          formData.termsAndConditionSignatureDate || "",
        agree: formData.agree || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (data) => {
        try {
          if (data.stdTermsAndConditionId !== null) {
            const formDatas = new FormData();
            formDatas.append("file", data.file);
            formDatas.append(
              "termsAndConditionSignatureDate",
              data.termsAndConditionSignatureDate
            );
            formDatas.append("agree", data.agree);
            formDatas.append("studentTermsAndConditionId", data.stdTermsAndConditionId);
            const response = await api.put(
              `/updateStudentTermsAndConditions/${data.stdTermsAndConditionId}`,
              formDatas,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              navigate("/student");
            } else {
              toast.error(response.data.message);
            }
          } else {
            const formDatas = new FormData();
            formDatas.append("file", data.file);
            formDatas.append(
              "termsAndConditionSignatureDate",
              data.termsAndConditionSignatureDate
            );
            formDatas.append("agree", data.agree);
            formDatas.append("studentDetailId", formData.student_id);
            const response = await api.post(
              `/createStudentTermsAndConditions/${data.id}`,
              formDatas,
              {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
              }
            );
            if (response.status === 201) {
              toast.success(response.data.message);
              navigate("/student");
            } else {
              toast.error(response.data.message);
            }
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
              stdTermsAndConditionId:
                response.data.studentTermsAndConditions[0].id,
              termsAndConditionSignatureDate:
                response.data.studentTermsAndConditions[0].termsAndConditionSignatureDate.substring(
                  0,
                  10
                ),
            });
            setData(response.data);
          } else {
            // If there are no emergency contacts, set default values or handle the case as needed
            formik.setValues({
              stdTermsAndConditionId: null,
              file: null || "",
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
                         className="form-control"
                         name="file"
                         onChange={(event) => {
                           formik.setFieldValue("file", event.target.files[0]);
                         }}
                         onBlur={formik.handleBlur}
                        />
                        {data.studentTermsAndConditions &&
                          data.studentTermsAndConditions.length > 0 &&
                          data.studentTermsAndConditions.map((parent) => (
                            <div className="container-fluid col-12 p-2">
                              <img
                                src={parent.parentSignature}
                                className="img-fluid rounded"
                                style={{ width: "60%" }}
                                alt="Parent Signature Img"
                              ></img>
                            </div>
                          ))}
                        {(!data.studentTermsAndConditions ||
                          data.studentTermsAndConditions.length === 0) && (
                          <div
                            id="panelsStayOpen-collapseThree"
                            class="accordion-collapse collapse"
                          >
                            <div class="accordion-body">
                              <div className="text-muted">
                                Parent Signature / not available !
                              </div>
                            </div>
                          </div>
                        )}
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