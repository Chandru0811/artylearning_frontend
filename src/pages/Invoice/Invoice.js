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
import fetchAllCentersWithIds from "../List/CenterList";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllStudentListByCenter from "../List/StudentListByCenter";
import fetchAllPackageListByCenter from "../List/PackageListByCenter";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllStudentsWithIds from "../List/StudentList";
import fetchAllPackageList from "../List/PackageList";

const Invoice = ({ selectedCenter }) => {
  const [filters, setFilters] = useState({
    centerId: "",
    courseId: "",
    studentId: "",
    packageId: "",
  });
  const [centerData, setCenterData] = useState([]);
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [centerManagerData, setCenterManagerData] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [courseListData, setCourseListData] = useState([]);
  const [packageListData, setPackageListData] = useState([]);
  const [studentListData, setStudentListData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isClearFilterClicked, setIsClearFilterClicked] = useState(false);

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
        accessorKey: "invoiceStatus",
        enableHiding: true,
        header: "Status",
        Cell: ({ row }) => {
          const status = row.original.invoiceStatus?.trim().toUpperCase();

          return status === "PAID" ? (
            <span className="badge bg-success fw-light">Paid</span>
          ) : status === "CANCELLED" ? (
            <span className="badge bg-danger fw-light">Cancelled</span>
          ) : (
            <span className="badge bg-warning fw-light">Pending</span>
          );
        },
      },
      {
        accessorKey: "centerName",
        enableHiding: true,
        header: "Centre",
      },
      {
        accessorKey: "courseName",
        enableHiding: true,
        header: "Course",
      },
      {
        accessorKey: "studentUniqueId",
        enableHiding: true,
        header: "Student ID",
      },
      { accessorKey: "studentName", header: "Student" },
      { accessorKey: "parent", enableHiding: true, header: "Parent Name" },
      { accessorKey: "packageName", header: "Package" },
      {
        accessorKey: "invoiceNumber",
        header: "Invoice Number",
        enableHiding: true,
        size: 50,
      },
      {
        accessorKey: "invoiceDate",
        header: "Invoice Date",
        Cell: ({ cell }) => {
          const invoiceDate = cell.getValue();
          if (!invoiceDate) return "--";
          const date = new Date(invoiceDate).toLocaleDateString("en-GB");
          return date;
        },
      },

      { accessorKey: "noOfLessons", header: "Number Of Lesson" },
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

  const getInvoiceData = async () => {
    try {
      setLoading(true);
      // Dynamically construct query parameters based on filters
      const queryParams = new URLSearchParams();
      if (!isClearFilterClicked) {
        // Only append centerId if it's NOT 0
        if (filters.centerId && filters.centerId !== "0") {
          queryParams.append("centerId", filters.centerId);
        } else if (
          centerLocalId &&
          centerLocalId !== "undefined" &&
          centerLocalId !== "0"
        ) {
          queryParams.append("centerId", centerLocalId);
        }
      }

      // Loop through other filters and add key-value pairs if they have a value
      for (let key in filters) {
        if (filters[key] && key !== "centerId") {
          queryParams.append(key, filters[key]);
        }
      }

      const response = await api.get(
        `/getInvoiceWithCustomInfo?${queryParams.toString()}`
      );
      setData(response.data);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    } finally {
      setLoading(false);
      setIsClearFilterClicked(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      centerId: "",
      courseId: "",
      studentId: "",
      packageId: "",
    });
    getInvoiceData();
    setIsClearFilterClicked(true);
  };

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerLocalId !== null && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
      } else if (centerData !== null && centerData.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
      }
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCenterData(); // Fetch center data and subjects

      // Check if local storage has center ID
      if (centerLocalId && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
      } else if (centerData && centerData.length > 0) {
        // Use the first center's ID as the default if no center is in local storage
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
      }
    };
    fetchData();
  }, [selectedCenter]);

  const fetchListWithCenterIdData = async (centerId) => {
    try {
      const courseDatas = await fetchAllCoursesWithIdsC(centerId);
      const student = await fetchAllStudentListByCenter(centerId);
      const packageData = await fetchAllPackageListByCenter(centerId);
      setPackageData(packageData);
      setStudentData(student);
      setCourseData(courseDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchListData = async () => {
    try {
      const courseListDatas = await fetchAllCoursesWithIds();
      const studentList = await fetchAllStudentsWithIds();
      const packageListData = await fetchAllPackageList();
      setPackageListData(packageListData);
      setStudentListData(studentList);
      setCourseListData(courseListDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (filters.centerId) {
      fetchListWithCenterIdData(filters.centerId);
    } else {
      fetchListData();
    }
  }, [filters, selectedCenter]);

  useEffect(() => {
    getInvoiceData();
  }, [filters]);

  const handleMenuClose = () => {
    setMenuAnchor(null);
    console.log("null");
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
          &nbsp;Invoice and Payment
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Invoice
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>Invoice</strong>
          </span>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 mb-1">
              <input type="hidden" name="centerId" value={filters.centerId} />
              {/* <select
                className="form-select form-select-sm center_list"
                name="centerId"
                style={{ width: "100%" }}
                onChange={handleFilterChange}
                value={filters.centerId}
              >
                <option>Select the centre</option>
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id} selected>
                    {center.centerNames}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                name="courseId"
                onChange={handleFilterChange}
                value={filters.courseId}
              >
                <option value="" disabled>
                  Select a Course
                </option>
                {selectedCenter === "0"
                  ? courseListData &&
                    courseListData.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseNames}
                      </option>
                    ))
                  : courseData &&
                    courseData.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.courseNames}
                      </option>
                    ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                name="studentId"
                onChange={handleFilterChange}
                value={filters.studentId}
              >
                <option value="" disabled>
                  Select a Student
                </option>
                {selectedCenter === "0"
                  ? studentListData &&
                    studentListData.map((std) => (
                      <option key={std.id} value={std.id}>
                        {std.studentNames}
                      </option>
                    ))
                  : studentData &&
                    studentData.map((std) => (
                      <option key={std.id} value={std.id}>
                        {std.studentNames}
                      </option>
                    ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                name="packageId"
                onChange={handleFilterChange}
                value={filters.packageId}
              >
                <option value="" disabled>
                  Select a Package
                </option>
                {selectedCenter === "0"
                  ? packageListData &&
                    packageListData.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.packageNames}
                      </option>
                    ))
                  : packageData &&
                    packageData.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.packageNames}
                      </option>
                    ))}
              </select>
            </div>
            <div className="form-group mb-2 ms-2">
              <button
                type="button"
                className="btn btn-sm btn-border"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
          <Link to="/invoice/add">
            <button
              type="button"
              className="btn btn-button btn-sm me-2"
              style={{ fontWeight: "600px !important" }}
            >
              &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
            </button>
          </Link>
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

                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/invoice/view/${row.original.id}`),
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
                onClick={() => navigate(`/invoice/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteGenerateInvoice/${selectedId}`}
                  onDeleteSuccess={getInvoiceData}
                  onOpen={handleMenuClose}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Invoice;
