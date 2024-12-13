import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { MdOutlineModeEdit, MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
// import { SCREENS } from "../../config/ScreenFilter";

const Staff = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  // console.log("Screens : ", SCREENS);

  const [staffId, setStaffId] = useState("");
  const [staffName, setSTaffName] = useState("");

  const clearFilters = () => {
    setStaffId("");
    setSTaffName("");

    $(tableRef.current).DataTable().search("").draw();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllUserListExceptTeacher");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data", error);
      }
    };
    getData();
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
      const response = await api.get("/getAllUserListExceptTeacher");
      setDatas(response.data);
      initializeDataTable(); // Reinitialize DataTable after successful data update
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  const handleDataShow = () => {
    if (!loading) {
      setExtraData(!extraData);
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  };
  const extractDate = (dateString) => {
    if (!dateString) return ""; // Handle null or undefined date strings
    return dateString.substring(0, 10); // Extracts the date part in "YYYY-MM-DD"
  };

  const handleRowClick = (id) => {
    navigate(`/staff/view/${id}`); // Navigate to the index page when a row is clicked
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
          &nbsp;Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Staff
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
                Staff
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
                placeholder="Staff Id"
                value={staffId}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setStaffId(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Staff Name"
                value={staffName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setSTaffName(e.target.value);
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
          {storedScreens?.staffCreate && (
            <Link to="/staff/add">
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
            <div className="table-responsive py-2">
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
                      Staff ID
                    </th>
                    <th className="text-muted" scope="col">
                      Staff Type
                    </th>
                    <th className="text-muted" scope="col">
                      Staff Name
                    </th>
                    <th className="text-muted" scope="col">
                      Role
                    </th>
                    <th className="text-muted" scope="col">
                      Mobile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(datas) &&
                    datas.map((data, index) => (
                      <tr
                        key={index}
                        style={{
                          // backgroundColor: "#fff !important",
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
                                    {storedScreens?.staffUpdate && (
                                      <Link to={`/staff/edit/${data.id}`}>
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
                                    {storedScreens?.staffDelete && (
                                      <span>
                                        <Delete
                                          onSuccess={refreshData}
                                          path={`/deleteUser/${data.id}`}
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
                          {data.teacherId}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.teacherType}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.teacherName}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.role === "branch_admin" ? (
                            <span className="badge badges-Red">
                              Branch Admin
                            </span>
                          ) : data.role === "staff_admin" ? (
                            <span className="badge badges-Blue">
                              Staff Admin
                            </span>
                          ) : data.role === "center_manager" ? (
                            <span className="badge badges-Yellow">
                              Centre Manager
                            </span>
                          ) : (
                            <span className="badge badges-Green">Staff</span>
                          )}
                        </td>
                        <td onClick={() => handleRowClick(data.id)}>
                          {data.contactNumber}
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

export default Staff;
