import React, { useEffect, useMemo, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { toast } from "react-toastify";
import GlobalDelete from "../../../components/common/GlobalDelete";
import fetchAllCentersWithIds from "../../List/CenterList";
import api from "../../../config/URL";

const Payroll = () => {
  const [filters, setFilters] = useState({
    centerName: "",
    employeeName: "",
    roll: "",
  });
  const navigate = useNavigate();
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState(null);
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
        accessorKey: "status",
        enableHiding: false,
        header: "Status",
        Cell: ({ row }) =>
          row.original.status === "APPROVED" ? (
            <span
              className="badge text-light fw-light"
              style={{ backgroundColor: "#287f71" }}
            >
              Approved
            </span>
          ) : row.original.status === "PENDING" ? (
            <span
              className="badge text-light fw-light"
              style={{ backgroundColor: "#eb862a" }}
            >
              Pending
            </span>
          ) : row.original.status === "REJECTED" ? (
            <span
              className="badge text-light fw-light"
              style={{ backgroundColor: "#ed1a1a" }}
            >
              Rejected
            </span>
          ) : null,
      },
      { accessorKey: "centerName", enableHiding: false, header: "Center Name" },
      {
        accessorKey: "employeeName",
        enableHiding: false,
        header: "Employee Name",
      },
      {
        accessorKey: "netPay",
        enableHiding: false,
        header: "Net Pay",
      },
      {
        accessorKey: "userRole",
        enableHiding: false,
        header: "Role",
      },
      { accessorKey: "bonus", header: "Bonus" },
      { accessorKey: "cpfContributions", header: "Cpf Contributions" },
      { accessorKey: "deductionAmount", header: "Deduction Amount" },
      { accessorKey: "grossPay", header: "Gross Pay" },
      { accessorKey: "hourlyId", header: "Hourly Id" },
      { accessorKey: "payrollMonth", header: "Payroll Month" },
      { accessorKey: "payrollType", header: "Payroll Type" },
      { accessorKey: "sdl", header: "sdl" },
      { accessorKey: "shgContribution", header: "Shg Contribution" },
      { accessorKey: "freelanceCount", header: "Freelance Count" },
      { accessorKey: "userId", header: "User Id" },
      { accessorKey: "year", header: "Year" },
      { accessorKey: "startDate", header: "Start Date" },
      { accessorKey: "endDate", header: "End Date" },
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

  const getCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get("getAllUserPayroll");
      setAllData(response.data);
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    fetchData();
    getCenterData();
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

  useEffect(() => {
    const filteredData = allData.filter((item) => {
      const centerNameMatch = filters.centerName
        ? item.centerName
            ?.toLowerCase()
            .includes(filters.centerName.toLowerCase())
        : true;

      const employeeNameMatch = filters.employeeName
        ? item.employeeName
            ?.toLowerCase()
            .includes(filters.employeeName.toLowerCase())
        : true;

      const rollMatch = filters.roll
        ? item.roll?.toLowerCase().includes(filters.roll.toLowerCase())
        : true;

      return centerNameMatch && employeeNameMatch && rollMatch;
    });

    setDatas(filteredData);
  }, [filters, allData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilter = () => {
    setFilters({
      centerName: "",
      employeeName: "",
      roll: "",
    });
    setDatas(allData);
  };

  useEffect(() => {
    const filteredData = allData.filter((item) => {
      const centerNameMatch = filters.centerName
        ? item.centerName
            ?.toLowerCase()
            .includes(filters.centerName.toLowerCase())
        : true;

      const employeeNameMatch = filters.employeeName
        ? item.employeeName
            ?.toLowerCase()
            .includes(filters.employeeName.toLowerCase())
        : true;

      const rollMatch = filters.roll
        ? item.userRole?.toLowerCase().includes(filters.roll.toLowerCase())
        : true;

      return centerNameMatch && employeeNameMatch && rollMatch;
    });

    setDatas(filteredData);
  }, [filters, allData]);

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
          Staffing
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Payroll
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
                Payroll
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3 px-2">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre Name"
                name="centerName"
                value={filters.centerName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Employee Name"
                name="employeeName"
                value={filters.employeeName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Roll"
                name="roll"
                value={filters.roll}
                onChange={handleFilterChange}
              />
            </div>

            <div className="form-group mb-0 ms-2 mb-1 ">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilter}
              >
                Clear
              </button>
            </div>
          </div>
          {storedScreens?.payrollCreate && (
            <Link to="/payrolladmin/add">
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
                data={datas}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    bonus: false,
                    cpfContributions: false,
                    deductionAmount: false,
                    grossPay: false,
                    hourlyId: false,
                    payrollMonth: false,
                    payrollType: false,
                    sdl: false,
                    shgContribution: false,
                    freelanceCount: false,
                    userId: false,
                    year: false,
                    startDate: false,
                    endDate: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () =>
                    navigate(`/payrolladmin/view/${row.original.id}`),
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
                onClick={() => navigate(`/payrolladmin/edit/${selectedId}`)}
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteUserPayroll/${selectedId}`}
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

export default Payroll;
