import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { format } from "date-fns"; // Import format function from date-fns
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

const validationSchema = Yup.object().shape({
  centerId: Yup.string().required("*Centre name is required"),
  userId: Yup.string().required("*Employee name is required"),
  payrollMonth: Yup.string().when("userId", {
    is: (empRole) => empRole !== "freelancer",
    then: (schema) => schema.required("*Select the Payroll Month"),
    otherwise: (schema) => schema.notRequired(),
  }),
  bonus: Yup.number().when("userId", {
    is: (empRole) => empRole !== "freelancer",
    then: (schema) =>
      schema.required("*Bonus is required").typeError("Bonus must be a number"),
    otherwise: (schema) => schema.notRequired(),
  }),
  deductionAmount: Yup.number().when("userId", {
    is: (empRole) => empRole !== "freelancer",
    then: (schema) =>
      schema
        .required("*Deduction is required")
        .typeError("Deduction must be a number"),
    otherwise: (schema) => schema.notRequired(),
  }),
  shgContribution: Yup.string().when("userId", {
    is: (empRole) => empRole !== "freelancer",
    then: (schema) => schema.required("*shgContribution is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  cpfContribution: Yup.string().when("userId", {
    is: (empRole) => empRole !== "freelancer",
    then: (schema) => schema.required("*cpfContribution is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  freelanceCount: Yup.string().when("userId", {
    is: (empRole) => empRole === "freelancer",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  payrollType: Yup.string().when("userId", {
    is: (empRole) => empRole === "freelancer",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired(),
  }),
  netPay: Yup.number()
    .required("*Net pay is required")
    .typeError("Net pay must be a number"),
  status: Yup.string().required("*Status is required"),
});

function AddPayroll() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [empRole, setEmpRole] = useState(null);
  const [userSalaryInfo, setUserSalaryInfo] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [bonus, setBonus] = useState(0);
  console.log("empRole", empRole);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      grossPay: "",
      payrollMonth: "",
      bonus: 0,
      deductionAmount: 0,
      netPay: 0,
      status: "",
      shgContribution: "",
      cpfContribution: "",
      freelanceCount: "",
      payrollType: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
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
        centerName: selectedCenterName,
        centerId: values.centerId,
        userId: values.userId,
        employeeName: selectedEmployeeName,
        grossPay: values.grossPay,
        netPay: values.netPay,
        status: values.status,
      };

      if (empRole !== "freelancer") {
        payload = {
          centerName: selectedCenterName,
          centerId: values.centerId,
          userId: values.userId,
          employeeName: selectedEmployeeName,
          grossPay: values.grossPay,
          netPay: values.netPay,
          status: values.status,
          payrollMonth: values.payrollMonth,
          bonus: values.bonus,
          deductionAmount: values.deductionAmount,
          shgContribution: values.shgContribution,
          cpfContributions: values.cpfContribution,
        };
      } else if (empRole === "freelancer") {
        payload = {
          centerName: selectedCenterName,
          centerId: values.centerId,
          userId: values.userId,
          employeeName: selectedEmployeeName,
          grossPay: values.grossPay,
          netPay: values.netPay,
          status: values.status,
          payrollType: values.payrollType,
          freelanceCount: Number(values.freelanceCount),
        };
      }

      try {
        const response = await api.post("/createFreelancePayroll", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/payrolladmin");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          toast.warning("The payroll for this user has already been generated");
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleCenterChange = async (event) => {
    setUserNameData(null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    formik.setFieldValue("deductionAmount", "");
    formik.setFieldValue("grossPay", "");
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

  const fetchUserSalaryInfo = async (userId, payrollMonth) => {
    // alert(userId, payrollMonth);
    const queryParams = new URLSearchParams({
      userId: userId,
      deductionMonth: payrollMonth,
    });

    try {
      const response = await api.get(
        `/getCurrentMonthUserDeduction?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserSalaryInfo(response.data);
      formik.setFieldValue("deductionAmount", response.data.deductionAmount);
      formik.setFieldValue("grossPay", response.data.basicPay);
      formik.setFieldValue("cpfContribution", response.data.cpfContribution);
      formik.setFieldValue("shgContribution", response.data.shgContribution);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const currentMonth = format(new Date(), "yyyy-MM");
    formik.setFieldValue("payrollMonth", currentMonth);
  }, []);

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    formik.setFieldValue("userId", userId);
    formik.setFieldValue("grossPay", "");
    const { payrollMonth } = formik.values;
    await fetchUserSalaryInfo(userId, payrollMonth);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { userId, payrollMonth } = formik.values;
      await fetchUserSalaryInfo(userId, payrollMonth);
    };

    fetchUserData();
  }, [formik.values.userId, formik.values.payrollMonth]);

  useEffect(() => {
    const calculateNetPay = () => {
      if (empRole !== "freelancer" && formik.values.grossPay) {
        const grossPay = parseFloat(formik.values.grossPay) || 0;
        const bonus = parseFloat(formik.values.bonus) || 0;
        const deductionAmount = parseFloat(formik.values.deductionAmount) || 0;
        const cpf = parseFloat(formik.values.cpfContribution) || 0;
        const shg = parseFloat(formik.values.shgContribution) || 0;
        const netPay = grossPay + bonus - deductionAmount - cpf - shg;
        formik.setFieldValue("netPay", isNaN(netPay) ? 0 : netPay.toFixed(2));
      } else {
        const grossPay = parseFloat(formik.values.grossPay) || 0;
        const netPay = grossPay;
        formik.setFieldValue("netPay", isNaN(netPay) ? 0 : netPay.toFixed(2));
      }
    };
    calculateNetPay();
  }, [
    formik.values.grossPay,
    formik.values.bonus,
    formik.values.deductionAmount,
  ]);

  useEffect(() => {
    userNamesData?.forEach((employee) => {
      if (parseInt(formik.values.userId) === employee.id) {
        // const  selectedEmployeeName = employee.userNames || "--";
        const selectedEmployeeRole = employee.role;
        setEmpRole(selectedEmployeeRole);
      }
    });
  }, [formik.values.userId]);

  return (
    <div className="container-fluid">
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-end">
              <Link to="/payrolladmin">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
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
                <div className="invalid-feedback">{formik.errors.centerId}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3 ">
              <lable className="">Employee Name</lable>{" "}
              <span className="text-danger">*</span>
              <select
                {...formik.getFieldProps("userId")}
                class={`form-select  ${
                  formik.touched.userId && formik.errors.userId
                    ? "is-invalid"
                    : ""
                }`}
                onChange={handleUserChange}
              >
                <option></option>
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

            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Basic Pay<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.grossPay && formik.errors.grossPay
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("grossPay")}
                  readOnly
                />
                {formik.touched.grossPay && formik.errors.grossPay && (
                  <div className="invalid-feedback">
                    {formik.errors.grossPay}
                  </div>
                )}
              </div>
            </div>
            {empRole !== "freelancer" && (
              <>
                <div className="col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <label className="form-label">
                      Payroll Month<span className="text-danger">*</span>
                    </label>
                    <input
                      type="month"
                      className={`form-control ${
                        formik.touched.payrollMonth &&
                        formik.errors.payrollMonth
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("payrollMonth")}
                    />
                    {formik.touched.payrollMonth &&
                      formik.errors.payrollMonth && (
                        <div className="invalid-feedback">
                          {formik.errors.payrollMonth}
                        </div>
                      )}
                  </div>
                </div>
                <div className="  col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <lable className="form-lable">
                      Bonus<span className="text-danger">*</span>
                    </lable>
                    <input
                      type="text"
                      className={`form-control  ${
                        formik.touched.bonus && formik.errors.bonus
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("bonus")}
                    />
                    {formik.touched.bonus && formik.errors.bonus && (
                      <div className="invalid-feedback">
                        {formik.errors.bonus}
                      </div>
                    )}
                  </div>
                </div>
                <div className="  col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <lable className="form-lable">
                      Deduction<span className="text-danger">*</span>
                    </lable>
                    <input
                      type="text"
                      className={`form-control  ${
                        formik.touched.deductionAmount &&
                        formik.errors.deductionAmount
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("deductionAmount")}
                      readOnly
                    />
                    {formik.touched.deductionAmount &&
                      formik.errors.deductionAmount && (
                        <div className="invalid-feedback">
                          {formik.errors.deductionAmount}
                        </div>
                      )}
                  </div>
                </div>
                <div className="  col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <lable className="form-lable">
                      SHG<span className="text-danger">*</span>
                    </lable>
                    <input
                      type="text"
                      className={`form-control  ${
                        formik.touched.shgContribution &&
                        formik.errors.shgContribution
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("shgContribution")}
                    />
                    {formik.touched.shgContribution &&
                      formik.errors.shgContribution && (
                        <div className="invalid-feedback">
                          {formik.errors.shgContribution}
                        </div>
                      )}
                  </div>
                </div>
                <div className="  col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <lable className="form-lable">
                      CPF<span className="text-danger">*</span>
                    </lable>
                    <input
                      type="text"
                      className={`form-control  ${
                        formik.touched.cpfContribution &&
                        formik.errors.cpfContribution
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("cpfContribution")}
                    />
                    {formik.touched.cpfContribution &&
                      formik.errors.cpfContribution && (
                        <div className="invalid-feedback">
                          {formik.errors.cpfContribution}
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}
            {empRole === "freelancer" && (
              <>
                <div className="col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <label className="form-label">
                      Payroll Type<span className="text-danger">*</span>
                    </label>
                    <select
                      type="text"
                      className={`form-select ${
                        formik.touched.payrollType && formik.errors.payrollType
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("payrollType")}
                    >
                      <option></option>
                      <option value="HOURLY">HOURLY</option>
                      <option value="SESSION">SESSION</option>
                      <option value="PACKAGE">PACKAGE</option>
                    </select>
                    {formik.touched.payrollType &&
                      formik.errors.payrollType && (
                        <div className="invalid-feedback">
                          {formik.errors.payrollType}
                        </div>
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="text-start mt-2 mb-3">
                    <label className="form-label">
                      Count<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      onInput={(event) => {
                        let value = event.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, 3);
                        if (value > 150) {
                          value = "150";
                          toast.warning("Maximum value is 150");
                        }
                        event.target.value = value;
                        formik.setFieldValue("freelanceCount", value);
                      }}
                      className={`form-control ${
                        formik.touched.freelanceCount &&
                        formik.errors.freelanceCount
                          ? "is-invalid"
                          : ""
                      }`}
                      aria-label="freelanceCount"
                      aria-describedby="basic-addon1"
                      {...formik.getFieldProps("freelanceCount")}
                    />
                    {formik.touched.freelanceCount &&
                      formik.errors.freelanceCount && (
                        <div className="invalid-feedback">
                          {formik.errors.freelanceCount}
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Net Pay<span className="text-danger">*</span>
                </lable>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.netPay && formik.errors.netPay
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  {...formik.getFieldProps("netPay")}
                  readOnly
                />
                {formik.touched.netPay && formik.errors.netPay && (
                  <div className="invalid-feedback">{formik.errors.netPay}</div>
                )}
              </div>
            </div>
            <div className="  col-md-6 col-12">
              <div className="text-start mt-2 mb-3">
                <lable className="form-lable">
                  Status<span className="text-danger">*</span>
                </lable>
                <select
                  {...formik.getFieldProps("status")}
                  className={`form-select    ${
                    formik.touched.status && formik.errors.status
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="PENDING">Pending</option>
                </select>

                {formik.touched.status && formik.errors.status && (
                  <div className="invalid-feedback">{formik.errors.status}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPayroll;
