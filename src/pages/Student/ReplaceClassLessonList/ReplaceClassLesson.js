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
  const [extraData, setExtraData] = useState(false);
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
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
      }
    };
    getData();
    fetchData();
  }, []);
  console.log("staff", datas);
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

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllStudentReplacementClass");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setDatas((prevDatas) =>
      prevDatas.map((data) =>
        data.id === id ? { ...data, status: newStatus } : data
      )
    );
  };

  const getBadgeColor = (status) => {
    return status === "Approved"
      ? "badge-Green"
      : status === "Rejected"
      ? "badge-Red"
      : "badge-Grey";
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
          <div className="mb-3 d-flex justify-content-end">
            {/* Add button for storedScreens.studentListingCreate */}
          </div>
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S No
                  </th>
                  <th scope="col">Centre Name</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Course</th>
                  <th scope="col">Class Code</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {" "}
                      {centerData &&
                        centerData.map((center) =>
                          parseInt(data.centerId) === center.id
                            ? center.centerNames || "--"
                            : ""
                        )}
                    </td>
                    <td>{data.studentName}</td>
                    <td>{data.course}</td>
                    <td>{data.classCode}</td>
                    {/* <td>{data.status}</td> */}
                    <td>
                      {data.status === "APPROVED" ? (
                        <span className="badge badges-Green">Approved</span>
                      ) : data.status === "PENDING" ? (
                        <span className="badge badges-Yellow">Pending</span>
                      ) : (
                        <span className="badge badges-Red">Rejected</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex">
                        <Link
                          to={`/replaceclasslesson/edit/${data.id}?centerId=${data.centerId}&studentId=${data.studentId}`}
                        >
                          <button className="btn btn-sm" title="Replace Class">
                            <i className="bx bx-plus"></i>
                          </button>
                        </Link>
                        {storedScreens?.studentListingUpdate && (
                          <Link to={`/replaceclasslesson/view/${data.id}`}>
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )}
                        {/* {storedScreens?.studentListingDelete && (
                                                    <Delete
                                                        onSuccess={refreshData}
                                                        path={`/deleteStudentDetail/${data.id}`}
                                                    />
                                                )} */}
                      </div>
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
