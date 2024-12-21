import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Delete from "../../../components/common/Delete";
import CMSContactAdd from "./CMSContactAdd";
import CMSContactEdit from "./CMSContactEdit";
import CMSContactView from "./CMSContactView";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";
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

const CMSContact = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getCenterData = async () => {
    try {
      const response = await api.get("/getAllContactUsSave");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };
  useEffect(() => {
    getCenterData();
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
        accessorKey: "centerName",
        enableHiding: false,
        header: "Centre Name",
        size: 20,
      },
      {
        accessorKey: "email",
        enableHiding: false,
        header: "Email",
        size: 50,
      },
      {
        accessorKey: "mobileNo",
        header: " Mobile No",
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

  const contactPublish = async () => {
    try {
      const response = await api.post("/publishContactUs");

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
    <div className="container center p-0">
      <div className="container cms-header shadow-sm py-2 mb-4">
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
            Contact Us
          </li>
        </ol>
   
      </div>
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
                Contact Us
              </span>
            </span>
          </div>
        </div>
        <div className="container">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            {/* <h4>Contact</h4> */}
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end gap-2">
            {storedScreens?.contactUsCreate && (
              <CMSContactAdd onSuccess={getCenterData} />
            )}
            {storedScreens?.contactUsPublish && (
              <button
                type="button"
                className="btn custom-outline-danger border d-flex align-items-center "
                onClick={contactPublish}
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
                <CMSContactView id={selectedId} handleMenuClose={handleMenuClose}/>
              </MenuItem>
              <MenuItem>
                <CMSContactEdit id={selectedId} onSuccess={getCenterData} handleMenuClose={handleMenuClose}/>
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteContactUsSavePublish/${selectedId}`}
                  onDeleteSuccess={getCenterData}
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

export default CMSContact;
