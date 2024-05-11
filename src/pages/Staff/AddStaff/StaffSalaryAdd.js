import React, { forwardRef, useImperativeHandle }  from 'react';
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import api from '../../../config/URL';
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  salary: Yup.number()
    .typeError("*Salary Must be numbers")
    .notRequired()
});

const StaffSalaryAdd=forwardRef(({ formData,setLoadIndicators, setFormData, handleNext }, ref)=>{
  const formik = useFormik({
    initialValues: {
      salary: formData.salary || "",
      effectiveDate: formData.effectiveDate || "",
      salaryType: formData.salaryType || "",

    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicators(true);
      try {
        const response = await api.post(`/createUserSalaryCreation/${formData.user_id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          setFormData((prv) => ({ ...prv, ...values}));
          handleNext();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally{
        setLoadIndicators(false);
      }
    },
  });

  useImperativeHandle(ref, () => ({
    staffSalaryAdd: formik.handleSubmit,
  }));

  return (
    <form onSubmit={formik.handleSubmit}>
    <section>
    <div className="container" style={{ minHeight: "70vh" }}>
      <p className="headColor my-4">Salary Information</p>
      <div class="row">
      <div class="col-md-6 col-12 mb-2 mt-3">
            <label>Salary</label>
            <input
              type="text"
              className="form-control"
              name="salary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salary}
            />
            {formik.touched.salary && formik.errors.salary && (
                  <div className="error text-danger ">
                    <small>{formik.errors.salary}</small>
                  </div>
                )}
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>Effective Date</label>
            <input
              type="date"
              className="form-control"
              name="effectiveDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.effectiveDate}
            />
           
          </div>
          <div class="col-md-6 col-12 mb-2 mt-3">
            <label>Salary Type</label>
            <select
              type="text"
              className="form-select"
              name="salaryType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salaryType}
            
            >
            <option value=""></option>
            <option value="Basic">Basic</option>
            <option value="DA">DA</option>
            <option value="HRA">HRA</option>
            
            </select>
            
          </div>
      </div>
    </div>
  </section>
  </form>
  );
})

export default StaffSalaryAdd;
