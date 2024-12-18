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
import fetchAllLevelsWithIds from "../List/LevelList";
import fetchAllSubjectsWithIds from "../List/SubjectList";
import { toast } from "react-toastify";

const Course = () => {
  const [filters, setFilters] = useState({
    centerId: "",
    courseName: "",
    courseCode: "",
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subjectData, setSubjectData] = useState(null);
  const [levelData, setLevelData] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const centerLocalId = localStorage.getItem("centerId");
  const [centerData, setCenterData] = useState([]);
  const [centerId, setCenterId] = useState("");
  const [code, setCode] = useState("");
  const [course, setCourse] = useState("");
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
        accessorFn: (row) => row.centers?.[0]?.centerName,
        enableHiding: false,
        header: "Center Name",
      },
      { accessorKey: "levelId", enableHiding: false, header: "Level" },
      {
        accessorKey: "courseName",
        enableHiding: false,
        header: "Course Name",
      },
      {
        accessorKey: "courseCode",
        enableHiding: false,
        header: "Course Code",
      },
      {
        accessorKey: "subjectId",
        enableHiding: false,
        header: "Subject",
      },
      {
        accessorKey: "courseType",
        enableHiding: false,
        header: "Course Type",
      },
      {
        accessorKey: "minClassSize",
        enableHiding: false,
        header: "Min Class size",
      },
      {
        accessorKey: "maxClassSize",
        enableHiding: false,
        header: "Maximum Class size",
      },
      {
        accessorKey: "status",
        enableHiding: false,
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

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await api.get(`/getCourseWithCustomInfo?${queryParams}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const refreshData = async () => {
    try {
      const centers = await fetchAllCentersWithIds();
      if (centerLocalId) {
        setCenterId(centerLocalId);
      } else if (centers.length > 0) {
        setCenterId(centers[0].id);
      }
      setCenterData(centers);
    } catch (error) {
      toast.error(`Error loading centers: ${error.message}`);
    }
  };

  // useEffect(() => {
  //   if (centerData.length > 0) {
  //     const defaultCenterId = centerData[0].id;
  //     setCenterId(defaultCenterId);
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       centerId: defaultCenterId,
  //     }));
  //   }
  // }, [centerData]);

  const fetchSubData = async () => {
    try {
      const subjects = await fetchAllSubjectsWithIds();
      const levels = await fetchAllLevelsWithIds();
      setSubjectData(subjects);
      setLevelData(levels);
    } catch (error) {
      toast.error(`Error loading additional data: ${error.message}`);
    }
  };

  useEffect(() => {
    refreshData();
    fetchSubData();
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const clearFilter = () => {
    setFilters({
      centerId: "",
      courseName: "",
      courseCode: "",
    });
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container my-4 center">
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
            <div className="form-group mb-0 ms-2 mb-1">
              <select
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
              </select>
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
              >
                Course Fees
              </MenuItem>
              <MenuItem
                onClick={() => navigate(`/course/coursedeposit/${selectedId}`)}
              >
                Course Deposit Fees
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate(`/course/curriculumoutlet/${selectedId}`)
                }
              >
                Curriculum Outlet
              </MenuItem>
              {/* <MenuItem onClick={() => navigate(`/course/view/${selectedId}`)}>
                View
              </MenuItem> */}
              <MenuItem onClick={() => navigate(`/course/edit/${selectedId}`)}>
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCourse/${selectedId}`}
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

export default Course;
