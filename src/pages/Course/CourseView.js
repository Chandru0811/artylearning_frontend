import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
import fetchAllLevelsWithIds from "../List/LevelList";

function CourseView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [levelData, setLevelData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      const levelData = await fetchAllLevelsWithIds();
      setCenterData(centerData);
      setSubjectData(subjectData);
      setLevelData(levelData);
    } catch (error) {
      toast.error(error);
    }
  };
  const getCenterNames = (centerIds) =>
    centerIds
      ?.map(
        (centerId) =>
          centerData?.find((c) => c.id === centerId)?.centerNames || ""
      )
      .join(", ");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCoursesById/${id}`);
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
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/course" className="custom-breadcrumb">
            &nbsp;Course{" "}
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Course View
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
            <span class="me-2 text-muted">View Course</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/course">
              <button type="button " className="btn btn-sm btn-border   ">
                Back
              </button>
            </Link>
          </div>
        </div>
        <div className="container-fluid px-4">
          <div className="row pb-3">
            <div className="col-md-12 col-12">
              <div className="row mt-3 mb-2">
                <div className="col-3 ">
                  <p className="fw-medium">Centre Name</p>
                </div>
                <div className="col-9">
                  <p className="text-muted text-sm">
                    :{" "}
                    {data.centers && data.centers.length > 0
                      ? data.centers.map((center, index) => (
                          <span key={index}>
                            {index > 0 && ", "}
                            {center.centerName}
                          </span>
                        ))
                      : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6">
                  <p className="fw-medium">Course Name</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.courseName}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6">
                  <p className="fw-medium">Course Code</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.courseCode}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Subject</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {subjectData &&
                      subjectData.map((subjectId) =>
                        parseInt(data.subjectId) === subjectId.id
                          ? subjectId.subjects || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Level</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {levelData &&
                      levelData.map((levelId) =>
                        parseInt(data.levelId) === levelId.id
                          ? levelId.levels || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Min Class Size</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.minClassSize}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Max Class Size</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.maxClassSize}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Replacement Lesson Student Buffer</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.replacementLessonStudentBuffer}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Color Code</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.colorCode}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Course Type</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.courseType}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Duration(Hr)</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.durationInHrs}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Duration(Mins)</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.durationInMins}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Status</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.status}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Class Replacement Allowed</p>
                </div>
                <div className="col-6">
                  {/* <p className="text-muted text-sm">
                    : {data.classReplacementAllowed}
                  </p> */}
                  <p className="text-muted text-sm">
                    : {data.classReplacementAllowed ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-12">
              <div className="row  mb-2">
                <div className="col-3  ">
                  <p className="fw-medium">Description</p>
                </div>
                <div className="col-9 ">
                  <p className="text-muted text-sm text-break ">
                    : {data.description}
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

export default CourseView;
