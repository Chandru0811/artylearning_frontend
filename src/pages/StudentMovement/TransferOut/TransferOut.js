import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";

const TransferOut = () => {
  const [filters, setFilters] = useState({
    centerName: "",
    transferTo: "",
    studentName: "",
  });

  const [actions, setActions] = useState({
    1: "approved",
    2: "rejected",
  });

  const data = [
    {
      id: 1,
      centerName: "Center A",
      transferTo: "Center B",
      studentId: "S001",
      studentName: "John Doe",
      currentCourse: "Math",
      currentClass: "10th Grade",
      lastLessonDate: "2024-12-15",
      preferDays: "Monday, Wednesday",
      centreRemark: "Good progress",
      createdBy: "Admin",
      createdAt: "2024-12-01",
      updatedBy: "Manager",
      updatedAt: "2024-12-10",
    },
    {
      id: 2,
      centerName: "Center C",
      transferTo: "Center D",
      studentId: "S002",
      studentName: "Jane Smith",
      currentCourse: "Science",
      currentClass: "9th Grade",
      lastLessonDate: "2024-12-14",
      preferDays: "Tuesday, Thursday",
      centreRemark: "Excellent",
      status: "Active",
      createdBy: "Teacher",
      createdAt: "2024-12-02",
      updatedBy: "Admin",
      updatedAt: "2024-12-12",
    },
  ];

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
        Cell: ({ cell }) => <IconButton></IconButton>,
      },
      {
        accessorKey: "action",
        header: "Action",
        Cell: ({ row }) =>
          row.original.status === "APPROVED" ? (
            <span className="badge bg-success fw-light">Approved</span>
          ) : (
            <span className="badge bg-danger fw-light">Rejected</span>
          ),
      },
      { accessorKey: "centerName", enableHiding: false, header: "Centre Name" },
      {
        accessorKey: "transferTo",
        enableHiding: false,
        header: "Transfer To",
      },
      {
        accessorKey: "studentId",
        header: "Student ID",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "studentName",
        header: "Student Name",
        enableHiding: false,
        size: 50,
      },
      {
        accessorKey: "currentCourse",
        enableHiding: false,
        header: "Current Course",
      },
      {
        accessorKey: "currentClass",
        enableHiding: false,
        header: "Current Class",
      },
      {
        accessorKey: "lastLessonDate",
        enableHiding: false,
        header: "Last Lesson Date",
      },
      { accessorKey: "preferDays", enableHiding: false, header: "Prefer Days" },
      {
        accessorKey: "centreRemark",
        enableHiding: false,
        header: "Centre Remark",
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
    [actions]
  );

  const toggleAction = (id) => {
    setActions((prevActions) => ({
      ...prevActions,
      [id]: prevActions[id] === "approved" ? "rejected" : "approved",
    }));
  };

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      centerName: "",
      transferTo: "",
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
          &nbsp;Student Movement
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Transfer Out
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>Transfer Out</strong>
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
                name="centerName"
                value={filters.centerName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Centre"
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
          </div>
        </div>
        {/* {loading ? (
          <div className="loader-container">
            <div className="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : ( */}
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
        {/* )} */}
      </div>
    </div>
  );
};

export default TransferOut;
