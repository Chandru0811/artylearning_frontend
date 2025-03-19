import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
import { format } from "date-fns";
import fetchUserListWithoutFreelancerByCenterId from "../../List/UserListWithoutFreelancer";
import Select from "react-select";

const validationSchema = Yup.object({
  centerId: Yup.number().required("*Center Name is required"),
  userId: Yup.number().required("*Employee Name is required"),
  deductionName: Yup.string().required("*Select the Deduction Name"),
  deductionMonth: Yup.string().required("*Select the Deduction Month"),
  deductionAmount: Yup.number()
    .typeError("*Deduction Amount must be a number")
    .required("*Deduction Amount is required")
    .positive("*Deduction Amount must be a positive value"),
});

function DeductionAdd() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [employeeOptions, setEmployeeOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      employeeName: "",
      deductionName: "",
      deductionMonth: "",
      deductionAmount: "",
      createdBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      values.createdBy = userName;
      console.log("Formik Values Before Submission:", values);

      let selectedCenterName = "";
      centerData.forEach((center) => {
        if (parseInt(values.centerId) === center.id) {
          selectedCenterName = center.centerNames || "--";
        }
      });

      const payload = {
        centerId: values.centerId,
        centerName: selectedCenterName,
        userId: values.userId,
        employeeName: values.employeeName || "--",
        deductionName: values.deductionName,
        deductionMonth: values.deductionMonth,
        deductionAmount: values.deductionAmount,
      };
      console.log("Payload:", payload);

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
        toast.error(error.message || "An error occurred");
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleCenterChange = async (event) => {
    setUserNameData(null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    formik.setFieldValue("userId", "");
    formik.setFieldValue("employeeName", "");
    setEmployeeOptions([]);

    try {
      await fetchUserName(centerId);
    } catch (error) {
      toast.error(error.message || "Failed to fetch employees");
    }
  };

  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error.message || "Failed to fetch centers");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserName = async (centerId) => {
    try {
      const userNames = await fetchUserListWithoutFreelancerByCenterId(
        centerId
      );
      const formattedEmployee = userNames.map((employee) => {
        const option = {
          value: employee.id,
          label: employee.userNames || "Unknown", // Fallback if userNames is missing
        };
        console.log("Formatted Employee Option:", option); // Debug
        return option;
      });
      setEmployeeOptions(formattedEmployee);
      setUserNameData(formattedEmployee);
    } catch (error) {
      toast.error(error.message || "Failed to fetch employee names");
    }
  };

  useEffect(() => {
    const currentMonth = format(new Date(), "yyyy-MM");
    formik.setFieldValue("deductionMonth", currentMonth);
  }, []);

  return (
    <div className="container-fluid">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> </span>
        </li>
        <li>
          Staffing
          <span className="breadcrumb-separator"> </span>
        </li>
        <li>
          <Link to="/deduction" className="custom-breadcrumb">
            Deduction
          </Link>
          <span className="breadcrumb-separator"> </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Deduction Add
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault();
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
              <span className="me-2 text-muted">Add Deduction</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/deduction">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="btn btn-button btn-sm ms-2"
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
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Centre Name</label>
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
                  <option value="" disabled></option>
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
                <label className="form-label">Employee Name</label>{" "}
                <span className="text-danger">*</span>
                <Select
                  options={employeeOptions}
                  name="userId"
                  value={
                    employeeOptions.find(
                      (option) => option.value === formik.values.userId
                    ) || null
                  }
                  onChange={(selectedOption) => {
                    const userId = selectedOption ? selectedOption.value : "";
                    const employeeName = selectedOption
                      ? selectedOption.label
                      : "";
                    console.log("Selected Option:", selectedOption); // Debug
                    console.log(
                      "Setting userId:",
                      userId,
                      "employeeName:",
                      employeeName
                    ); // Debug
                    formik.setFieldValue("userId", userId);
                    formik.setFieldValue("employeeName", employeeName);
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
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">Deduction Name</label>
                <span className="text-danger">*</span>
                <select
                  {...formik.getFieldProps("deductionName")}
                  className={`form-select ${
                    formik.touched.deductionName && formik.errors.deductionName
                      ? "is-invalid"
                      : ""
                  }`}
                  aria-label="Default select example"
                >
                  <option value="" disabled></option>
                  <option value="CPF">CPF</option>
                  <option value="LOP">LOP</option>
                  <option value="LOAN INTEREST">LOAN INTEREST</option>
                </select>
                {formik.touched.deductionName &&
                  formik.errors.deductionName && (
                    <div className="invalid-feedback">
                      {formik.errors.deductionName}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
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
              <div className="col-md-6 col-12 mb-3">
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
          </div>
        </div>
      </form>
    </div>
  );
}

export default DeductionAdd;
