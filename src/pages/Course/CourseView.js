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
    <div className="container ">
            <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }}>Course Management</Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/course" style={{ textDecoration: "none" }}>
            Course{" "}
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Course View
        </li>
      </ol>
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/course">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>
      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-12 col-12">
              <div className="row mt-3  mb-2">
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
