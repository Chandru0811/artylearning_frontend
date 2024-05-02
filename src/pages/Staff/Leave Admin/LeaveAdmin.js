import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";

const LeaveAdmin = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centreName: "Arty Learning @ Hougang",
      employeeName: "Sathish",
      leaveType: "Sick Leave",
      fromDate: "30/04/2024",
      status: "Approved",
    },
    {
      id: 2,
      centreName: "Arty Learning @ Ang Mo Kio",
      employeeName: "Chandru",
      leaveType: "Casual Leave",
      fromDate: "02/05/2024",
      status: "Rejected",
    },
    {
      id: 3,
      centreName: "Arty Learning @ Butik Batok",
      employeeName: "Deepak",
      leaveType: "Privilege Leave",
      fromDate: "03/05/2024",
      status: "Pending",
    },
  ];

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container my-4">
      <div className="my-5 d-flex justify-content-between">
      </div>

      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>S No</th>
            <th scope="col">Centre Name</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Leave Type</th>
            <th scope="col">From Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.centreName}</td>
              <td>{data.employeeName}</td>
              <td>{data.leaveType}</td>
              <td>{data.fromDate}</td>
              <td>
                {data.status === "Approved" ? (
                  <span className="badge badges-Green">Approved</span>
                ) : data.status === "Rejected" ? (
                  <span className="badge badges-Red">Rejected</span>
                ) : (
                  <span className="badge badges-Blue">Pending</span>
                )}
              </td>
              <td>
                <div className="d-flex">
                  <Link to="/leaveadmin/view">
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>
                  </Link>
                  <Link to="/leaveadmin/edit">
                    <button className="btn btn-sm">
                      <FaEdit/>
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveAdmin;