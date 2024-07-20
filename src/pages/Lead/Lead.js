import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
// import { SCREENS } from "../../config/ScreenFilter";

const Lead = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      setCenterData(centerData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllLeadInfo");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
    getCenterData();
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

  // const handleStatusChange = async (event, data) => {
  //   const newStatus = event.target.getAttribute("data-value");
  //   try {
  //     const response = await api.put(
  //       `/updateLeadInfo/${data.id}`,
  //       { ...data, leadStatus: newStatus },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       toast.success(response.data.message);
  //       // Update the local state to reflect the new status
  //       setDatas((prevDatas) =>
  //         prevDatas.map((item) =>
  //           item.id === data.id ? { ...item, leadStatus: newStatus } : item
  //         )
  //       );
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error.message || "An error occurred");
  //   }
  // };

  const handleStatusChange = async (event, data) => {
    const newStatus = event.target.getAttribute("data-value");
    try {
      const response = await api.put(
        `/updateLeadInfo/${data.id}`,
        { ...data, leadStatus: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        // Update the local state to reflect the new status
        setDatas((prevDatas) =>
          prevDatas.map((item) =>
            item.id === data.id ? { ...item, leadStatus: newStatus } : item
          )
        );
        if (newStatus === "Assessment confirmed") {
          navigate(`/student/add?LeadId=${data.id}`);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };


  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";
      case "Arranging assessment":
        return "bg-info";
      case "Assessment confirmed":
        return "bg-success";
      case "Waiting for payment":
        return "bg-primary";
      case "Rejected":
        return "bg-danger";
      case "KIV":
        return "bg-secondary";
      default:
        return "bg-info";
    }
  };


  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllLeadInfo");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  return (
    <div>
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
        <div className="container my-4">
          <div className="my-3 d-flex justify-content-end mb-5">
            {storedScreens?.leadListingCreate && (
              <Link to="/lead/lead/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
          </div>
          <table ref={tableRef} className="display">
            <thead>
              <tr>
                <th scope="col" style={{ whiteSpace: "nowrap" }}>
                  S No
                </th>
                <th scope="col">Centre</th>
                <th scope="col">Student Name</th>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Enrollment Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {centerData &&
                      centerData.map((center) =>
                        parseInt(data.centerId) === center.id
                          ? center.centerNames || "--"
                          : ""
                      )}
                  </td>
                  <td>{data.studentName}</td>
                  <td>{data.subject}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className={`btn btn-sm leadStatus ${getStatusBadgeClass(data.leadStatus)}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className="text-white fw-bold" style={{textWrap:"nowrap"}}>{data.leadStatus}</span>
                      </button>
                      <ul className="dropdown-menu text-center leadStatuslist">
                        {["New WaitList", "Arranging assessment", "Assessment confirmed", "Waiting for payment", "Rejected", "KIV"].map(
                          (status) => (
                            <li
                              key={status}
                              // className={`dropdown-item text-white ${getStatusBadgeClass(status)}`}
                              className ="dropdown-item text-dark"
                              data-value={status}
                              onClick={(event) => handleStatusChange(event, data)}
                            >
                              {status}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </td>
                  <td>
                    {data.paymentStatus === "REJECTED" ? (
                      <span className="badge bg-danger">Rejected</span>
                    ) : data.paymentStatus === "PAID" ? (
                      <span className="badge bg-success">Paid</span>
                    ) : (
                      <span className="badge bg-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex">
                      {storedScreens?.leadListingRead && (
                        <Link to={`/lead/lead/view/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEye />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.leadListingUpdate && (
                        <Link to={`/lead/lead/edit/${data.id}`}>
                          <button className="btn btn-sm">
                            <FaEdit />
                          </button>
                        </Link>
                      )}
                      {storedScreens?.leadListingDelete && (
                        <Delete
                          onSuccess={refreshData}
                          path={`/deleteLeadInfo/${data.id}`}
                        />
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

export default Lead;
