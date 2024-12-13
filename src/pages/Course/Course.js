import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const Course = () => {
  // const { id } = useParams();
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [extraData, setExtraData] = useState(false);
  const [centerName, setCenterName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");

  const clearFilters = () => {
    setCenterName("");
    setCode("");
    setEmail("");

    $(tableRef.current).DataTable().search("").draw();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourses");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data ", error);
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
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const fetchSubData = async () => {
    try {
      const subjectData = await fetchAllSubjectsWithIds();
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllCourses");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSubData();
  }, [loading]);

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
    if (!dateString) return "";
    return dateString.substring(0, 10);
  };

  const handleRowClick = (id) => {
    navigate(`/course/view/${id}`);
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
    <div className="container my-4 center">
      <ol
        className="breadcrumb my-3 px-1"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            &nbsp;Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Course
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
                Course
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3 px-2">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre Name"
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
            <Link to="/course/add">
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
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className="table-responsive py-2">
            <table style={{ width: "100%" }} ref={tableRef} className="display">
              <thead>
                <tr className="text-center" style={{ background: "#f5f7f9" }}>
                  <th className="text-muted" scope="col">
                    S No
                  </th>
                  <th className="text-center text-muted"></th>
                  <th className="text-muted" scope="col">
                    Course Name
                  </th>
                  <th className="text-muted" scope="col">
                    Course Code
                  </th>
                  <th className="text-muted" scope="col">
                    Course Type
                  </th>
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="CreatedBy: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      CreatedBy
                    </th>
                  )}
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="CreatedAt: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      CreatedAt
                    </th>
                  )}
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="UpdatedBy: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      UpdatedBy
                    </th>
                  )}
                  {extraData && (
                    <th
                      scope="col"
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      aria-label="UpdatedAt: activate to sort column ascending: activate to sort column ascending"
                      style={{ width: "92px" }}
                    >
                      UpdatedAt
                    </th>
                  )}
                  <th className="text-muted" scope="col">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <th scope="row">{index + 1}</th>
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
                                <Link to={`/course/coursefees/${data.id}`}>
                                  <button
                                    style={{
                                      whiteSpace: "nowrap",
                                      width: "100%",
                                    }}
                                    className="btn btn-sm btn-normal text-start"
                                  >
                                    Course Fees
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link to={`/course/coursedeposit/${data.id}`}>
                                  <button
                                    style={{
                                      whiteSpace: "nowrap",
                                      width: "100%",
                                    }}
                                    className="btn btn-sm btn-normal text-start"
                                  >
                                    Course Deposit Fees
                                  </button>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/course/curriculumoutlet/${data.id}`}
                                >
                                  <button
                                    style={{
                                      whiteSpace: "nowrap",
                                      width: "100%",
                                    }}
                                    className="btn btn-sm btn-normal text-start"
                                  >
                                    Curriculum Outlet
                                  </button>
                                </Link>
                              </li>
                              <li>
                                {storedScreens?.centerListingUpdate && (
                                  <Link to={`/course/edit/${data.id}`}>
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
                                      path={`/deleteCourse/${data.id}`}
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
                      {data.courseName}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.courseCode}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.courseType}
                    </td>
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.createdBy}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {extractDate(data.createdAt)}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {data.updatedBy}
                      </td>
                    )}
                    {extraData && (
                      <td onClick={() => handleRowClick(data.id)}>
                        {extractDate(data.updatedAt)}
                      </td>
                    )}
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.status === "Active" ? (
                        <span className="badge badges-Green">Active</span>
                      ) : (
                        <span className="badge badges-Red">Inactive</span>
                      )}
                    </td>
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

export default Course;
