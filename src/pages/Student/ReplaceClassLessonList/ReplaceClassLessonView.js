import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
// import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
// import fetchAllCoursesWithIds from "../List/CourseList";
import pdfLogo from "../../../assets/images/Attactmentpdf.jpg";
import { MdOutlineDownloadForOffline } from "react-icons/md";

function ReplaceClassLessonView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const getData = async () => {
    try {
      const response = await api.get(
        `/getAllStudentReplacementClassById/${id}`
      );
      setData(response.data);
      const fetchedStatus = response.data.status; // Assuming 'status' is part of the response data
      if (fetchedStatus === "APPROVED" || fetchedStatus === "REJECTED") {
        setStatus(fetchedStatus); // Set the status based on the fetched data
      } else {
        console.log("Unknown status");
      }
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }
  };

  const handleStatusToggle = async (newStatus) => {
    setStatus(newStatus); // Update the state with the selected status
    try {
      const response = await api.put(
        `/updateStatus/${id}?id=${id}&leaveStatus=${newStatus}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Status updated successfully.");
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning(error?.response?.data?.message);
      } else {
        toast.error(error?.response?.data?.message || "An error occurred.");
      }
    }
  };

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();

      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getData();
    fetchData();
  }, [id]);

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
          Student Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/replaceclasslesson" className="custom-breadcrumb">
            Replace Class Lesson List
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Replace Class Lesson List View
        </li>
      </ol>
      <div className="card">
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">
              View Replace Class Lesson List
            </span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            {/* <div
              className="btn-group"
              role="group"
            >
              <input
                type="radio"
                className="btn-check btn-check-status"
                name="status"
                id="approve"
                autocomplete="off"
                checked
              />
              <label className="btn btn-outline-orange btn-sm" for="approve">
                Approved
              </label>

              <input
                type="radio"
                className="btn-check btn-check-status"
                name="status"
                id="reject"
                autocomplete="off"
              />
              <label className="btn btn-outline-orange btn-sm" for="reject">
                Rejected
              </label>
            </div> */}
            <div className="btn-group" role="group">
              <input
                type="radio"
                className="btn-check btn-check-status"
                name="status"
                id="approve"
                autoComplete="off"
                checked={status === "APPROVED"} // Dynamically set based on fetched status
                onChange={() => handleStatusToggle("APPROVED")} // Handle click to update status
              />
              <label
                className="btn btn-outline-orange btn-sm"
                htmlFor="approve"
              >
                Approved
              </label>

              <input
                type="radio"
                className="btn-check btn-check-status"
                name="status"
                id="reject"
                autoComplete="off"
                checked={status === "REJECTED"} // Dynamically set based on fetched status
                onChange={() => handleStatusToggle("REJECTED")} // Handle click to update status
              />
              <label className="btn btn-outline-orange btn-sm" htmlFor="reject">
                Rejected
              </label>
            </div>
            &nbsp; &nbsp;
            {data.status === "APPROVED" ? (
              <>
                <Link
                  to={`/replaceclasslessonList?centerId=${data.centerId}&studentId=${data.studentId}`}
                >
                  <button type="button" className="btn btn-button btn-sm">
                    Replace Class Lesson
                  </button>
                </Link>
              </>
            ) : (
              <></>
            )}
            <Link to="/replaceclasslesson">
              <button type="button " className="btn btn-sm btn-border mx-2">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container-fluid px-4">
          <div className="row pb-3">
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Center Name</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">
                    :{" "}
                    {centerData &&
                      centerData.map((center) =>
                        parseInt(data.centerId) === center.id
                          ? center.centerNames || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Student Name</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.studentName || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Student Unique Id</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : S0005{data.studentId || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Course</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.course || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Class Code</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.classCode || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Absent Date</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.absentDate || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Prefer Day</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.preferredDay || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Preferred Timing</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.preferredTiming || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Approve Status</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.status || ""}
                  </p>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Absent Reason</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.absentReason || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Other Reason</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.otherReason || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Remark</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.remark || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Document</p>
                </div>
                <div className="col-9">
                  {data?.document && (
                    <div
                      className="card border-0 shadow"
                      style={{ width: "70%" }}
                    >
                      <div
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: "not-allowed" }}
                      >
                        <img
                          className="card-img-top img-fluid"
                          style={{
                            height: "10rem",
                            pointerEvents: "none",
                            cursor: "not-allowed",
                          }}
                          src={pdfLogo}
                          alt="Resume preview"
                        />
                      </div>
                      <div
                        className="card-body d-flex justify-content-between align-items-center"
                        style={{ flexWrap: "wrap" }}
                      >
                        <p
                          className="card-title fw-semibold mb-0 text-wrap"
                          style={{
                            flex: 1,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={data?.document?.split("/").pop()}
                        >
                          {data?.document?.split("/").pop()}
                        </p>
                        <a
                          href={data?.document}
                          download
                          className="btn text-dark ms-2"
                          title="Download Resume"
                          style={{ flexShrink: 0 }}
                        >
                          <MdOutlineDownloadForOffline size={25} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplaceClassLessonView;
