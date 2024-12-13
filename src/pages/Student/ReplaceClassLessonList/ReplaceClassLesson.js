import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import { SCREENS } from "../../../config/ScreenFilter";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";

const ReplaceClassLesson = () => {
  const tableRef = useRef(null);
  const { centerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [centerData, setCenterData] = useState(null);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [centerName, setCenterName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [courseName, setCourseName] = useState("");

  const clearFilters = () => {
    setCenterName("");
    setStudentName("");
    setCourseName("");

    $(tableRef.current).DataTable().search("").draw();
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
        const response = await api.get("/getAllStudentReplacementClass");
        setDatas(
          response.data.map((data) => ({
            ...data,
            status: data.status || "Pending",
          }))
        ); // Default to "Pending" if no status
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
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
    if ($.fn.DataTable.isDataTable(tableRef.current)) return;
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
      const response = await api.get("/getAllStudentReplacementClass");
      setDatas(
        response.data.map((data) => ({
          ...data,
          status: data.status || "Pending",
        }))
      );
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.put(
        `/updateStatus/${id}?id=${id}&leaveStatus=${newStatus}`,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success("Status updated successfully");
        setDatas((prevDatas) =>
          prevDatas.map((data) =>
            data.id === id ? { ...data, status: newStatus } : data
          )
        );
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

  const getBadgeColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "btn-success";
      case "REJECTED":
        return "btn-danger";
      case "PENDING":
        return "btn-warning";
      default:
        return "btn-secondary";
    }
  };

  const handleRowClick = (id) => {
    navigate(`/replaceclasslesson/view/${id}`);
  };

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

  return (
    <div className="container my-4">
      <ol
        className="breadcrumb my-3 px-1"
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
          Replace Class Lesson List
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
                Replace Class Lesson List
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre Name"
                value={centerName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCenterName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Student Name"
                value={studentName}
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
                placeholder="Course"
                value={courseName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCourseName(e.target.value);
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
                  <th className="text-muted" scope="col">
                    Centre Name
                  </th>
                  <th className="text-muted" scope="col">
                    Student Name
                  </th>
                  <th className="text-muted" scope="col">
                    Course
                  </th>
                  <th className="text-muted" scope="col">
                    Class Code
                  </th>
                  <th className="text-muted" scope="col">
                    Status
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
                    <td onClick={() => handleRowClick(data.id)}>
                      {centerData &&
                        centerData.map((center) =>
                          parseInt(data.centerId) === center.id
                            ? center.centerNames || "--"
                            : ""
                        )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.studentName}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.course}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.classCode}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      <div className="dropdown">
                        <button
                          className={`btn btn-sm leadStatus ${getBadgeColor(
                            data.status
                          )}`}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="text-white fw-bold">
                            {data.status}
                          </span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                handleStatusChange(data.id, "APPROVED")
                              }
                            >
                              Approved
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                handleStatusChange(data.id, "REJECTED")
                              }
                            >
                              Rejected
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                handleStatusChange(data.id, "PENDING")
                              }
                            >
                              Pending
                            </button>
                          </li>
                        </ul>
                      </div>
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

export default ReplaceClassLesson;
