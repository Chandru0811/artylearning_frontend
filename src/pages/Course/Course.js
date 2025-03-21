import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import GlobalDelete from "../../components/common/GlobalDelete";
import { MaterialReactTable } from "material-react-table";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

const Course = ({ selectedCenter }) => {
  const [filters, setFilters] = useState({
    centerId: selectedCenter,
    courseName: "",
    courseCode: "",
  });

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [centerData, setCenterData] = useState([]);
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
        accessorFn: (row) => row.centerName[0],
        enableHiding: true,
        header: "Center Name",
      },
      { accessorKey: "levelName", enableHiding: true, header: "Level" },
      {
        accessorKey: "courseName",
        enableHiding: true,
        header: "Course Name",
      },
      {
        accessorKey: "courseCode",
        enableHiding: true,
        header: "Course Code",
      },
      {
        accessorKey: "subjectName",
        enableHiding: true,
        header: "Subject",
      },
      {
        accessorKey: "courseType",
        enableHiding: true,
        header: "Course Type",
      },
      {
        accessorKey: "minClassSize",
        enableHiding: true,
        header: "Min Class size",
      },
      {
        accessorKey: "maxClassSize",
        enableHiding: true,
        header: "Maximum Class size",
      },
      {
        accessorKey: "status",
        enableHiding: true,
        header: "Status",
      },
      { accessorKey: "colorCode", header: "Color Code" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "durationInHrs", header: "Duration In Hrs" },
      { accessorKey: "durationInMins", header: "Duration In Mins" },
      {
        accessorKey: "replacementLessonStudentBuffer",
        header: "Replacement Lesson",
      },
      {
        accessorKey: "classReplacementAllowed",
        header: "Class Replacement Allowed",
        Cell: ({ row }) =>
          row.original.classReplacementAllowed ? (
            <span
              className=""
              // style={{ backgroundColor: "#287f71" }}
            >
              Yes
            </span>
          ) : (
            <span
              className=""
              // style={{ backgroundColor: "#eb862a" }}
            >
              No
            </span>
          ),
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
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

  const getData = async () => {
    try {
      setLoading(true);
      const filteredFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );
      const queryParams = new URLSearchParams();

      if (filteredFilters.centerId !== "0") {
        const effectiveCenterId = filteredFilters.centerId
          ? filteredFilters.centerId
          : centerLocalId &&
            centerLocalId !== "undefined" &&
            centerLocalId !== "0"
          ? centerLocalId
          : centerData.length > 0
          ? centerData[0].id
          : "";
        if (effectiveCenterId) {
          queryParams.append("centerId", effectiveCenterId);
        }
      }

      // Loop through other filters and add key-value pairs if they have a value
      for (let key in filters) {
        if (filters[key] && key !== "centerId") {
          queryParams.append(key, filters[key]);
        }
      }
      const endpoint = `/getCourseWithCustomInfo?${queryParams.toString()}`;
      const response = await api.get(endpoint);
      // const response = await api.get(`/getCourseWithCustomInfo?${queryParams}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    } finally {
      // setLoading(false);
      setIsClearFilterClicked(false);
    }
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
  useEffect(() => {
    setFilters((prev) => ({ ...prev, centerId: selectedCenter }));
  }, [selectedCenter]);
  useEffect(() => {
    getData();
  }, [filters]);

  const clearFilter = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      centerId: selectedCenter,
      courseName: "",
      courseCode: "",
    }));
    getData();
    setIsClearFilterClicked(true);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid my-4 center">
      <ol
        className="breadcrumb my-3 px-1"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            &nbsp;Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Course
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
              This database shows the list of
              <span className="bold" style={{ color: "#287f71" }}>
                Course
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3 px-2">
          <div className="individual_fliters d-lg-flex">
            <div className="form-group mb-0 mb-1">
              <input type="hidden" name="centerId" value={filters.centerId} />

              {/* <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                onChange={(e) => {
                  const { value } = e.target;
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    centerId: value,
                  }));
                  setCenterId(value);
                }}
                name="centerId"
                value={filters.centerId}
              >
                <option value="">All Center</option>
                {centerData?.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.centerNames}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                name="courseName"
                value={filters.courseName}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Course"
                autoComplete="off"
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Code"
                name="courseCode"
                value={filters.courseCode}
                onChange={handleFilterChange}
                autoComplete="off"
              />
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
          {storedScreens?.centerListingCreate && (
            <Link to="/course/add">
              <button
                type="button"
                className="btn btn-button btn-sm me-2"
                style={{ fontWeight: "600" }}
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
                    colorCode: false,
                    description: false,
                    durationInHrs: false,
                    replacementLessonStudentBuffer: false,
                    durationInMins: false,
                    classReplacementAllowed: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/course/view/${row.original.id}`),
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
                onClick={() => navigate(`/course/coursefees/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Course Fees
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/course/coursedeposit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Course Deposit Fees
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate(`/course/curriculumoutlet/${selectedId}`)
                }
                className="text-start mb-0 menuitem-style"
              >
                Curriculum Outlet
              </MenuItem>
              {/* <MenuItem onClick={() => navigate(`/course/view/${selectedId}`)}>
                View
              </MenuItem> */}
              <MenuItem
                onClick={() => navigate(`/course/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCourse/${selectedId}`}
                  onOpen={handleMenuClose}
                  onDeleteSuccess={getData}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Course;
