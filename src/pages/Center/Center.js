import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentreManager from "../List/CentreMangerList";
import fetchAllCentersWithIds from "../List/CenterList";

const Centre = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerManagerData, setCenterManagerData] = useState([]);
  const [centerData, setCenterData] = useState([]);
  const centerLocalId = localStorage.getItem("centerId");
  const [centerId, setCenterId] = useState("");
  const [centerCode, setCenterCode] = useState();
  const [email, setEmail] = useState();
  const [centerManager, setcenterManager] = useState();

  const getCenterData = async () => {
    try {
      const params = {};

      if (centerId) params.centerId = centerId;
      if (centerCode) params.centerCode = centerCode;
      if (email) params.email = email;
      if (centerManager) params.centerManager = centerManager;
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/getCenterWithCustomInfo?${queryParams}`);
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
  };

  const fetchData = async () => {
    try {
      const centerManagerData = await fetchAllCentreManager();
      const centerData = await fetchAllCentersWithIds();
      if (centerLocalId !== null && centerLocalId !== "undefined") {
        setCenterId(centerLocalId[0]);
      } else if (centerData !== null && centerData.length > 0) {
        setCenterId(centerData[0].id);
      }
      setCenterManagerData(centerManagerData);
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
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
      const params = {};

      if (centerId) params.centerId = centerId;
      if (centerCode) params.centerCode = centerCode;
      if (email) params.email = email;
      if (centerManager) params.centerManager = centerManager;
      const queryParams = new URLSearchParams(params).toString();
      const response = await api.get(`/getCenterWithCustomInfo?${queryParams}`);
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
    setLoading(false);
  };

  const handleRowClick = (id) => {
    navigate(`/center/view/${id}`); // Navigate to the index page when a row is clicked
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
    fetchData(); // Fetch the center manager data as well
  }, [centerLocalId]);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const clearFilters = () => {
    setCenterId(""); // Reset centerId to empty string
    setCenterCode(""); // Reset centerCode to empty string
    setEmail(""); // Reset email to empty string
    setcenterManager(""); // Reset centerManager to empty string
    refreshData(); // Optional: Refresh data to fetch all default entries
  };

  useEffect(() => {
    if (centerId !== undefined && centerId !== "") {
      getCenterData();
    }
  }, [centerData, centerId, centerLocalId, centerCode, centerManager, email]);

  return (
    <div className="container-fluid my-4 center">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Centre Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Centre Listing
        </li>
      </ol>
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
                Centre
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                onChange={(e) => setCenterId(e.target.value)}
                name="centerId"
                value={centerId}
              >
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id} selected>
                    {center.centerNames}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                onChange={(e) => setCenterCode(e.target.value)}
                name="centerCode"
                value={centerCode}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Code"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                onChange={(e) => setcenterManager(e.target.value)}
                name="centerManager"
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                value={centerManager}
              >
                <option value="">Select Centre Manager</option>
                {centerManagerData.map((manager) => (
                  <option key={manager.id} value={manager.userNames}>
                    {manager.userNames}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-2 ms-2">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>

          {storedScreens?.centerListingCreate && (
            <Link to="/center/add">
              <button
                type="button"
                className="btn btn-button btn-sm me-2"
                style={{ fontWeight: "600px !important" }}
              >
                &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
              </button>
            </Link>
          )}
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
          <div>
            <div
              style={{ minHeight: "60vh" }}
              className="table-responsive py-2"
            >
              <table
                style={{ width: "100%" }}
                ref={tableRef}
                className="display"
              >
                <thead>
                  <tr className="text-center" style={{ background: "#f5f7f9" }}>
                    <th className="text-muted" scope="col">
                      S No
                    </th>
                    <th className="text-center text-muted"></th>
                    <th className="text-muted" scope="col">
                      Centre Name
                    </th>
                    <th className="text-muted" scope="col">
                      Centre Manager
                    </th>
                    <th className="text-muted" scope="col">
                      Code
                    </th>
                    <th className="text-muted" scope="col">
                      UEN Number
                    </th>
                    <th className="text-muted" scope="col">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(datas) &&
                    datas.map((data, index) => (
                      <tr
                        key={index}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <th scope="row" className="text-center">
                          {index + 1}
                        </th>
                        <td>
                          <div className="d-flex justify-content-center align-items-center">
                            {storedScreens?.centerListingCreate && (
                              <div className="dropdown">
                                <button
                                  className="btn btn-button btn-sm dropdown-toggle"
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
                                    <AddRegister
                                      id={data.id}
                                      onSuccess={refreshData}
                                    />
                                  </li>
                                  <li>
                                    <AddBreak
                                      id={data.id}
                                      onSuccess={refreshData}
                                    />
                                  </li>
                                  <li>
                                    <AddClass
                                      id={data.id}
                                      onSuccess={refreshData}
                                    />
                                  </li>
                                  <li>
                                    <AddPackage
                                      id={data.id}
                                      onSuccess={refreshData}
                                    />
                                  </li>
                                  <li>
                                    {storedScreens?.centerListingUpdate && (
                                      <Link to={`/center/edit/${data.id}`}>
                                        <button
                                          style={{
                                            whiteSpace: "nowrap",
                                            width: "100%",
                                          }}
                                          className="btn btn-sm btn-normal text-start"
                                        >
                                          <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
                                        </button>
                                      </Link>
                                    )}
                                  </li>
                                  <li>
                                    {storedScreens?.centerListingDelete && (
                                      <span>
                                        <Delete
                                          onSuccess={refreshData}
                                          path={`/deleteCenter/${data.id}`}
                                        />{" "}
                                      </span>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.centerName}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.centerManager}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.code}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.mobile}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.email}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Centre;
