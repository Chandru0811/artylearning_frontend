import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import { MdOutlineModeEdit, MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const Deduction = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  console.log(datas);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllUserDeduction");
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
      const response = await api.get("/getAllUserDeduction");
      setDatas(response.data);
      initializeDataTable();
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
    navigate(`/deduction/list/${id}`); // Navigate to the index page when a row is clicked
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
          &nbsp;Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Deduction
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
                Deduction
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-end">
          {storedScreens?.deductionCreate && (
            <Link to="/deduction/add">
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
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{ minHeight: "60vh" }}
              className="table-responsive py-2"
            >
              <table
                style={{ width: "100%" }}
                ref={tableRef}
                className="display"
              >
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
                      Employee Name
                    </th>
                    <th className="text-muted" scope="col">
                      Deduction Name
                    </th>
                    <th className="text-muted" scope="col">
                      Deduction Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(datas) &&
                    datas.map((data, index) => (
                      <tr
                        key={index}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <th scope="row" className="text-center">
                          {index + 1}
                        </th>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            {storedScreens?.deductionCreate && (
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
                                    {storedScreens?.deductionUpdate && (
                                      <Link to={`/deduction/edit/${data.id}`}>
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
                                    {storedScreens?.deductionDelete && (
                                      <span>
                                        <Delete
                                          onSuccess={refreshData}
                                          path={`/deleteUserDeduction/${data.id}`}
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
                          {data.employeeName}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.deductionName}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.deductionAmount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deduction;
