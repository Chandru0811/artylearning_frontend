import React, { forwardRef, useEffect, useImperativeHandle }  from 'react';
import { useFormik } from "formik";
import api from '../../../config/URL';
import { toast } from 'react-toastify';

const RequiredEdit=forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref)=>{
  console.log("required",formData)
  const formik = useFormik({
    initialValues: {
      resume: null || "",
      educationCertificate: null || "",
    },
    onSubmit: async (values) => {
      setLoadIndicators(true);
      try {
        if (values.userEnquireId !== null) {
          const formDatas = new FormData();
        // Add each data field manually to the FormData object
        formDatas.append("resume", values.resume);
        formDatas.append("educationCertificate", values.educationCertificate);

        const response = await api.put(
          `/updateUserRequireInformation/${values.userEnquireId}`,
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
        } else {
          const formDatas = new FormData();
          // Add each data field manually to the FormData object
          const userId = formData.staff_id;
          formDatas.append("userId", userId);
          formDatas.append("resume", values.resume);
          formDatas.append("educationCertificate", values.educationCertificate);
          
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
        }
      } catch (error) {
        if(error?.response?.status === 409){
          toast.warning(error?.response?.data?.message)
        } else {
          toast.error("Error Submiting data " ,error?.response?.data?.message )
        }
      }finally{
        setLoadIndicators(false);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getAllUsersById/${formData.staff_id}`
        );
        if (
          response.data.userRequireInformationModels &&
          response.data.userRequireInformationModels.length > 0
        ) {
          formik.setValues({
            ...response.data.userRequireInformationModels[0],
            userEnquireId: response.data.userRequireInformationModels[0].id,
          });
        } else {
          formik.setValues({
            userEnquireId: null,
            resume:null || "",
            educationCertificate: null || ""
          });
          // console.log("Contact ID:", formik.values.contactId);
        }
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };
    // console.log(formik.values);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    requireEdit: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className="container" style={{ minHeight: "60vh" }}>
      <p className="headColor my-4">Required Information</p>
      <div class="row">
        <div class="col-md-6 col-12 mb-2">
          <label>Resume / CV</label>
          <input
            type="file"
            class="form-control mt-3"
            // accept=".pdf"
            name="resume"
            onChange={(event) => {
              formik.setFieldValue("resume", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          <p class="mt-4">Note : File must be PDF,Max Size 2 MB</p>
        </div>
        <div class="col-md-6 col-12 mb-2">
          <label>Education Certificate</label>
          <input
            type="file"
            class="form-control mt-3"
            // accept=".pdf"
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
        </div>
      </div>
    </div>
  </form>
  );
})

export default RequiredEdit;
