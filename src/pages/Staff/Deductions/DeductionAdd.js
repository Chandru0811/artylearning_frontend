import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function DeductionAdd() {
  const validationSchema = Yup.object({
    centerName: Yup.string().required("*Center Name is required"),
    employeeName: Yup.string().required("*Employee Name is required"),
    deductionName: Yup.string().required("*Select the deduction Name"),
    deductionMonth: Yup.string().required("*Select the Deduction Month"),
    deductionAmount: Yup.string().required("*Deduction Amount is required"),
    totalDeductionAmount: Yup.string().required(
      "*Total Deduction Amount is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      centerName: "",
      employeeName: "",
      deductionName: "",
      deductionMonth: "",
      deductionAmount: "",
      totalDeductionAmount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      // try {
      //   const response = await api.post("addPublicHolidays", values);
      //   // console.log(response)
      //   if (response.status === 201) {
      //     toast.success(response.data.message);
      //     navigate("/Holiday");
      //   } else {
      //     toast.error(response.data.message);
      //   }
      // } catch (error) {
      //   toast.error("Error Submiting Data, ", error);
      // }
    },
  });

  return (
    <section className="HolidayAdd p-3">
      <div className="container-fluid">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 text-end">
                <Link to="/deduction">
                  <button type="button" className="btn btn-sm btn-border">
                    Back
                  </button>
                </Link>
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-sm btn-button">
                  Save
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Center Name<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${
                      formik.touched.centerName && formik.errors.centerName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("centerName")}
                    defaultValue={formik.values.centerName} // Set default value here
                  >
                    <option value=""></option>
                    <option value="Arty Learning @ AKM">
                      Arty Learning @ AKM
                    </option>
                    <option value="Arty Learning @ AK">
                      Arty Learning @ AK
                    </option>
                    <option value="Arty Learning @ KK">
                      Arty Learning @ KK
                    </option>
                  </select>

                  {formik.touched.centerName && formik.errors.centerName && (
                    <div className="invalid-feedback">
                      {formik.errors.centerName}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Employee Name<span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-control ${
                      formik.touched.employeeName && formik.errors.employeeName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("employeeName")}
                    defaultValue={formik.values.employeeName} // Set default value here
                  >
                    <option value=""></option>
                    <option value="Arty Learning @ AKM">Suriya</option>
                    <option value="Arty Learning @ AK">Chandru</option>
                    <option value="Arty Learning @ KK">Ragul</option>
                  </select>

                  {formik.touched.employeeName &&
                    formik.errors.employeeName && (
                      <div className="invalid-feedback">
                        {formik.errors.employeeName}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label>Deduction Name</label>
                <span className="text-danger">*</span>
                <div className="mt-2 d-flex">
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox1"
                      name="deductionName"
                      value="CPF"
                      checked={
                        formik.values.deductionName &&
                        formik.values.deductionName.includes("CPF")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox1" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label for="myCheckbox1" className="mx-1">
                      CPF
                    </label>
                  </div>
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox2"
                      name="deductionName"
                      value="LOP"
                      checked={
                        formik.values.deductionName &&
                        formik.values.deductionName.includes("LOP")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox2" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label for="myCheckbox2" className="mx-1">
                      LOP
                    </label>
                  </div>
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox3"
                      name="deductionName"
                      value="Loan Interest"
                      checked={
                        formik.values.deductionName &&
                        formik.values.deductionName.includes("Loan Interest")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label for="myCheckbox3" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label for="myCheckbox3" className="mx-1">
                      Loan Interest
                    </label>
                  </div>
                </div>
                {formik.touched.deductionName &&
                  formik.errors.deductionName && (
                    <div className="error text-danger ">
                      <small>{formik.errors.deductionName}</small>
                    </div>
                  )}
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Deduction Month<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="month"
                    className={`form-control  ${
                      formik.touched.deductionMonth &&
                      formik.errors.deductionMonth
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("deductionMonth")}
                  />
                  {formik.touched.deductionMonth &&
                    formik.errors.deductionMonth && (
                      <div className="invalid-feedback">
                        {formik.errors.deductionMonth}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Deduction Amount<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.deductionAmount &&
                      formik.errors.deductionAmount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("deductionAmount")}
                  />
                  {formik.touched.deductionAmount &&
                    formik.errors.deductionAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.deductionAmount}
                      </div>
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <lable className="form-lable">
                    Total Deduction Amount<span className="text-danger">*</span>
                  </lable>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.totalDeductionAmount &&
                      formik.errors.totalDeductionAmount
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("totalDeductionAmount")}
                  />
                  {formik.touched.totalDeductionAmount &&
                    formik.errors.totalDeductionAmount && (
                      <div className="invalid-feedback">
                        {formik.errors.totalDeductionAmount}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DeductionAdd;
