import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import GlobalDelete from "../../../components/common/GlobalDelete";
import { MaterialReactTable } from "material-react-table";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import CourseFeesAdd from "./CourseFeesAdd";
import CourseFeesEdit from "./CourseFeesEdit";
import fetchAllPackageList from "../../List/PackageList";

const CourseFees = () => {
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taxData, setTaxData] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [centerId, setCenterId] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 30,
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
            <span className="badge badges-Green fw-light">Active</span>
          ) : row.original.status === "In Active" ||
            row.original.status === "Inactive" ||
            row.original.status === "string" ? (
            <span className="badge badges-orange fw-light">In Active</span>
          ) : null,
      },
      {
        accessorKey: "packageName",
        enableHiding: false,
        header: "Package Name",
      },
      {
        accessorKey: "weekdayFee",
        enableHiding: false,
        header: "Weekday Fees",
      },
      {
        accessorKey: "weekendFee",
        enableHiding: false,
        header: "WeekEnd Fees",
      },
      {
        accessorKey: "taxType",
        enableHiding: false,
        header: "Tax Type",
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

  const handleMenuClose = () => setMenuAnchor(null);

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

  const fetchPackageData = async () => {
    try {
      const packageData = await fetchAllPackageList();
      setPackageData(packageData);
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getCourseFeesByCourseId/${id}`);
      if (response.status === 200 || response.status === 204) {
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
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCoursesById/${id}`);

        if (response.status === 200 || response.status === 204) {
          console.log("course id", response.data);
          setCenterId(response.data.centers);
        }
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    fetchTaxData();
    fetchPackageData();
  }, []);

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
        <li className="breadcrumb-item active" aria-current="page">
          Course Fee
        </li>
      </ol>

      <div className="card">
        <div
          style={{ background: "#f5f7f9" }}
          className="d-flex justify-content-between align-items-center px-2"
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">
              This database shows the list of{" "}
              <span className="bold" style={{ color: "#287f71" }}>
                Course Fees
              </span>
            </span>
          </div>
          <span>
            <CourseFeesAdd onSuccess={getData} centerId={centerId} />
          </span>
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
              />
            </ThemeProvider>
            <Menu
              id="action-menu"
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem>
                <CourseFeesEdit
                  onSuccess={getData}
                  centerId={centerId}
                  id={selectedId}
                  handleMenuClose={handleMenuClose}
                />
              </MenuItem>

              <MenuItem>
                <GlobalDelete
                  path={`/deleteCourseFees/${selectedId}`}
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

export default CourseFees;
