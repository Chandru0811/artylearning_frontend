import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import * as Yup from "yup";
import pdfLogo from "../../../assets/images/Attactmentpdf.jpg";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const StaffRequiredAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const userName = localStorage.getItem("userName");
    const [datas, setDatas] = useState();

    const validationSchema = Yup.object().shape({
      resume: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "File size exceeds 2 MB",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        // .test(
        //   "fileType",
        //   "Only PDF files are allowed",
        //   (value) => !value || (value && value.type === "application/pdf")
        // )
        .notRequired(),
      educationCertificate: Yup.mixed()
        .nullable()
        .test(
          "fileSize",
          "File size exceeds 2 MB",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        )
        // .test(
        //   "fileType",
        //   "Only PDF files are allowed",
        //   (value) => !value || (value && value.type === "application/pdf")
        // )
        .notRequired(),
    });

    const formik = useFormik({
      initialValues: {
        resume: null || "",
        educationCertificate: null || "",
      },
      // validationSchema: validationSchema,
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

    useEffect(() => {
      const getData = async () => {
        try {
          const response = await api.get(
            `/getAllUserById/${formData.user_id}`
          );
          if (
            response.data.userRequireInformationModels &&
            response.data.userRequireInformationModels.length > 0
          ) {
            setDatas(response.data.userRequireInformationModels[0]);
            formik.setValues({
              ...response.data.userRequireInformationModels[0],
            });
          } else {
            formik.setValues({
              userEnquireId: null,
              resume: null || "",
              educationCertificate: null || "",
            });
            // console.log("Contact ID:", formik.values.contactId);
          }
        } catch (error) {
          toast.error(error);
        }
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        <div className="container-fluid" style={{ minHeight: "60vh" }}>
          <p className="headColor my-4">Required Information</p>
          <div className="row">
            <div className="col-md-6 col-12 mb-2">
              <label>Resume / CV</label>
              <input
                type="file"
                className="form-control mt-3"
                accept=".pdf"
                name="resume"
                onChange={(event) => {
                  formik.setFieldValue("resume", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              <p className="mt-4">Note: File must be PDF, Max Size 2 MB</p>
              {datas?.resume && (
                <div className="card border-0 shadow" style={{ width: "70%" }}>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: "not-allowed" }}
                  >
                    <img
                      className="card-img-top img-fluid"
                      style={{
                        height: "10rem",
                        pointerEvents: "none",
                        cursor: "not-allowed",
                      }}
                      src={pdfLogo}
                      alt="Resume preview"
                    />
                  </div>
                  <div
                    className="card-body d-flex justify-content-between align-items-center"
                    style={{ flexWrap: "wrap" }}
                  >
                    <p
                      className="card-title fw-semibold mb-0 text-wrap"
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={datas?.resume?.split("/").pop()}
                    >
                      {datas?.resume?.split("/").pop()}
                    </p>
                    <a
                      href={datas?.resume}
                      download
                      className="btn text-dark ms-2"
                      title="Download Resume"
                      style={{ flexShrink: 0 }}
                    >
                      <MdOutlineDownloadForOffline size={25} />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-2">
              <label>Education Certificate</label>
              <input
                type="file"
                className="form-control mt-3"
                accept=".pdf"
                name="educationCertificate"
                onChange={(event) => {
                  formik.setFieldValue(
                    "educationCertificate",
                    event.currentTarget.files[0]
                  );
                }}
                onBlur={formik.handleBlur}
              />
              <p className="mt-4">Note: File must be PDF, Max Size 2 MB</p>
              {datas?.educationCertificate && (
                <div className="card border-0 shadow" style={{ width: "70%" }}>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: "not-allowed" }}
                  >
                    <img
                      className="card-img-top img-fluid"
                      style={{
                        height: "10rem",
                        pointerEvents: "none",
                        cursor: "not-allowed",
                      }}
                      src={pdfLogo}
                      alt="Education Certificate preview"
                    />
                  </div>
                  <div
                    className="card-body d-flex justify-content-between align-items-center"
                    style={{ flexWrap: "wrap" }}
                  >
                    <p
                      className="card-title fw-semibold mb-0 text-wrap"
                      style={{
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={datas?.educationCertificate?.split("/").pop()}
                    >
                      {datas?.educationCertificate?.split("/").pop()}
                    </p>
                    <a
                      href={datas?.educationCertificate}
                      download
                      className="btn text-dark ms-2"
                      title="Download Certificate"
                      style={{ flexShrink: 0 }}
                    >
                      <MdOutlineDownloadForOffline size={25} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default StaffRequiredAdd;
