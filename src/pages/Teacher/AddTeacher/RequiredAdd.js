import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import pdfLogo from "../../../assets/images/Attactmentpdf.jpg";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const RequiredAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext, roleF }, ref) => {

    const userName = localStorage.getItem("userName");
    const [datas, setDatas] = useState();
    const role = formData.role;
    console.log("Role:", formData.role);

    const formik = useFormik({
      initialValues: {
        resume: null || "",
        educationCertificate: null || "",
      },
      onSubmit: async (values) => {
        setLoadIndicators(true);
        try {
          const formDatas = new FormData();

          const userId = formData.user_id;
          formDatas.append("userId", userId);
          formDatas.append("resume", values.resume);
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
              userEnquireId: response.data.userRequireInformationModels[0].id,
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
      requireAdd: formik.handleSubmit,
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
          <div class="row">
            <div class="col-md-6 col-12 mb-2">
              <label>Resume / CV</label>
              <input
                type="file"
                class="form-control mt-3"
                accept=".pdf"
                name="resume"
                onChange={(event) => {
                  formik.setFieldValue("resume", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              <p class="mt-4">Note : File must be PDF,Max Size 2 MB</p>
              {datas?.resume && (
                <div class="card border-0 shadow" style={{ width: "18rem" }}>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: "not-allowed" }}
                  >
                    <img
                      class="card-img-top img-fluid"
                      style={{
                        height: "10rem",
                        pointerEvents: "none",
                        cursor: "not-allowed",
                      }}
                      src={pdfLogo}
                      alt="Resume preview"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div class="card-body d-flex justify-content-between align-items-center">
                    <p class="card-title fw-semibold text-wrap">
                      {datas?.resume?.split("/").pop()}
                    </p>
                    <a
                      href={datas?.resume}
                      download
                      class="btn text-dark"
                      title="Download Resume"
                    >
                      <MdOutlineDownloadForOffline size={25} />
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div class="col-md-6 col-12 mb-2">
              <label>Education Certificate</label>
              <input
                type="file"
                class="form-control mt-3"
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
              <p class="mt-4">Note : File must be PDF,Max Size 2 MB</p>
              {datas?.educationCertificate && (
                <div class="card border-0 shadow" style={{ width: "18rem" }}>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ cursor: "not-allowed" }}
                  >
                    <img
                      class="card-img-top img-fluid"
                      style={{
                        height: "10rem",
                        pointerEvents: "none",
                        cursor: "not-allowed",
                      }}
                      src={pdfLogo}
                      alt="Education Certificate preview"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div class="card-body d-flex justify-content-between align-items-center">
                    <p class="card-title fw-semibold text-wrap">
                      {datas?.educationCertificate?.split("/").pop()}
                    </p>
                    <a
                      href={datas?.educationCertificate}
                      download
                      class="btn text-dark"
                      title="Download Certificate"
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

export default RequiredAdd;
