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
import fetchAllCentreManager from "../List/CentreMangerList";
import GlobalDelete from "../../components/common/GlobalDelete";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import { Button } from "react-bootstrap";

const Center = ({ handleCenterChanged }) => {
  const [filters, setFilters] = useState({
    centerName: "",
    centerCode: "",
    email: "",
    centerManagerId: "",
  });
  const [centerManagerData, setCenterManagerData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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
      { accessorKey: "centerName", enableHiding: true, header: "Centre Name" },
      {
        accessorKey: "centerManager",
        enableHiding: true,
        header: "Centre Manager",
      },
      { accessorKey: "code", header: "Code", enableHiding: true, size: 40 },
      {
        accessorKey: "uenNumber",
        header: "UEN Number",
        enableHiding: true,
        size: 50,
      },
      { accessorKey: "email", enableHiding: true, header: "Email" },
      { accessorKey: "mobile", enableHiding: true, header: "Mobile" },
      { accessorKey: "address", header: "Address" },
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

  const fetchCenterManagerData = async () => {
    try {
      const centerManagerData = await fetchAllCentreManager();
      setCenterManagerData(centerManagerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchCenterManagerData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);

  //     // Filter out empty or null values from the filters
  //     const nonEmptyFilters = Object.fromEntries(
  //       Object.entries(filters).filter(([key, value]) => value !== "")
  //     );

  //     const queryParams = new URLSearchParams(nonEmptyFilters).toString();
  //     const response = await api.get(`/getCenterWithCustomInfo?${queryParams}`);

  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Filter out empty or null values from the filters
      const nonEmptyFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
      );

      // Construct the query string if there are valid filters
      const queryParams = Object.keys(nonEmptyFilters).length
        ? `?${new URLSearchParams(nonEmptyFilters).toString()}`
        : "";

      // Make the API call
      const response = await api.get(`/getCenterWithCustomInfo${queryParams}`);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      centerName: "",
      centerCode: "",
      email: "",
      centerManagerId: "",
    });
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid px-2 my-4 center">
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
          &nbsp;Centre Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Centre Listing
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>Centre</strong>
          </span>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="centerName"
                value={filters.centerName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre Name"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="centerCode"
                value={filters.centerCode}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Code"
                autoComplete="off"
              />
            </div>
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
              <select
                name="centerManagerId"
                value={filters.centerManagerId}
                onChange={handleFilterChange}
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
              >
                <option value="">Select Centre Manager</option>
                {centerManagerData.map((manager) => (
                  <option key={manager.id} value={manager.id}>
                    {manager.userNames}
                  </option>
                ))}
              </select>
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

          <div className="d-flex align-items-center">
            {/* Button to Open Menu */}
            <button
              onClick={handleOpen}
              className="btn btn-button btn-sm me-2"
              style={{ fontWeight: "600" }}
            >
              Options
            </button>

            {/* Menu with Options */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link
                  to="/center/add"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <span
                    className="text-start mb-0 menuitem-style text-black"
                    style={{ whiteSpace: "nowrap", width: "100%" }}
                  >
                    Add Center
                  </span>
                </Link>
              </MenuItem>
              <MenuItem>
                <AddRegister
                  id={selectedId}
                  onSuccess={fetchData}
                  handleMenuClose={handleClose}
                />
              </MenuItem>
              <MenuItem>
                <AddClass
                  id={selectedId}
                  onSuccess={fetchData}
                  handleMenuClose={handleClose}
                />
              </MenuItem>
              <MenuItem>
                <AddPackage
                  id={selectedId}
                  onSuccess={fetchData}
                  handleMenuClose={handleClose}
                />
              </MenuItem>
              <MenuItem>
                <AddBreak
                  id={selectedId}
                  onSuccess={fetchData}
                  handleMenuClose={handleClose}
                />
              </MenuItem>
            </Menu>

            {/* Existing Add Button */}
            {/* <Link to="/center/add">
              <button
                type="button"
                className="btn btn-button btn-sm me-2"
                style={{ fontWeight: "600" }}
              >
                &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
              </button>
            </Link> */}
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
                  onClick: () => navigate(`/center/view/${row.original.id}`),
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
              {/* <MenuItem >
                <AddRegister id={selectedId} onSuccess={fetchData} handleMenuClose={handleMenuClose}/>
              </MenuItem>
              <MenuItem >
                <AddClass id={selectedId} onSuccess={fetchData} handleMenuClose={handleMenuClose}/>
              </MenuItem>
              <MenuItem >
                <AddPackage id={selectedId} onSuccess={fetchData} handleMenuClose={handleMenuClose}/>
              </MenuItem>
              <MenuItem >
                <AddBreak id={selectedId} onSuccess={fetchData} handleMenuClose={handleMenuClose}/>
              </MenuItem> */}
              <MenuItem
                onClick={() => navigate(`/center/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCenter/${selectedId}`}
                  onDeleteSuccess={fetchData}
                  onOpen={handleMenuClose}
                  // deleteCenterData={true}
                  handleCenterChanged={handleCenterChanged}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Center;
