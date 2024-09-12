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
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState([]);

  const [leaveDatas, setLeaveDatas] = useState([]);
  const { id } = useParams();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [daysDifference, setDaysDifference] = useState(0);
  const userId = localStorage.getItem("userId");
  const centerId = localStorage.getItem("centerId");
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

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
      file: "",
    },
    // validationSchema: validationSchema,

    onSubmit: async (data) => {
      setLoadIndicator(true);
      try {
        const payload = {
          leaveStatus: data.leaveStatus
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
        setLeaveDatas(response.data)
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
    <section>
      <div className="container">
        <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <div className="row my-3 mb-5">
            <div className="col-12 text-end">
              <Link to="/leaveadmin">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                onSubmit={formik.handleSubmit}
                className="btn btn-sm btn-button"
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
                className={`form-control  ${formik.touched.fromDate && formik.errors.fromDate
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
                <div className="invalid-feedback">{formik.errors.fromDate}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                To Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                readOnly
                className={`form-control  ${formik.touched.toDate && formik.errors.toDate
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
                className={`form-control  ${formik.touched.noOfDays && formik.errors.noOfDays
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("noOfDays")}
                value={daysDifference || "0"}
                readOnly
              />
              {formik.touched.noOfDays && formik.errors.noOfDays && (
                <div className="invalid-feedback">{formik.errors.noOfDays}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Day Type<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control  ${formik.touched.dayType && formik.errors.dayType
                  ? "is-invalid"
                  : ""
                  }`}
                {...formik.getFieldProps("dayType")}
                readOnly
              />
              {formik.touched.dayType && formik.errors.dayType && (
                <div className="invalid-feedback">{formik.errors.dayType}</div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                Leave Type<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control  ${formik.touched.leaveType && formik.errors.leaveType
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
                className={`form-select ${formik.touched.leaveStatus && formik.errors.leaveStatus
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
                className={`form-control  ${formik.touched.leaveReason && formik.errors.leaveReason
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
              <p class="headColor mt-5">Attachment</p>
              {/* <hr></hr> */}
              {/* <div className="row mt-4">
                <div className="container p-2"> */}
              {data.attachment && (
                <div className="mt-3">
                  {data?.attachment?.endsWith(".pdf") ? (
                    <div class="card border-0 shadow" style={{ width: "18rem" }}>
                      <a
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                          data?.attachment
                        )}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          class="card-img-top img-fluid"
                          style={{ height: "50%" }}
                          src={pdfLogo}
                          alt="Card image cap"
                        />
                      </a>
                      <div class="card-body d-flex justify-content-between">
                        <p class="card-title fw-semibold text-wrap">
                          {data?.attachment?.split("/").pop()}
                        </p>

                        <a
                          href={data?.attachment}
                          class="btn text-dark"
                          download={data?.attachment?.split("/").pop()}
                        >
                          <MdOutlineDownloadForOffline size={25} />
                        </a>
                      </div>

                    </div>
                  ) : (
                    <img
                      src={data?.attachment}
                      alt="Attachment"
                      className="img-fluid"
                      style={{ height: "50%" }}
                    />
                  )}
                </div>
              )}
              {/* </div>
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LeaveAdminEdit;
