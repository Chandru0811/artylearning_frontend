import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import Delete from "../../../components/common/Delete";
import api from "../../../config/URL";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import GlobalDelete from "../../../components/common/GlobalDelete";

const CmsCourses = () => {
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getAllCourses = async () => {
    try {
      const response = await api.get("/getAllCoursesSave");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

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
              setMenuAnchor(e.currentTarget);
              setSelectedId(cell.getValue());
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "menuLogo",
        enableHiding: true,
        header: "Menu Logo",
        size: 20,
        Cell: ({ cell }) => (
          <img
            src={cell.getValue()}
            alt="Blog"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
            // onError={(e) => (e.target.src = "path/to/placeholder-image.jpg")}
          />
        ),
      },
      {
        accessorKey: "menuTitle",
        enableHiding: true,
        header: "Menu Title",
        size: 50,
      },
      {
        accessorKey: "heading",
        header: " Heading",
        enableHiding: true,
        size: 40,
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

  const coursesPublish = async () => {
    try {
      const response = await api.post(`/publishCourses`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        getAllCourses();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };
  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container center p-0">
      <ol
        className="breadcrumb my-3 px-1"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Content Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Courses
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
                Course
              </span>
            </span>
          </div>
        </div>
        <div className="container">
          <div className="row p-1">
            <div className="col-md-6 col-12">{/* <h4>Courses</h4> */}</div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
              {storedScreens?.testimonialCreate && (
                <Link to={"/cms/CmsCourses/add"}>
                  <button type="button" className="btn btn-button btn-sm">
                    Add <i className="bx bx-plus"></i>
                  </button>
                </Link>
              )}
              {storedScreens?.testimonialIndex && (
                <button
                  onClick={coursesPublish}
                  className="btn btn-sm custom-outline-danger border ms-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Publish
                </button>
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

            <Menu
              id="action-menu"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => navigate(`/cms/CmsCourses/edit/${selectedId}`)}
                className="text-start mb-0 menuitem-style"
              >
                Edit
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteCoursesSave/${selectedId}`}
                  onDeleteSuccess={getAllCourses}
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

export default CmsCourses;
