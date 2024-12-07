import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";

const TransferOut = () => {
  const tableRef = useRef(null);

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

  return (
    <div className="container my-3">
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
      <div className="row align-items-center mb-3">
        <div className="col-md-3 col-12 mb-3">
          <label className="form-label fw-medium">Center</label>
          <select
            className={`form-select`}
          >
            <option selected>Select a Center</option>
            <option value="Arty@hougang">Arty@hougang</option>
            <option value="AMK">AMK</option>
          </select>
        </div>
        <div className="col-md-3 col-12 mb-3">
          <label className="form-label fw-medium">Transfer To</label>
          <select
            className={`form-select`}
          >
            <option selected>Select a Center</option>
            <option value="Arty@hougang">Arty@hougang</option>
            <option value="AMK">AMK</option>
          </select>
        </div>
        <div className="col-md-3 col-12 mb-3">
          <label className="form-label fw-medium">Student Name</label>
          <input type="text" className={`form-control`} placeholder="Student Name" />
        </div>
        <div className="col-md-3 col-12 mb-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
          >
            Clear
          </button>
        </div>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Action</th>
            <th scope="col">Center Name</th>
            <th scope="col">Transfer To</th>
            <th scope="col">Student ID</th>
            <th scope="col">Student Name</th>
            <th scope="col">Current Course</th>
            <th scope="col">Current Class</th>
            <th scope="col">Last lesson date</th>
            <th scope="col">Center Remark</th>
            <th scope="col">Prefer Timing</th>
            <th scope="col">Prefer Days</th>
            <th scope="col">Prefer Start Date</th>
            <th scope="col">Reason</th>
            <th scope="col">Parent Remark</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <button
                className={`btn btn-${actions[1] === "approved" ? "success" : "danger"
                  }`}
                style={{ fontSize: "12px" }}
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
  );
};

export default TransferOut;