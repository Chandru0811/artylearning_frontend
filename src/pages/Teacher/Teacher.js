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
import GlobalDelete from "../../components/common/GlobalDelete";

const Teacher = ({ selectedCenter }) => {
  const [filters, setFilters] = useState({
    centerId: selectedCenter,
    teacherName: "",
    country: "",
    teacherType: "",
    status: "",
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const roles = localStorage.getItem("userName");

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

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
          row.original.role === "Teacher" ||
          row.original.role === "teacher" ||
          row.original.role === "TEACHER" ? (
            <span className="badge badges-Green fw-light">Teacher</span>
          ) : row.original.role === "freelancer" ||
            row.original.role === "free_lancer" ||
            row.original.role === "FREELANCER" ? (
            <span className="badge badges-orange fw-light">Freelancer</span>
          ) : null,
      },
      { accessorKey: "countryName", enableHiding: true, header: "Country" },
      {
        accessorKey: "userUniqueId",
        enableHiding: true,
        header: "Teacher Id",
      },
      {
        accessorKey: "teacherName",
        header: "Teacher Name",
        enableHiding: true,
        size: 40,
      },
      {
        accessorKey: "teacherType",
        header: "Teacher Type",
        enableHiding: true,
        size: 50,
      },
      { accessorKey: "email", enableHiding: true, header: "Email" },
      { accessorKey: "contactNumber", enableHiding: true, header: "Mobile" },

      {
        accessorKey: "createdAt",
        enableHiding: true,
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedAt",
        enableHiding: true,
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      { accessorKey: "createdBy", header: "Created By" },
    ],
    []
  );

  // const fetchData = async () => {
  //   try {
  //     let response;

  //     if (roles === "SMS_ADMIN") {
  //       response = await api.get("/getAllTeachersAndFreelancers");
  //     } else if (roles === "SMS_TEACHER") {
  //       response = await api.get("/getAllUsersByRole/teacher");
  //     } else if (roles === "SMS_FREELANCER") {
  //       response = await api.get("/getAllFreelance");
  //     }

  //     if (response) {
  //       setData(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchData = async () => {
    try {
      const url =
        selectedCenter === 0 || selectedCenter === "0"
          ? `getAllTeachersAndFreelancers`
          : `/getAllTeachersAndFreelancers?centerId=${selectedCenter}`;

      const response = await api.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedCenter]);
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     let response;

  //     if (filters.centerId === 0) {
  //       response = await api.get("/getAllTeachersAndFreelancers");
  //     } else {
  //       const filteredFilters = Object.fromEntries(
  //         Object.entries(filters).filter(
  //           ([key, value]) =>
  //             value !== "" && value !== null && value !== undefined
  //         )
  //       );
  //       if (filteredFilters.centerId === 0) {
  //         delete filteredFilters.centerId;
  //       }
  //       const queryParams = new URLSearchParams(filteredFilters).toString();
  //       console.log("Filters:", filteredFilters);
  //       console.log("Query Params:", queryParams);
  //       response = await api.get(
  //         `/getAllTeachersAndFreelancers${queryParams ? `?${queryParams}` : ""}`
  //       );
  //     }

  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    setFilters((prev) => ({ ...prev, centerId: selectedCenter }));
  }, [selectedCenter]);
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilter = () => {
    setFilters({
      centerId: selectedCenter,
      teacherName: "",
      country: "",
      teacherType: "",
      status: "",
    });
  };

  // const filteredData = useMemo(() => {
  //   return data.filter((item) => {
  //     const matchesTeacherName = item.teacherName
  //       ?.toLowerCase()
  //       .includes(filters.teacherName.toLowerCase());
  //     const matchesEmail = item.country
  //       ?.toLowerCase()
  //       .includes(filters.country.toLowerCase());

  //     return (
  //       (filters.teacherName ? matchesTeacherName : true) &&
  //       (filters.country ? matchesEmail : true)
  //     );
  //   });
  // }, [data, filters]);

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid center my-4">
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
        <li className="active breadcrumb-item" aria-current="page">
          &nbsp;Teacher
        </li>
      </ol>
      <div className="card">
        <div
          className="d-flex align-items-center justify-content-between p-1 mb-3"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="active dot"></div>
            </div>
            <span className="text-muted me-2">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Teacher
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div className="d-lg-flex individual_fliters">
            <input type="hidden" name="centerId" value={filters.centerId} />

            <div className="form-group mb-0 mb-1 ms-2">
              <input
                type="text"
                name="teacherName"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Teacher Name"
                value={filters.teacherName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group mb-0 mb-1 ms-2">
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
            <div className="form-group mb-0 mb-1 ms-2">
              <select
                type="text"
                className="form-select form-select-sm center_list"
                style={{ width: "160px" }}
                name="teacherType"
                value={filters.teacherType}
                onChange={handleFilterChange}
              >
                <option value="" selected>
                  Select Teacher Type
                </option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
            <div className="form-group mb-0 mb-1 ms-2">
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

            <div className="form-group mb-0 mb-1 ms-2">
              <button
                type="button"
                className="btn btn-border btn-sm"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </div>
          {storedScreens?.teacherCreate && (
            <Link to="/teacher/add">
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
                    createdBy: false,
                    updatedBy: false,
                    invoiceNotes: false,
                    openingDate: false,
                    taxRegistrationNumber: false,
                    zipCode: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/teacher/view/${row.original.id}`),
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
                onClick={() => navigate(`/teacher/edit/${selectedId}`)}
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

export default Teacher;
