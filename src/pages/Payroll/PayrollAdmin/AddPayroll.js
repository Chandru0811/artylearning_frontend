import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { format } from "date-fns"; // Import format function from date-fns
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";
import Select from "react-select";

function AddPayroll() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [empRole, setEmpRole] = useState(null);
  const [userSalaryInfo, setUserSalaryInfo] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [bonus, setBonus] = useState(0);
  const [netPay, setNetPay] = useState(0);
  console.log("NET PAY:", netPay);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  console.log("empRole", empRole);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    centerId: Yup.string().required("*Centre name is required"),
    userId: Yup.string().required("*Employee name is required"),
    payrollMonth: Yup.string().test(
      "Payroll Month-required",
      "*Payroll Month is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    bonus: Yup.string().test(
      "Bonus-required",
      "*Bonus is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    deductionAmount: Yup.string().test(
      "Deduction Amount-required",
      "*Deduction Amount is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    shgContribution: Yup.string().test(
      "shgContribution-required",
      "*shgContribution is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    cpfContribution: Yup.string().test(
      "cpfContribution-required",
      "*cpfContribution is required",
      function (value) {
        return empRole !== "freelancer" ? !!value : true;
      }
    ),
    freelancerCount: Yup.string().test(
      "freelancerCount-required",
      "*Freelance count is required",
      function (value) {
        return empRole === "freelancer" ? !!value : true;
      }
    ),
    startDate: Yup.string().test(
      "startDate-required",
      "*Start Date is required",
      function (value) {
        return empRole === "freelancer" ? !!value : true;
      }
    ),
    endDate: Yup.string().test(
      "endDate-required",
      "*End Date is required",
      function (value) {
        return empRole === "freelancer" ? !!value : true;
      }
    ),
    payrollType: Yup.string().test(
      "payrollType-required",
      "*Payroll type is required",
      function (value) {
        return empRole === "freelancer" ? !!value : true;
      }
    ),
    // netPay: Yup.number()
    //   .required("*Net pay is required")
    //   .typeError("Net pay must be a number"),
    status: Yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      userRole: "",
      grossPay: "",
      payrollMonth: "",
      bonus: 0,
      deductionAmount: 0,
      netPay: "",
      status: "",
      shgContribution: "",
      cpfContribution: "",
      freelancerCount: "",
      payrollType: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("VALUES:", values);

      setLoadIndicator(true);
      values.createdBy = userName;
      let selectedCenterName = "";
      let selectedEmployeeName = "";

      centerData.forEach((center) => {
        if (parseInt(values.centerId) === center.id) {
          selectedCenterName = center.centerNames || "--";
        }
      });

      userNamesData.forEach((employee) => {
        if (parseInt(values.userId) === employee.value) {
          selectedEmployeeName = employee.userNames || "--";
        }
      });

      let payload = {
        centerName: selectedCenterName,
        centerId: values.centerId,
        userId: values.userId,
        employeeName: selectedEmployeeName,
        netPay: values.netPay,
        status: values.status,
      };

      if (empRole !== "freelancer") {
        payload = {
          ...payload,
          payrollMonth: values.payrollMonth,
          bonus: values.bonus,
          grossPay: values.grossPay,
          deductionAmount: values.deductionAmount,
          shgContribution: values.shgContribution,
          cpfContribution: values.cpfContribution,
        };
      } else if (empRole === "freelancer") {
        payload = {
          ...payload,
          netPay: empRole === "freelancer" ? netPay : values.netPay,
          payrollType: values.payrollType,
          freelancerCount: Number(values.freelancerCount),
          startDate: values.startDate,
          endDate: values.endDate,
        };
      }
      console.log("Payload Values:", payload);
      try {
        const response = await api.post(
          empRole === "freelancer"
            ? "/createFreelancerPayroll"
            : "/createUserPayroll",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201 || response.status === 200) {
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
    setEmployeeOptions([]);

    try {
      await fetchUserName(centerId);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const currentMonth = format(new Date(), "yyyy-MM");
    formik.setFieldValue("payrollMonth", currentMonth);
  }, []);

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
      const formattedEmployee = userNames.map((employee) => ({
        value: employee.id,
        label: employee.userNames,
      }));
      setEmployeeOptions(formattedEmployee);
      setUserNameData(formattedEmployee);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchUserSalaryInfo = async (userId, payrollMonth) => {
    // alert(userId, payrollMonth);
    const queryParams = new URLSearchParams({
      userId: userId,
      payrollMonth: payrollMonth,
    });
    if (userId && payrollMonth) {
      try {
        const response = await api.get(
          `/getCurrentMonthUserDeductionAndAdditional?${queryParams}`,
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
    }
  };

  const handleUserChange = async (event) => {
    const userId = event.target.value;
    formik.setFieldValue("userId", userId);
    formik.setFieldValue("grossPay", "");
    formik.setFieldValue("netPay", "");
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
      if (empRole !== "freelancer") {
        const grossPay = parseFloat(formik.values.grossPay) || 0;
        const bonus = parseFloat(formik.values.bonus) || 0;
        const deductionAmount = parseFloat(formik.values.deductionAmount) || 0;
        const cpf = parseFloat(formik.values.cpfContribution) || 0;
        const shg = parseFloat(formik.values.shgContribution) || 0;
        const netPay = grossPay + bonus - deductionAmount - cpf - shg;
        formik.setFieldValue("netPay", isNaN(netPay) ? 0 : netPay.toFixed(2));
      } else {
        formik.setFieldValue("netPay", "");
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
        const selectedEmployeeRole = employee.role;
        setEmpRole(selectedEmployeeRole);
      }
    });
  }, [formik.values.userId]);

  const fetchUserPaymenthours = async (startDate, endDate, userId) => {
    const queryParams = new URLSearchParams({
      startDate: startDate,
      endDate: endDate,
    });
    try {
      const response = await api.get(
        `/getFreelancerPayableHours/${userId}?${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      formik.setFieldValue("netPay", response.data.netPay);
      formik.setFieldValue("freelancerCount", response.data.payable_hours); // Assuming "count" is the field in the response data
    } catch (error) {
      toast.warning("Attendance date not available for this Employee");
    }
  };

  const fetchUserPaymentInfo = async (freelancerCount, payrollType) => {
    const queryParams = new URLSearchParams({
      payrollType: payrollType,
      freelanceCount: freelancerCount,
    });
    if (freelancerCount || payrollType) {
      try {
        const response = await api.get(`/freelancerPayment?${queryParams}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const netPay = response.data.netPay;
        formik.setFieldValue("netPay", response.data.netPay);
        setNetPay(netPay);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchUserPaymentData = async () => {
      const { freelancerCount, payrollType, startDate, endDate, userId } =
        formik.values;

      await fetchUserPaymentInfo(freelancerCount, payrollType);
      if (empRole === "freelancer" && userId && startDate && endDate) {
        // Check if empRole is freelancer
        await fetchUserPaymenthours(startDate, endDate, userId);
      }
    };

    fetchUserPaymentData();
  }, [
    formik.values.freelancerCount,
    formik.values.payrollType,
    formik.values.startDate,
    formik.values.endDate,
    formik.values.userId,
    empRole,
  ]);

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/payrolladmin" className="custom-breadcrumb">
            Payroll
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Payroll Add
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault(); // Prevent default form submission
          }
        }}
      >
        <div className="card">
          <div
            className="d-flex justify-content-between align-items-center p-1 mb-4 px-4"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Add Payroll</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/payrolladmin">
                <button type="button " className="btn btn-sm btn-border">
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
                <span className="fw-medium">Save</span>
              </button>
            </div>
          </div>
          <div className="container px-4">
            <div className="row">
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
              <div className="col-md-6 col-12 mb-3">
                <label className="">Employee Name</label>{" "}
                <span className="text-danger">*</span>
                <Select
                  options={employeeOptions}
                  name="userId"
                  value={
                    employeeOptions.find(
                      (option) => option.value === formik.values.userId
                    ) || null
                  } // Default to null if no match is found
                  onChange={(selectedOption) => {
                    const userId = selectedOption ? selectedOption.value : "";
                    formik.setFieldValue("userId", userId); // Safely set userId
                    handleUserChange({ target: { value: userId } }); // Trigger handleUserChange manually
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="Select Employee"
                  isSearchable
                  isClearable
                  className={`react-select ${
                    formik.touched.userId && formik.errors.userId
                      ? "is-invalid"
                      : ""
                  }`}
                />
                {formik.touched.userId && formik.errors.userId && (
                  <div className="invalid-feedback">{formik.errors.userId}</div>
                )}
              </div>

              {empRole !== "freelancer" && (
                <>
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
                        {...formik.getFieldProps("shgContribution")}
                        readOnly
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
                        {...formik.getFieldProps("cpfContribution")}
                        readOnly
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
                        Start Date<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        className={`form-control ${
                          formik.touched.startDate && formik.errors.startDate
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="startDate"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("startDate")}
                      />
                      {formik.touched.startDate && formik.errors.startDate && (
                        <div className="invalid-feedback">
                          {formik.errors.startDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="text-start mt-2 mb-3">
                      <label className="form-label">
                        End Date<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        className={`form-control ${
                          formik.touched.endDate && formik.errors.endDate
                            ? "is-invalid"
                            : ""
                        }`}
                        aria-label="endDate"
                        aria-describedby="basic-addon1"
                        {...formik.getFieldProps("endDate")}
                      />
                      {formik.touched.endDate && formik.errors.endDate && (
                        <div className="invalid-feedback">
                          {formik.errors.endDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="text-start mt-2 mb-3">
                      <label className="form-label">
                        Payroll Type<span className="text-danger">*</span>
                      </label>
                      <select
                        type="text"
                        className={`form-select ${
                          formik.touched.payrollType &&
                          formik.errors.payrollType
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
                        {...formik.getFieldProps("freelancerCount")}
                        className={`form-control ${
                          formik.touched.freelancerCount &&
                          formik.errors.freelancerCount
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("freelancerCount")}
                        readOnly
                      />
                      {formik.touched.freelancerCount &&
                        formik.errors.freelancerCount && (
                          <div className="invalid-feedback">
                            {formik.errors.freelancerCount}
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
                    type="number"
                    name="netPay"
                    className={`form-control  ${
                      formik.touched.netPay && formik.errors.netPay
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("netPay")}
                    readOnly
                  />
                  {formik.touched.netPay && formik.errors.netPay && (
                    <div className="invalid-feedback">
                      {formik.errors.netPay}
                    </div>
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
                    <div className="invalid-feedback">
                      {formik.errors.status}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPayroll;
