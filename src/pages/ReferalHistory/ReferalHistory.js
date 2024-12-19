import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme, IconButton } from "@mui/material";

const ReferalHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    referByStudent: "",
    referByParent: "",
    studentName: "",
  });

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
        accessorKey: "referByStudent",
        enableHiding: false,
        header: "Refer By Student",
      },
      {
        accessorKey: "referByParent",
        enableHiding: false,
        header: "Refer By Parent",
      },
      {
        accessorKey: "studentName",
        header: "Student Name",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "referralFee",
        enableHiding: false,
        header: "Referal Fee",
        size: 30,
      },
      {
        accessorKey: "enrollDate",
        header: "Enroll Date",
        enableHiding: false,
        size: 50,
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },

      {
        accessorKey: "attendance",
        enableHiding: false,
        header: "Attendance",
        size: 30,
      },

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
      const response = await api.get("/getAllReferralHistory");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      referByStudent: "",
      referByParent: "",
      studentName: "",
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
          &nbsp;Referal Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Referal History
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>Referal History</strong>
          </span>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          {/* <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="referByStudent"
                value={filters.referByStudent}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Refer By Student"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="referByParent"
                value={filters.referByParent}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Refer By Parent"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="studentName"
                value={filters.studentName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Student Name"
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
          </div> */}
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
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                // muiTableBodyRowProps={({ row }) => ({
                //   onClick: () => navigate(`/center/view/${row.original.id}`),
                //   style: { cursor: "pointer" },
                // })}
              />
            </ThemeProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default ReferalHistory;
