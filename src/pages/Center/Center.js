import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
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
      <div className="mb-3 d-flex justify-content-between">
        <div className="individual_fliters d-lg-flex">
          <div className="form-group mb-0 ms-2 mb-1">
            <input
              type="text"
              className="form-control center_list"
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
              className="form-control center_list"
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
              className="form-control center_list"
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
              className="form-control center_list"
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
        <div className="cardBorder">
          <div className="card table-responsive p-3">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th scope="col">S No</th>
                  <th scope="col">Centre Name</th>
                  <th scope="col">Centre Manager</th>
                  <th scope="col">Code</th>
                  <th scope="col">UEN Number</th>
                  <th scope="col">Mobile</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(datas) &&
                  datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.centerName}</td>
                      <td>{data.centerManager}</td>
                      <td>{data.code}</td>
                      <td>{data.uenNumber}</td>
                      <td>{data.mobile}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          {storedScreens?.centerListingCreate && (
                            <div class="dropdown">
                              <button
                                class="btn dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <IoMdAdd />
                              </button>
                              <ul
                                class="dropdown-menu"
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
                              </ul>
                            </div>
                          )}
                          {storedScreens?.centerListingRead && (
                            <Link to={`/center/view/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEye />
                              </button>
                            </Link>
                          )}
                          {storedScreens?.centerListingUpdate && (
                            <Link to={`/center/edit/${data.id}`}>
                              <button className="btn btn-sm">
                                <FaEdit />
                              </button>
                            </Link>
                          )}
                          {storedScreens?.centerListingDelete && (
                            <Delete
                              onSuccess={refreshData}
                              path={`/deleteCenter/${data.id}`}
                            />
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
  );
};

export default Center;
