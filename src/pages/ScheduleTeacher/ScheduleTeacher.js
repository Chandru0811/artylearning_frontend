import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";
import ScheduleTeacherAdd from "../ScheduleTeacher/ScheduleTeacherAdd";
// import ScheduleTeacherEdit from "../ScheduleTeacher/ScheduleTeacherEdit";
import ScheduleTeacherView from "../ScheduleTeacher/ScheduleTeacherView";
import { Link } from "react-router-dom";
import { BsTable } from "react-icons/bs";
import {
  Button,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import TeacherReplacement from "./TeacherReplacement";
import { MdDeleteOutline, MdViewColumn } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const ScheduleTeacher = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const deleteButtonRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState(false);
  const roles = localStorage.getItem("userName");
  const rolesUserId = localStorage.getItem("userId");

  console.log("courseId pass ScheduleTeacher:", datas.courseId);

  const [show, setShow] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setSelectedRowData(rowData);
    setShow(true);
  };

  const handelDelete = async (rowData) => {
    try {
      const { centerId, userId, courseId, classId, days } = selectedRowData;
      const formData = new FormData();
      formData.append("centerId", centerId);
      formData.append("userId", userId);
      formData.append("courseId", courseId);
      formData.append("classId", classId);
      formData.append("dayOfWeek", days);

      // const requestBody = {
      //   centerId: 8,
      //   userId,
      //   courseId: 11,
      //   classId: 20,
      //   dayOfWeek: days,
      // };
      const response = await api.delete("deleteAllScheduleTeacher", {
        data: formData,
      });

      if (response.status === 200) {
        refreshData();
        handleClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        // const response = await api.get("/getAllScheduleTeacher");
        // setDatas(response.data);

        let response;
        // Check role and call the appropriate API
        if (roles === "SMS_ADMIN") {
          response = await api.get("/getAllScheduleTeacher");
        } else if (roles === "SMS_TEACHER") {
          response = await api.get(
            `/getAllScheduleTeacherByUserId/${rolesUserId}`
          );
        } else if (roles === "SMS_FREELANCER") {
          response = await api.get(
            `/getAllScheduleTeacherByUserId/${rolesUserId}`
          );
        }

        // If a response was received, set the data
        if (response) {
          setDatas(response.data);
        }
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
      let response;

      // Check role and call the appropriate API
      if (roles === "SMS_ADMIN") {
        response = await api.get("/getAllScheduleTeacher");
      } else if (roles === "SMS_TEACHER") {
        response = await api.get(
          `/getAllScheduleTeacherByUserId/${rolesUserId}`
        );
      } else if (roles === "SMS_FREELANCER") {
        response = await api.get(
          `/getAllScheduleTeacherByUserId/${rolesUserId}`
        );
      }
      // If a response was received, set the data and initialize the DataTable
      if (response) {
        setDatas(response.data);
        initializeDataTable(); // Reinitialize DataTable after successful data update
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (show) {
      deleteButtonRef.current?.focus(); // Focus on the Delete button when the modal is shown
    }
  }, [show]);

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
        <li className="custom-breadcrumb">
          Schedule
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Scheduleteacher
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                ScheduleTeacher
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            {/* <div className="form-group mb-0 ms-2 mb-1">
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
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-control form-control-sm center_list"
                style={{ width: "100%" }}
                value={selectedManager}
                onChange={handleManagerChange}
              >
                <option value="">Select Centre Manager</option>
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
            </div> */}
          </div>
          <div className="me-2">
            <ScheduleTeacherAdd onSuccess={refreshData} />
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
          <>
            {/* <div className="d-flex justify-content-end align-items-center">
            <span>
              <ScheduleTeacherAdd onSuccess={refreshData} />
            </span> */}
            {/* } */}
            {/* <p>  <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>
          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>
        </button> </p> */}
            {/* </div> */}
            <div className="table-responsive">
              <table ref={tableRef} className="display">
                {/* Table Header */}
                <thead>
                  <tr>
                    <th scope="col">S No</th>
                    <th scope="col"></th>
                    <th scope="col">Centre</th>
                    <th scope="col">Teacher</th>
                    <th scope="col">Course</th>
                    <th scope="col">Class</th>
                    <th scope="col">Day</th>
                    {extraData && (
                      <th
                        scope="col"
                        className="sorting"
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
                        className="sorting"
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
                        className="sorting"
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
                        className="sorting"
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
                {/* Table Body */}
                <tbody>
                  {datas.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <div className="d-flex justify-content-start align-items-center">
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
                                    <ScheduleTeacherView id={data.id} />
                                  </div>
                                )}
                              </li>
                              <li>
                                <TeacherReplacement
                                  id={data.id}
                                  onSuccess={refreshData}
                                />
                              </li>
                              <li>
                                {storedScreens?.scheduleTeacherDelete && (
                                  <div>
                                    <button
                                      className="btn btn-sm"
                                      onClick={() => handleShow(data)}
                                    >
                                      <MdDeleteOutline /> &nbsp;&nbsp;Delete
                                    </button>
                                  </div>
                                )}
                              </li>
                              <li className="ms-1">
                                {storedScreens?.timeScheduleIndex && (
                                  <Link
                                    to={`/scheduleteacher/scheduletime/${data.userId}?centerId=${data.centerId}&courseId=${data.courseId}`}
                                  >
                                    <button className="btn px-1 py-1">
                                      <BsTable
                                        className="text-dark"
                                        size={15}
                                      />{" "}
                                      Time Schedule
                                    </button>
                                  </Link>
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                      <td>{data.centerName}</td>
                      <td>{data.teacher}</td>
                      <td>{data.course}</td>
                      <td>{data.className}</td>
                      <td>{data.days}</td>
                      {extraData && <td>{data.createdBy}</td>}
                      {extraData && <td>{data.createdAt}</td>}
                      {extraData && <td>{data.updatedBy}</td>}
                      {extraData && <td>{data.updatedAt}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Delete Confirmation Modal */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete?</Modal.Body>
              <Modal.Footer>
                <Button
                  className="btn btn-sm btn-border bg-light text-dark"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  ref={deleteButtonRef}
                  variant="danger"
                  onClick={handelDelete}
                  className={show ? "focused-button" : ""}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleTeacher;
