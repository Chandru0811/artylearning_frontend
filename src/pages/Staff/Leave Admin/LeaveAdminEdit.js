import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import pdfLogo from "../../../assets/images/Attactmentpdf.jpg";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const validationSchema = Yup.object({
  centerName: Yup.string().required("*Select a Centre Name"),
  userId: Yup.string().required("*Employee Name is required"),
  leaveType: Yup.string().required("*Select a Leave Type"),
  fromDate: Yup.string().required("*From Date is required"),
  toDate: Yup.string().required("*To Date is required"),
  dayType: Yup.string().required("*Leave Status is required"),
  leaveStatus: Yup.string().required("*Day Type is required"),
  leaveReason: Yup.string().required("*Leave Reason is required"),
});

function LeaveAdminEdit() {
  const [data, setData] = useState([]);

  const [leaveDatas, setLeaveDatas] = useState([]);
  const { id } = useParams();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [daysDifference, setDaysDifference] = useState(0);
  const userId = localStorage.getItem("userId");
  const centerId = localStorage.getItem("centerId");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userId: userId,
      centerId: "",
      centerName: "",
      employeeName: "",
      leaveType: "",
      noOfDays: "",
      fromDate: "",
      toDate: "",
      requestDate: "",
      approverName: "",
      dayType: "",
      leaveStatus: "",
      leaveReason: "",
      attachment: "",
      updatedBy: userName,
    },
    // validationSchema: validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      data.updatedBy = userName;
      try {
        const payload = {
          leaveStatus: data.leaveStatus,
        };
        const response = await api.put(
          `/updateUserLeaveRequestStatus/${id}`,
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
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const calculateDays = (fromDate, toDate) => {
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const difference = toDateObj.getTime() - fromDateObj.getTime();
    const daysDifference = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    formik.setFieldValue("noOfDays", daysDifference);
    return daysDifference;
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getUserLeaveRequestById/${id}`);
        console.log(response.data);
        setLeaveDatas(response.data);
        setData(response.data);

        formik.setValues(response.data);
        const daysDiff = calculateDays(
          response.data.fromDate,
          response.data.toDate
        );
        setDaysDifference(daysDiff);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(
          `/getUserLeaveRequestByUserId/${userId}`
        );
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getData();
  }, []);

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
          &nbsp;Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/center" className="custom-breadcrumb">
            &nbsp;Leave
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Leave Edit
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
              <span class="me-2 text-muted">Edit Leave</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/leaveadmin">
                <button type="button " className="btn btn-sm btn-border   ">
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
                Update
              </button>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Centre Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="centerName"
                  className="form-control"
                  {...formik.getFieldProps("centerName")}
                  readOnly
                />
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Employee Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="employeeName"
                  className="form-control"
                  {...formik.getFieldProps("employeeName")}
                  readOnly
                />
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
                  readOnly
                  {...formik.getFieldProps("fromDate")}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const daysDiff = calculateDays(
                      e.target.value,
                      formik.values.toDate
                    );
                    setDaysDifference(daysDiff);
                  }}
                />
                {formik.touched.fromDate && formik.errors.fromDate && (
                  <div className="invalid-feedback">
                    {formik.errors.fromDate}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  To Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  readOnly
                  className={`form-control  ${
                    formik.touched.toDate && formik.errors.toDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("toDate")}
                  onChange={(e) => {
                    formik.handleChange(e);
                    const daysDiff = calculateDays(
                      formik.values.fromDate,
                      e.target.value || "0"
                    );
                    setDaysDifference(daysDiff);
                  }}
                />
                {formik.touched.toDate && formik.errors.toDate && (
                  <div className="invalid-feedback">{formik.errors.toDate}</div>
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
                  value={daysDifference || "0"}
                  readOnly
                />
                {formik.touched.noOfDays && formik.errors.noOfDays && (
                  <div className="invalid-feedback">
                    {formik.errors.noOfDays}
                  </div>
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
                  readOnly
                />
                {formik.touched.dayType && formik.errors.dayType && (
                  <div className="invalid-feedback">
                    {formik.errors.dayType}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Leave Type<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control  ${
                    formik.touched.leaveType && formik.errors.leaveType
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("leaveType")}
                  readOnly
                />
                {formik.touched.leaveType && formik.errors.leaveType && (
                  <div className="invalid-feedback">
                    {formik.errors.leaveType}
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Leave Status<span className="text-danger">*</span>
                </label>
                <select
                  name="leaveStatus"
                  className={`form-select ${
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
                  readOnly
                ></textarea>
                {formik.touched.leaveReason && formik.errors.leaveReason && (
                  <div className="invalid-feedback">
                    {formik.errors.leaveReason}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <p className="headColor mt-5">Attachment</p>
                {data.attachment && (
                  <div className="mt-3">
                    {data?.attachment?.endsWith(".pdf") ? (
                      <div
                        className="card border-0 shadow"
                        style={{ width: "12rem" }}
                      >
                        <a
                          href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                            data?.attachment
                          )}&embedded=true`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            className="card-img-top img-fluid"
                            style={{ height: "100px", objectFit: "contain" }}
                            src={pdfLogo}
                            alt="Card image cap"
                          />
                        </a>
                        <div className="card-body d-flex justify-content-between">
                          <p
                            className="card-title fw-semibold text-wrap"
                            style={{ fontSize: "0.85rem" }}
                          >
                            {data?.attachment?.split("/").pop()}
                          </p>
                          <a
                            href={data?.attachment}
                            className="btn text-dark"
                            download={data?.attachment?.split("/").pop()}
                          >
                            <MdOutlineDownloadForOffline size={20} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={data?.attachment}
                        alt="Attachment"
                        className="img-fluid"
                        style={{ height: "100px", objectFit: "contain" }}
                      />
                    )}
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

export default LeaveAdminEdit;
