import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Delete from "../../../components/common/Delete";
import AbsentReasonAdd from "./AbsentReasonAdd";
import AbsentReasonEdit from "./AbsentReasonEdit";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../../config/URL";

const AbsentReason = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllAbsentReason");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
      const response = await api.get("/getAllAbsentReason");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleRowClick = (id) => {
    navigate(`/absentreason`); // Navigate to the index page when a row is clicked
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
          &nbsp;Settings
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Absent Reason
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
                Absent Reason
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-end">
          {/* {storedScreens?.centerListingCreate && ( */}
          <AbsentReasonAdd onSuccess={refreshData} />
          {/* )} */}
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
                      Absent Reason
                    </th>
                    <th className="text-muted" scope="col">
                      Remark
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
                            {/* {storedScreens?.centerListingCreate && ( */}
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
                                  <AbsentReasonEdit
                                    id={data.id}
                                    onSuccess={refreshData}
                                  />
                                </li>
                                <li>
                                  {/* {storedScreens?.centerListingDelete && ( */}
                                  <span>
                                    <Delete
                                      onSuccess={refreshData}
                                      path={`/deleteAbsentReason/${data.id}`}
                                    />{" "}
                                  </span>
                                  {/* )} */}
                                </li>
                              </ul>
                            </div>
                            {/* )} */}
                          </div>
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.absentReason}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.remarks}
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

export default AbsentReason;
