import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MaterialReactTable } from "material-react-table";
import api from "../../../config/URL";
import { ThemeProvider, createTheme, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../../List/CenterList";
import fetchAllCoursesWithIdsC from "../../List/CourseListByCenter";

const ReplaceClassLesson = () => {
  const [filters, setFilters] = useState({
    centerId: "",
    studentName: "",
    studentUniqueId: "",
    courseId: "",
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centerData, setCenterData] = useState([]);
  const [courseData, setCourseData] = useState([]);

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
        accessorKey: "status",
        enableHiding: false,
        header: "Status",
        size: 50,
        Cell: ({ row }) =>
          row.original.status === "APPROVED" ? (
            <span className="badge bg-success fw-light">Approved</span>
          ) : row.original.status === "REJECTED" ? (
            <span className="badge bg-danger fw-light">Rejected</span>
          ) : (
            <span className="badge bg-warning fw-light">Pending</span>
          ),
      },
      {
        accessorKey: "centerName",
        enableHiding: false,
        header: "Centre Name",
      },
      {
        accessorKey: "studentName",
        enableHiding: false,
        header: "Student Name",
      },
      {
        accessorKey: "course",
        header: "Course",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "studentUniqueId",
        header: "Student Unique Id",
        enableHiding: false,
        size: 40,
      },
      { accessorKey: "month", header: "Month", enableHiding: false, size: 40 },
      {
        accessorKey: "className",
        header: "Class Listing",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "classDate",
        header: "Class Date",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "classCode",
        header: "Class Code",
        enableHiding: false,
        size: 50,
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
      const filteredFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
      );

      const queryParams = new URLSearchParams(filteredFilters).toString();
      const response = await api.get(
        `/getReplacementWithCustomInfo?${queryParams}`
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

  const getCenter = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getCenter();
  }, []);

  const fetchListData = async (centerId) => {
    try {
      const courseDatas = await fetchAllCoursesWithIdsC(centerId);
      setCourseData(courseDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (filters.centerId) {
      fetchListData(filters.centerId);
    }
  }, [filters]);

  // const handleStatusChange = async (id, newStatus) => {
  //   try {
  //     const response = await api.put(
  //       `/updateStatus/${id}?id=${id}&leaveStatus=${newStatus}`,
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     if (response.status === 200) {
  //       toast.success("Status updated successfully");
  //       setDatas((prevDatas) =>
  //         prevDatas.map((data) =>
  //           data.id === id ? { ...data, status: newStatus } : data
  //         )
  //       );
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     if (error.response?.status === 409) {
  //       toast.warning(error?.response?.data?.message);
  //     } else {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   }
  // };

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
      centerId: "",
      studentName: "",
      studentUniqueId: "",
      courseId: "",
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
          &nbsp;Student Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Replace Class Lesson List
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>
              Replace Class Lesson List
            </strong>
          </span>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                name="centerId"
                style={{ width: "100%" }}
                onChange={handleFilterChange}
                value={filters.centerId}
              >
                <option value="">Select Center</option>
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id} selected>
                    {center.centerNames}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                name="courseId"
                onChange={handleFilterChange}
                value={filters.courseId}
              >
                <option selected>Select a Course</option>
                {courseData &&
                  courseData.map((courseId) => (
                    <option key={courseId.id} value={courseId.id}>
                      {courseId.courseNames}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="studentUniqueId"
                value={filters.studentUniqueId}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Student Unique Id"
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
              />
            </ThemeProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default ReplaceClassLesson;
