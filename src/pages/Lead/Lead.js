import React, { useEffect, useMemo, useState } from "react";
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
import GlobalDelete from "../../components/common/GlobalDelete";
// import { Dropdown, Button } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
  Popover,
  Button,
  Box,
} from "@mui/material";

const Lead = () => {
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [datas, setDatas] = useState([]);
  // console.log("Lead All Datas", datas);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [activeButton, setActiveButton] = useState("All");

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const centerIDLocal = localStorage.getItem("selectedCenterId");
  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [filters, setFilters] = useState({
    centerId: "",
    subjectId: "",
    leadStatus: "ALL",
  });

  const handleShow = () => {
    // fetchCenterData();
    setShowDialog(true);
  };
  const handleClose = () => {
    // fetchCenterData();
    setShowDialog(false);
  };
  const handleEditShowDialog = () => {
    // fetchCenterData();
    setShowEditDialog(true);
  };
  const handleEditCloseDialog = () => {
    setShowEditDialog(false);
    // formik.resetForm();
  };
  // console.log("object", filters);
  const fetchData = async () => {
    try {
      const centerDatas = await fetchAllCentersWithIds();
      const subjectDatas = await fetchAllSubjectsWithIds();

      setCenterData(centerDatas);
      setSubjectData(subjectDatas);
    } catch (error) {
      toast.error(error);
    }
  };

  const getLeadData = async () => {
    try {
      const response = await api.get("/getAllLeadInfo");
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLeadData();
    fetchData();
  }, []);

  const handleStatusChange = async (row, status) => {
    setSelectedRow(row);
    let message = "Are you sure want to change the lead status?";
    if (status === "DROP") {
      message = "Are you sure want to drop this lead?";
      setConfirmationMessage(message);
      setShowModal(true);
    } else if (status === "KIV") {
      message = "Are you sure want to KIV this lead?";
      setConfirmationMessage(message);
      setShowModal(true);
    } else if (status === "NEW_WAITLIST") {
      message = "Are you sure want to make this lead New/Waitlist?";
      console.log("object", selectedRow);
      setConfirmationMessage(message);
      setShowModal(true);
    } else if (status === "WAITING_FOR_PAYMENT") {
      message = "Are you sure want to mark this lead as Waiting For Payment?";
      setConfirmationMessage(message);
      setShowModal(true);
    } else if (status === "ARRANGING_ASSESSMENT") {
      console.log("object", selectedRow);
      handleShow();
    } else if (status === "CONFIRMED") {
      navigate(`/student/add?LeadId=${row.id}&LeadStatus=CONFIRMED`);
    } else if (status === "Do_Assessment") {
      navigate(`/lead/lead/assessment/${row.id}`);
    } else if (status === "EDIT_DO_ASSESSMENT") {
      navigate(`/lead/lead/assessment/${row.id}?mode=edit`);
    } else if (status === "ENROLLED") {
      navigate(`/student/add?LeadId=${row.id}&LeadStatus=ENROLLED`);
    } else if (status === "Assessment_Edit") {
      handleEditShowDialog();
    }

    setNewStatus(status);
    setSelectedId(row.id);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await api.put(`/updateLeadInfo/${selectedId}`, {
        leadStatus: newStatus,
      });

      if (response.status === 200) {
        toast.success("Lead Status Updated");
        setShowModal(false);
        ResetFilter();
        getLeadData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message || "An error occurred");
    }
  };

  // Get filtered data based on Formik values
  const getData = async () => {
    setLoading(true);
    let params = {};

    if (filters.centerId !== "") {
      params.centerId = filters.centerId;
    }

    if (filters.subjectId !== "") {
      params.subjectId = filters.subjectId;
    }

    if (filters.leadStatus !== "" && filters.leadStatus !== "ALL") {
      params.leadStatus = filters.leadStatus;
    }

    try {
      const response = await api.get("/getAllLeadInfos", { params });
      setDatas(response.data);
      setActiveButton(
        filters.leadStatus === "ALL"
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
            ].find((status) => status.backendName === filters.leadStatus)
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
  }, [filters.centerId, filters.subjectId, filters.leadStatus]);

  const ResetFilter = () => {
    setFilters({
      centerId: "",
      subjectId: "",
      leadStatus: "",
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 736);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "id",
        header: "",
        enableHiding: false,
        enableSorting: false,
        size: 20,
        Cell: ({ cell }) => (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setMenuAnchor(e.currentTarget);
              setSelectedId(cell.getValue());
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "leadStatus",
        enableHiding: false,
        header: "Status",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-start">
            {row.original.leadStatus === "CONFIRMED" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`btn btn-sm px-1 py-1 leadStatus text-bg-success`}
                type="button"
              >
                <span
                  className="text-white "
                  style={{
                    textDecoration: "none",
                    cursor: "default",
                  }}
                >
                  Confirmed
                </span>
              </button>
            ) : row.original.leadStatus === "ENROLLED" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`btn btn-sm px-1 py-1 leadStatus text-bg-success`}
                type="button"
                style={{ cursor: "default" }}
              >
                <span className="text-white " style={{ textWrap: "nowrap" }}>
                  Enrolled
                </span>
              </button>
            ) : (
              <select
                value={row.original.leadStatus}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  handleStatusChange(row.original, e.target.value);
                }}
                className="form-control d-flex justify-content-center "
                style={{
                  padding: "0px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  appearance: "none",
                  textIndent: "20px",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "10px",
                  backgroundColor: `${
                    row.original.leadStatus === "NEW_WAITLIST"
                      ? "#0d6efd"
                      : row.original.leadStatus === "KIV"
                      ? "#6c757d"
                      : row.original.leadStatus === "WAITING_FOR_PAYMENT"
                      ? "#0d6efd"
                      : row.original.leadStatus === "ARRANGING_ASSESSMENT"
                      ? "#ffd107"
                      : row.original.leadStatus === "ASSESSMENT_DONE"
                      ? "#0dcaf0"
                      : row.original.leadStatus === "DROP"
                      ? "#c42d33"
                      : ""
                  }`,
                  textAlign: "center",
                  textIndent: "0",
                  lineHeight: "20px",
                  maxWidth: "max-content",
                }}
              >
                {row.original.leadStatus === ("NEW_WAITLIST" || "DROP") ? (
                  <>
                    <option
                      value="NEW_WAITLIST"
                      hidden
                      disabled={row.original.leadStatus === "NEW_WAITLIST"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      New / Waitlist
                    </option>
                    <option
                      value="ARRANGING_ASSESSMENT"
                      style={{
                        backgroundColor: "white",
                        padding: "10px 15px ",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    >
                      Assessment Add
                    </option>
                    <option
                      value="KIV"
                      disabled={row.original.leadStatus === "KIV"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      KIV
                    </option>
                    <option
                      value="WAITING_FOR_PAYMENT"
                      disabled={
                        row.original.leadStatus === "WAITING_FOR_PAYMENT"
                      }
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Waiting for Payment
                    </option>
                    <option
                      value="CONFIRMED"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Confirmed
                    </option>
                    <option
                      value="DROP"
                      disabled={row.original.leadStatus === "DROP"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Drop
                    </option>
                  </>
                ) : row.original.leadStatus === "ARRANGING_ASSESSMENT" ? (
                  <>
                    <option
                      value="ARRANGING_ASSESSMENT"
                      hidden
                      disabled={
                        row.original.leadStatus === "ARRANGING_ASSESSMENT"
                      }
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Assessment Arranged
                    </option>
                    <option
                      value="NEW_WAITLIST"
                      disabled={row.original.leadStatus === "NEW_WAITLIST"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      New / Waitlist
                    </option>

                    <option
                      value="Do_Assessment"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Do Assessment
                    </option>

                    <option
                      value="Assessment_Edit"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Assessment Edit
                    </option>
                    <option
                      value="DROP"
                      disabled={row.original.leadStatus === "DROP"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Drop
                    </option>
                  </>
                ) : row.original.leadStatus === "KIV" ? (
                  <>
                    <option
                      value="KIV"
                      hidden
                      disabled={row.original.leadStatus === "KIV"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      KIV
                    </option>
                    <option
                      value="NEW_WAITLIST"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      New / Waitlist
                    </option>
                    <option
                      value="ARRANGING_ASSESSMENT"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Assessment Add
                    </option>
                    <option
                      value="WAITING_FOR_PAYMENT"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Waiting For Payment
                    </option>
                    <option
                      value="CONFIRMED"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Confirmed
                    </option>
                    <option
                      value="DROP"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Drop
                    </option>
                  </>
                ) : row.original.leadStatus === "ASSESSMENT_DONE" ? (
                  <>
                    <option
                      value="ASSESSMENT_DONE"
                      hidden
                      disabled={row.original.leadStatus === "ASSESSMENT_DONE"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Assessment Done
                    </option>
                    <option
                      value="NEW_WAITLIST"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      New / Waitlist
                    </option>
                    <option
                      value="EDIT_DO_ASSESSMENT"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Edit Do Assessment
                    </option>
                    <option
                      value="KIV"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      KIV
                    </option>
                    <option
                      value="ENROLLED"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Enrolled
                    </option>
                    <option
                      value="DROP"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Drop
                    </option>
                  </>
                ) : row.original.leadStatus === "WAITING_FOR_PAYMENT" ? (
                  <>
                    <option
                      value="WAITING_FOR_PAYMENT"
                      hidden
                      disabled={
                        row.original.leadStatus === "WAITING_FOR_PAYMENT"
                      }
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Waiting For Payment
                    </option>
                    <option
                      value="NEW_WAITLIST"
                      disabled={row.original.leadStatus === "NEW_WAITLIST"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      New / Waitlist
                    </option>
                    <option
                      value="ARRANGING_ASSESSMENT"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Assessment Add
                    </option>
                    <option
                      value="KIV"
                      disabled={row.original.leadStatus === "KIV"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      KIV
                    </option>
                    <option
                      value="CONFIRMED"
                      disabled={row.original.leadStatus === "CONFIRMED"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Confirmed
                    </option>
                    <option
                      value="DROP"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Drop
                    </option>
                  </>
                ) : (
                  <>
                    <option
                      value="NEW_WAITLIST"
                      disabled={row.original.leadStatus === "NEW_WAITLIST"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      New / Waitlist
                    </option>
                    <option
                      value="ARRANGING_ASSESSMENT"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Assessment Add
                    </option>
                    <option
                      value="KIV"
                      disabled={row.original.leadStatus === "KIV"}
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      KIV
                    </option>
                    <option
                      value="WAITING_FOR_PAYMENT"
                      disabled={
                        row.original.leadStatus === "WAITING_FOR_PAYMENT"
                      }
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Waiting for Payment
                    </option>
                    <option
                      value="CONFIRMED"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Confirmed
                    </option>
                    <option
                      value="DROP"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        color: "#000",
                      }}
                    >
                      Drop
                    </option>
                  </>
                )}
              </select>
            )}
          </div>
        ),
      },
      {
        header: "Centre Name",
        accessorKey: "center",
        enableHiding: false,
        cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "studentName",
        enableHiding: false,
        header: "Student Name",
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date Of Birth",
        enableHiding: false,
        Cell: ({ cell }) =>
          cell.getValue()?.substring(0, 10)?.split("").reverse().join(""),
      },
      {
        header: "Subject",
        accessorKey: "subject",
        enableHiding: false,
      },
      { accessorKey: "parentName", enableHiding: false, header: "Parent Name" },
      { accessorKey: "address", header: "Sounds of a-z" },
      {
        accessorKey: "createdBy",
        header: "Created By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
    ],
    []
  );

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            color: "#535454 !important",
            backgroundColor: "#e6edf7 !important",
            fontWeight: "400 !important",
            fontSize: "13px !important",
            textAlign: "center !important",
          },
        },
      },
      // Switch (Toggle button) customization
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-disabled .MuiSwitch-track": {
              backgroundColor: "#f5e1d0", // Track color when disabled
              opacity: 1, // Ensures no opacity reduction
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color: "#eb862a", // Thumb (circle) color when disabled
            },
          },
          track: {
            backgroundColor: "#e0e0e0", // Default track color
          },
          thumb: {
            color: "#eb862a", // Default thumb color
          },
          switchBase: {
            "&.Mui-checked": {
              color: "#eb862a", // Thumb color when checked
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#eb862a", // Track color when checked
            },
          },
        },
      },
    },
  });

  const handleMenuClose = () => setMenuAnchor(null);
  return (
    <div>
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
            &nbsp;Lead Management
            <span className="breadcrumb-separator"> &gt; </span>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            &nbsp;Lead Listing
          </li>
        </ol>
        {/* <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        > */}
        <div className="row mb-3">
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
                    setFilters((pre) => ({
                      ...pre,
                      leadStatus: status.backendName,
                    }));
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
                  value={filters.centerId}
                  onChange={(e) =>
                    setFilters((pre) => ({ ...pre, centerId: e.target.value }))
                  }
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
                  value={filters.subjectId}
                  onChange={(e) =>
                    setFilters((pre) => ({ ...pre, subjectId: e.target.value }))
                  }
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
            <>
              <ThemeProvider theme={theme}>
                <MaterialReactTable
                  columns={columns}
                  data={datas}
                  enableColumnActions={false}
                  enableColumnFilters={false}
                  enableSorting={true}
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  initialState={{
                    columnVisibility: {
                      gst: false,
                      address: false,
                      bankAccountName: false,
                      bankAccountNumber: false,
                      bankBranch: false,
                      bankName: false,
                      createdBy: false,
                      createdAt: false,
                      updatedBy: false,
                      updatedAt: false,
                      invoiceNotes: false,
                      openingDate: false,
                      taxRegistrationNumber: false,
                      zipCode: false,
                    },
                  }}
                  muiTableBodyRowProps={({ row }) => ({
                    onClick: () =>
                      navigate(`/lead/lead/view/${row.original.id}`),
                    style: { cursor: "pointer" },
                  })}
                />
              </ThemeProvider>

              <Menu
                id="action-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                {/* <MenuItem
                  onClick={() => navigate(`/lead/lead/view/${selectedId}`)}
                >
                  View
                </MenuItem> */}
                {storedScreens?.leadListingUpdate && (
                  <MenuItem
                    onClick={() => navigate(`/lead/lead/edit/${selectedId}`)}
                  >
                    Edit
                  </MenuItem>
                )}
                {/* {storedScreens?.centerListingDelete && ( */}
                <MenuItem>
                  <GlobalDelete
                    path={`/deleteLeadInfo/${selectedId}`}
                    onDeleteSuccess={getLeadData}
                    onOpen={handleMenuClose}
                  />
                </MenuItem>
                {/* )} */}
              </Menu>
            </>
          )}
        </div>
        {/* </form> */}
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
                style={{ background: "#eb862a" }}
                className="btn btn-sm text-white"
                onClick={handleFormSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ArrangeAssesmentAdd
        leadId={selectedRow.id}
        onSuccess={getLeadData}
        centerId={selectedRow.centerId}
        studentNames={selectedRow.studentName}
        setAll={ResetFilter}
        showDialog={showDialog}
        handleShow={handleShow}
        handleClose={handleClose}
        centerDatas={centerData}
      />
      <ArrangeAssesmentEdit
        leadId={selectedRow.id}
        arrangeAssesmentId={
          selectedRow?.assessmentArrange?.length > 0
            ? selectedRow?.assessmentArrange[0]?.id
            : 0
        }
        onSuccess={getLeadData}
        centerId={selectedRow.centerId}
        studentNames={selectedRow.studentName}
        setAll={ResetFilter}
        showDialog={showEditDialog}
        handleShow={handleEditShowDialog}
        handleClose={handleEditCloseDialog}
        centerDatas={centerData}
      />
    </div>
  );
};

export default Lead;
