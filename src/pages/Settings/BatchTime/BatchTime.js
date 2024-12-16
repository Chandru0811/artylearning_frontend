import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import api from "../../../config/URL";
import { Link, useNavigate } from "react-router-dom";
import BatchTimeEdit from "./BatchTimeEdit";
import { IoIosAddCircle } from "react-icons/io";

const BatchTime = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
//  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}"); 

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllBatches");
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
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
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
      const response = await api.get("/getAllBatches");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleRowClick = (id) => {
    navigate(`/batchtime`);
  };

  const formatBatchTimes = (batchTimes) => {
    if (!batchTimes) return "";
    const batchTimesString = String(batchTimes);

    const times = batchTimesString.includes(",")
      ? batchTimesString.split(",").map((time) => time.trim())
      : batchTimesString.match(/.{1,5}/g) || [];

    const convertTo12Hour = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      if (isNaN(hour) || isNaN(minute)) return time;
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    const formattedTimes = times.map(convertTo12Hour);

    return formattedTimes.join(", ");
  };

  return (
    <div className="container-fluid my-4 center">
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
          &nbsp;Settings
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Batch Time
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
                Batch Time
              </span>
            </span>
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
          <div>
            <div className="table-responsive py-2">
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
                      Day
                    </th>
                    <th className="text-muted" scope="col">
                      Batch Time
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
                             {/* {storedScreens?.batchtimeSettingCreate && (    */}
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
                                    <BatchTimeEdit
                                      id={data.batchId}
                                      onSuccess={refreshData}
                                    />
                                  </li>
                                </ul>
                              </div>
                            {/* )} */}
                          </div>
                        </td>
                        <td onClick={() => handleRowClick(data.batchId)}>
                          {data.batchDay}
                        </td>
                        <td onClick={() => handleRowClick(data.batchId)}>
                          {formatBatchTimes(data.batchTimes)}
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

export default BatchTime;
