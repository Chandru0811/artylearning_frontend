import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";
import fetchAllCoursesWithIds from "../List/CourseList";

function ClassView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      setCenterData(centerData);
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCourseClassListingsById/${id}`);
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
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/class" className="custom-breadcrumb">
            &nbsp;Class
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Class View
        </li>
      </ol>
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/class">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>
      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mt-3  mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Centre Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {centerData &&
                      centerData.map((centerId) =>
                        parseInt(data.centerId) === centerId.id
                          ? centerId.centerNames || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6  ">
                  <p className="fw-medium">Course</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {courseData &&
                      courseData.map((courseId) =>
                        parseInt(data.courseId) === courseId.id
                          ? courseId.courseNames || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Class Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.className || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Class Type</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.classType || ""}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Duration(Hrs)</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.durationInHrs || ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Remarks</p>
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

export default ClassView;
