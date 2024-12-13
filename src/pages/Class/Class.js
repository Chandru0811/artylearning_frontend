import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete"; // Ensure correct import
import api from "../../config/URL";
import { toast } from "react-toastify";
import { MdOutlineModeEdit, MdViewColumn } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { IoIosAddCircle } from "react-icons/io";

const ColumnToggleDropdown = ({ showColumns, onToggle }) => {
  const columns = [
    { key: "createdBy", label: "Created By" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedBy", label: "Updated By" },
    { key: "updatedAt", label: "Updated At" },
    { key: "className", label: "Class Name" },
    { key: "classType", label: "Class Type" },
  ];

  return (
    <Dropdown.Menu>
      {columns.map((column) => (
        <Dropdown.Item key={column.key}>
          <Form.Check
            type="checkbox"
            label={column.label}
            checked={showColumns[column.key]}
            onChange={() => onToggle(column.key)}
          />
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

const Class = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showColumns, setShowColumns] = useState({
    className: true,
    classType: true,
    createdBy: false,
    updatedBy: false,
    createdAt: false,
    updatedAt: false,
  });

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllCourseClassListings");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };
    getCenterData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      refreshData();
    }
  }, [showColumns]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      const table = $(tableRef.current).DataTable();
      table.columns().every((index) => {
        const column = table.column(index);
        const header = $(column.header());
        const columnKey = header.text().replace(/\s+/g, "").toLowerCase();
        column.visible(showColumns[columnKey]);
      });
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
      const response = await api.get("/getAllCourseClassListings");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  const handleColumnToggle = (column) => {
    setShowColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };

  const [classNameData, setClassNameData] = useState("");
  const [classType, setClassType] = useState("");

  const clearFilters = () => {
    setClassNameData("");
    setClassType("");

    $(tableRef.current).DataTable().search("").draw();
  };

  const handleRowClick = (id) => {
    navigate(`/class/view/${id}`);
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
        <div className="d-flex justify-content-between mb-3 px-2">
          <div className="individual_fliters d-flex">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Class Name"
                value={classNameData}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setClassNameData(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Class type"
                value={classType}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setClassType(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          {storedScreens?.classCreate && (
            <Link to={`/class/add`}>
              <button type="button" className="btn btn-button btn-sm">
                Add <i className="bx bx-plus"></i>
              </button>
            </Link>
          )}
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
                  {showColumns.className && (
                    <th className="text-muted" scope="col">
                      Class Name
                    </th>
                  )}
                  {showColumns.classType && (
                    <th className="text-muted" scope="col">
                      Class Type
                    </th>
                  )}
                  {showColumns.createdBy && (
                    <th className="text-muted" scope="col">
                      Created By
                    </th>
                  )}
                  {showColumns.createdAt && (
                    <th className="text-muted" scope="col">
                      Created At
                    </th>
                  )}
                  {showColumns.updatedBy && (
                    <th className="text-muted" scope="col">
                      Updated By
                    </th>
                  )}
                  {showColumns.updatedAt && (
                    <th className="text-muted" scope="col">
                      Updated At
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
                    {showColumns.className && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.className}
                      </td>
                    )}
                    {showColumns.classType && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.classType}
                      </td>
                    )}
                    {showColumns.createdBy && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.createdBy}
                      </td>
                    )}
                    {showColumns.createdAt && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {extractDate(data.createdAt)}
                      </td>
                    )}
                    {showColumns.updatedBy && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.updatedBy}
                      </td>
                    )}
                    {showColumns.updatedAt && (
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

export default Class;
