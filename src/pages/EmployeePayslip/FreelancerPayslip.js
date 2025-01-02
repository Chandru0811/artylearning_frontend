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
import api from "../../config/URL";

const FreelancerPayslip = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
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
      { accessorKey: "centerName", enableHiding: false, header: "Centre Name" },
      {
        accessorKey: "employeeName",
        enableHiding: false,
        header: "Employee Name",
      },
      {
        accessorKey: "netPay",
        header: "Net Pay",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "createdAt",
        enableHiding: false,
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedAt",
        enableHiding: false,
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

  const fetchData = async () => {
    try {
      const response = await api.get(
        `getAllFreelancerApprovedListByUserId/${userId}`
      );
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          &nbsp;Freelancer Invoice
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
              Freelancer Invoice
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between">
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
                data={datas}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    createdBy: false,
                    updatedBy: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/freelancerPayslip/view/${row.original.id}`),
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
              {/* <MenuItem>
                <GlobalDelete
                  path={`/deleteUserPayroll/${selectedId}`}
                  onDeleteSuccess={fetchData}
                  onOpen={handleMenuClose}
                />
              </MenuItem> */}
            </Menu>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerPayslip;
