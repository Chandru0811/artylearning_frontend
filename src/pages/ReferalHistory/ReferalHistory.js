import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/URL";

const ReferalHistory = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getreferlHistoryData = async () => {
    try {
      const params = {};

      // if (centerId) params.centerId = centerId;
      // if (centerCode) params.centerCode = centerCode;
      // if (email) params.email = email;
      // if (centerManager) params.centerManager = centerManager;
      // const queryParams = new URLSearchParams(params).toString();
      // const response = await api.get(`/getCenterWithCustomInfo?${queryParams}`);
      const response = await api.get(`/getAllReferralHistory`);
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
  };


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
    // if (centerId !== undefined && centerId !== "") {
      getreferlHistoryData();
    // }
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

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
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((data, index) => (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.referByStudent}</td>
                  <td>{data.referByParent}</td>
                  <td>{data.studentName}</td>
                  <td>{data.enrollDate?.substring(0,10)}</td>
                  <td>{data.attendance}</td>
                  <td>{data.referralFee}</td>
                  <td>{data.createdBy}</td>
                  <td>{data.createdAt?.substring(0,10)}</td>
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
