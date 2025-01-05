import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllTeachersWithIds from "../../List/TeacherList";
import pdfLogo from "../../../assets/images/Attactmentpdf.jpg";
import { MdOutlineDownloadForOffline } from "react-icons/md";

function LeaveView() {
  const [data, setData] = useState([]);
  console.log("Leave Datas:", data);
  const { id } = useParams();
  const [centerData, setCenterData] = useState(null);
  const [teacherData, setTeacherData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const teacherData = await fetchAllTeachersWithIds();
      setCenterData(centerData);
      setTeacherData(teacherData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getUserLeaveRequestById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
    fetchData();
  }, []);

  return (
    <div className="container">
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
          <Link to="/leave" className="custom-breadcrumb">
            &nbsp;Leave Request{" "}
            <span className="breadcrumb-separator"> &gt; </span>
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Leave Request View
        </li>
      </ol>
      <div className="card">
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">View Leave</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/leave">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div class="container-fluid minHeight mb-5">
          <div className="row mt-5">
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <p className="text-sm fw-medium">Centre Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.centerName}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <p className="text-sm fw-medium">Employee Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.employeeName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <p className="text-sm fw-medium">Leave Type</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.leaveType || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex ">
                  <p className="text-sm fw-medium">No.Of.Days</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.noOfDays || "0"} Days
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 ">
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <p className="text-sm fw-medium">From Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.fromDate || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <p className="text-sm fw-medium">To Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.toDate || "--"}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex">
                  <p className="text-sm fw-medium">Day Type</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.dayType || "--"}</p>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex">
              <p className="text-sm fw-medium">Request Date</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.requestDate || "--"}</p>
            </div>
          </div>
        </div> */}

            {/* <div className="col-md-6 col-12">
          <div className="row mb-3">
            <div className="col-6 d-flex ">
              <p className="text-sm fw-medium">Approver Name</p>
            </div>
            <div className="col-6">
              <p className="text-muted text-sm">: {data.approverName || "--"}</p>
            </div>
          </div>
        </div> */}
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex ">
                  <p className="text-sm fw-medium">Status</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.leaveStatus || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex ">
                  <p className="text-sm fw-medium">Leave Reason</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.leaveReason || "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="headColor mt-5">Attachment</p>
            <hr />
            <div className="row mt-4">
              <div className="container p-2">
                {data.attachment && (
                  <div className="mt-3">
                    {data?.attachment?.endsWith(".pdf") ? (
                      <div
                        class="card border-0 shadow"
                        style={{ width: "18rem" }}
                      >
                        <a
                          href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                            data?.attachment
                          )}&embedded=true`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            class="card-img-top img-fluid"
                            style={{ height: "100px", objectFit: "contain" }}
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
                        style={{ height: "100px", objectFit: "contain" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveView;
