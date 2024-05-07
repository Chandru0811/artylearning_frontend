import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import fetchAllTeacherListByCenter from "../../List/TeacherListByCenter";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import fetchAllEmployeeListByCenter from "../../List/EmployeeList";
import { data } from "jquery";

const validationSchema = Yup.object({
  leaveType: Yup.string().required("*Select a Leave Type"),
  noOfDays: Yup.string().required("*No.Of.Days is required"),
  fromDate: Yup.string().required("*From Date is required"),
  toDate: Yup.string().required("*To Date is required"),
  dayType: Yup.string().required("*Leave Status is required"),
  leaveReason: Yup.string().required("*Leave Reason is required"),
});

function LeaveAdd() {
  // const [centerData, setCenterData] = useState(null);
  // const [userNamesData, setUserNameData] = useState(null);
  const [datas, setDatas] = useState([]);
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      centerId: "",
      centerName: "",
      employeeName:"",
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
      console.log("Leave Data:", values);
    
      const payload = {
        userId: datas.userId,
        employeeName: datas.employeeName,
        leaveType: values.leaveType,
        noOfDays: values.noOfDays,
        fromDate: values.fromDate,
        toDate: values.toDate,
        requestDate: values.requestDate,
        approverName: values.approverName,
        dayType: values.dayType,
        attachment: values.attachment,
        leaveStatus: "PENDING",
        leaveReason: values.leaveReason,
      };

      try {
        const response = await api.post("/createUserLeaveRequest", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/leave");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getUserLeaveRequestByUserId/${userId}`
        );
        setDatas(response.data);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getData();
  }, []);

  return (
    <section>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row my-3 mb-5">
            <div className="col-12 text-end">
              <Link to="/leave">
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
          <div className="row">
            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Employee Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="employeeName"
                className="form-control"
                value={datas && datas.employeeName}
                // {...formik.getFieldProps("employeeName")}
                readOnly
              />
              <input type="hidden" name="userId" value={datas && datas.userId}
              {...formik.getFieldProps("userId")} />
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
                <option selected></option>
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
                {...formik.getFieldProps("attachment")}
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

export default LeaveAdd;
