import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  salary: Yup.number()
    .typeError("*Salary Must be numbers")
    .notRequired()
});

const StaffSalaryEdit = forwardRef(
  ({ formData,setLoadIndicators, setFormData, handleNext }, ref) => {
    const formik = useFormik({
      initialValues: {
        salary: "",
        effectiveDate: "",
        salaryType: "",
      },

      // onSubmit: async (data) => {
      //   try {
      //     const response = await api.put(
      //       `/updateUserSalaryCreation/${data.salaryId}`,
      //       data,
      //       {
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     );
      //     if (response.status === 200) {
      //       toast.success(response.data.message);
      //       setFormData((prv) => ({ ...prv, ...data }));
      //       handleNext();
      //     } else {
      //       toast.error(response.data.message);
      //     }
      //   } catch (error) {
      //     toast.error(error);
      //   }
      // },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(true);
        console.log("Api Data:", values);
        try {
          if (values.salaryId !== null) {
            const response = await api.put(
              `/updateUserSalaryCreation/${values.salaryId}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (response.status === 200) {
              toast.success(response.data.message);
              setFormData((prv) => ({ ...prv, ...values }));
              handleNext();
            } else {
              toast.error(response.data.message);
            }
          } else {
            const response = await api.post(
              `/createUserSalaryCreation/${formData.staff_id}`,
              values,
              {
                headers: {
                  "Content-Type": "application/json",
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
          toast.error(error);
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
            response.data.userSalaryCreationModels &&
            response.data.userSalaryCreationModels.length > 0
          ) {
            formik.setValues({
              ...response.data.userSalaryCreationModels[0],
              salaryId: response.data.userSalaryCreationModels[0].id,
              effectiveDate:
                response.data.userSalaryCreationModels[0].effectiveDate.substring(
                  0,
                  10
                ),
            });
          } else {
            formik.setValues({
              salaryId: null,
              salary: "",
              effectiveDate: "",
              salaryType: "",
            });
            // console.log("Salary ID:", formik.values.salaryId);
          }
        } catch (error) {
          toast.error("Error Fetching Data ", error);
        }
      };
      // console.log(formik.values);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({
      staffSalaryEdit: formik.handleSubmit,
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
  }
);
export default StaffSalaryEdit;
