import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";

const ReferalHistory = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setTableData([
        {
          serialNumber: 1,
          referredByStudent: "John Doe",
          referredByParent: "Jane Doe",
          studentName: "Alice",
          enrollDate: "2024-11-01",
          attendance: "95%",
          referralFee: "$100",
          createdBy: "Admin",
        },
        {
          serialNumber: 2,
          referredByStudent: "Mike Smith",
          referredByParent: "Sara Smith",
          studentName: "Bob",
          enrollDate: "2024-11-10",
          attendance: "90%",
          referralFee: "$120",
          createdBy: "Manager",
        },
        {
          serialNumber: 3,
          referredByStudent: "Emily Davis",
          referredByParent: "Tom Davis",
          studentName: "Carol",
          enrollDate: "2024-11-15",
          attendance: "85%",
          referralFee: "$80",
          createdBy: "Supervisor",
        },
        {
          serialNumber: 4,
          referredByStudent: "Jessica Brown",
          referredByParent: "Kate Brown",
          studentName: "David",
          enrollDate: "2024-11-20",
          attendance: "80%",
          referralFee: "$150",
          createdBy: "Employee",
        },
        {
          serialNumber: 5,
          referredByStudent: "Sarah Wilson",
          referredByParent: "Mary Wilson",
          studentName: "Sophia",
          enrollDate: "2024-11-25",
          attendance: "75%",
          referralFee: "$180",
          createdBy: "Assistant",
        },
      ]);
      setLoading(false);
    }, 1000);
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
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy(true);
    }
  };

  return (
    <div className="container my-4">
      <ol
        className="breadcrumb"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Referal Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Referal History
        </li>
      </ol>
      <div className="mb-3 d-flex justify-content-end"></div>
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
        <div className="table-responsive">
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col">S No</th>
                <th scope="col">Refer By Student</th>
                <th scope="col">Refer By Parent</th>
                <th scope="col">Student Name</th>
                <th scope="col">Enroll Date</th>
                <th scope="col">Attendance</th>
                <th scope="col">Referal Fee</th>
                <th scope="col">Created By</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.id}>
                  <td>{index + 1}</td>
                  <td>{row.referredByStudent}</td>
                  <td>{row.referredByParent}</td>
                  <td>{row.studentName}</td>
                  <td>{row.enrollDate}</td>
                  <td>{row.attendance}</td>
                  <td>{row.referralFee}</td>
                  <td>{row.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReferalHistory;
