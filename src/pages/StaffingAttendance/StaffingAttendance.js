import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
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
import GlobalDelete from "../../components/common/GlobalDelete";
import fetchAllCentersWithIds from "../../pages/List/CenterList";

const StaffingAttendance = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log("Leave Data:", data);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: true,
        size: 20,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "id",
        header: "",
        enableHiding: true,
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
        accessorKey: "attendanceStatus",
        enableHiding: true,
        header: "Status",
        size: 30,
        Cell: ({ row }) =>
          row.original.attendanceStatus === "Present" ||
          row.original.attendanceStatus === "PRESENT" ? (
            <span className="badge badges-Green fw-light">Present</span>
          ) : row.original.attendanceStatus === "Absent" ||
            row.original.attendanceStatus === "ABSENT" ? (
            <span className="badge badges-orange fw-light">Absent</span>
          ) : null,
      },
      // { accessorKey: "centerName", enableHiding: true, header: "Centre Name" },
      {
        accessorKey: "employeeName",
        enableHiding: true,
        header: "Employee Name",
      },
      {
        accessorKey: "checkIn",
        size: 30,
        enableHiding: true,
        header: "Check In",
        Cell: ({ cell }) => {
          const timeValue = cell.getValue();
          if (timeValue) {
            const [hours, minutes] = timeValue.split(":");
            const date = new Date();
            date.setHours(hours, minutes);
            const options = {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            };
            return date.toLocaleTimeString(undefined, options);
          }
          return null;
        },
      },
      {
        accessorKey: "checkOut",
        size: 30,
        enableHiding: true,
        header: "Check Out",
        Cell: ({ cell }) => {
          const timeValue = cell.getValue();
          if (timeValue) {
            const [hours, minutes] = timeValue.split(":");
            const date = new Date();
            date.setHours(hours, minutes);
            const options = {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            };
            return date.toLocaleTimeString(undefined, options);
          }
          return null;
        },
      },
      { accessorKey: "date", enableHiding: true, header: "Date" },
      { accessorKey: "createdBy", enableHiding: true, header: "Created By" },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        enableHiding: true,
        Cell: ({ cell }) => cell.getValue() || "",
      },
      { accessorKey: "attendanceRemark", header: "Attendance Remark" },
      {
        accessorKey: "modeOfWorking",
        header: "Mode Of Working",
        Cell: ({ row }) =>
          row.original.modeOfWorking === "WORK_FROM_HOME" ||
          row.original.modeOfWorking === "work_from_home" ? (
            <span>WORK FROM HOME</span>
          ) : row.original.modeOfWorking === "WORK_FROM_OFFICE" ||
            row.original.modeOfWorking === "work_from_office" ? (
            <span>WORK FROM OFFICE</span>
          ) : null,
      },
      { accessorKey: "userId", header: "User Id" },
      {
        accessorKey: "userRole",
        header: "User Role",
        Cell: ({ row }) =>
          row.original.userRole === "SMS_TEACHER" ||
          row.original.userRole === "sms_teacher" ? (
            <span>SMS TEACHER</span>
          ) : row.original.userRole === "CENTER_MANAGER" ||
            row.original.userRole === "center_manager" ? (
            <span>CENTER MANAGER</span>
          ) : null,
      },
      { accessorKey: "otEndTime", header: "Ot End Time" },
      { accessorKey: "otStartTime", header: "Ot Start Time" },
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
    ],
    []
  );

  const getData = async () => {
    try {
      const response = await api.get("/getAllUserAttendances");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
  };
  useEffect(() => {
    getData();
    fetchData();
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
      MuiSwitch: {
        styleOverrides: {
          root: {
            "&.Mui-disabled .MuiSwitch-track": {
              backgroundColor: "#f5e1d0",
              opacity: 1,
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              color: "#eb862a",
            },
          },
          track: {
            backgroundColor: "#e0e0e0",
          },
          thumb: {
            color: "#eb862a",
          },
          switchBase: {
            "&.Mui-checked": {
              color: "#eb862a",
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#eb862a",
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
          &nbsp;Attendance
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
                Attendance
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-end">
          {storedScreens?.staffAttendanceCreate && (
            <Link to="/staffing/attendance/add">
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
                    gst: false,
                    address: false,
                    bankAccountName: false,
                    bankAccountNumber: false,
                    bankBranch: false,
                    bankName: false,
                    attendanceRemark: false,
                    modeOfWorking: false,
                    userId: false,
                    userRole: false,
                    otEndTime: false,
                    otStartTime: false,
                    createdAt: false,
                    updatedAt: false,
                    invoiceNotes: false,
                    openingDate: false,
                    taxRegistrationNumber: false,
                    zipCode: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () =>
                    navigate(`/staffing/attendance/view/${row.original.id}`),
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
              <MenuItem
                onClick={() =>
                  navigate(`/staffing/attendance/edit/${selectedId}`)
                }
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteUserAttendance/${selectedId}`}
                  onDeleteSuccess={getData}
                  onOpen={handleMenuClose}
                />
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffingAttendance;
