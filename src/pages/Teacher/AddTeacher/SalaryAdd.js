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
import fetchAllSalaryTypeWithIds from "../../List/SalaryTypeList";

const validationSchema = Yup.object().shape({
  salary: Yup.number()
  .typeError("*Salary must be a number")
  .positive("*Salary must be a positive number")
  .notRequired(),

});

const SalaryAdd = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [salaryTypeData, setSalaryTypeData] = useState(null);
    const userName = localStorage.getItem('userName');

    const fetchData = async () => {
      try {
        const salarytype = await fetchAllSalaryTypeWithIds();
        setSalaryTypeData(salarytype);
      } catch (error) {
        toast.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const formik = useFormik({
      initialValues: {
        salary: formData.salary || "",
        effectiveDate: formData.effectiveDate || "",
        salaryTypeId: formData.salaryTypeId || "",
        createdBy: userName,

      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setLoadIndicators(false);
        try {
          const response = await api.post(
            `/createUserSalaryCreation/${formData.user_id}`,
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
        } catch (error) {
          toast.error(error);
        } finally {
          setLoadIndicators(false);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      salaryAdd: formik.handleSubmit,
    }));

    return (
      <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
        if (e.key === 'Enter' && !formik.isSubmitting) {
          e.preventDefault();  // Prevent default form submission
        }
      }}>
        <section>
          <div className="container" style={{ minHeight: "50vh" }}>
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
                  // onFocus={(e) => e.target.showPicker()}
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
                  name="salaryTypeId"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salaryTypeId}
                >
                  <option value=""></option>
                  {salaryTypeData &&
                    salaryTypeData.map((salaryId) => (
                      <option key={salaryId.id} value={salaryId.id}>
                        {salaryId.salaryType}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </section>
      </form>
    );
  }
);

export default SalaryAdd;
