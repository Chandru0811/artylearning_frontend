import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

const validationSchema = Yup.object({
  centerId: Yup.number().required("*Center Name is required"),
  userId: Yup.number().required("*Employee Name is required"),
  allDeduction: Yup.string().required("*Select the Deduction Name"),
  deductionMonth: Yup.string().required("*Select the Deduction Month"),
  deductionAmount: Yup.string().required("*Deduction Amount is required"),
});

function DeductionAdd() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      allDeduction: "",
      deductionMonth: "",
      deductionAmount: "",
     
    },
     validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Attendance Emp:", values);
      let selectedCenterName = "";
      let selectedEmployeeName = "";

      centerData.forEach((center) => {
        if (parseInt(values.centerId) === center.id) {
          selectedCenterName = center.centerNames || "--";
        }
      });

      userNamesData.forEach((employee) => {
        if (parseInt(values.userId) === employee.id) {
          selectedEmployeeName = employee.userNames || "--";
        }
      });

      let payload = {
        centerId: values.centerId,
        centerName: selectedCenterName,
        userId: values.employeeName,
        employeeName: selectedEmployeeName,
        allDeduction: values.allDeduction,
        deductionMonth: values.deductionMonth,
        deductionAmount: values.deductionAmount,
      };

      try {
        const response = await api.post("/createUserDeduction", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/deduction");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  const handleCenterChange = async (event) => {
    setUserNameData(null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    try {
      await fetchUserName(centerId);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserName = async (centerId) => {
    try {
      const userNames = await fetchAllEmployeeListByCenter(centerId);
      setUserNameData(userNames);
    } catch (error) {
      toast.error(error);
    }
  };


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
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Centre Name</lable>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("centerId")}
                  className={`form-select ${
                    formik.touched.centerId && formik.errors.centerId
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                  onChange={handleCenterChange}
                >
                  <option selected disabled></option>
                  {centerData &&
                    centerData.map((center) => (
                      <option key={center.id} value={center.id}>
                        {center.centerNames}
                      </option>
                    ))}
                </select>
                {formik.touched.centerId && formik.errors.centerId && (
                  <div className="invalid-feedback">
                    {formik.errors.centerId}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Employee Name</lable>
                <select
                  {...formik.getFieldProps("userId")}
                  class={`form-select  ${
                    formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option selected disabled></option>
                  {userNamesData &&
                    userNamesData.map((userName) => (
                      <option key={userName.id} value={userName.id}>
                        {userName.userNames}
                      </option>
                    ))}
                </select>
                {formik.touched.userId && formik.errors.userId && (
                  <div className="invalid-feedback">{formik.errors.userId}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Deduction Name</lable>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("allDeduction")}
                  className={`form-select ${
                    formik.touched.allDeduction && formik.errors.allDeduction
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                 
                >
                  <option></option>
                  <option>CPF</option>
                  <option>LOP</option>
                  <option>LOAN INTEREST</option>
                 
                </select>
                {formik.touched.allDeduction && formik.errors.allDeduction && (
                  <div className="invalid-feedback">
                    {formik.errors.allDeduction}
                  </div>
                )}
              </div>

              {/* <div className="col-md-6 col-12">
                <label>Deduction Name</label>
                <span className="text-danger">*</span>
                <div className="mt-2 d-flex">
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox1"
                      name="allDeduction"
                      value="CPF"
                      checked={
                        formik.values.allDeduction &&
                        formik.values.allDeduction.includes("CPF")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="myCheckbox1" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label htmlFor="myCheckbox1" className="mx-1">
                      CPF
                    </label>
                  </div>
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox2"
                      name="allDeduction"
                      value="LOP"
                      checked={
                        formik.values.allDeduction &&
                        formik.values.allDeduction.includes("LOP")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <label htmlFor="myCheckbox2" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label htmlFor="myCheckbox2" className="mx-1">
                      LOP
                    </label>
                  </div>
                  <div className="checkbox-container mx-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="myCheckbox3"
                      name="allDeduction"
                      value="LOAN_INTEREST"
                      checked={
                        formik.values.allDeduction &&
                        formik.values.allDeduction.includes("LOAN_INTEREST")
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    <label htmlFor="myCheckbox3" className="custom-checkbox">
                      <div className="inner-square"></div>
                    </label>
                    <label htmlFor="myCheckbox3" className="mx-1">
                      Loan Interest
                    </label>
                  </div>
                </div>
                {formik.touched.allDeduction && formik.errors.allDeduction && (
                  <div className="error text-danger ">
                    <small>{formik.errors.allDeduction}</small>
                  </div>
                )}
              </div> */}

              <div className="col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Deduction Month<span className="text-danger">*</span>
                  </label>
                  <input
                    type="month"
                    className={`form-control ${
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

              <div className="col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Deduction Amount<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
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

              {/* <div className="col-md-6 col-12">
                <div className="text-start mt-2 mb-3">
                  <label className="form-label">
                    Total Deduction Amount<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
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
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DeductionAdd;
