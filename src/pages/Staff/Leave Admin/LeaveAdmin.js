import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import GlobalDelete from "../../../components/common/GlobalDelete";

const LeaveAdmin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log("Leave Data:", data);
  const [loading, setLoading] = useState(true);
  const [leaveTypeData, setLeaveTypeData] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

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
      { accessorKey: "centerName", enableHiding: false, header: "Centre Name" },
      {
        accessorKey: "employeeName",
        enableHiding: false,
        header: "Employee Name",
      },
      {
        accessorKey: "leaveType",
        enableHiding: false,
        header: "Leave Type",
      },
      {
        accessorKey: "leaveStatus",
        enableHiding: false,
        header: "Leave Status",
      },
      { accessorKey: "approverName", header: "Approver Name" },
      { accessorKey: "fromDate", header: "From Date" },
      { accessorKey: "leaveReason", header: "Leave Reason" },
      { accessorKey: "leaveTypeId", header: "Leave Type Id" },
      { accessorKey: "noOfDays", header: "No Of Days" },
      { accessorKey: "requestDate", header: "Request Date" },
      { accessorKey: "userId", header: "User Id" },
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

  const fetchLeaveType = async () => {
    try {
      const response = await api.get(`getAllLeaveSetting`);
      setLeaveTypeData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getData = async () => {
    try {
      const response = await api.get("/getAllUserLeaveRequests");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
  };

  useEffect(() => {
    getData();
    fetchLeaveType();
  }, []);

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
          &nbsp;Leave
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
                Leave
              </span>
            </span>
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
          <div>
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
                    leaveReason: true,
                    leaveType: true,
                    leaveTypeId: false,
                    noOfDays: true,
                    requestDate: true,
                    userId: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
              />
            </ThemeProvider>

            <Menu
              id="action-menu"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => navigate(`/leaveadmin/view/${selectedId}`)}
              >
                View
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/leaveadmin/edit/${selectedId}`)}
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteUserLeaveRequest/${selectedId}`}
                  onDeleteSuccess={getData}
                />
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveAdmin;
