import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import ArrangeAssesmentAdd from "./ArrangeAssesmentAdd";
import ArrangeAssesmentEdit from "./ArrangeAssesmentEdit";
import { useFormik } from "formik";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const Lead = () => {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [datas, setDatas] = useState([]);
  console.log("Lead All Datas", datas);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [activeButton, setActiveButton] = useState("All");

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      const subjectData = await fetchAllSubjectsWithIds();
      console.log("subjectData", subjectData);

      setCenterData(centerData);
      setSubjectData(subjectData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getCenterData = async () => {
      try {
        const response = await api.get("/getAllLeadInfo");
        setDatas(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetch Data ", error);
      }
    };
    getCenterData();
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
      columnDefs: [{ orderable: false, targets: -1 }],
    });
  };

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const handleStatusChange = async (id, status) => {
    let message = "Are you sure want to change the lead status?";
    if (status === "DROP") {
      message = "Are you sure want to drop this lead?";
    } else if (status === "KIV") {
      message = "Are you sure want to KIV this lead?";
    } else if (status === "NEW_WAITLIST") {
      message = "Are you sure want to make this lead New/Waitlist?";
    } else if (status === "WAITING_FOR_PAYMENT") {
      message = "Are you sure want to mark this lead as Waiting For Payment?";
    } else if (status === "CONFIRMED") {
      message = "Are you sure want to confirm this lead?";
    }

    setConfirmationMessage(message);
    setShowModal(true);
    setNewStatus(status);
    setSelectedId(id);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await api.put(`/updateLeadInfo/${selectedId}`, {
        leadStatus: newStatus,
      });

      if (response.status === 200) {
        toast.success("Lead Status Updated");
        setShowModal(false);
        formik.resetForm();
        refreshData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  const formik = useFormik({
    initialValues: {
      centerId: "",
      subjectId: "",
      leadStatus: "ALL",
    },
    onSubmit: async (data) => {
      console.log("Selected Values :", data);
    },
  });

  const refreshData = async () => {
    destroyDataTable();
    setLoading(true);
    try {
      const response = await api.get("/getAllLeadInfos");
      setDatas(response.data);
      initializeDataTable();
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };

  // Get filtered data based on Formik values
  const getData = async () => {
    destroyDataTable();
    setLoading(true);
    let params = {};

    if (formik.values.centerId !== "") {
      params.centerId = formik.values.centerId;
    }

    if (formik.values.subjectId !== "") {
      params.subjectId = formik.values.subjectId;
    }

    if (formik.values.leadStatus !== "" && formik.values.leadStatus !== "ALL") {
      params.leadStatus = formik.values.leadStatus;
    }

    try {
      const response = await api.get("/getAllLeadInfos", { params });
      setDatas(response.data);
      initializeDataTable();
      // Update activeButton state to reflect the current leadStatus
      setActiveButton(
        formik.values.leadStatus === "ALL"
          ? "All"
          : [
              { displayName: "New / Waitlist", backendName: "NEW_WAITLIST" },
              {
                displayName: "Assessment Arranged",
                backendName: "ARRANGING_ASSESSMENT",
              },
              { displayName: "KIV", backendName: "KIV" },
              {
                displayName: "Waiting for Payment",
                backendName: "WAITING_FOR_PAYMENT",
              },
              { displayName: "Confirmed", backendName: "CONFIRMED" },
              {
                displayName: "Assessment Done",
                backendName: "ASSESSMENT_DONE",
              },
              { displayName: "Enrolled", backendName: "ENROLLED" },
              { displayName: "Drop", backendName: "DROP" },
              { displayName: "All", backendName: "ALL" },
            ].find((status) => status.backendName === formik.values.leadStatus)
              ?.displayName || "All"
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.centerId,
    formik.values.subjectId,
    formik.values.leadStatus,
  ]);

  const ResetFilter = () => {
    formik.resetForm();
  };

  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 736);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleRowClick = (id) => {
    navigate(`/lead/lead/view/${id}`);
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
    <div>
      <div className="container my-4 center">
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
            &nbsp;Lead Management
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            &nbsp;Lead Listing
          </li>
        </ol>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <div className="row my-3 mb-5">
            <div className="col-12 d-flex flex-wrap justify-content-center">
              <div
                className={`btn-group bg-light ${
                  isSmallScreen ? "btn-group-vertical" : ""
                }`}
                role="group"
                aria-label="Status buttons"
              >
                {[
                  {
                    displayName: "New / Waitlist",
                    backendName: "NEW_WAITLIST",
                  },
                  {
                    displayName: "Assessment Arranged",
                    backendName: "ARRANGING_ASSESSMENT",
                  },
                  { displayName: "KIV", backendName: "KIV" },
                  {
                    displayName: "Waiting for Payment",
                    backendName: "WAITING_FOR_PAYMENT",
                  },
                  { displayName: "Confirmed", backendName: "CONFIRMED" },
                  {
                    displayName: "Assessment Done",
                    backendName: "ASSESSMENT_DONE",
                  },
                  { displayName: "Enrolled", backendName: "ENROLLED" },
                  { displayName: "Drop", backendName: "DROP" },
                  { displayName: "All", backendName: "ALL" },
                ].map((status, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-white status-txt ${
                      activeButton === status.displayName ? "active" : ""
                    }`}
                    onClick={() => {
                      formik.setFieldValue("leadStatus", status.backendName);
                      setActiveButton(status.displayName);
                    }}
                  >
                    {status.displayName}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
                    Lead
                  </span>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3 px-2">
              <div className="individual_fliters d-lg-flex ">
                <div className="form-group mb-0 ms-2 mb-1">
                  <select
                    className="form-select form-select-sm mb-2 mb-md-0 me-md-3"
                    name="centerId"
                    {...formik.getFieldProps("centerId")}
                  >
                    <option value="" disabled selected>
                      Select Centre
                    </option>
                    {centerData &&
                      centerData.map((center) => (
                        <option key={center.id} value={center.id}>
                          {center.centerNames}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group mb-0 ms-2 mb-1">
                  <select
                    className="form-select form-select-sm mb-2 mb-md-0"
                    name="subjectId"
                    {...formik.getFieldProps("subjectId")}
                  >
                    <option value="" disabled selected>
                      Select Subject
                    </option>
                    {subjectData &&
                      subjectData.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.subjects}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group mb-0 ms-2 mb-1 ">
                  <button
                    type="button"
                    className="btn btn-sm border-secondary ms-3"
                    onClick={ResetFilter}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {storedScreens?.centerListingCreate && (
                <Link to="/lead/lead/add">
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
              <div className="table-responsive py-2">
                <table
                  style={{ width: "100%" }}
                  ref={tableRef}
                  className="display"
                >
                  <thead>
                    <tr
                      className="text-center"
                      style={{ background: "#f5f7f9" }}
                    >
                      <th
                        className="text-muted"
                        scope="col"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        S No
                      </th>
                      <th className="text-center text-muted"></th>
                      <th className="text-muted" scope="col">
                        Centre
                      </th>
                      <th className="text-muted" scope="col">
                        Student Name
                      </th>
                      <th className="text-muted" scope="col">
                        Subject
                      </th>
                      <th className="text-muted" scope="col">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas &&
                      datas.map((data, index) => (
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
                                      {storedScreens?.leadListingUpdate && (
                                        <Link to={`/lead/lead/edit/${data.id}`}>
                                          <button
                                            style={{
                                              whiteSpace: "nowrap",
                                              width: "100%",
                                            }}
                                            className="btn btn-sm btn-normal text-start"
                                          >
                                            <MdOutlineModeEdit />{" "}
                                            &nbsp;&nbsp;Edit
                                          </button>
                                        </Link>
                                      )}
                                    </li>
                                    <li>
                                      {storedScreens?.centerListingDelete && (
                                        <span>
                                          <Delete
                                            onSuccess={refreshData}
                                            path={`/deleteLeadInfo/${data.id}`}
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
                            {centerData &&
                              centerData.map((center) =>
                                parseInt(data.centerId) === center.id
                                  ? center.centerNames || "--"
                                  : ""
                              )}
                          </td>
                          <td onClick={() => handleRowClick(data.id)}>
                            {data.studentName}
                          </td>
                          <td onClick={() => handleRowClick(data.id)}>
                            {subjectData &&
                              subjectData.map((subject) =>
                                parseInt(data.subjectId) === subject.id
                                  ? subject.subjects || "--"
                                  : ""
                              )}
                          </td>
                          <td>
                            {data.leadStatus === "NEW_WAITLIST" ? (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-primary`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    New/WaitList
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <ArrangeAssesmentAdd
                                      leadId={data.id}
                                      onSuccess={refreshData}
                                      centerId={data.centerId}
                                      studentNames={data.studentName}
                                      setAll={ResetFilter}
                                    />
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "KIV")
                                      }
                                    >
                                      KIV
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "WAITING_FOR_PAYMENT"
                                        )
                                      }
                                    >
                                      Waiting For Payment
                                    </button>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/student/add?LeadId=${data.id}&LeadStatus=CONFIRMED`}
                                      style={{
                                        textDecoration: "none",
                                        cursor: "default",
                                      }}
                                    >
                                      <button className="dropdown-item">
                                        Confirmed
                                      </button>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "DROP")
                                      }
                                    >
                                      Drop
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ) : data.leadStatus === "DROP" ? (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-danger`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    Drop
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "NEW_WAITLIST"
                                        )
                                      }
                                    >
                                      New / Waitlist
                                    </button>
                                  </li>
                                  <li>
                                    <ArrangeAssesmentAdd
                                      leadId={data.id}
                                      onSuccess={refreshData}
                                      centerId={data.centerId}
                                      studentNames={data.studentName}
                                      setAll={ResetFilter}
                                    />
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "KIV")
                                      }
                                    >
                                      KIV
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "WAITING_FOR_PAYMENT"
                                        )
                                      }
                                    >
                                      Waiting For Payment
                                    </button>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/student/add?LeadId=${data.id}&LeadStatus=CONFIRMED`}
                                      style={{
                                        textDecoration: "none",
                                        cursor: "default",
                                      }}
                                    >
                                      <button className="dropdown-item">
                                        Confirmed
                                      </button>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            ) : data.leadStatus === "ARRANGING_ASSESSMENT" ? (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-warning`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    Assessment Arranged
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "NEW_WAITLIST"
                                        )
                                      }
                                    >
                                      New / WaitList
                                    </button>
                                  </li>
                                  {data.assessmentArrange &&
                                  data.assessmentArrange.length > 0 &&
                                  new Date(
                                    data.assessmentArrange[0].assessmentDate
                                  ).toDateString() ===
                                    new Date().toDateString() ? (
                                    <li>
                                      <Link
                                        to={`/lead/lead/assessment/${data.id}`}
                                        style={{ textDecoration: "none" }}
                                      >
                                        <button className="dropdown-item">
                                          Do Assessment
                                        </button>
                                      </Link>
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  <li>
                                    <ArrangeAssesmentEdit
                                      leadId={data.id}
                                      arrangeAssesmentId={
                                        data.assessmentArrange[0].id
                                      }
                                      studentNames={data.studentName}
                                      onSuccess={refreshData}
                                      centerId={data.centerId}
                                      setAll={ResetFilter}
                                    />
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "DROP")
                                      }
                                    >
                                      Drop
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ) : data.leadStatus === "KIV" ? (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-secondary`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    KIV
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "NEW_WAITLIST"
                                        )
                                      }
                                    >
                                      New / Waitlist
                                    </button>
                                  </li>
                                  <li>
                                    <ArrangeAssesmentAdd
                                      leadId={data.id}
                                      onSuccess={refreshData}
                                      centerId={data.centerId}
                                      studentNames={data.studentName}
                                      setAll={ResetFilter}
                                    />
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "WAITING_FOR_PAYMENT"
                                        )
                                      }
                                    >
                                      Waiting For Payment
                                    </button>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/student/add?LeadId=${data.id}&LeadStatus=CONFIRMED`}
                                      style={{
                                        textDecoration: "none",
                                        cursor: "default",
                                      }}
                                    >
                                      <button className="dropdown-item">
                                        Confirmed
                                      </button>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "DROP")
                                      }
                                    >
                                      Drop
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ) : data.leadStatus === "ASSESSMENT_DONE" ? (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-info`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    Assessment Done
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "NEW_WAITLIST"
                                        )
                                      }
                                    >
                                      New / WaitList
                                    </button>
                                  </li>
                                  <li>
                                    {/* <Link
                                    to={`/lead/lead/assessment?editDo="editDoAssessment"/${data.id}`}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <button className="dropdown-item">
                                      Edit Do Assessment
                                    </button>
                                  </Link> */}
                                    <Link
                                      to={`/lead/lead/assessment/${data.id}?mode=edit`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <button className="dropdown-item">
                                        Edit Do Assessment
                                      </button>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "KIV")
                                      }
                                    >
                                      KIV
                                    </button>
                                  </li>

                                  <li>
                                    <Link
                                      to={`/student/add?LeadId=${data.id}&LeadStatus=ENROLLED`}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <button className="dropdown-item">
                                        Enrolled
                                      </button>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "DROP")
                                      }
                                    >
                                      Drop
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ) : data.leadStatus === "CONFIRMED" ? (
                              <button
                                className={`btn btn-sm leadStatus text-bg-success`}
                                type="button"
                              >
                                <span
                                  className="text-white fw-bold"
                                  style={{
                                    textDecoration: "none",
                                    cursor: "default",
                                  }}
                                >
                                  Confirmed
                                </span>
                              </button>
                            ) : data.leadStatus === "ENROLLED" ? (
                              <button
                                className={`btn btn-sm leadStatus text-bg-success`}
                                type="button"
                                style={{ cursor: "default" }}
                              >
                                <span
                                  className="text-white fw-bold"
                                  style={{ textWrap: "nowrap" }}
                                >
                                  Enrolled
                                </span>
                              </button>
                            ) : data.leadStatus === "WAITING_FOR_PAYMENT" ? (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-primary`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    Waiting For Payment
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "NEW_WAITLIST"
                                        )
                                      }
                                    >
                                      New / Waitlist
                                    </button>
                                  </li>
                                  <li>
                                    <ArrangeAssesmentAdd
                                      leadId={data.id}
                                      onSuccess={refreshData}
                                      centerId={data.centerId}
                                      studentNames={data.studentName}
                                      setAll={ResetFilter}
                                    />
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "KIV")
                                      }
                                    >
                                      KIV
                                    </button>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/student/add?LeadId=${data.id}`}
                                      style={{
                                        textDecoration: "none",
                                        cursor: "default",
                                      }}
                                    >
                                      <button className="dropdown-item">
                                        Confirmed
                                      </button>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "DROP")
                                      }
                                    >
                                      Drop
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            ) : (
                              <div className="dropdown">
                                <button
                                  className={`btn btn-sm leadStatus text-bg-primary`}
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span
                                    className="text-white fw-bold"
                                    style={{ textWrap: "nowrap" }}
                                  >
                                    New/WaitList
                                  </span>
                                </button>
                                <ul className="dropdown-menu text-capitalize leadStatuslist">
                                  <li>
                                    <ArrangeAssesmentAdd
                                      leadId={data.id}
                                      onSuccess={refreshData}
                                      centerId={data.centerId}
                                      studentNames={data.studentName}
                                      setAll={ResetFilter}
                                    />
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "KIV")
                                      }
                                    >
                                      KIV
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(
                                          data.id,
                                          "WAITING_FOR_PAYMENT"
                                        )
                                      }
                                    >
                                      Waiting For Payment
                                    </button>
                                  </li>
                                  <li>
                                    <Link
                                      to={`/student/add?LeadId=${data.id}`}
                                      style={{
                                        textDecoration: "none",
                                        cursor: "default",
                                      }}
                                    >
                                      <button className="dropdown-item">
                                        Confirmed
                                      </button>
                                    </Link>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={(e) =>
                                        handleStatusChange(data.id, "DROP")
                                      }
                                    >
                                      Drop
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </form>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">
            Change Leads Status Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-start">
            <p>{confirmationMessage}</p>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-sm btn-border bg-light text-dark"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ background: "#fa0101" }}
                className="btn btn-sm text-white"
                onClick={handleFormSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Lead;
