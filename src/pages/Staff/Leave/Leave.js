import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/URL";
import {
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import GlobalDelete from "../../../components/common/GlobalDelete";

const Leave = () => {
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const userId = localStorage.getItem("userId");

  const getData = async () => {
    try {
      const response = await api.get(`/getUserLeaveRequestByUserId/${userId}`);
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
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
        Cell: ({ row, cell }) =>
          row.original.leaveStatus === "PENDING" ? (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setMenuAnchor(e.currentTarget);
                setSelectedId(cell.getValue());
              }}
            >
              <MoreVertIcon />
            </IconButton>
          ) : null, // Hide the button for APPROVED or REJECTED
      },
      {
        accessorKey: "leaveStatus",
        enableHiding: false,
        header: "Leave Status",
        Cell: ({ row }) =>
          row.original.leaveStatus === "APPROVED" ? (
            <span className="badge bg-success fw-light">Approved</span>
          ) : row.original.leaveStatus === "REJECTED" ? (
            <span className="badge bg-danger fw-light">Rejected</span>
          ) : (
            <span className="badge bg-warning fw-light">Pending</span>
          ),
      },
      {
        accessorKey: "fromDate",
        enableHiding: false,
        header: "From Date",
        size: 20,
      },
      {
        accessorKey: "toDate",
        enableHiding: false,
        header: "To Date",
        size: 20,
      },
      {
        accessorKey: "leaveType",
        enableHiding: false,
        header: "Leave Type",
        size: 20,
      },
      {
        accessorKey: "noOfDays",
        enableHiding: false,
        header: "No Of Days",
        size: 20,
      },
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
          &nbsp;Leave Request
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
                Leave Request
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          {storedScreens?.leaveCreate && (
            <Link to="/leave/add">
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
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-12 p-2">
            Employee Name &nbsp; &nbsp;: &nbsp; &nbsp;
            {datas.employeeName}
          </div>
          <div className="col-md-6 col-12 p-2">
            Leave Limit &nbsp; &nbsp;: &nbsp; &nbsp;{datas.leaveLimit}
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
            <ThemeProvider theme={theme}>
              <MaterialReactTable
                columns={columns}
                data={datas?.employeeData}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/leave/view/${row.original.id}`),
                  style: { cursor: "pointer" },
                })}
              />
            </ThemeProvider>

            <Menu
              id="action-menu"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              disableScrollLock
            >
              <MenuItem
                onClick={() => navigate(`/leave/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteUserLeaveRequest/${selectedId}`}
                  onDeleteSuccess={getData}
                  onOpen={handleMenuClose}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Leave;
