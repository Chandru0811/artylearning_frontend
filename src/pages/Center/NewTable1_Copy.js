import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { CiViewColumn } from "react-icons/ci";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import { MdOutlineModeEdit } from "react-icons/md";
import { Delete } from "@mui/icons-material";
import fetchAllCentreManager from "../List/CentreMangerList";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";
import { Alert } from "bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

const NewTable1 = () => {
  const [filters, setFilters] = useState({
    centerName: "",
    centerCode: "",
    email: "",
    centerManagerId: "",
  });
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [centerManagerData, setCenterManagerData] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Store the selected ID

  const navigate = useNavigate();

  const handleSelectChange = (value, id) => {
    setSelectedValue(value);
    if (value === "basic") {
      setShowModal(true);
      setSelectedId(id);
    }
  };

  const handelClose = () => {
    setShowModal(false);
    setSelectedValue("");
  };

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
        accessorKey: "lead_status",
        enableHiding: false,
        header: "Lead Status",
        Cell: ({ row }) =>
          row.original.lead_status === "Processed" ? (
            <span
              className="badge bg-info py-2"
              style={{ color: "#1f1f1f !important" }}
            >
              Processed
            </span>
          ) : row.original.lead_status === "Contacted" ? (
            <span className="badge bg-primary py-2 ">Contacted</span>
          ) : row.original.lead_status === "Qualified" ? (
            <span className="badge bg-success py-2">Qualified</span>
          ) : row.original.lead_status === "Negotiation" ? (
            <span className="badge bg-warning py-2">Negotiation</span>
          ) : row.original.lead_status === "Closed" ? (
            <span className="badge bg-danger py-2">Closed</span>
          ) : row.original.lead_status === "Win" ? (
            <span className="badge bg-success py-2">Win</span>
          ) : row.original.lead_status === "Junk" ? (
            <span className="badge bg-warning py-2">Junk</span>
          ) : row.original.lead_status === "Lost" ? (
            <span className="badge bg-danger  py-2">Lost</span>
          ) : (
            <span className="badge bg-warning fw-light ">Pending</span>
          ),
      },
      { accessorKey: "centerName", enableHiding: false, header: "Centre Name" },
      {
        accessorKey: "centerManager",
        enableHiding: false,
        header: "Centre Manager",
      },
      { accessorKey: "code", header: "Code", enableHiding: false, size: 40 },
      {
        accessorKey: "uenNumber",
        header: "UEN Number",
        enableHiding: false,
        size: 50,
      },
      { accessorKey: "email", enableHiding: false, header: "Email" },
      { accessorKey: "mobile", enableHiding: false, header: "Mobile" },
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
    fetchCenterManagerData(); // Fetch the center manager data as well
  }, []);

  // const debounce = (func, delay) => {
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => func(...args), delay);
  //   };
  // };

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/getCenterWithCustomInfo?${queryParams}`);
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
    },
  });

  const CustomIcon = () => <CiViewColumn />;

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
                placeholder="Center Name"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="code"
                value={filters.code}
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

          {storedScreens?.centerListingCreate && (
            <Link to="/center/add">
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
          <ThemeProvider theme={theme}>
            <MaterialReactTable
              columns={columns}
              data={data}
              icons={{
                ViewColumnIcon: CustomIcon,
              }}
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
            />
          </ThemeProvider>
        )}
      </div>
      <AddRegister
        id={selectedId}
        onSuccess="test"
        show={showModal}
        handelClose={handelClose}
      />
    </div>
  );
};

export default NewTable1;
