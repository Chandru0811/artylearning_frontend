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

const Staff = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    teacherName: "",
    country: "",
    teacherType: "",
    status: "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  console.log("data", data);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: true,
        size: 40,
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
        accessorKey: "role",
        enableHiding: true,
        header: "Role",
        Cell: ({ row }) =>
          row.original.role === "staff" ||
          row.original.role === "Staff" ||
          row.original.role === "STAFF" ? (
            <span className="badge badges-Green fw-light">Staff</span>
          ) : row.original.role === "center_manager" ? (
            <span className="badge badges-orange fw-light">Centre Manager</span>
          ) : row.original.role === "staff_admin" ? (
            <span className="badge badges-red fw-light">Staff Admin</span>
          ) : row.original.role === "branch_admin" ? (
            <span className="badge badges-Blue fw-light">Branch Admin</span>
          ) : null,
      },
      { accessorKey: "userUniqueId", enableHiding: true, header: "Staff Id" },
      {
        accessorKey: "teacherType",
        enableHiding: true,
        header: "Staff Type",
      },
      {
        accessorKey: "teacherName",
        enableHiding: true,
        header: "Staff Name",
      },
      {
        accessorKey: "email",
        enableHiding: true,
        header: "Email",
      },
      {
        accessorKey: "gender",
        enableHiding: true,
        header: "Gender",
      },

      {
        accessorKey: "contactNumber",
        enableHiding: true,
        header: "Mobile",
      },
      {
        accessorKey: "citizenship",

        header: "Citizenship",
      },
      {
        accessorKey: "dateOfBirth",

        header: "Date Of Birth",
      },
      { accessorKey: "idNo", header: "Id No" },
      { accessorKey: "idType", header: "Id Type" },
      // {
      //   accessorKey: "userUniqueId",

      //   header: "User Unique Id",
      // },
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const filteredFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) =>
            value !== "" && value !== null && value !== undefined
        )
      );
      const queryParams = new URLSearchParams(filteredFilters).toString();
      const response = await api.get(
        `/getAllUserListExceptTeacher?${queryParams}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [filters]);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      teacherName: "",
      country: "",
      teacherType: "",
      status: "",
    });
  };

  const handleMenuClose = () => setMenuAnchor(null);

  // const filteredData = useMemo(() => {
  //   return data.filter((item) => {
  //     const matchesTeacherName = item.teacherName
  //       ?.toLowerCase()
  //       .includes(filters.teacherName.toLowerCase());
  //     const matchesCountry = item.countryName
  //       ?.toLowerCase()
  //       .includes(filters.country.toLowerCase());
  //     return (
  //       (filters.teacherName ? matchesTeacherName : true) &&
  //       (filters.country ? matchesCountry : true)
  //     );
  //   });
  // }, [data, filters]);

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
          &nbsp;Staff
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
                Staff
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="teacherName"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Staff Name"
                value={filters.teacherName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="country"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Country"
                value={filters.country}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                type="text"
                className="form-select form-select-sm center_list"
                style={{ width: "160px" }}
                name="teacherType"
                value={filters.teacherType}
                onChange={handleFilterChange}
              >
                <option value="" selected>
                  Select Staff Type
                </option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                type="text"
                className="form-select form-select-sm center_list"
                style={{ width: "160px" }}
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="" selected>
                  Select a status
                </option>
                <option value={"ACTIVE"}>Active</option>
                <option value={"RESIGNED"}>Resigned</option>
              </select>
            </div>

            <div className="form-group mb-0 ms-2 mb-1">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </div>
          {storedScreens?.staffCreate && (
            <Link to="/staff/add">
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
                    // teacherId: true,
                    teacherName: true,
                    teacherType: true,
                    email: true,
                    gender: true,
                    role: true,
                    contactNumber: true,
                    citizenship: false,
                    centerId: false,
                    dateOfBirth: false,
                    idNo: false,
                    idType: false,
                    idTypeId: false,
                    userUniqueId: false,
                    createdBy: false,
                    createdAt: false,
                    updatedAt: false,
                    updatedBy: false,
                  },
                  // columnFilters: [
                  //   // { id: "teacherId", value: filters.country },
                  //   { id: "teacherName", value: filters.staffName },
                  // ],
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/staff/view/${row.original.id}`),
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
                onClick={() => navigate(`/staff/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteUser/${selectedId}`}
                  onDeleteSuccess={fetchData}
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

export default Staff;
