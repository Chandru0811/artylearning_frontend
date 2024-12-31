import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import * as Yup from "yup";

const StaffRequiredAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");

    const validationSchema = Yup.object().shape({
      resume: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "File size exceeds 2 MB",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        .test(
          "fileType",
          "Only PDF files are allowed",
          (value) => !value || (value && value.type === "application/pdf")
        )
        .notRequired(),
      educationCertificate: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "File size exceeds 2 MB",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        .test(
          "fileType",
          "Only PDF files are allowed",
          (value) => !value || (value && value.type === "application/pdf")
        )
        .notRequired(),
    });

    const formik = useFormik({
      initialValues: {
        resume: null || "",
        educationCertificate: null || "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        try {
          const formDatas = new FormData();

          // Add each data field manually to the FormData object
          const userId = formData.user_id;
          formDatas.append("userId", userId);
          formDatas.append("resume", values.resume);
          formDatas.append("educationCertificate", values.educationCertificate);
          formDatas.append("educationCertificate", values.educationCertificate);
          formDatas.append("createdBy", userName);

          const response = await api.post(
            `/createUserRequireInformation`,
            formDatas,
            {
              headers: {
                "Content-Type": "multipart/form-data",
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
    });

    // const handleNextStep = () => {
    //   // e.preventDefault()
    //   formik.validateForm().then((errors) => {
    //     formik.handleSubmit();
    //     if (Object.keys(errors).length === 0) {
    //       handleNext();
    //     }
    //   });
    // };

    useImperativeHandle(ref, () => ({
      staffRequireAdd: formik.handleSubmit,
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
        <div className="container-fluid" style={{ minHeight: "50vh" }}>
          <p className="headColor my-4">Required Information</p>
          <div class="row">
            <div className="col-md-6 col-12 mb-2">
              <label>Resume / CV</label>
              <input
                type="file"
                className="form-control mt-3"
                accept=".pdf"
                name="resume"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("resume", file || null); // Set file or reset to null
                }}
                onBlur={formik.handleBlur}
              />
              {formik.errors.resume && formik.touched.resume && (
                <div className="text-danger mt-1">{formik.errors.resume}</div>
              )}
              <p className="mt-4">Note : File must be PDF, Max Size 2 MB</p>
            </div>

            <div class="col-md-6 col-12 mb-2">
              <label>Education Certificate</label>
              <input
                type="file"
                class="form-control mt-3"
                accept=".pdf"
                name="educationCertificate"
                // onChange={(event) => {
                //   formik.setFieldValue(
                //     "educationCertificate",
                //     event.currentTarget.files[0]
                //   );
                // }}
                onChange={(event) => {
                  const educationCertificate = event.currentTarget.files[0];
                  formik.setFieldValue(
                    "educationCertificate",
                    educationCertificate || null
                  );
                }}
                onBlur={formik.handleBlur}
              />
              {formik.errors.educationCertificate &&
                formik.touched.educationCertificate && (
                  <div className="text-danger mt-1">
                    {formik.errors.educationCertificate}
                  </div>
                )}
              <p class="mt-4">Note : File must be PDF,Max Size 2 MB</p>
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default StaffRequiredAdd;
