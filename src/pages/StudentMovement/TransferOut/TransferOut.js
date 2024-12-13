import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";

const TransferOut = () => {
  const tableRef = useRef(null);
  const [centerName, setCenterName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");

  const clearFilters = () => {
    setCenterName("");
    setStudentId("");
    setStudentName("");

    $(tableRef.current).DataTable().search("").draw();
  };

  const [actions, setActions] = useState({
    1: "approved",
  });

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  const toggleAction = (id) => {
    setActions((prevActions) => ({
      ...prevActions,
      [id]: prevActions[id] === "approved" ? "rejected" : "approved",
    }));
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
  }, []);

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
          Student Movement
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Transfer Out
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
                Transfer Out
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
                placeholder="Student Id"
                value={studentId}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setStudentId(e.target.value);
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
        <table style={{ width: "100%" }} ref={tableRef} className="display">
          <thead>
            <tr>
              <th className="text-muted" scope="col">
                S No
              </th>
              <th className="text-muted" scope="col">
                Action
              </th>
              <th className="text-muted" scope="col">
                Center Name
              </th>
              <th className="text-muted" scope="col">
                Transfer To
              </th>
              <th className="text-muted" scope="col">
                Student ID
              </th>
              <th className="text-muted" scope="col">
                Student Name
              </th>
              <th className="text-muted" scope="col">
                Current Course
              </th>
              <th className="text-muted" scope="col">
                Current Class
              </th>
              <th className="text-muted" scope="col">
                Last lesson date
              </th>
              <th className="text-muted" scope="col">
                Center Remark
              </th>
              <th className="text-muted" scope="col">
                Prefer Timing
              </th>
              <th className="text-muted" scope="col">
                Prefer Days
              </th>
              <th className="text-muted" scope="col">
                Prefer Start Date
              </th>
              <th className="text-muted" scope="col">
                Reason
              </th>
              <th className="text-muted" scope="col">
                Parent Remark
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <button
                  className={`btn btn-${
                    actions[1] === "approved" ? "success" : "danger"
                  }`}
                  style={{ fontSize: "10px" }}
                  onClick={() => toggleAction(1)}
                >
                  {actions[1] === "approved" ? "Approved" : "Rejected"}
                </button>
              </td>
              <td>Arty@hougang</td>
              <td>AMK</td>
              <td>S000082</td>
              <td>KC Marquez</td>
              <td>Arty Pursuers</td>
              <td>ALP/TUE500PM/Tue/2</td>
              <td>2023-02-07</td>
              <td>gg</td>
              <td></td>
              <td></td>
              <td>2024-02-14</td>
              <td>Change timing of class</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransferOut;
