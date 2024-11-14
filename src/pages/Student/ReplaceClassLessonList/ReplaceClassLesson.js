import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Delete from "../../../components/common/Delete";
import { SCREENS } from "../../../config/ScreenFilter";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";

const ReplaceClassLesson = () => {
  const tableRef = useRef(null);
  const { centerId } = useParams();

  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const [centerData, setCenterData] = useState(null);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

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
        const response = await api.get("/getAllStudentReplacementClass");
        setDatas(response.data.map(data => ({ ...data, status: data.status || "Pending" }))); // Default to "Pending" if no status
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
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
    if ($.fn.DataTable.isDataTable(tableRef.current)) return;
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
      const response = await api.get("/getAllStudentReplacementClass");
      setDatas(response.data.map(data => ({ ...data, status: data.status || "Pending" })));
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await api.put(
        `/updateStatus/${id}?id=${id}&leaveStatus=${newStatus}`,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        toast.success("Status updated successfully");
        setDatas(prevDatas =>
          prevDatas.map(data => data.id === id ? { ...data, status: newStatus } : data)
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning(error?.response?.data?.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "btn-success";
      case "REJECTED":
        return "btn-danger";
      case "PENDING":
        return "btn-warning";
      default:
        return "btn-secondary";
    }
  };

  return (
    <div>
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
        <div className="container my-4">
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th scope="col">S No</th>
                  <th scope="col">Centre Name</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Course</th>
                  <th scope="col">Class Code</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {centerData &&
                        centerData.map(center =>
                          parseInt(data.centerId) === center.id
                            ? center.centerNames || "--"
                            : ""
                        )}
                    </td>
                    <td>{data.studentName}</td>
                    <td>{data.course}</td>
                    <td>{data.classCode}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className={`btn btn-sm leadStatus ${getBadgeColor(data.status)}`}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="text-white fw-bold">
                            {data.status}
                          </span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(data.id, "APPROVED")}
                            >
                              Approved
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(data.id, "REJECTED")}
                            >
                              Rejected
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(data.id, "PENDING")}
                            >
                              Pending
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td className="text-center">
                        {/* <Link to={`/replaceclasslesson/edit/${data.id}?centerId=${data.centerId}&studentId=${data.studentId}`}>
                          <button className="btn btn-sm" title="Replace Class">
                            <i className="bx bx-plus"></i>
                          </button>
                        </Link> */}
                        {storedScreens?.studentListingUpdate && (
                          <Link to={`/replaceclasslesson/view/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReplaceClassLesson;
