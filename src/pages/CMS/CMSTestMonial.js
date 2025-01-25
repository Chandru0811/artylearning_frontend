import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
import CMSTestMonialAdd from "./CMSTestMonialAdd";
import CMSTestMonialEdit from "./CMSTestMonialEdit";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import GlobalDelete from "../../components/common/GlobalDelete";

const CMSTestMonail = () => {
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getTestimonial = async () => {
    try {
      const response = await api.get("/getAllTestimonialSave");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };
  useEffect(() => {
    getTestimonial();
  }, []);

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
              setMenuAnchor(e.currentTarget);
              setSelectedId(cell.getValue());
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "parentImage",
        enableHiding: false,
        header: "Parent Image",
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
        accessorKey: "parentDescription",
        enableHiding: false,
        header: "Parent Description",
        size: 50,
      },
      {
        accessorKey: "parentName",
        header: "Parent Name",
        enableHiding: false,
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

  const testimonialPublish = async () => {
    try {
      const response = await api.post("/publishTestimonial");

      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error("Error refreshing data:", error);
    }
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container-fluid center p-0">
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
          Content Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Testimonial
        </li>
      </ol>

      <div className="container-fluid">
        <div className="card ">
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
                  Testimonial
                </span>
              </span>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row p-1">
              <div className="col-md-6 col-12">
                {/* <h4>Testimonial</h4> */}
              </div>
              <div className="col-md-6 col-12 d-flex justify-content-end">
                {storedScreens?.testimonialCreate && (
                  <CMSTestMonialAdd onSuccess={getTestimonial} />
                )}
                {storedScreens?.testimonialIndex && (
                  <button
                    onClick={testimonialPublish}
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
                <MenuItem>
                  <CMSTestMonialEdit
                    onSuccess={getTestimonial}
                    id={selectedId}
                    handleMenuClose={handleMenuClose}
                  />
                </MenuItem>
                <MenuItem>
                  <GlobalDelete
                    path={`/deleteTestimonialSave/${selectedId}`}
                    onDeleteSuccess={getTestimonial}
                    onOpen={handleMenuClose}
                  />
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CMSTestMonail;
