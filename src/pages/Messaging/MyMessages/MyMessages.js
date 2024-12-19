import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import api from "../../../config/URL";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import {
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import GlobalDelete from "../../../components/common/GlobalDelete";

const MyMessages = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const id = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const getData = async () => {
    if (userName === "SMS_BRANCH_ADMIN") {
      try {
        const response = await api.get(`/getAllMessagesByAdminId/${id}`);
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await api.get(`/getAllMessagesByTeacherId/${id}`);
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "id",
        header: "",
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
        accessorKey: "senderName",
        header: "Student Name",
        size: 20,
      },
      {
        accessorKey: "receiverName",
        header: "Receiver Name",
        size: 20,
      },
      {
        accessorKey: "message",
        enableHiding: false,
        header: "Message",
        size: 20,
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
    <div>
      <div className="container my-3">
        <ol className="breadcrumb my-3 px-1">
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
          <li className="breadcrumb-item active">My Messages</li>
        </ol>
        <div className="card">
          <div
            className="mb-3 d-flex justify-content-between align-items-center p-1"
            style={{ background: "#f5f7f9" }}
          >
            <div className="d-flex align-items-center">
              <span className="me-2 text-muted">
                This database shows the list of{" "}
                <span className="bold" style={{ color: "#287f71" }}>
                  My Messages
                </span>
              </span>
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
          )}
        </div>
        <Menu
          id="action-menu"
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Link to={`/messaging/view/${selectedId}`}>
              <button className="btn btn-sm">
                <FaEye /> View
              </button>
            </Link>
          </MenuItem>
          <MenuItem>
            <GlobalDelete
              path={`/deleteMessage/${selectedId}`}
              onDeleteSuccess={getData}
            />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default MyMessages;
