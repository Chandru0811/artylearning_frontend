import React, { forwardRef, useImperativeHandle }  from 'react';
import { useFormik } from "formik";

const StaffRequiredAdd= forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref)=> {
  const formik = useFormik({
    initialValues: {
    resume: null || "",
    educationCertificate: null || "",
    },
   
    onSubmit: (data) => {
      setLoadIndicators(true);
      setFormData((prv) => ({ ...prv, ...data }));
      // console.log("form parent",formData );
      // console.log("data", data);
      setLoadIndicators(false);
    },
  });
  const handleNextStep = () => {
    // e.preventDefault()
    formik.validateForm().then((errors) => {
      formik.handleSubmit();
      if (Object.keys(errors).length === 0) {
        handleNext();
      }
    });
  };
  useImperativeHandle(ref, () => ({
    staffRequireAdd: handleNextStep,
  }));
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container" style={{ minHeight: "60vh" }}>
        <p className="headColor my-4">Required Information</p>
        <div class="row">
          <div class="col-md-6 col-12 mb-2">
            <label>
              Resume / CV 
            </label>
            <input type="file" 
            class="form-control    mt-3" accept=".pdf" 
            name="resume"
               onChange={(event) => {
                formik.setFieldValue("resume", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              />
            <p class="mt-4">Note : File must be PDF,Max Size 2 MB</p>
            
          </div>
          <div class="col-md-6 col-12 mb-2">
            <label>
              Education Certificate 
            </label>
            <input type="file" 
            class="form-control    mt-3" accept=".pdf" 
            name="educationCertificate"
               onChange={(event) => {
                formik.setFieldValue("educationCertificate", event.currentTarget.files[0]);
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


export default StaffRequiredAdd;
