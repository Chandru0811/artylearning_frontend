import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
// import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import fetchAllEmployeeListByCenter from "../List/EmployeeList";
import api from "../../config/URL";

const validationSchema = Yup.object({
  centerId: Yup.string().required("*Centre name is required"),
  userId: Yup.string().required("*Employee name is required"),
  // date: Yup.date()
  //   .transform((value, originalValue) =>
  //     originalValue ? new Date(originalValue) : value
  //   )
  //   .required("*Date is required")
  //   .min(
  //     new Date().setHours(0, 0, 0, 0),
  //     "*Date must be today or in the future"
  //   ),
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

function StaffingAttendanceEdit() {
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [userNamesData, setUserNameData] = useState(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { id } = useParams();

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
        updatedBy: userName,
        centerName: selectedCenterName,
        userId: values.userId,
        employeeName: selectedEmployeeName,
        date: values.date,
        attendanceStatus: values.attendanceStatus,
        modeOfWorking: values.modeOfWorking,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        checkInmode: values.checkInmode,
        checkOutmode: values.checkOutmode,
        otStartTime: values.otStartTime,
        otEndTime: values.otEndTime,
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
        setLoadIndicator(true)
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

  const handleAttendanceChange = async (event) => {
    const attendance = event.target.value;
    formik.setFieldValue("attendanceStatus", attendance);
    if (attendance === "Absent") {
      // Clear the fields if attendance is "Absent"
      formik.setFieldValue("modeOfWorking");
      formik.setFieldValue("checkIn", "");
      formik.setFieldValue("checkOut", "");
      formik.setFieldValue("checkInmode", "");
      formik.setFieldValue("checkOutmode", "");
      formik.setFieldValue("otStartTime", "");
      formik.setFieldValue("otEndTime", "");
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

  const fetchUserName = async (centerId) => {
    try {
      const userNames = await fetchAllEmployeeListByCenter(centerId);
      setUserNameData(userNames);
    } catch (error) {
      toast.error(error);
    }
  };

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
    fetchData();
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
              <div class="d-flex align-items-center">
                <div class="d-flex">
                  <div class="dot active"></div>
                </div>
                <span class="me-2 text-muted">Edit Attendance</span>
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
                  <span className="text-danger">*</span>
                  <select
                    {...formik.getFieldProps("userId")}
                    class={`form-select  ${
                      formik.touched.userId && formik.errors.userId
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <option selected value={""}></option>
                    {userNamesData &&
                      userNamesData.map((userName) => (
                        <option key={userName.id} value={userName.id}>
                          {userName.userNames}
                        </option>
                      ))}
                  </select>
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
