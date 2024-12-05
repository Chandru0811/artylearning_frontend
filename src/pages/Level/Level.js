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
import { MdViewColumn } from "react-icons/md";

const Level = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);
  const [extraData, setExtraData] = useState(false);

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
      columnDefs: [{ orderable: false, targets: -1 }],
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
  const handleDataShow = () => {
    if (!loading) {
      setExtraData(!extraData);
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  };

  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };
  return (
    <div className="container my-4">
      <ol
        className="breadcrumb"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link  style={{ textDecoration: "none" }}>
            Course Management
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Level
        </li>
      </ol>

      <div className="d-flex justify-content-end align-items-center">
        <span>
          <LevelAdd onSuccess={refreshData} />
        </span>
        {/* } */}
        {/* <p className="mb-4">        <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>

          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>

        </button> </p> */}
      </div>
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
        <div className="table-responsive">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col">S No</th>
                <th scope="col">Level</th>
                <th scope="col">Subject</th>
                <th scope="col">Code</th>
                {extraData && (
                  <th
                    scope="col"
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    aria-label="CreatedBy: activate to sort column ascending: activate to sort column ascending"
                    style={{ width: "92px" }}
                  >
                    CreatedBy
                  </th>
                )}
                {extraData && (
                  <th
                    scope="col"
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    aria-label="CreatedAt: activate to sort column ascending: activate to sort column ascending"
                    style={{ width: "92px" }}
                  >
                    CreatedAt
                  </th>
                )}
                {extraData && (
                  <th
                    scope="col"
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    aria-label="UpdatedBy: activate to sort column ascending: activate to sort column ascending"
                    style={{ width: "92px" }}
                  >
                    UpdatedBy
                  </th>
                )}
                {extraData && (
                  <th
                    scope="col"
                    class="sorting"
                    tabindex="0"
                    aria-controls="DataTables_Table_0"
                    rowspan="1"
                    colspan="1"
                    aria-label="UpdatedAt: activate to sort column ascending: activate to sort column ascending"
                    style={{ width: "92px" }}
                  >
                    UpdatedAt
                  </th>
                )}
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-break">{data.level}</td>
                  <td>
                    {subjectData &&
                      subjectData.map((subjectId) =>
                        parseInt(data.subjectId) === subjectId.id
                          ? subjectId.subjects || ""
                          : ""
                      )}
                  </td>
                  <td className="text-break">{data.levelCode}</td>
                  {extraData && <td>{data.createdBy}</td>}
                  {extraData && <td>{extractDate(data.createdAt)}</td>}
                  {extraData && <td>{data.updatedBy}</td>}
                  {extraData && <td>{extractDate(data.updatedAt)}</td>}
                  <td>
                    {data.status === "Active" ? (
                      <span className="badge badges-Green">Active</span>
                    ) : (
                      <span className="badge badges-Red">Inactive</span>
                    )}
                  </td>
                  <td className="d-flex">
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
        </div>
      )}
    </div>
  );
};

export default Level;
