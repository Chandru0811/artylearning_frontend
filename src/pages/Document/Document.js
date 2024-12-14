import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";
import fetchAllStudentsWithIds from "../List/StudentList";
import DocumentEdit from "./DocumentEdit";
// import { SCREENS } from "../../config/ScreenFilter";
import { MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const Document = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [extraData, setExtraData] = useState(false);
  const [centerName, setCenterName] = useState("");
  const [course, setCourse] = useState("");
  const [clas, setClas] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [teacher, setTeacher] = useState("");

  const fetchData = async () => {
    try {
      const studentData = await fetchAllStudentsWithIds();
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("/getAllDocumentFolder");
      setDatas(response.data);
      setLoading(false);
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
      const response = await api.get("/getAllDocumentFolder");
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
  const handleRowClick = (id, approveStatus) => {
    navigate(`/document/view/${id}?approveStatus=${approveStatus}`);
  };

  const clearFilters = () => {
    setCenterName("");
    setClas("");
    setCourse("");
    setDate("");
    setDay("");
    setTeacher("");
    $(tableRef.current).DataTable().search("").draw();
  };
  useEffect(() => {
    console.log({
      centerName,
      course,
      clas,
      date,
      day,
      teacher,
    });
  }, [centerName, course, clas, date, day, teacher]);
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
    <div className="container my-4">
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
          Document Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Document
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
                Document
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3">
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
                placeholder="Course"
                value={course}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setCourse(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Class"
                value={clas}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setClas(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="date"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Date"
                value={date}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setDate(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Day"
                value={day}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setDay(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="individual_fliters d-lg-flex ">
              <div className="form-group mb-0 ms-2 mb-1">
                <input
                  type="text"
                  className="form-control form-control-sm center_list"
                  style={{ width: "160px" }}
                  placeholder="Teacher"
                  value={teacher}
                  onChange={(e) => {
                    const searchValue = e.target.value.toLowerCase();
                    setTeacher(e.target.value);
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
            {storedScreens?.documentListingCreate && (
              <Link to="/document/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i className="bx bx-plus"></i>
                </button>
              </Link>
            )}
            </div>
          </div>
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
          <div className="table-responsive">
            <table ref={tableRef} className="display">
              <thead>
                <tr>
                  <th scope="col">S No</th>
                  <th scope=""></th>
                  <th scope="col">Folder Name</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Course</th>
                  <th scope="col">Class</th>
                  <th scope="col">Batch</th>
                  <th scope="col">Status</th>
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
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="">
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
                              {storedScreens?.scheduleTeacherRead && (
                                <div>
                                  <DocumentEdit
                                    onSuccess={refreshData}
                                    id={data.id}
                                  />
                                </div>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="d-flex">
                        {/* {storedScreens?.documentListingRead && (
                          <Link
                            to={`/document/view/${data.id}?approveStatus=${data.approveStatus}`}
                          >
                            <button className="btn btn-sm">
                              <FaEye />
                            </button>
                          </Link>
                        )} */}

                        {/* <Delete
                      onSuccess={refreshData}
                      path={`/deleteCourseClassListing/${data.id}`}
                    /> */}
                      </div>
                    </td>
                    <td
                      onClick={() =>
                        handleRowClick(data.id, data.approveStatus)
                      }
                    >
                      {data.folderName}
                    </td>
                    <td
                      onClick={() =>
                        handleRowClick(data.id, data.approveStatus)
                      }
                    >
                      {studentData &&
                        studentData.map((student) =>
                          parseInt(data.studentId) === student.id
                            ? student.studentNames || "--"
                            : ""
                        )}
                    </td>
                    <td
                      onClick={() =>
                        handleRowClick(data.id, data.approveStatus)
                      }
                    >
                      {data.course}
                    </td>
                    <td
                      onClick={() =>
                        handleRowClick(data.id, data.approveStatus)
                      }
                    >
                      {data.classListing}
                    </td>
                    <td
                      onClick={() =>
                        handleRowClick(data.id, data.approveStatus)
                      }
                    >
                      {data.batchTime}
                    </td>
                    <td
                      onClick={() =>
                        handleRowClick(data.id, data.approveStatus)
                      }
                    >
                      {data.approveStatus === true ? (
                        <span className="badge badges-Yellow">Pending</span>
                      ) : (
                        <span className="badge badges-Green">Approval</span>
                      )}
                    </td>
                    {extraData && <td>{data.createdBy}</td>}
                    {extraData && <td>{extractDate(data.createdAt)}</td>}
                    {extraData && <td>{data.updatedBy}</td>}
                    {extraData && <td>{extractDate(data.updatedAt)}</td>}
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

export default Document;
