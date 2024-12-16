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

import { MaterialReactTable } from "material-react-table";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

const Lead = () => {
  const navigate = useNavigate();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [datas, setDatas] = useState([]);
  // console.log("Lead All Datas", datas);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [activeButton, setActiveButton] = useState("All");

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const [centerData, setCenterData] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [filters, setFilters] = useState({
    centerId: "",
    subjectId: "",
    leadStatus: "ALL",
  });

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
        // formik.resetForm();
        ResetFilter();
        getLeadData();
        // refreshData();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.centerId, filters.subjectId, filters.leadStatus]);

  const ResetFilter = () => {
    setFilters({
      centerId: "",
      subjectId: "",
      leadStatus: "",
    });
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

  // ===new Data table
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
              setMenuAnchor(e.currentTarget);
              setSelectedId(cell.getValue());
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      {
        header: "Centre Name",
        accessorKey: "centreName",
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
        size: 40,
      },
      {
        header: "Subject",
        accessorKey: "subject",
        enableHiding: false,
      },
      { accessorKey: "parentName", enableHiding: false, header: "Parent Name" },
      {
        accessorKey: "leadStatus",
        enableHiding: false,
        header: "Status",
        Cell: ({ row }) => (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                fontSize: "16px",
                color: "#fff",
              }}
            >
              {row.original.leadStatus}
              {/* <BsThreeDotsVertical /> */}
            </span>
            <select
              // value={selectedValue}
              // onChange={(e) =>
              //   handleSelectChange(e.target.value, row.original.id)
              // }
              className="form-control"
              style={{
                padding: "4px 10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "36px",
                appearance: "none",
                textIndent: "20px",
                color: "#fff",
                backgroundColor: "#287f71",
              }}
            >
              <option
                value="basics"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  color: "#000", // Ensuring text is visible on a white background
                }}
              >
                <MdOutlineModeEdit /> Add Registration
              </option>
              <option
                value="basic"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  color: "#000",
                }}
              >
                Editor
              </option>
              <option
                value="admin"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  color: "#000",
                }}
              >
                Admin Admin &nbsp;
              </option>
            </select>
          </div>
        ),
      },
      { accessorKey: "address", header: "  Sounds of a-z" },
      { accessorKey: "invoiceNotes", header: "Invoice Notes" },
      { accessorKey: "openingDate", header: "Opening Date" },
      { accessorKey: "bankAccountName", header: "Bank A/C Name" },
      { accessorKey: "bankAccountNumber", header: "Bank A/C Number" },
      { accessorKey: "bankBranch", header: "Bank Branch" },
      { accessorKey: "bankName", header: "Bank Name" },
      { accessorKey: "gst", header: "GST" },
      { accessorKey: "taxRegistrationNumber", header: "Tax Reg Number" },
      { accessorKey: "zipCode", header: "Zip Code" },
      { accessorKey: "createdBy", header: "Created By" },
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
    },
  });

  const handleMenuClose = () => setMenuAnchor(null);
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
                  // muiTableBodyRowProps={({ row }) => ({
                  //   onClick: () => navigate(`/center/view/${row.original.id}`),
                  //   style: { cursor: "pointer" },
                  // })}
                />
              </ThemeProvider>

              <Menu
                id="action-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={() => navigate(`/center/view/${selectedId}`)}
                >
                  View
                </MenuItem>
                {storedScreens?.leadListingUpdate && (
                  <MenuItem
                    onClick={() => navigate(`/lead/lead/edit/${selectedId}`)}
                  >
                    Edit
                  </MenuItem>
                )}
                {storedScreens?.centerListingDelete && (
                  <MenuItem>
                    <GlobalDelete
                      path={`/deleteCenter/${selectedId}`}
                      onDeleteSuccess={getLeadData}
                    />
                  </MenuItem>
                )}
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
