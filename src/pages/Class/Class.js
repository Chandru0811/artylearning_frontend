import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import fetchAllCentersWithIds from "../List/CenterList";
import GlobalDelete from "../../components/common/GlobalDelete";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";

const Class = () => {
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    centerId: "",
    courseId: "",
    classCode: "",
    userId: "",
    classType: "",
  });
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [centerData, setCenterData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
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
      { accessorKey: "centerName", header: "Center Name", enableHiding: false },
      { accessorKey: "courseName", header: "Course Name", enableHiding: false },
      { accessorKey: "classCode", header: "Class Code", enableHiding: false },
      { accessorKey: "className", header: "Class Name", enableHiding: false },
      { accessorKey: "classType", header: "Class Type", enableHiding: false },
      {
        accessorKey: "teacherName",
        header: "Teacher Name",
        enableHiding: false,
      },
      {
        accessorKey: "durationInHrs",
        header: "Duration (Hrs)",
      },
      {
        accessorKey: "durationInMins",
        header: "Duration (Mins)",
      },
      { accessorKey: "startDate", header: "Start Date" },
      { accessorKey: "startTime", header: "Start Time" },
      { accessorKey: "endDate", header: "End Date" },
      { accessorKey: "endTime", header: "End Time" },
      { accessorKey: "day", header: "Day" },
      { accessorKey: "remark", header: "Remark" },
      {
        accessorKey: "createdBy",
        header: "Created By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        Cell: ({ cell }) => cell.getValue() || "",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
    ],
    []
  );

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

  const getClassData = async () => {
    try {
      const filteredFilters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
      );

      const queryParams = new URLSearchParams(filteredFilters).toString();
      const response = await api.get(`/getClassWithCustomInfo?${queryParams}`);
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data : ", error);
    }
  };

  const fetchData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerLocalId !== null && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
        fetchListData(centerLocalId);
      } else if (centerData !== null && centerData.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
        fetchListData(centerData[0].id);
      }
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
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
      classCode: "",
      userId: "",
      classType: "",
    });
    getClassData();
  };

  useEffect(() => {
    fetchData(); // Fetch the center manager data as well
  }, []);

  useEffect(() => {
    getClassData();
  }, [filters]);

  const fetchListData = async (centerId) => {
    try {
      const courseDatas = await fetchAllCoursesWithIdsC(centerId);
      const teacherDatas = await fetchAllTeacherListByCenter(centerId);
      setTeacherData(teacherDatas);
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

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container my-4 center">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          &nbsp;Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Class
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
                Class
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                name="centerId"
                style={{ width: "100%" }}
                onChange={handleFilterChange}
                value={filters.centerId}
              >
                <option value="">All Center</option>
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
                name="classCode"
                className="form-control form-control-sm center_list"
                style={{ width: "100%" }}
                placeholder="Class Code"
                onChange={handleFilterChange}
                value={filters.classCode}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                style={{ width: "100%" }}
                name="userId"
                onChange={handleFilterChange}
                value={filters.userId}
              >
                <option selected>Select a Teacher</option>
                {teacherData &&
                  teacherData.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.teacherNames}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="individual_fliters d-lg-flex mt-2">
              <div className="form-group mb-0 ms-2 mb-1">
                <select
                  className="form-select form-select-sm center_list"
                  name="classType"
                  style={{ width: "100%" }}
                  onChange={handleFilterChange}
                  value={filters.classType}
                >
                  <option selected>Select Class Type</option>
                  <option value="Group">Group</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className="form-group mb-0 ms-2 mb-1 ">
                <button
                  type="button"
                  className="btn btn-sm btn-border"
                  onClick={clearFilters}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="me-2">
              {storedScreens?.documentListingCreate && (
                <Link to="/class/add">
                  <button type="button" className="btn btn-button btn-sm">
                    Add <i className="bx bx-plus"></i>
                  </button>
                </Link>
              )}
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
                data={datas}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    centerName: true,
                    courseName: true,
                    classCode: true,
                    className: true,
                    classType: true,
                    teacherName: true,
                    durationInHrs: false,
                    durationInMins: false,
                    startDate: false,
                    startTime: false,
                    endDate: false,
                    endTime: false,
                    day: false,
                    remark: false,
                    createdBy: false,
                    createdAt: false,
                    updatedBy: false,
                    updatedAt: false,
                  },
                }}

                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => navigate(`/class/view/${row.original.id}`),
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
              {/* <MenuItem onClick={() => navigate(`/class/view/${selectedId}`)}>
                View
              </MenuItem> */}
              <MenuItem onClick={() => navigate(`/class/edit/${selectedId}`)}>
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCourseClassListing/${selectedId}`}
                  onDeleteSuccess={getClassData}
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

export default Class;
