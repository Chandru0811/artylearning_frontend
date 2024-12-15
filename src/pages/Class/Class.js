import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import Delete from "../../components/common/Delete"; // Ensure correct import
import api from "../../config/URL";
import { toast } from "react-toastify";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import fetchAllCentersWithIds from "../List/CenterList";

const Class = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [centerData, setCenterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  const [centerId, setCenterId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [classCode, setClassCode] = useState("");
  const [userId, setUserId] = useState("");
  const [classType, setClassType] = useState("");

  const getClassData = async () => {
    try {
      const params = {};
      if (centerId) params.centerId = centerId;
      if (courseId) params.courseId = courseId;
      if (classCode) params.classCode = classCode;
      if (userId) params.userId = userId;
      if (classType) params.classType = classType;
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/getClassWithCustomInfo?${queryParams}`);
      setDatas(response.data);
      console.log("Class Filter Data:",response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
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
      toast.error(error);
    }
  };

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      const table = $(tableRef.current).DataTable();
      table.draw();
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
      columnDefs: [{ orderable: false, targets: -1 }],
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
    try {
      const params = {};
      if (centerId) params.centerId = centerId;
      if (courseId) params.courseId = courseId;
      if (classCode) params.classCode = classCode;
      if (userId) params.userId = userId;
      if (classType) params.classType = classType;
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/getClassWithCustomInfo?${queryParams}`);
      setDatas(response.data);
      console.log("Class Filter Data:",response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
  };

  const clearFilters = () => {
    setCenterId("");
    setCourseId("");
    setClassCode("");
    setClassType("");
    setUserId("");
    getClassData();
    // $(tableRef.current).DataTable().search("").draw();
  };

  const handleRowClick = (id) => {
    navigate(`/class/view/${id}`);
  };

  useEffect(() => {
    fetchData(); // Fetch the center manager data as well
  }, [centerLocalId]);

  useEffect(() => {
    if (tableRef.current) {
      const rows = tableRef.current.querySelectorAll("tr.odd");
      rows.forEach((row) => {
        row.classList.remove("odd");
      });
      const thElements = tableRef.current.querySelectorAll("tr th.sorting_1");
      thElements.forEach((th) => th.classList.remove("sorting_1"));
    }
  }, [datas]);

  useEffect(() => {
    if (centerLocalId) {
      getClassData();
    }
  }, [centerData, centerLocalId]);

  useEffect(() => {
    if (!loading && datas.length > 0) {
        initializeDataTable();
    }
    return () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            destroyDataTable();
        }
    };
}, [datas, loading]);


  return (
    <div className="container my-4 center">
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
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Class
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
                Class
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                name="centerId"
                style={{ width: "100%" }}
                onChange={(e) => setCenterId(e.target.value)}
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
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                name="courseId"
                onChange={(e) => setCourseId(e.target.value)}
                value={courseId}
              >
                <option selected>Select a Course</option>
                {courseData &&
                  courseData.map((courseId) => (
                    <option key={courseId.id} value={courseId.id}>
                      {courseId.courseNames}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="classCode"
                className="form-control form-control-sm center_list"
                style={{ width: "100%" }}
                placeholder="Class Code"
                onChange={(e) => setClassCode(e.target.value)}
                value={classCode}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                onChange={(e) => setUserId(e.target.value)}
                name="userId"
                value={userId}
              >
                <option selected>Select a Teacher</option>
                {teacherData &&
                  teacherData.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.teacherNames}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="individual_fliters d-lg-flex ">
              <div className="form-group mb-0 ms-2 mb-1">
                <select
                  className="form-select form-select-sm center_list"
                  name="classCode"
                  style={{ width: "100%" }}
                  onChange={(e) => setClassType(e.target.value)}
                  value={classCode}
                >
                  <option selected>Select Class Type</option>
                  <option value="Group">Group</option>
                  <option value="Individual">Individual</option>
                </select>
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
            <div className="me-2">
              {storedScreens?.documentListingCreate && (
                <Link to="/class/add">
                  <button type="button" className="btn btn-button btn-sm">
                    Add <i className="bx bx-plus"></i>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="loading">
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
                  <th className="text-muted" scope="col">
                    S No
                  </th>
                  <th className="text-center text-muted"></th>
                  <th className="text-muted" scope="col">
                    Centre Name
                  </th>
                  <th className="text-muted" scope="col">
                    Course Name
                  </th>
                  <th className="text-muted" scope="col">
                    Class Name
                  </th>
                  <th className="text-muted" scope="col">
                    Class Type
                  </th>
                  <th className="text-muted" scope="col">
                    Start Date
                  </th>
                  <th className="text-muted" scope="col">
                    End Date
                  </th>
                  <th className="text-muted" scope="col">
                    Holiday Title
                  </th>
                  <th className="text-muted" scope="col">
                    Class Code
                  </th>
                  <th className="text-muted" scope="col">
                    Status
                  </th>
                  <th className="text-muted" scope="col">
                    Updated By
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        {storedScreens?.classCreate && (
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
                                {storedScreens?.classUpdate && (
                                  <Link to={`/class/edit/${data.id}`}>
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
                                {storedScreens?.classDelete && (
                                  <span>
                                    <Delete
                                      onSuccess={refreshData}
                                      path={`/deleteClass/${data.id}`}
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
                      {data.centerName}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.courseId}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.className}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.classType}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.startDate}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.endDate}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.holidayTitle}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.classCode}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.status === "Active" ? (
                        <span className="badge badges-Green">Active</span>
                      ) : (
                        <span className="badge badges-Red">Inactive</span>
                      )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.updatedBy}
                    </td>
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

export default Class;
