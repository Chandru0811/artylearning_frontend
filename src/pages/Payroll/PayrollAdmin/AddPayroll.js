import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

const validationSchema = Yup.object({
  centerId: Yup.string().required("*Centre name is required"),
  userId: Yup.string().required("*Employee name is required"),
  grossPay: Yup.number()
    .required("*Basic pay is required")
    .typeError("Basic pay must be a number"),
  payrollMonth: Yup.string().required("*Select the Payroll Month"),
  bonus: Yup.number()
    .required("*Bonus is required")
    .typeError("Bonus must be a number"),
  deductionAmount: Yup.number()
    .required("*Deduction is required")
    .typeError("Deduction must be a number"),
  netPay: Yup.number()
    .required("*Net pay is required")
    .typeError("Net pay must be a number"),
  status: Yup.string().required("*Status is required"),
});

function AddPayroll() {
  const [centerData, setCenterData] = useState(null);
  const [userNamesData, setUserNameData] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      grossPay: "",
      payrollMonth: "",
      bonus: "",
      deductionAmount: "",
      netPay: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
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
        centerName:selectedCenterName,
        centerId: values.centerId,
        userId: values.userId,
        employeeName: selectedEmployeeName,
        grossPay: values.grossPay,
        payrollMonth: values.payrollMonth,
        bonus: values.bonus,
        deductionAmount: values.deductionAmount,
        netPay: values.netPay,
        status: values.status,
      };

      try {
        const response = await api.post("/createUserPayroll", payload, {
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

  // const navigate = useNavigate();
  // const [centerData, setCenterData] = useState(null);
  // const [teacherData, setTeacherData] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const centers = await fetchAllCentersWithIds();
  //     setCenterData(centers);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  // const fetchTeacher = async (centerId) => {
  //   try {
  //     const teacher = await fetchAllTeacherListByCenter(centerId);
  //     setTeacherData(teacher);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  // const validationSchema = Yup.object().shape({
  //   centerId: Yup.string().required("*Centre name is required"),
  //   userId: Yup.string().required("*Employee name is required"),
  //   grossPay: Yup.number()
  //     .required("*Basic pay is required")
  //     .typeError("Basic pay must be a number"),
  //   payrollMonth: Yup.string().required("*Select the Payroll Month"),
  //   bonus: Yup.number()
  //     .required("*Bonus is required")
  //     .typeError("Bonus must be a number"),
  //   deductionAmount: Yup.number()
  //     .required("*Deduction is required")
  //     .typeError("Deduction must be a number"),
  //   netPay: Yup.number()
  //     .required("*Net pay is required")
  //     .typeError("Net pay must be a number"),
  //   status: Yup.string().required("*Status is required"),
  // });

  // const formik = useFormik({
  //   initialValues: {
  //     centerId: "",
  //     userId: "",
  //     grossPay: "",
  //     payrollMonth: "",
  //     bonus: "",
  //     deductionAmount: "",
  //     netPay: "",
  //     status: "",
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: async (values) => {
  //     let selectedCenterName = "";
  //     let selectedTeacherName = "";

  //     centerData.forEach((center) => {
  //       if (parseInt(values.centerId) === center.id) {
  //         selectedCenterName = center.centerNames || "--";
  //       }
  //     });

  //     teacherData.forEach((teacher) => {
  //       if (parseInt(values.userId) === teacher.id) {
  //         selectedTeacherName = teacher.teacherNames || "--";
  //       }
  //     });

  //     let requestBody = {
  //       centerId: values.centerId,
  //       centerName: selectedCenterName,
  //       userId: values.userId,
  //       employeeName: selectedTeacherName,
  //       grossPay: values.grossPay,
  //       payrollMonth: values.payrollMonth,
  //       bonus: values.bonus,
  //       deductionAmount: values.deductionAmount,
  //       netPay: values.netPay,
  //       status: values.status,
  //     };
  //     // console.log(values);
  //     try {
  //       const response = await api.post("createUserPayroll", requestBody, {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.status === 201) {
  //         toast.success(response.data.message);
  //         navigate("/payrolladmin");
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   },
  // });

  // const handleCenterChange = (event) => {
  //   setTeacherData(null);
  //   const centerId = event.target.value;
  //   formik.setFieldValue("centerId", centerId);
  //   fetchTeacher(centerId); // Fetch courses for the selected center
  // };

  return (
    <div className="container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <div className="container py-3">
          <div className="row">
            <div className="col-12 text-end">
              <Link to="/payrolladmin">
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
                <div className="invalid-feedback">{formik.errors.centerId}</div>
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
                />
                {formik.touched.grossPay && formik.errors.grossPay && (
                  <div className="invalid-feedback">
                    {formik.errors.grossPay}
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
                    formik.touched.payrollMonth && formik.errors.payrollMonth
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("payrollMonth")}
                />
                {formik.touched.payrollMonth && formik.errors.payrollMonth && (
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
                  <div className="invalid-feedback">{formik.errors.bonus}</div>
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
