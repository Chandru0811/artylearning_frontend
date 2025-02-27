import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
        size: 20,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "studentProfile",
        header: "Profile",
        size: 50,
        Cell: ({ cell }) => (
          <img
            src={cell.getValue()}
            alt="Student"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        accessorKey: "studentUniqueId",
        header: "Student ID",
        size: 100,
        Cell: ({ cell }) => <span style={{ fontWeight: "bold" }}>{cell.getValue()}</span>,
      },
      {
        accessorKey: "studentName",
        header: "Student Name",
        size: 150,
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      // {
      //   accessorKey: "message",
      //   enableHiding: false,
      //   header: "Message",
      //   size: 200,
      // },
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

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div>
      <div className="container-fluid my-3">
        <ol className="breadcrumb my-3 px-2">
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
                  muiTableBodyRowProps={({ row }) => ({
                    onClick: () => navigate(`/messaging/view/${row.original.id}`, {
                      state: {
                        studentId: row.original.studentId,
                        studentName: row.original.studentName,
                        studentRole: row.original.receiverRole,
                        studentUniqueId: row.original.studentUniqueId,
                      },
                    }),
                    style: { cursor: "pointer" },
                  })}
                  
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
                  <GlobalDelete
                    path={`/deleteMessage/${selectedId}`}
                    onDeleteSuccess={getData}
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

export default MyMessages;
