import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { IoIosAddCircle } from "react-icons/io";
import Delete from "../../components/common/Delete";
import { MdOutlineModeEdit } from "react-icons/md";

const Student = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);
  const [centerData, setCenterData] = useState([]);
  const [centerId, setCenterId] = useState(
    localStorage.getItem("centerId") || ""
  );
  const centerLocalId = localStorage.getItem("centerId");
  const [studentId, setStudentName] = useState("");
  const [parentId, setParentId] = useState("");

  const navigate = useNavigate();

  // Fetch student data with filters
  const getCenterData = async () => {
    try {
      const params = {};

      if (centerId) params.centerId = centerId;
      if (studentId) params.studentId = studentId;
      if (parentId) params.parentId = parentId;

      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(
        `/getStudentWithCustomInfo?${queryParams}`
      );
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    }
  };

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerLocalId !== null && centerLocalId !== "undefined") {
        setCenterId(centerLocalId[0]);
      } else if (centerData !== null && centerData.length > 0) {
        setCenterId(centerData[0].id);
      }
      setCenterData(centerData);
    } catch (error) {
      toast.error(`Error Fetching Center Data: ${error.message}`);
    }
  };

  const clearFilters = () => {
    setCenterId("");
    setStudentName("");
    setParentId("");
    refreshData();
  };

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
      columnDefs: [{ orderable: false, targets: 1 }],
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    await getCenterData();
    setLoading(false);
  };

  const handleRowClick = (id) => {
    navigate(`/student/view/${id}`);
  };

  const extractDate = (dateString) => {
    return dateString?.substring(0, 10) || "";
  };

  const handleDataShow = () => {
    setExtraData((prev) => !prev);
    initializeDataTable();
  };

  useEffect(() => {
    fetchData();
  }, [centerLocalId]);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  useEffect(() => {
    if (centerId !== undefined && centerId !== "") {
      getCenterData();
    }
  }, [centerId, studentId, parentId]);

  return (
    <div className="container-fluid my-4 center">
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
        <li className="breadcrumb-item active" aria-current="page">
          Student Listing
        </li>
      </ol>

      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Student Listing
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                onChange={(e) => setCenterId(e.target.value)}
                name="centerId"
                value={centerId}
              >
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id} selected>
                    {center.centerNames}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Student Name"
                value={studentId}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setStudentName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Parent"
                value={parentId}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setParentId(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1 ">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          <div>
            {storedScreens?.studentListingCreate && (
              <Link to="/student/add">
                <button
                  type="button"
                  className="btn btn-button btn-sm me-2"
                  style={{ fontWeight: "600px !important" }}
                >
                  &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
                </button>
              </Link>
            )}
          </div>
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
          <div className="table-responsive py-2">
            <table style={{ width: "100%" }} ref={tableRef} className="display">
              <thead>
                <tr className="text-center" style={{ background: "#f5f7f9" }}>
                  <th scope="col" className="text-center">
                    S No
                  </th>
                  <th className="text-center text-muted"></th>
                  <th className="text-muted" scope="col">
                    Centre
                  </th>
                  <th className="text-muted" scope="col">
                    Student ID
                  </th>
                  <th className="text-muted" scope="col">
                    Student Name
                  </th>
                  <th className="text-muted" scope="col">
                    Age
                  </th>
                  <th className="text-muted" scope="col">
                    Gender
                  </th>
                  <th className="text-muted" scope="col">
                    Nationality
                  </th>
                  <th className="text-muted" scope="col">
                    Allow Magazine
                  </th>
                  <th className="text-muted" scope="col">
                    Allow Social Media
                  </th>
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
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index} style={{ cursor: "pointer" }}>
                    <th scope="row" className="text-break text-center">
                      {index + 1}
                    </th>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        {storedScreens?.centerListingCreate && (
                          <div className="dropdown">
                            <button
                              className="btn btn-button btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <IoIosAddCircle
                                className="text-light"
                                style={{ fontSize: "16px" }}
                              />
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li>
                                {storedScreens?.centerListingUpdate && (
                                  <Link to={`/student/edit/${data.id}`}>
                                    <button
                                      style={{
                                        whiteSpace: "nowrap",
                                        width: "100%",
                                      }}
                                      className="btn btn-sm btn-normal text-start"
                                    >
                                      <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
                                    </button>
                                  </Link>
                                )}
                              </li>
                              <li>
                                {storedScreens?.centerListingDelete && (
                                  <span>
                                    <Delete
                                      onSuccess={refreshData}
                                      path={`/deleteStudentDetail/${data.id}`}
                                    />{" "}
                                  </span>
                                )}
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.center}{" "}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.studentUniqueId}{" "}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.studentName}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>{data.age}</td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.gender}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.nationality}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.allowMagazine === "false" ? "Yes" : "No"}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.allowSocialMedia === "false" ? "Yes" : "No"}
                    </td>
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.createdBy}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.createdAt}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.updatedBy}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.updatedAt}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
