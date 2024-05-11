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
  date: Yup.string().required("*Date is required"),
  attendanceStatus: Yup.string().required("*Attendance status is required"),
  modeOfWorking: Yup.string().required("*Mode of working is required"),
  checkIn: Yup.string().required("*Check-in is required"),
  checkOut: Yup.string().required("*Check-out is required"),
  otStartTime: Yup.string().required("*OT start time is required"),
  otEndTime: Yup.string().required("*OT end time is required"),
  attendanceRemark: Yup.string().required("*Attendance remark is required"),
});

function StaffingAttendanceEdit() {
  const [centerData, setCenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [userNamesData, setUserNameData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      centerId: "",
      userId: "",
      date: "",
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

      try {
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
      }finally {
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
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-12 text-end">
                <Link to="/staffing/attendance">
                  <button className="btn btn-sm btn-border">Back</button>
                </Link>
                &nbsp;&nbsp;
                <button type="submit" className="btn btn-button btn-sm" disabled={loadIndicator}>
                {loadIndicator && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                Update
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
                <lable className="">Date</lable>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  className={`form-control ${
                    formik.touched.date && formik.errors.date
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("date")}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className="invalid-feedback">{formik.errors.date}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Attendance Status</lable>
                <span className="text-danger">*</span>
                <select
                  className={`form-select ${
                    formik.touched.attendanceStatus &&
                    formik.errors.attendanceStatus
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("attendanceStatus")}
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
                {formik.touched.attendanceStatus &&
                  formik.errors.attendanceStatus && (
                    <div className="invalid-feedback">
                      {formik.errors.attendanceStatus}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Mode Of Working</lable>
                <span className="text-danger">*</span>
                <select
                  className={`form-select ${
                    formik.touched.modeOfWorking && formik.errors.modeOfWorking
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("modeOfWorking")}
                  aria-label="Default select example"
                >
                  <option selected disabled></option>
                  <option value="WORK_FROM_HOME">Work From Home</option>
                  <option value="WORK_FROM_OFFICE">Work From Office</option>
                </select>
                {formik.touched.modeOfWorking &&
                  formik.errors.modeOfWorking && (
                    <div className="invalid-feedback">
                      {formik.errors.modeOfWorking}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">Check In</lable>
                <span className="text-danger">*</span>
                <input
                  type="time"
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
                <lable className="">Check Out</lable>
                <span className="text-danger">*</span>
                <input
                  type="time"
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
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">OT Start Time</lable>
                <span className="text-danger">*</span>
                <input
                  type="time"
                  className={`form-control ${
                    formik.touched.otStartTime && formik.errors.otStartTime
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("otStartTime")}
                />
                {formik.touched.otStartTime && formik.errors.otStartTime && (
                  <div className="invalid-feedback">
                    {formik.errors.otStartTime}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3 ">
                <lable className="">OT End Time</lable>
                <span className="text-danger">*</span>
                <input
                  type="time"
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
          </form>
        </div>
      </div>
    </section>
  );
}

export default StaffingAttendanceEdit;
