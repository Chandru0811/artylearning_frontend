import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllStudentsWithIds from "../List/StudentList";
import { toast } from "react-toastify";
import { MdOutlineModeEdit, MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

// import { SCREENS } from "../../config/ScreenFilter";

const Invoice = () => {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const [centerData, setCenterData] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [extraData, setExtraData] = useState(false);
  const [centerName, setCenterName] = useState("");
  const [parent, setParent] = useState("");
  const [student, setStudent] = useState("");

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const clearFilters = () => {
    setCenterName("");
    setParent("");
    setStudent("");

    $(tableRef.current).DataTable().search("").draw();
  };

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const courseData = await fetchAllCoursesWithIds();
      const studentData = await fetchAllStudentsWithIds();
      const packageData = await api.get("getAllCentersPackageWithIds");
      setPackageData(packageData.data);
      setCenterData(centerData);
      setCourseData(courseData);
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllGenerateInvoices");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
      const response = await api.get("/getAllGenerateInvoices");
      setDatas(response.data);
      initializeDataTable();
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

  useEffect(() => {
    console.log({
      centerName,
      parent,
      student
    });
  }, [centerName, parent,student]);
  const handleRowClick = (id) => {
    navigate(`/invoice/view/${id}`); 
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
          Invoice and Payment
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Invoice
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
                Invoice
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
                placeholder="Parent"
                value={parent}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setParent(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Student"
                value={student}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setStudent(e.target.value);
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
          {storedScreens?.invoiceCreate && (
            <Link to="/invoice/add">
              <button type="button" className="btn btn-button btn-sm">
                Add <i class="bx bx-plus"></i>
              </button>
            </Link>
          )}
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
                  <th scope="" style={{ whiteSpace: "nowrap" }}>
                    S No
                  </th>
                  <th scope=""></th>
                  <th scope="col">Course</th>
                  <th scope="col">Centre</th>
                  <th scope="col">Invoice Number</th>
                  <th scope="col">Parent Name</th>
                  <th scope="col">Student ID</th>
                  <th scope="col">Invoice Date</th>
                  <th scope="col">Number Of Lesson</th>
                  <th scope="col">Student</th>
                  <th scope="col">Package</th>
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
                              {storedScreens?.invoiceUpdate && (
                                <Link to={`/invoice/edit/${data.id}`}>
                                  <button className="btn btn-sm">
                                  <MdOutlineModeEdit /> Edit
                                  </button>
                                </Link>
                              )}
                            </li>
                            <li>
                              {storedScreens?.invoiceDelete && (
                                <Delete
                                  onSuccess={refreshData}
                                  path={`/deleteGenerateInvoice/${data.id}`}
                                />
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {courseData &&
                        courseData.map((course) =>
                          parseInt(data.courseId) === course.id
                            ? course.courseNames || "--"
                            : ""
                        )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {centerData &&
                        centerData.map((center) =>
                          parseInt(data.centerId) === center.id
                            ? center.centerNames || "--"
                            : ""
                        )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                     {data.invoiceNumber}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                     {data.parent}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                     {data.studentUnickId}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                     {data.invoiceDate?.slice(0,10)}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                     {data.noOfLessons}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {studentData &&
                        studentData.map((student) =>
                          parseInt(data.studentId) === student.id
                            ? student.studentNames || "--"
                            : ""
                        )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {packageData &&
                        packageData.map((packages) =>
                          parseInt(data.packageId) === packages.id
                            ? packages.packageNames || "--"
                            : ""
                        )}
                    </td>
                    <td onClick={() => handleRowClick(data.id)}>
                      {data.invoiceStatus === "PAID" ? (
                        <span className="badge badges-Green">Paid</span>
                      ) : data.invoiceStatus === "CANCELLED" ? (
                        <span className="badge badges-Red">Cancelled</span>
                      ) : (
                        <span className="badge badges-Yellow">Pending</span>
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

export default Invoice;
