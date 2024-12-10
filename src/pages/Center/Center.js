import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate
import { FaEdit, FaEllipsisV } from "react-icons/fa"; // No need for FaEye anymore
import { IoMdAdd } from "react-icons/io";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllCentreManager from "../List/CentreMangerList";
import { MdViewColumn } from "react-icons/md";
import {
  Dropdown,
  DropdownButton,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const Center = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerManagerData, setCenterManagerData] = useState([]);
  const [selectedManager, setSelectedManager] = useState(""); // State for selected center manager
  const [centerName, setCenterName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const clearFilters = () => {
    setCenterName("");
    setCode("");
    setEmail("");
    setSelectedManager("");

    $(tableRef.current).DataTable().search("").draw();
  };

  const fetchData = async () => {
    try {
      const centerManagerData = await fetchAllCentreManager();
      setCenterManagerData(centerManagerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllCenter");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data : ", error);
      }
    };
    getCenterData();
    fetchData(); // Fetch the center manager data as well
  }, []);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
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
      const response = await api.get("/getAllCenter");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleManagerChange = (e) => {
    setSelectedManager(e.target.value); // Set selected manager
    const searchValue = e.target.value.toLowerCase();
    $(tableRef.current).DataTable().search(searchValue).draw();
  };

  const extractDate = (dateString) => {
    if (!dateString) return "";
    return dateString.substring(0, 10); // Extracts date part "YYYY-MM-DD"
  };

  const handleRowClick = (id) => {
    navigate(`/center/view/${id}`); // Navigate to the index page when a row is clicked
  };

  return (
    <div className="container my-4 center">
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
          Centre Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Centre Listing
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
              This Database Show at of your{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Center
              </span>
            </span>
          </div>
          {storedScreens?.centerListingCreate && (
            <Link to="/center/add">
              <button
                type="button"
                className="btn btn-button btn-sm"
                style={{ fontWeight: "600px !important" }}
              >
                Add <i className="bx bx-plus"></i>
              </button>
            </Link>
          )}
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Center Name"
                value={centerName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCenterName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Code"
                value={code}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCode(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setEmail(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-control form-control-sm center_list"
                style={{ width: "100%" }}
                value={selectedManager}
                onChange={handleManagerChange}
              >
                <option value="">Select Center Manager</option>
                {centerManagerData.map((manager) => (
                  <option key={manager.id} value={manager.userNames}>
                    {manager.userNames}
                  </option>
                ))}
              </select>
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
            <div className="table-responsive">
              <table ref={tableRef} className="display">
                <thead>
                  <tr style={{ background: "#f5f7f9" }}>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      S No
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      Centre Name
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      Centre Manager
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      Code
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      UEN Number
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      Mobile
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-muted"
                      scope="col"
                    >
                      Email
                    </th>
                    <th
                      style={{ fontSize: "14px", fontWeight: "normal" }}
                      className="text-center text-muted"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(datas) &&
                    datas.map((data, index) => (
                      <tr
                        key={index}
                        style={{
                          backgroundColor: "#fff !important",
                          cursor: "pointer",
                        }}
                      >
                        <th scope="row">{index + 1}</th>
                        <td
                          style={{ fontSize: "8px", fontWeight: "normal" }}
                          onClick={() => handleRowClick(data.id)}
                        >
                          {data.centerName}
                        </td>
                        <td
                          style={{ fontSize: "8px", fontWeight: "normal" }}
                          onClick={() => handleRowClick(data.id)}
                        >
                          {data.centerManager}
                        </td>
                        <td
                          style={{ fontSize: "8px", fontWeight: "normal" }}
                          onClick={() => handleRowClick(data.id)}
                        >
                          {data.code}
                        </td>
                        <td
                          style={{ fontSize: "8px", fontWeight: "normal" }}
                          onClick={() => handleRowClick(data.id)}
                        >
                          {data.uenNumber}
                        </td>
                        <td
                          style={{ fontSize: "8px", fontWeight: "normal" }}
                          onClick={() => handleRowClick(data.id)}
                        >
                          {data.mobile}
                        </td>
                        <td
                          style={{ fontSize: "8px", fontWeight: "normal" }}
                          onClick={() => handleRowClick(data.id)}
                        >
                          {data.email}
                        </td>
                        <td style={{ fontSize: "8px", fontWeight: "normal" }}>
                          <div className="d-flex justify-content-center align-items-center">
                            {storedScreens?.centerListingCreate && (
                              <div className="dropdown">
                                <button
                                  className="btn btn-link dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <FaEllipsisV className="text-dark" />
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
                                        <button className="btn btn-sm">
                                          <FaEdit /> Edit
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
                                        Delete
                                      </span>
                                    )}
                                  </li>
                                </ul>
                              </div>
                            )}
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
    </div>
  );
};

export default Center;
