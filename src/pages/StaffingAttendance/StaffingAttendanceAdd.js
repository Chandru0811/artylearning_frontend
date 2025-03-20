import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllEmployeeListByCenter from "../List/EmployeeList";
import { format } from "date-fns";
import Select from "react-select";
import fetchAllTeachersWithIds from "../List/TeacherList";

const validationSchema = Yup.object({
  // centerId: Yup.string().required("*Centre name is required"),
  userId: Yup.string().required("*Employee name is required"),
  date: Yup.date()
    .transform((value, originalValue) =>
      originalValue ? new Date(originalValue) : value
    )
    .required("*Date is required")
    .min(
      new Date().setHours(0, 0, 0, 0),
      "*Date must be today or in the future"
    ),
  attendanceStatus: Yup.string().required("*Attendance status is required"),
  attendanceRemark: Yup.string()
    .max(200, "*The maximum length is 200 characters")
    .required("*Only 200 Letters"),
  modeOfWorking: Yup.string().test(
    "check-mode-of-working",
    "*Mode of working is required",
    function (value) {
      const { attendanceStatus } = this.parent;
      return attendanceStatus === "Present" ? !!value : true;
    }
  ),
  // checkIn: Yup.string().test(
  //   "check-check-in",
  //   "*Check-in is required",
  //   function (value) {
  //     const { attendanceStatus } = this.parent;
  //     return attendanceStatus === "Present" ? !!value : true;
  //   }
  // ),
  // checkOut: Yup.string().required("*Check-out is required"),
  // otStartTime: Yup.string().required("*OT start time is required"),
  // otEndTime: Yup.string().required("*OT end time is required"),
  // attendanceRemark: Yup.string().required("*Attendance remark is required"),
});

function StaffingAttendanceAdd({ selectedCenter }) {
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const [employeeOptions, setEmployeeOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      centerId: selectedCenter,
      userId: "",
      date: currentDate,
      attendanceStatus: "",
      modeOfWorking: "",
      checkIn: "",
      checkOut: "",
      checkInmode: "",
      checkOutmode: "",
      otStartTime: "",
      otEndTime: "",
      attendanceRemark: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      let payload = {
        userId: values.userId,
        employeeName: "",
        date: values.date,
        attendanceStatus: values.attendanceStatus,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        checkInmode: values.checkInmode,
        checkOutmode: values.checkOutmode,
        otStartTime: values.otStartTime,
        otEndTime: values.otEndTime,
        attendanceRemark: values.attendanceRemark,
        createdBy: userName,
      };

      if (values.modeOfWorking !== "") {
        payload = {
          ...payload,
          modeOfWorking: values.modeOfWorking,
        };
      }

      if (values.checkIn !== "") {
        payload = {
          ...payload,
          checkIn: values.checkIn,
        };
      }

      if (values.checkOut !== "") {
        payload = {
          ...payload,
          checkOut: values.checkOut,
        };
      }

      if (values.checkInmode !== "") {
        payload = {
          ...payload,
          checkInmode: values.checkInmode,
        };
      }

      if (values.checkOutmode !== "") {
        payload = {
          ...payload,
          checkOutmode: values.checkOutmode,
        };
      }

      if (values.otStartTime !== "") {
        payload = {
          ...payload,
          otStartTime: values.otStartTime,
        };
      }

      if (values.otEndTime !== "") {
        payload = {
          ...payload,
          otEndTime: values.otEndTime,
        };
      }

      try {
        const response = await api.post("/createUserAttendance", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          // toast.success(response.data.message);
          toast.success("user attendance created successfully");
          navigate("/staffing/attendance");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const fetchCenterData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchUserName = async () => {
    try {
      let empList = [];
      const numericCenterId = Number(selectedCenter);
      if (numericCenterId === 0) {
        empList = await fetchAllTeachersWithIds();
      } else {
        empList = await fetchAllEmployeeListByCenter(selectedCenter);
      }
      const formattedEmployee = empList.map((employee) => ({
        value: employee.id,
        label: employee.userNames || employee.teacherNames,
      }));

      setEmployeeOptions(formattedEmployee);
    } catch (error) {
      toast.error(error.message || "Failed to fetch employee list");
    }
  };

  useEffect(() => {
    fetchCenterData();
  }, []);

  useEffect(() => {
    if (selectedCenter !== undefined) {
      fetchUserName();
    }
  }, [selectedCenter]); // Re-run when selectedCenter changes

  return (
    <section className="AttendanceAdd p-3">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/staffing/attendance" className="custom-breadcrumb">
            Attendance
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Attendance Add
        </li>
      </ol>
      <div className="container-fluid">
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
                <span className="me-2 text-muted">Add Attendance</span>
              </div>
              <div className="my-2 pe-3 d-flex align-items-center">
                <Link to="/staffing/attendance">
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
            <div className="container-fluid px-4 pb-3">
              <div className="row">
                <div className="col-md-6 col-12 mb-3 d-none">
                  <lable className="">Centre Name</lable>
                  <span className="text-danger">*</span>
                  <select
                    {...formik.getFieldProps("centerId")}
                    className={`form-select ${
                      formik.touched.centerId && formik.errors.centerId
                        ? "is-invalid"
                        : ""
                    }`}
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
                  <span className="text-danger">*</span>
                  <Select
                    options={employeeOptions}
                    name="userId"
                    value={
                      employeeOptions.find(
                        (option) => option.value === formik.values.userId
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      formik.setFieldValue(
                        "userId",
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                    placeholder="Select Employee"
                    isSearchable
                    isClearable
                    className={`${
                      formik.touched.userId && formik.errors.userId
                        ? "is-invalid"
                        : ""
                    }`}
                  />

                  {formik.touched.userId && formik.errors.userId && (
                    <div className="invalid-feedback">
                      {formik.errors.userId}
                    </div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label className="">Date</label>
                  <span className="text-danger">*</span>
                  <input
                    type="date"
                    className={`form-control ${
                      formik.touched.date && formik.errors.date
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("date")}
                    value={formik.values.date}
                    readOnly
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="invalid-feedback">{formik.errors.date}</div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-3">
                  <label>Attendance Status</label>
                  <span className="text-danger">*</span>
                  <select
                    className={`form-select ${
                      formik.touched.attendanceStatus &&
                      formik.errors.attendanceStatus
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("attendanceStatus")}
                  >
                    <option value="" />
                    <option value="Present" label="Present" />
                    <option value="Absent" label="Absent" />
                  </select>
                  {formik.touched.attendanceStatus &&
                    formik.errors.attendanceStatus && (
                      <div className="invalid-feedback">
                        {formik.errors.attendanceStatus}
                      </div>
                    )}
                </div>

                {formik.values.attendanceStatus === "Present" && (
                  <>
                    <div className="col-md-6 col-12 mb-3">
                      <label>Check In</label>
                      {/* <span className="text-danger">*</span> */}
                      <input
                        type="time"
                        // onFocus={(e) => e.target.showPicker()}
                        className={`form-control ${
                          formik.touched.checkIn && formik.errors.checkIn
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("checkIn")}
                      />
                      {formik.touched.checkIn && formik.errors.checkIn && (
                        <div className="invalid-feedback">
                          {formik.errors.checkIn}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 col-12 mb-3 ">
                      <label className="">Check Out</label>
                      {/* <span className="text-danger">*</span> */}
                      <input
                        type="time"
                        // onFocus={(e) => e.target.showPicker()}
                        className={`form-control ${
                          formik.touched.checkOut && formik.errors.checkOut
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("checkOut")}
                      />
                      {formik.touched.checkOut && formik.errors.checkOut && (
                        <div className="invalid-feedback">
                          {formik.errors.checkOut}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 col-12 mb-3 ">
                      <label className="">OT Start Time</label>
                      {/* <span className="text-danger">*</span> */}
                      <input
                        type="time"
                        // onFocus={(e) => e.target.showPicker()}
                        className={`form-control ${
                          formik.touched.otStartTime &&
                          formik.errors.otStartTime
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("otStartTime")}
                      />
                      {formik.touched.otStartTime &&
                        formik.errors.otStartTime && (
                          <div className="invalid-feedback">
                            {formik.errors.otStartTime}
                          </div>
                        )}
                    </div>

                    <div className="col-md-6 col-12 mb-3 ">
                      <label className="">OT End Time</label>
                      {/* <span className="text-danger">*</span> */}
                      <input
                        type="time"
                        // onFocus={(e) => e.target.showPicker()}
                        className={`form-control  ${
                          formik.touched.otEndTime && formik.errors.otEndTime
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("otEndTime")}
                      />
                      {formik.touched.otEndTime && formik.errors.otEndTime && (
                        <div className="invalid-feedback">
                          {formik.errors.otEndTime}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6 col-12 mb-3">
                      <label>Mode Of Working</label>
                      <span className="text-danger">*</span>
                      <select
                        className={`form-select ${
                          formik.touched.modeOfWorking &&
                          formik.errors.modeOfWorking
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("modeOfWorking")}
                      >
                        <option value="" label="Select Mode" />
                        <option value="WORK_FROM_HOME" label="Work From Home" />
                        <option
                          value="WORK_FROM_OFFICE"
                          label="Work From Office"
                        />
                      </select>
                      {formik.touched.modeOfWorking &&
                        formik.errors.modeOfWorking && (
                          <div className="invalid-feedback">
                            {formik.errors.modeOfWorking}
                          </div>
                        )}
                    </div>
                  </>
                )}

                <div className="col-md-6 col-12">
                  <div className="text-start mt-2">
                    <lable className="form-lable">Attendance Remark</lable>
                    <span className="text-danger">*</span>
                    <br />
                    <textarea
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      className={`form-control  ${
                        formik.touched.attendanceRemark &&
                        formik.errors.attendanceRemark
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("attendanceRemark")}
                      maxLength={200}
                    />
                    {formik.touched.attendanceRemark &&
                      formik.errors.attendanceRemark && (
                        <div className="invalid-feedback">
                          {formik.errors.attendanceRemark}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default StaffingAttendanceAdd;
