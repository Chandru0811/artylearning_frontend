import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import LevelAdd from "./LevelAdd";
import LevelEdit from "./LevelEdit";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";

const Level = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourseLevels");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    fetchData();
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
      columnDefs: [
        { orderable: false, targets: -1 }
      ],
    });
  };

  const fetchData = async () => {
    try {
      const subjectData = await fetchAllSubjectsWithIds();
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    fetchData();
    setLoading(true);
    try {
      const response = await api.get("/getAllCourseLevels");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      {storedScreens?.levelCreate && <LevelAdd onSuccess={refreshData} />}

      {loading ? (
        <div className="loader-container">
          <div className="loading">
            <span></span>
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
              <th scope="col">Subject</th>
              <th scope="col">Level</th>
              <th scope="col">Code</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {subjectData &&
                    subjectData.map((subjectId) =>
                      parseInt(data.subjectId) === subjectId.id
                        ? subjectId.subjects || ""
                        : ""
                    )}
                </td>
                <td>{data.level}</td>
                <td>{data.levelCode}</td>
                <td>
                  {data.status === "Active" ? (
                    <span className="badge badges-Green">Active</span>
                  ) : (
                    <span className="badge badges-Red">Inactive</span>
                  )}
                </td>
                <td>
                  {/* {storedScreens?.levelRead && (
                    <Link to={`/level/view/${data.id}`}>
                      <button className="btn btn-sm">
                        <FaEye />
                      </button>
                    </Link>
                  )} */}
                  {storedScreens?.levelUpdate && (
                    <LevelEdit id={data.id} onSuccess={refreshData} />
                  )}
                  {storedScreens?.levelDelete && (
                    <Delete
                      onSuccess={refreshData}
                      path={`/deleteCourseLevel/${data.id}`}
                    />
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

export default Level;
