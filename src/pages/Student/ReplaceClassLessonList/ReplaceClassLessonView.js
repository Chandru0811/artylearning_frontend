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

  //   const fetchData = async () => {
  //     try {
  //       const centerData = await fetchAllCentersWithIds();
  //       const courseData = await fetchAllCoursesWithIds();
  //       setCenterData(centerData);
  //       setCourseData(courseData);
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };
  const handleStatusToggle = async (newStatus) => {
    // Update the status locally
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
    <div className="container ">
      <div className="d-flex justify-content-end align-items-end mt-4 p-0">
        <div className="d-flex justify-content-end align-items-end">
          <Link to="/replaceclasslesson">
            <button type="button" className="btn btn-sm btn-border mx-1">
              Back
            </button>
          </Link>
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

          {/* <select
            value={status}
            className={`ms-3 form-select fw-bold 
              ${
                status === "PENDING"
                  ? "text-warning"
                  : status === "APPROVED"
                  ? "text-success"
                  : "text-danger"
              }`}
            onChange={(e) => handleStatusToggle(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select> */}
        </div>
      </div>

      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
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
