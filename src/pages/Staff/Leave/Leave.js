import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";

const Leave = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const userId = sessionStorage.getItem("userId");
  // console.log("Data:", datas.employeeData);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  // console.log("centerData", centerData);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

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
        const response = await api.get(
          `/getUserLeaveRequestByUserId/${userId}`
        );
        setDatas(response.data);
        // console.log("responsedata", response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
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
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  return (
    <div className="container my-4">
      <div className="my-5 d-flex justify-content-end">
        {storedScreens?.leaveCreate && (
          <Link to="/leave/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i class="bx bx-plus"></i>
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
        <div>
          <div className="row pb-3">
            <div className="col-md-6 col-12">
              <div className="row mt-3 mb-2">
                <div className="col-6">
                  <p className="fw-medium">Employee Name :</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {datas.employeeName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6  ">
                  <p className="fw-medium">Leave Limit :</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {datas.leaveLimit || "--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col">Centre Name</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Leave Type</th>
                <th scope="col">Leave Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.employeeData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.centerName} </td>
                  <td>{data.employeeName}</td>
                  <td>{data.leaveType}</td>
                  <td>
                    {data.leaveStatus === "APPROVED" ? (
                      <span className="badge badges-Green">Approved</span>
                    ) : data.leaveStatus === "REJECTED" ? (
                      <span className="badge badges-Red">Rejected</span>
                    ) : (
                      <span className="badge badges-Yellow">Pending</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center ">
                      <Link
                        to={`/leave/view/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leave;
