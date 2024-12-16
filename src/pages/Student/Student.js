import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import GlobalDelete from "../../components/common/GlobalDelete";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

const Student = () => {
  const [filters, setFilters] = useState({
    centerId: "",
    studentName: "",
    parentName: "",
    email: "",
    mobileNumber: "",
  });
  const [centerData, setCenterData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 40,
        cell: ({ cell }) => (
          <span
            style={{ textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            {cell.getValue()}
          </span>
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
        accessorKey: "studentUniqueId",
        header: "Student ID",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "center",
        header: "Centre Name",
        enableHiding: false,
      },
      {
        accessorKey: "studentName",
        header: "Student Name",
        enableHiding: false,
      },
      {
        accessorKey: "parentPrimaryName",
        header: "Parent Name",
        enableHiding: false,
      },
      {
        accessorKey: "parentPrimaryEmail",
        header: "Parent Email",
        enableHiding: false,
      },
      {
        accessorKey: "age",
        header: "Age",
        enableHiding: false,
        size: 50,
      },
      {
        accessorKey: "gender",
        header: "Gender",
        enableHiding: false,
        size: 30,
      },
      {
        accessorKey: "allowMagazine",
        header: "Allow Magazine",
        enableHiding: false,
        size: 30,
      },
      {
        accessorKey: "allowSocialMedia",
        header: "Allow Social Media",
        enableHiding: false,
        size: 30,
      },
      {
        accessorKey: "studentChineseName",
        header: "Chinese Name",
      },
      {
        accessorKey: "medicalCondition",
        header: "Medical Condition",
      },
      {
        accessorKey: "dateOfBirth",
        header: "Date of Birth",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "schoolType",
        header: "School Type",
      },
      {
        accessorKey: "schoolName",
        header: "School Name",
      },
      {
        accessorKey: "race",
        header: "Race",
      },
      {
        accessorKey: "primaryLanguage",
        header: "Primary Language",
      },
      {
        accessorKey: "referByParent",
        header: "Referred By Parent",
      },
      {
        accessorKey: "referByStudent",
        header: "Referred By Student",
      },
      {
        accessorKey: "remark",
        header: "Remark",
      },
    ],
    []
  );
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/getStudentWithCustomInfo?${queryParams}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCenterData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const clearFilter = () => {
    setFilters({
      centerId: "",
      studentName: "",
      parentName: "",
      email: "",
      mobileNumber: "",
    });
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid my-4 center">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Student Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Student Listing
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
                Student Listing
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                name="centerId"
                style={{ width: "100%" }}
                value={filters.centerId}
                onChange={handleFilterChange}
              >
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id} selected>
                    {center.centerNames}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="studentName"
                value={filters.studentName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "180px" }}
                placeholder="Student"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="parentName"
                value={filters.parentName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "190px" }}
                placeholder="Parent"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="email"
                value={filters.email}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="mobileNumber"
                value={filters.mobileNumber}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Mobile"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-2 ms-2">
              <button
                type="button"
                onClick={clearFilter}
                className="btn btn-sm btn-border"
              >
                Clear
              </button>
            </div>
          </div>
          <div>
            {storedScreens?.studentListingCreate && (
              <Link to="/student/add">
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
          <>
            <ThemeProvider theme={theme}>
              <MaterialReactTable
                columns={columns}
                data={data}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    studentChineseName: false,
                    dateOfBirth: false,
                    medicalCondition: false,
                    schoolType: false,
                    schoolName: false,
                    preAssessmentResult: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                    nationality: false,
                    race: false,
                    primaryLanguage: false,
                    referByParent: false,
                    referByStudent: false,
                    referByParent: false,
                    remark: false,
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
              disableScrollLock
            >
              <MenuItem onClick={() => navigate(`/student/view/${selectedId}`)}>
                View
              </MenuItem>
              <MenuItem onClick={() => navigate(`/student/edit/${selectedId}`)}>
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCenter/${selectedId}`}
                  onDeleteSuccess={fetchData}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Student;
