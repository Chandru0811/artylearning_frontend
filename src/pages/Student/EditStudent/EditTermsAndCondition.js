import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
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

const EditTermsAndCondition = forwardRef(
  ({ formData, setFormData, setLoadIndicators }, ref) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [showImage, setShowImage] = useState(true);
    const userName = localStorage.getItem("userName");

    const [sign, setSign] = useState();
    const [url, setUrl] = useState();

    const handleClear = () => {
      sign.clear();
      setUrl("");
    };

    const handleGenerate = () => {
      setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
      setShowImage(true); // Show the image after generating the signature
      // setIsEditing(false); // Exit edit mode after saving
    };

    const handleEdit = () => {
      setIsEditing(true); // Enable edit mode
      setShowImage(false); // Hide image and show signature canvas
    };

    const handleCancel = () => {
      setIsEditing(false); // Exit edit mode
      setShowImage(true); // Show the image again
    };

    const formik = useFormik({
      initialValues: {
        file: null || "",
        termsAndConditionSignatureDate:
          formData.termsAndConditionSignatureDate || "",
        agree: formData.agree || "",
        studentDetailId: formData.id || "",
        updatedBy: userName,
      },
      validationSchema: validationSchema,
      //   onSubmit: async (data) => {
      //     setLoadIndicators(true);
      //     try {
      //       if (data.stdTermsAndConditionId !== null) {
      //         const formDatas = new FormData();

      //         // Generate a random number
      //         const randomNumber = Math.floor(Math.random() * 100000);

      //         // Convert URL to Blob
      //         const apiResponse = await fetch(url);
      //         const blob = await apiResponse.blob();
      //         formDatas.append(
      //           "file",
      //           blob,
      //           `${randomNumber}Signature.png` || null
      //         );
      //         formDatas.append(
      //           "termsAndConditionSignatureDate",
      //           data.termsAndConditionSignatureDate
      //         );
      //         formDatas.append("agree", data.agree);
      //         formDatas.append(
      //           "studentTermsAndConditionId",
      //           data.stdTermsAndConditionId
      //         );
      //         const response = await api.put(
      //           `/updateStudentTermsAndConditions/${data.stdTermsAndConditionId}`,
      //           formDatas,
      //           {
      //             headers: {
      //               "Content-Type": "multipart/form-data",
      //             },
      //           }
      //         );
      //         if (response.status === 200) {
      //           toast.success(response.data.message);
      //           navigate("/student");
      //           // window.location.reload();
      //         } else {
      //           toast.error(response.data.message);
      //         }
      //       } else {
      //         const formDatas = new FormData();
      //         // Generate a random number
      //         const randomNumber = Math.floor(Math.random() * 1000);
      //         // Convert URL to Blob
      //         const apiResponse = await fetch(url);
      //         const blob = await apiResponse.blob();
      //         formDatas.append("file", blob, `${randomNumber}Signature.png`);
      //         formDatas.append("agree", data.agree);
      //         formDatas.append(
      //           "termsAndConditionSignatureDate",
      //           data.termsAndConditionSignatureDate
      //         );
      //         formDatas.append("studentDetailId", formData.id);
      //         const response = await api.post(
      //           `/createStudentTermsAndConditions`,
      //           formDatas,
      //           {
      //             headers: {
      //               "Content-Type": "multipart/form-data",
      //             },
      //           }
      //         );
      //         if (response.status === 201) {
      //           toast.success(response.data.message);
      //           setFormData((prv) => ({ ...prv, ...data }));
      //           navigate("/student");
      //         } else {
      //           toast.error(response.data.message);
      //         }
      //       }
      //     } catch (error) {
      //       toast.error(error);
      //     } finally {
      //       setLoadIndicators(false);
      //     }
      //   },
      //   validateOnChange: false, // Enable validation on change
      //   validateOnBlur: true, // Enable validation on blur
      // });

      // Function to scroll to the first error field

      onSubmit: async (data) => {
        setLoadIndicators(true);
        try {
          const formDatas = new FormData();

          // Append common fields
          formDatas.append(
            "termsAndConditionSignatureDate",
            data.termsAndConditionSignatureDate
          );
          formDatas.append("agree", data.agree);

          if (data.stdTermsAndConditionId) {
            // Edit existing record
            formDatas.append(
              "studentTermsAndConditionId",
              data.stdTermsAndConditionId
            );

            if (isEditing) {
              // Append the signature only if it was edited
              const randomNumber = Math.floor(Math.random() * 100000);
              const apiResponse = await fetch(url);
              const blob = await apiResponse.blob();
              formDatas.append("file", blob, `${randomNumber}Signature.png`);
            }

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
            // Create new record
            formDatas.append("studentDetailId", formData.id);

            if (isEditing) {
              // Append the signature only if it was edited
              const randomNumber = Math.floor(Math.random() * 1000);
              const apiResponse = await fetch(url);
              const blob = await apiResponse.blob();
              formDatas.append("file", blob, `${randomNumber}Signature.png`);
            }

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
              setFormData((prev) => ({ ...prev, ...data }));
              navigate("/student");
            } else {
              toast.error(response.data.message);
            }
          }
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(`/getAllStudentById/${formData.id}`);
          console.log(
            "Response is parentSignature:",
            response.data.studentTermsAndConditions[0].parentSignature
          );
          if (
            response.data.studentTermsAndConditions &&
            response.data.studentTermsAndConditions.length > 0
          ) {
            formik.setValues({
              ...response.data.studentTermsAndConditions[0],
              stdTermsAndConditionId:
                response.data.studentTermsAndConditions[0].id,
            });
            setData(response.data);
          } else {
            // If there are no emergency contacts, set default values or handle the case as needed
            formik.setValues({
              stdTermsAndConditionId: null,
              file: null || "",
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
                <p class="headColor">Terms and Conditions</p>
                <div className="container-fluid py-3">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="text-start mt-3">
                        <label className="mb-1 fw-medium">
                          <small>Parent Signature</small>
                        </label>
                        <br />
                        <div className="border border-secondary rounded-2 parentSignature">
                          {showImage &&
                          (url ||
                            data.studentTermsAndConditions?.[0]
                              ?.parentSignature) ? (
                            // Show the signature image if URL or parentSignature is available
                            <img
                              src={
                                url ||
                                data.studentTermsAndConditions?.[0]
                                  ?.parentSignature
                              }
                              className="img-fluid rounded ms-3 mt-2"
                              style={{ maxWidth: "40%" }}
                              alt="Parent Signature"
                            />
                          ) : (
                            // Show the signature canvas for drawing if no signature is available or in edit mode
                            <div>
                              <SignatureCanvas
                                canvasProps={{
                                  width: 423,
                                  height: 150,
                                  className: "sigCanvas",
                                }}
                                ref={(data) => setSign(data)}
                              />
                              <br />
                              <button
                                type="button"
                                style={{ height: "30px", width: "60px" }}
                                onClick={handleClear}
                                className="btn btn-sm bg-light mx-1"
                              >
                                Clear
                              </button>
                              <button
                                type="button"
                                style={{ height: "30px", width: "60px" }}
                                onClick={handleGenerate}
                                className="btn btn-sm bg-light mx-1"
                              >
                                Save
                              </button>
                              {isEditing && (
                                <button
                                  type="button"
                                  style={{ height: "30px", width: "70px" }}
                                  onClick={handleCancel}
                                  className="btn btn-sm bg-light ms-1"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                        <br />
                        {/* Edit button for existing signatures */}
                        {showImage &&
                          (url ||
                            data.studentTermsAndConditions?.[0]
                              ?.parentSignature) && (
                            <button
                              type="button"
                              style={{ height: "30px", width: "60px" }}
                              onClick={handleEdit}
                              className="btn btn-sm bg-light"
                            >
                              Edit
                            </button>
                          )}
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
