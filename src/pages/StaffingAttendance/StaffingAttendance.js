import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

const StaffingAttendance = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  console.log("Leave Data:", datas);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
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
        const response = await api.get("/getAllUserAttendances");
        setDatas(response.data);
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllUserAttendances");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container my-4">
      <div className="my-3 d-flex align-items-end justify-content-end">
        {storedScreens?.staffAttendanceCreate && (
          <Link to="/staffing/attendance/add">
            <button type="button" className="btn btn-button btn-sm">
              Add <i className="bx bx-plus"></i>
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
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th scope="col" style={{ whiteSpace: "nowrap" }}>
                S No
              </th>
              <th scope="col">Centre Name</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {centerData &&
                    centerData.map((center) =>
                      parseInt(data.centerId) === center.id
                        ? center.centerNames || "--"
                        : ""
                    )}
                </td>
                <td>{data.employeeName}</td>
                <td>{data.date}</td>
                <td>
                  {data.attendanceStatus === "Present" ? (
                    <span className="badge badges-Green">Present</span>
                  ) : (
                    <span className="badge badges-Red">Absent</span>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-center align-items-center ">
                    {storedScreens?.staffAttendanceRead && (
                      <Link
                        to={`/staffing/attendance/view/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEye />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.staffAttendanceUpdate && (
                      <Link
                        to={`/staffing/attendance/edit/${data.id}`}
                        style={{ display: "inline-block" }}
                      >
                        <button className="btn btn-sm">
                          <FaEdit />
                        </button>
                      </Link>
                    )}
                    {storedScreens?.staffAttendanceDelete && (
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteUserAttendance/${data.id}`}
                        style={{ display: "inline-block" }}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffingAttendance;
