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
  const [status, setStatus] = useState("pending");

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const handleStatusToggle = async (newStatus) => {
    setStatus(newStatus);
    try {
      const response = await api.put(
        `/updateStatus/${id}?id=${id}&leaveStatus=${newStatus}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Update successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning(error?.response?.data?.message);
      } else {
        toast.error(error?.response?.data?.message);
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
    const getData = async () => {
      try {
        const response = await api.get(
          `/getAllStudentReplacementClassById/${id}`
        );
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
    };
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
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">View Replace Class Lesson List</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/replaceclasslesson">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
            &nbsp; &nbsp;
            {data.status === "APPROVED" ? (
              <>
                <Link
                  to={`/replaceclasslessonList?centerId=${data.centerId}&studentId=${data.studentId}`}
                >
                  <button type="button" className="btn btn-button2 btn-sm">
                    Replace Class Lesson
                  </button>
                </Link>
              </>
            ) : (
              <></>
            )}
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
                  {/* <p className="text-muted text-sm d-flex text-break">
                    : {data.document || ""}
                  </p> */}
                  {data?.document && (
                    <div
                      class="card border-0 shadow"
                      style={{ width: "18rem" }}
                    >
                      <a
                        href={`https://docs.google.com/viewer?url=${encodeURIComponent(
                          data?.document
                        )}&embedded=true`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          class="card-img-top img-fluid"
                          style={{ height: "10rem" }}
                          src={pdfLogo}
                          alt="Card image cap"
                        />
                      </a>
                      <div class="card-body d-flex justify-content-between flex-wrap">
                        <p class="card-title fw-semibold text-wrap">
                          {data?.document?.split("/").pop()}
                        </p>

                        <a href={data?.document} class="btn text-dark">
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
