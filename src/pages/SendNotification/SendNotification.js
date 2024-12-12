import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import SendNotificationAdd from "./SendNotificationAdd";
import SendNotificationEdit from "./SendNotificationEdit";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import SendNotificationView from "./SendNotificationView";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

const SendNotification = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate(); 
  const [centerName, setCenterName] = useState("");

  useEffect(() => {
    console.log({
      centerName,
    });
  }, [centerName]);

  const clearFilters = () => {
    setCenterName("");
    $(tableRef.current).DataTable().search("").draw();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllSmsPushNotifications");
        setDatas(response.data);
        console.log("message", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
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
      columnDefs: [{ orderable: false, targets: 1 }],
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
      const response = await api.get("/getAllSmsPushNotifications");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  const handleRowClick = (id) => {
    navigate(`/sendnotification/view/${id}`); 
  };
  return (
    <div className="container my-4">
      <ol
        className="breadcrumb my-3 px-1"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Messaging
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          School Announcement
        </li>
      </ol>
      <div className="d-flex justify-content-end mb-3"></div>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                School Announcement
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="From"
                value={centerName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCenterName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>

            <div className="form-group mb-0 ms-2 mb-1 ">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="me-2">
            {storedScreens?.sendNotificationCreate && (
              <Link to="/sendNotification/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
          </div>
        </div>
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
                  <th scope=""></th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Message</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(datas) &&
                  datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-button btn-sm"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <IoIosAddCircle
                                className="text-light"
                                style={{ fontSize: "16px" }}
                              />
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton"
                            >
                              <li>
                                {storedScreens?.sendNotificationUpdate && (
                                  <Link
                                    to={`/sendNotification/edit/${data.id}`}
                                  >
                                    <button className="btn btn-sm">
                                    <MdOutlineModeEdit /> Edit
                                    </button>
                                  </Link>
                                )}
                              </li>
                              <li>
                                <Delete
                                  onSuccess={refreshData}
                                  path={`/deleteSmsPushNotifications/${data.id}`}
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td onClick={() => handleRowClick(data.id)}>{data.messageTitle}</td>
                      <td onClick={() => handleRowClick(data.id)}>{data.messageDescription}</td>
                      <td onClick={() => handleRowClick(data.id)}>{data.datePosted}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendNotification;
