import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
// import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import fetchAllEmployeeListByCenter from "../List/EmployeeList";
import api from "../../config/URL";
import Select from "react-select";
import fetchAllTeachersWithIds from "../List/TeacherList";

const validationSchema = Yup.object({
  // centerId: Yup.string().required("*Centre name is required"),
  userId: Yup.string().required("*Employee name is required"),
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
});

function StaffingAttendanceEdit({selectedCenter}) {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { id } = useParams();
  const [employeeOptions, setEmployeeOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      date: new Date().toISOString().split("T")[0],
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
        modeOfWorking: values.modeOfWorking,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        checkInmode: values.checkInmode,
        checkOutmode: values.checkOutmode,
        otStartTime: values.otStartTime,
        otEndTime: values.otEndTime,
        updatedBy: userName,
        attendanceRemark: values.attendanceRemark,
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
        setLoadIndicator(true);
        const response = await api.put(`/updateUserAttendance/${id}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/staffing/attendance");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

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
      if (selectedCenter !== undefined) {
        fetchUserName();
      }
    }, [selectedCenter]); // Re-run when selectedCenter changes
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getUserAttendanceById/${id}`);
        const formattedResponseData = {
          ...response.data,
          date: response.data.date.substring(0, 10),
          checkIn: response.data?.checkIn?.slice(0, 5),
          checkOut: response.data?.checkOut?.slice(0, 5),
        };
        formik.setValues(formattedResponseData);
        fetchUserName(response.data.centerId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <section className="AttendanceAdd p-3">
      <div className="container-fluid">
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
            &nbsp;Attendance Edit
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
              className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
              style={{ background: "#f5f7f9" }}
            >
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <div className="dot active"></div>
                </div>
                <span className="me-2 text-muted">Edit Attendance</span>
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
                  <span className="fw-medium">Update</span>
                </button>
              </div>
            </div>
            <div className="container-fluid px-4 pb-3">
              <div className="row">
                {/* <div className="col-md-6 col-12 mb-3 ">
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
                </div> */}
                <div className="col-md-6 col-12 mb-3">
                  <label className="">Employee Name</label>
                  <span className="text-danger">*</span>
                  <Select
                    options={employeeOptions}
                    name="userId"
                    value={employeeOptions.find(
                      (option) => option.value === formik.values.userId
                    )} // Ensure value is properly set
                    onChange={(selectedOption) =>
                      formik.setFieldValue(
                        "userId",
                        selectedOption ? selectedOption.value : ""
                      )
                    }
                    onBlur={() => formik.setFieldTouched("userId", true)} // Manually handle blur
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
                        step="60"
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

                {/* <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Check In Mode</lable>
                <span className="text-danger">*</span>
                <select
                  className={`form-select ${
                    formik.touched.checkInmode && formik.errors.checkInmode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("checkInmode")}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="Tap In">Tap In</option>
                  <option value="Face Recognition">Face Recognition</option>
                </select>
                {formik.touched.checkInmode && formik.errors.checkInmode && (
                  <div className="invalid-feedback">
                    {formik.errors.checkInmode}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Check Out Mode</lable>
                <span className="text-danger">*</span>
                <select
                  className={`form-select ${
                    formik.touched.checkOutmode && formik.errors.checkOutmode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("checkOutmode")}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="Tap Out">Tap Out</option>
                  <option value="Face Recognition">Face Recognition</option>
                </select>
                {formik.touched.checkOutmode && formik.errors.checkOutmode && (
                  <div className="invalid-feedback">
                    {formik.errors.checkOutmode}
                  </div>
                )}
              </div> */}

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

export default StaffingAttendanceEdit;
