import React, { useEffect, useMemo, useRef, useState } from "react";
import SendNotificationAdd from "./SendNotificationAdd";
import SendNotificationEdit from "./SendNotificationEdit";
import api from "../../config/URL";
import Delete from "../../components/common/Delete";
import SendNotificationView from "./SendNotificationView";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { createTheme, IconButton, Menu, MenuItem } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import GlobalDelete from "../../components/common/GlobalDelete";

const SendNotification = () => {
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const [centerName, setCenterName] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getData = async () => {
    try {
      const response = await api.get("/getAllSmsPushNotifications");
      setDatas(response.data);
      console.log("message", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/sendnotification/view/${id}`);
  };
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
        accessorKey: "messageTitle",
        enableHiding: false,
        header: "Event Name",
        size: 20,
      },
      {
        accessorKey: "messageDescription",
        enableHiding: false,
        header: "Message",
        size: 20,
      },
      {
        accessorKey: "datePosted",
        enableHiding: false,
        header: "Created At",
        size: 20,
      },
      { accessorKey: "createdBy", header: "Created By" },
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
    },
  });

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container my-4">
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
          Messaging
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          School Announcement
        </li>
      </ol>
      <div className="d-flex justify-content-end mb-3"></div>
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
                School Announcement
              </span>
            </span>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-end">
          <div className="me-2">
            {storedScreens?.sendNotificationCreate && (
              <Link to="/sendNotification/add">
                <button type="button" className="btn btn-button btn-sm">
                  Add <i class="bx bx-plus"></i>
                </button>
              </Link>
            )}
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
                <Link to={`/sendNotification/view/${selectedId}`}>
                  <button className="btn btn-sm">
                    <FaEye /> View
                  </button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/sendNotification/edit/${selectedId}`}>
                  <button className="btn btn-sm">
                    <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
                  </button>
                </Link>
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteSmsPushNotifications/${selectedId}`}
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

export default SendNotification;
