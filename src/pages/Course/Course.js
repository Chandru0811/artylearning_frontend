import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { FaFileInvoice } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { SCREENS } from "../../config/ScreenFilter";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";

const Course = () => {
  console.log("Screens : ", SCREENS);
  // const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourses");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      // DataTable already initialized, no need to initialize again
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const fetchSubData = async () => {
    try {
      const subjectData = await fetchAllSubjectsWithIds();
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllCourses");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
    useEffect(() => {
    fetchSubData();
  }, [loading]);


  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end mb-5">
        {storedScreens?.courseCreate && (
          <Link to={{
            pathname: "/course/add",
            state: { subjectData }
          }}>
            <button type="button" className="btn btn-button btn-sm">
              Add <i class="bx bx-plus"></i>
            </button>
          </Link>
        )}
      </div>
      {loading ? (
        <div className="loader-container">
          <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : (
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col">S No</th>
              {/* <th scope="col">Centre Name</th> */}
              <th scope="col">Course Name</th>
              <th scope="col">Course Code</th>
              <th scope="col">Course Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                {/* <td>{data.centerName}</td> */}
                <td>{data.courseName}</td>
                <td>{data.courseCode}</td>
                <td>{data.courseType}</td>
                <td>
                  {data.status === "Active" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                <td>
                  {storedScreens?.courseRead && (
                    <Link to={`/course/view/${data.id}`}>
                      <button className="btn btn-sm">
                        <FaEye />
                      </button>
                    </Link>
                  )}
                  {storedScreens?.courseUpdate && (
                    <Link to={`/course/edit/${data.id}`}>
                      <button className="btn btn-sm">
                        <FaEdit />
                      </button>
                    </Link>
                  )}
                  {storedScreens?.courseDelete && (
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteCourse/${data.id}`}
                    />
                  )}

                  {storedScreens?.curriculumIndex && (
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="tooltip-top">Curriculum</Tooltip>}
                    >
                      <Link to={`/course/curriculum/${data.id}`}>
                        <button className="btn btn-sm">
                          <FaFileInvoice />
                        </button>
                      </Link>
                    </OverlayTrigger>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Course;
