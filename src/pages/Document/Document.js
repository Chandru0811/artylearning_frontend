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
import DocumentEdit from "./DocumentEdit";
import fetchAllClassesWithIdsC from "../List/ClassListByCourse";
import fetchAllCoursesWithIdsC from "../List/CourseListByCenter";
import fetchAllTeacherListByCenter from "../List/TeacherListByCenter";
import { toast } from "react-toastify";
import fetchAllCentersWithIds from "../List/CenterList";
import GlobalDelete from "../../components/common/GlobalDelete";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllTeachersWithIds from "../List/TeacherList";

const Document = ({ selectedCenter }) => {
  const [filters, setFilters] = useState({
    centerId: "",
    courseId: "",
    classId: "",
    userId: "",
    day: "",
    date: "",
  });
  const [data, setData] = useState([]);
  const [centerData, setCenterData] = useState([]);
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [courseData, setCourseData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);
  const [courseListData, setCourseListData] = useState([]);
  const [teacherListData, setTeacherListData] = useState([]);
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
      { accessorKey: "folderName", enableHiding: false, header: "Folder Name" },
      {
        accessorKey: "studentName",
        enableHiding: false,
        header: "Student Name",
      },
      {
        accessorKey: "user",
        enableHiding: false,
        header: "User Name",
      },
      {
        accessorKey: "course",
        header: "Course",
        enableHiding: false,
        size: 40,
      },
      {
        accessorKey: "classListing",
        header: "Class",
        enableHiding: false,
        size: 50,
      },
      { accessorKey: "batchTime", enableHiding: false, header: "Batch" },
      {
        accessorKey: "date",
        enableHiding: false,
        header: "Date",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "day",
        enableHiding: false,
        header: "Days",
      },
      { accessorKey: "user", enableHiding: false, header: "Teacher" },
      {
        accessorKey: "folderCategory",
        enableHiding: false,
        header: "Folder Category",
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

  const fetchListWithCenterIdData = async (centerId) => {
    try {
      const courseDatas = await fetchAllCoursesWithIdsC(centerId);
      const teacherDatas = await fetchAllTeacherListByCenter(centerId);
      setTeacherData(teacherDatas);
      setCourseData(courseDatas);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchListData = async () => {
    try {
      const courseAllListDatas = await fetchAllCoursesWithIds();
      const teacherAllListDatas = await fetchAllTeachersWithIds();
      setTeacherListData(teacherAllListDatas);
      setCourseListData(courseAllListDatas);
    } catch (error) {
      toast.error(error.message);
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
        fetchListWithCenterIdData(centerLocalId);
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
    fetchListData();
  }, [selectedCenter]);

  const handleCenterChange = async (event) => {
    const centerId = event.target.value;

    // Update the filters state
    setFilters((prevFilters) => ({ ...prevFilters, centerId }));

    if (centerId) {
      try {
        // Fetch the associated data
        const courseDatas = await fetchAllCoursesWithIdsC(centerId);
        const teacherDatas = await fetchAllTeacherListByCenter(centerId);

        // Update the respective state variables
        setCourseData(courseDatas);
        setTeacherData(teacherDatas);
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
      }
    } else {
      // Clear dependent data if no center is selected
      setCourseData([]);
      setTeacherData([]);
    }
  };

  const handleCourseChange = async (event) => {
    const courseId = event.target.value;
    setFilters((prevFilters) => ({ ...prevFilters, courseId })); // Update filter state
    try {
      const classes = await fetchAllClassesWithIdsC(courseId); // Fetch class list based on courseId
      setClassData(classes);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDocumentData = async () => {
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
        `/getDocumentFolderWithCustomInfo?${queryParams.toString()}`
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

  const clearFilter = () => {
    // Reset filter state to initial empty values
    setFilters({
      centerId: "",
      courseId: "",
      classId: "",
      userId: "",
      date: "",
      day: "",
    });

    // Fetch data without filters
    setIsClearFilterClicked(true); // Set flag to trigger data fetch without filters
  };

  useEffect(() => {
    getDocumentData();
  }, [filters, selectedCenter]);

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
          &nbsp;Document Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Document
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
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Document
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="individual_fliters d-lg-flex">
            <div className="form-group mb-0 mb-1">
              <input type="hidden" name="centerId" value={filters.centerId} />
              {/* <select
                className="form-select form-select-sm center_list"
                name="centerId"
                style={{ width: "100%" }}
                onChange={handleCenterChange}
                value={filters.centerId}
              >
                <option>Select the Centre</option>
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
                name="courseId"
                style={{ width: "100%" }}
                onChange={handleCourseChange}
                value={filters.courseId}
              >
                <option>Select the Course</option>
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
                name="classId"
                style={{ width: "100%" }}
                onChange={handleFilterChange}
                value={filters.classId}
              >
                <option>Select the Class</option>
                {classData &&
                  classData.map((classes) => (
                    <option key={classes.id} value={classes.id}>
                      {classes.classNames}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <select
                className="form-select form-select-sm center_list"
                name="userId"
                style={{ width: "100%" }}
                onChange={handleFilterChange}
                value={filters.userId}
              >
                <option>Select the Teacher</option>
                {selectedCenter === "0"
                  ? teacherListData &&
                    teacherListData.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.teacherNames}
                      </option>
                    ))
                  : teacherData &&
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
                  name="day"
                  style={{ width: "100%" }}
                  onChange={handleFilterChange}
                  value={filters.day}
                >
                  <option>Select a Day</option>
                  <option value="SUNDAY">Sunday</option>
                  <option value="MONDAY">Monday</option>
                  <option value="TUESDAY">Tuesday</option>
                  <option value="WEDNESDAY">Wednesday</option>
                  <option value="THURDAY">Thursday</option>
                  <option value="FRIDAY">Friday</option>
                  <option value="SATURDAY">Saturday</option>
                </select>
              </div>
              <div className="form-group mb-0 ms-2 mb-1 ">
                <button
                  type="button"
                  className="btn btn-sm btn-border"
                  onClick={clearFilter}
                >
                  Clear
                </button>
              </div>
            </div>
            {/* {storedScreens?.centerListingCreate && ( */}
            <Link to="/document/add">
              <button
                type="button"
                className="btn btn-button btn-sm me-2"
                style={{ fontWeight: "600px !important" }}
              >
                &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
              </button>
            </Link>
            {/* )} */}
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
                  onClick: () => navigate(`/document/view/${row.original.id}`),
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
              <MenuItem>
                <DocumentEdit
                  onSuccess={getDocumentData}
                  id={selectedId}
                  handleMenuClose={handleMenuClose}
                />
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteDocumentFolder/${selectedId}`}
                  onDeleteSuccess={getDocumentData}
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

export default Document;
