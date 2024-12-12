import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
import { MdOutlineModeEdit, MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const Payroll = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  const [extraData, setExtraData] = useState(false);
  const [centerName, setCenterName] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [roll, setRoll] = useState("");

  const clearFilters = () => {
    setCenterName("");
    setEmployeeName("");
    setRoll("");

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
        const response = await api.get("getAllUserPayroll");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data ", error);
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
      const response = await api.get("getAllUserPayroll");
      setDatas(response.data);
      // initializeDataTable(); // Reinitialize DataTable after successful data update
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

  const handleRowClick = (id) => {
    navigate(`/payrolladmin/view/${id}`);
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
    <div className="container-fluid my-4 center">
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
          Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Payroll
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
                Payroll
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3 px-2">
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
                placeholder="Employee Name"
                value={employeeName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setEmployeeName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Roll"
                value={roll}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setRoll(e.target.value);
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
          {storedScreens?.payrollCreate && (
            <Link to="/payrolladmin/add">
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
                  <th scope="col">S No</th>
                  <th className="text-center text-muted"></th>
                  <th scope="col">Centre Name</th>
                  <th scope="col">Emplopee Name</th>
                  <th scope="col">Net Pay</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
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
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <th scope="row">{index + 1}</th>
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
                                {storedScreens?.payrollUpdate && (
                                  <Link to={`/payrolladmin/edit/${data.id}`}>
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
                                {storedScreens?.payrollDelete && (
                                  <span>
                                    <Delete
                                      onSuccess={refreshData}
                                      path={`/deleteUserPayroll/${data.id}`}
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
                      {centerData &&
                        centerData.map((center) =>
                          parseInt(data.centerId) === center.id
                            ? center.centerNames || "--"
                            : ""
                        )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.employeeName}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.netPay}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.userRole}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.status === "APPROVED" ? (
                        <span className="badge badges-Green">Approved</span>
                      ) : data.status === "PENDING" ? (
                        <span className="badge badges-Yellow">Pending</span>
                      ) : (
                        <span className="badge badges-Red">Rejected</span>
                      )}
                    </td>
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.createdBy}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {extractDate(data.createdAt)}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.updatedBy}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {extractDate(data.updatedAt)}
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

export default Payroll;
