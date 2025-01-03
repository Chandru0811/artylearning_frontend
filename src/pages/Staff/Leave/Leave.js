import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEdit, FaEye } from "react-icons/fa";
import fetchAllCentersWithIds from "../../List/CenterList";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import Delete from "../../../components/common/Delete";

const Leave = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const userId = localStorage.getItem("userId");
  // console.log("Data:", datas.employeeData);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  // console.log("centerData", centerData);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchLeaveType = async () => {
    try {
      const response = await api.get(`getAllLeaveSetting`);
      setLeaveTypeData(response.data); // Assuming response.data is an array
    } catch (error) {
      toast.error(error.message);
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllLeaveSetting");
      setLeaveTypeData(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
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
    fetchLeaveType();
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
  const findname = (id) => {
    const name = leaveTypeData?.find((item) => item.id === id);
    return name?.leaveType;
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
                <div className="col-auto">
                  <p className="fw-medium">Employee Name :</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    {datas.employeeName || "--"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-auto">
                  <p className="fw-medium">Leave Limit :</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    {datas.leaveLimit || "--"}
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
                {/* <th scope="col">Centre Name</th> */}
                <th scope="col">From Date</th>
                <th scope="col">To Date</th>
                <th scope="col">Leave Type</th>
                <th scope="col">NO Of Days</th>
                <th scope="col">Leave Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas?.employeeData?.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  {/* <td>{data.centerName} </td> */}
                  <td>{data.fromDate}</td>
                  <td>{data.toDate}</td>
                  <td>{findname(data?.leaveTypeId)}</td>
                  <td>{data.noOfDays}</td>
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
                      {data.leaveStatus === "PENDING" ? (
                        <Link
                          to={`/leave/edit/${data.id}`}
                          style={{ display: "inline-block" }}
                        >
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      ) : (
                        <></>
                      )}

                      {data.leaveStatus === "PENDING" ? (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteUserLeaveRequest/${data.id}`}
                          style={{ display: "inline-block" }}
                        />
                      ) : (
                        <></>
                      )}
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
