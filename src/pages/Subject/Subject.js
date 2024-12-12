import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Delete from "../../components/common/Delete";
import SubjectAdd from "./SubjectAdd";
import SubjectEdit from "./SubjectEdit";
import api from "../../config/URL";
import { SCREENS } from "../../config/ScreenFilter";
import { toast } from "react-toastify";
import { MdOutlineModeEdit, MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const Subject = () => {
  const tableRef = useRef(null);

  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  console.log("Screens : ", SCREENS);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const clearFilters = () => {
    setSubjectName("");
    setSubjectCode("");

    $(tableRef.current).DataTable().search("").draw();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("/getAllCourseSubjects");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
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
      const response = await api.get("/getAllCourseSubjects");
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
    if (!dateString) return "";
    return dateString.substring(0, 10);
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
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Subject
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
                Subject
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
                placeholder="Subject"
                value={subjectName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setSubjectName(e.target.value);
                  $(tableRef.current).DataTable().search(searchValue).draw();
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Subject Code"
                value={subjectCode}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setSubjectCode(e.target.value);
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
          {storedScreens?.subjectCreate && (
            <div className="d-flex justify-content-end align-items-center me-2">
              <span>
                <SubjectAdd onSuccess={refreshData} />
              </span>
            </div>
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
                  <th scope="col" style={{ whiteSpace: "nowrap" }}>
                    S No
                  </th>
                  <th className="text-center text-muted"></th>
                  <th scope="col">Subject</th>
                  <th scope="col">Subject Code</th>

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
                  <th scope="col">Status</th>
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
                                {storedScreens?.subjectUpdate && (
                                  <SubjectEdit
                                    id={data.id}
                                    onSuccess={refreshData}
                                  />
                                )}
                              </li>
                              <li>
                                {storedScreens?.subjectDelete && (
                                  <Delete
                                    onSuccess={refreshData}
                                    path={`/deleteCourseSubject/${data.id}`}
                                  />
                                )}
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{data.subject}</td>
                    <td className="text-break">{data.code}</td>
                    {extraData && <td>{data.createdBy}</td>}
                    {extraData && <td>{extractDate(data.createdAt)}</td>}
                    {extraData && <td>{data.updatedBy}</td>}
                    {extraData && <td>{extractDate(data.updatedAt)}</td>}
                    <td>
                      {" "}
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

export default Subject;
