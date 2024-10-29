import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
// import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
// import fetchAllCoursesWithIds from "../List/CourseList";

function ReplaceClassLessonView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const getData = async () => {
      //   try {
      //     const response = await api.get(`/getAllCourseClassListingsById/${id}`);
      //     setData(response.data);
      //   } catch (error) {
      //     toast.error("Error Fetching Data ", error);
      //   }
    };
    getData();
    // fetchData();
  }, [id]);

  return (
    <div className="container ">
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/replaceclasslesson">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
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
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.remark || ""}
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
                    : {data.remark || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Month</p>
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
                  <p className="fw-medium">Course</p>
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
                  <p className="fw-medium">Class Listing</p>
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
                  <p className="fw-medium">Class Date</p>
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
                  <p className="fw-medium">Replacement Class</p>
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
                  <p className="fw-medium">Replacement Date</p>
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
                  <p className="fw-medium">Prefer Day</p>
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
                  <p className="fw-medium">Attendance Status</p>
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
                  <p className="fw-medium">Request Date</p>
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
                  <p className="fw-medium">Approve Date</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.remark || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Replacement Reason</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm d-flex text-break">
                    : {data.remark || ""}
                  </p>
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
