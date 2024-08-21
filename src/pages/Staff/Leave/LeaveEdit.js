import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import fetchAllTeacherListByCenter from "../../List/TeacherListByCenter";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const validationSchema = Yup.object({
  leaveType: Yup.string().required("*Select a Leave Type"),
  fromDate: Yup.string().required("*From Date is required"),
  toDate: Yup.string()
    .required("*To Date is required")
    .test(
      "is-greater",
      "*To Date should be later than From Date",
      function (value) {
        const { fromDate } = this.parent;
        return !fromDate || !value || new Date(value) >= new Date(fromDate);
      }
    ),
  dayType: Yup.string().required("*Day Type is required"),
  leaveReason: Yup.string().required("*Leave Reason is required"),
});

function LeaveEdit() {
  const { id } = useParams();
  const [centerData, setCenterData] = useState(null);
  const [datas, setDatas] = useState([]);
  console.log("Datas:", datas);
  const userId = localStorage.getItem("userId");
  const centerId = localStorage.getItem("centerId");
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [daysDifference, setDaysDifference] = useState(0);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const userName  = localStorage.getItem('userName');


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
    validationSchema: validationSchema,

    onSubmit: async (data) => {
      setLoadIndicator(true);
      let selectedCenterName = "";

      if (centerData) {
        centerData.forEach((center) => {
          if (parseInt(centerId) === center.id) {
            selectedCenterName = center.centerNames || "--";
          }
        });
      }
      try {
        const formDatas = new FormData();
        formDatas.append("userId", userId);
        formDatas.append("centerName", selectedCenterName);
        formDatas.append("employeeName", datas && datas.employeeName);
        formDatas.append("leaveType", data.leaveType);
        formDatas.append("noOfDays", data.noOfDays);
        formDatas.append("fromDate", data.fromDate);
        formDatas.append("toDate", data.toDate);
        formDatas.append("dayType", data.dayType);
        formDatas.append("leaveReason", data.leaveReason);
        formDatas.append("leaveStatus", "PENDING");
        formDatas.append("file", data.file);
        formDatas.append("updatedBy", userName);

        const response = await api.put(
          `/updateUserLeaveRequestWithAttachment/${id}`,
          formDatas,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          navigate("/leave");
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

  const fetchData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      setCenterData(centers);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchLeaveType = async () => {
    try {
      const response = await api.get(`getAllLeaveSetting`);
      setLeaveTypeData(response.data); // Assuming response.data is an array
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLeaveType();
  }, []);

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getUserLeaveRequestById/${id}`);
        console.log(response.data);
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

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`/getUserLeaveRequestById/${id}`);
    
  //       const fetchedData = response.data;

  //       formik.setValues({
  //         userId: fetchedData.userId || "",
  //         centerId: fetchedData.centerId || "",
  //         centerName: fetchedData.centerName || "",
  //         employeeName: fetchedData.employeeName || "",
  //         leaveType: fetchedData.leaveType || "",
  //         noOfDays: fetchedData.noOfDays || "",
  //         fromDate: fetchedData.fromDate || "",
  //         toDate: fetchedData.toDate || "",
  //         requestDate: fetchedData.requestDate || "",
  //         approverName: fetchedData.approverName || "",
  //         dayType: fetchedData.dayType || "",
  //         leaveStatus: fetchedData.leaveStatus || "",
  //         leaveReason: fetchedData.leaveReason || "",
  //         file: fetchedData.attachment || "",
  //       });
  //     if (!fetchedData.noOfDays && fetchedData.fromDate && fetchedData.toDate) {
  //       const daysDiff = calculateDays(fetchedData.fromDate, fetchedData.toDate);
  //       setDaysDifference(daysDiff);
  //     }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getData();
  //   fetchData();
  // }, []);

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
              <Link to="/leave">
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
                Employee Name<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="employeeName"
                className="form-control"
                value={datas && datas.employeeName}
                readOnly
              />
              <input
                type="hidden"
                name="userId"
                value={datas && datas.userId}
                {...formik.getFieldProps("userId")}
              />
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
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
                {leaveTypeData &&
                  leaveTypeData.map((leave) => (
                    <option key={leave.id} value={leave.leaveType}>
                      {leave.leaveType}
                    </option>
                  ))}
              </select>
              {formik.touched.leaveType && formik.errors.leaveType && (
                <div className="invalid-feedback">
                  {formik.errors.leaveType}
                </div>
              )}
            </div>

            <div className="col-md-6 col-12 mb-3">
              <label className="form-label">
                From Date<span className="text-danger">*</span>
              </label>
              <input
                type="date"
                // onFocus={(e) => e.target.showPicker()}
                className={`form-control  ${
                  formik.touched.fromDate && formik.errors.fromDate
                    ? "is-invalid"
                    : ""
                }`}
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
                // onFocus={(e) => e.target.showPicker()}
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
                name="noOfDays"
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
                <div className="invalid-feedback">{formik.errors.noOfDays}</div>
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
                name="file"
                // {...formik.getFieldProps("file")}
                onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
                onBlur={formik.handleBlur}
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

export default LeaveEdit;
