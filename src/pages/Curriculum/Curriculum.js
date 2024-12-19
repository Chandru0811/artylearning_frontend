import React, { useEffect, useMemo, useState } from "react";
import CurriculumAdd from "./CurriculumAdd";
import CurriculumEdit from "./CurriculumEdit";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import fetchAllCoursesWithIds from "../List/CourseList";
import { toast } from "react-toastify";
import { MdViewColumn } from "react-icons/md";

import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import GlobalDelete from "../../components/common/GlobalDelete";

const Curriculum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async () => {
    try {
      const courseData = await fetchAllCoursesWithIds();
      setCourseData(courseData);
    } catch (error) {
      toast.error(error);
    }
  };

  const getData = async () => {
    try {
      const response = await api.get(
        `/getCourseCurriculumCodeCurriculumOutLetId/${id}`
      );
      if (response.status === 200) {
        setDatas(response.data);
      }
    } catch (error) {
      console.error("Error fetching data ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    fetchData();
  }, [id]);

  // ===New Table

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
        accessorKey: "status",
        enableHiding: false,
        header: "Status",
        Cell: ({ row }) =>
          row.original.status === "ACTIVE" ||
          row.original.status === "active" ||
          row.original.status === "Active" ? (
            <span
              className="badge badges-Green fw-light"
              // style={{ backgroundColor: "#287f71" }}
            >
              Active
            </span>
          ) : row.original.status === "In Active" ||
            row.original.status === "Inactive" ||
            row.original.status === "string" ? (
            <span
              className="badge badges-orange fw-light"
              // style={{ backgroundColor: "#eb862a" }}
            >
              In Active
            </span>
          ) : null,
      },
      { accessorKey: "lessonNo", enableHiding: false, header: "Lesson No" },
      {
        accessorKey: "curriculumCode",
        enableHiding: false,
        header: "Curriculum Code",
      },
      {
        accessorKey: "curriculumNo",
        header: "Curriculum Number",
        enableHiding: false,
        size: 50,
      },
      {
        accessorKey: "description",
        enableHiding: false,
        header: "Description",
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

  const handleMenuClose = () => setMenuAnchor(null);
  return (
    <div className="container-fluid">
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
          Course Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/course" className="custom-breadcrumb">
            Course
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to={`course/curriculumoutlet/${id}`} className="custom-breadcrumb"> 
          Curriculum Outlet
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Curriculum
        </li>
      </ol>
      <div className="card">
        <div
          style={{ background: "#f5f7f9" }}
          className="d-flex justify-content-between align-items-center px-2"
        >
          <div class="d-flex align-items-center">
            <div class="d-flex">
              <div class="dot active"></div>
            </div>
            <span class="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Curriculum
              </span>
            </span>
          </div>
          {storedScreens?.curriculumCreate && (
            <span>
              <CurriculumAdd
                onSuccess={getData}
                curriculumOutletId={id}
                courseId={courseId}
              />
            </span>
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
                data={datas}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    createdAt: false,
                    createdBy: false,
                    updatedAt: false,
                    updatedBy: false,
                  },
                }}
                // muiTableBodyRowProps={({ row }) => ({
                //   onClick: () =>
                //     navigate(`/center/view/${row.original.id}`),
                //   style: { cursor: "pointer" },
                // })}
              />
            </ThemeProvider>

            <Menu
              id="action-menu"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
              disableScrollLock
            >
              <MenuItem>
                {storedScreens?.curriculumUpdate && (
                  <CurriculumEdit
                    id={selectedId}
                    curriculumOutletId={id}
                    onSuccess={getData}
                    handleMenuClose={handleMenuClose}
                  />
                )}
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCourseCurriculumCode/${selectedId}`}
                  onDeleteSuccess={getData}
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

export default Curriculum;
