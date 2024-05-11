import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";

const validationSchema = Yup.object({
  centerId: Yup.string().required("*Select a Centre Name"),
  userId: Yup.string().required("*Employee Name is required"),
  leaveType: Yup.string().required("*Select a Leave Type"),
  fromDate: Yup.string().required("*From Date is required"),
  toDate: Yup.string().required("*To Date is required"),
  dayType: Yup.string().required("*Leave Status is required"),
  leaveStatus: Yup.string().required("*Day Type is required"),
  leaveReason: Yup.string().required("*Leave Reason is required"),
});

function LeaveAdminEdit() {
  const [centerData, setCenterData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [daysDifference, setDaysDifference] = useState(null);
  const navigate = useNavigate();
  
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      centerId: "",
      centerName: "",
      userId: "",
      leaveType: "",
      noOfDays: "",
      fromDate: "",
      toDate: "",
      requestDate: "",
      approverName: "",
      dayType: "",
      attachment: "",
      leaveStatus: "",
      leaveReason: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      // console.log("Leave Data:", values);
      let selectedCenterName = "";
      let selectedTeacherName = "";

      // console.log("Teacher Data", teacherData)
      // console.log("user Data", values.userId)

      centerData.forEach((center) => {
        if (parseInt(values.centerId) === center.id) {
          selectedCenterName = center.centerNames || "--";
        }
      });

      teacherData.forEach((teacher) => {
        if (parseInt(values.userId) === teacher.id) {
          selectedTeacherName = teacher.userNames || "--";
        }
      });

      const payload = {
        centerId: values.centerId,
        centerName: selectedCenterName,
        userId: values.userId,
        employeeName: selectedTeacherName,
        leaveType: values.leaveType,
        noOfDays: daysDifference || values.noOfDays,
        fromDate: values.fromDate,
        toDate: values.toDate,
        requestDate: values.requestDate,
        approverName: values.approverName,
        dayType: values.dayType,
        attachment: values.attachment,
        leaveStatus: values.leaveStatus,
        leaveReason: values.leaveReason,
      };

      // console.log("payload Values", payload)

      try {
        const response = await api.put(
          `/updateUserLeaveRequest/${id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/leaveadmin");
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

  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchTeacher = async (centerId) => {
    try {
      const teacher = await fetchAllEmployeeListByCenter(centerId);
      setTeacherData(teacher);
    } catch (error) {
      toast.error(error);
    }
  };

  const calculateDays = (fromDate, toDate) => {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const difference = toDateObj.getTime() - fromDateObj.getTime();
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    formik.setFieldValue("noOfDays", daysDifference);
    return { daysDifference, originalNoOfDays: formik.values.noOfDays };
  };

  const handleFromDateChange = (e) => {
    formik.handleChange(e);
    const { daysDifference, originalNoOfDays } = calculateDays(
      e.target.value,
      formik.values.toDate
    );
    setDaysDifference(daysDifference);
    formik.setFieldValue("noOfDays", originalNoOfDays);
  };

  const handleToDateChange = (e) => {
    formik.handleChange(e);
    const { daysDifference, originalNoOfDays } = calculateDays(
      formik.values.fromDate,
      e.target.value
    );
    setDaysDifference(daysDifference);
    formik.setFieldValue("noOfDays", originalNoOfDays);
  };

  const handleCenterChange = (event) => {
    setTeacherData(null);
    const centerId = event.target.value;
    formik.setFieldValue("centerId", centerId);
    fetchTeacher(centerId);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getUserLeaveRequestById/${id}`);
        console.log(response.data);
        formik.setValues(response.data);
        fetchData();
        fetchTeacher(response.data.centerId);
        const { daysDifference } = calculateDays(
          response.data.fromDate,
          response.data.toDate
        );
        setDaysDifference(daysDifference);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id]);

  return (
    <section>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row my-3 mb-5">
            <div className="col-12 text-end">
              <Link to="/leaveadmin">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
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
          <div className="row">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Centre Name<span className="text-danger">*</span>
              </label>
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
                <option disabled></option>
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
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Employee Name<span className="text-danger">*</span>
              </label>
              <select
                {...formik.getFieldProps("userId")}
                name="userId"
                className={`form-select  ${
                  formik.touched.userId && formik.errors.userId
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option value="" disabled selected hidden></option>
                {teacherData &&
                  teacherData.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.userNames}
                    </option>
                  ))}
              </select>
              {formik.touched.userId && formik.errors.userId && (
                <div className="invalid-feedback">{formik.errors.userId}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>
                Leave Type<span className="text-danger">*</span>
              </label>
              <select
                className={`form-select  ${
                  formik.touched.leaveType && formik.errors.leaveType
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("leaveType")}
              >
                <option value="" disabled selected hidden></option>
                <option value="SICK_LEAVE">Sick Leave</option>
                <option value="CASUAL_LEAVE">Casual Leave</option>
                <option value="PRIVILEGE_LEAVE">Privilege Leave</option>
              </select>
              {formik.touched.leaveType && formik.errors.leaveType && (
                <div className="invalid-feedback">
                  {formik.errors.leaveType}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label>
                Leave Status<span className="text-danger">*</span>
              </label>
              <select
                className={`form-select  ${
                  formik.touched.leaveStatus && formik.errors.leaveStatus
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("leaveStatus")}
              >
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
                <option value="APPROVED">Approved</option>
              </select>
              {formik.touched.leaveStatus && formik.errors.leaveStatus && (
                <div className="invalid-feedback">
                  {formik.errors.leaveStatus}
                </div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                No.Of.Days<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control  ${
                  formik.touched.noOfDays && formik.errors.noOfDays
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("noOfDays")}
                value={daysDifference || formik.values.noOfDays}
                readOnly
              />
              {formik.touched.noOfDays && formik.errors.noOfDays && (
                <div className="invalid-feedback">{formik.errors.noOfDays}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                From Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control  ${
                  formik.touched.fromDate && formik.errors.fromDate
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("fromDate")}
                onChange={handleFromDateChange}
              />
              {formik.touched.fromDate && formik.errors.fromDate && (
                <div className="invalid-feedback">{formik.errors.fromDate}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                To Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className={`form-control  ${
                  formik.touched.toDate && formik.errors.toDate
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("toDate")}
                onChange={handleToDateChange}
              />
              {formik.touched.toDate && formik.errors.toDate && (
                <div className="invalid-feedback">{formik.errors.toDate}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Day Type<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control  ${
                  formik.touched.dayType && formik.errors.dayType
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("dayType")}
              />
              {formik.touched.dayType && formik.errors.dayType && (
                <div className="invalid-feedback">{formik.errors.dayType}</div>
              )}
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">Attachment</label>
              <input
                type="file"
                className="form-control"
                onChange={(event) =>
                  formik.setFieldValue("attachment", event.target.files[0])
                }
              />
            </div>
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Leave Reason<span className="text-danger">*</span>
              </label>
              <textarea
                rows={5}
                className={`form-control  ${
                  formik.touched.leaveReason && formik.errors.leaveReason
                    ? "is-invalid"
                    : ""
                }`}
                {...formik.getFieldProps("leaveReason")}
              ></textarea>
              {formik.touched.leaveReason && formik.errors.leaveReason && (
                <div className="invalid-feedback">
                  {formik.errors.leaveReason}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LeaveAdminEdit;
