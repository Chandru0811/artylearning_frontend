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

const OtherMessages = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  console.log("selectedMessage", selectedMessage);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await api.get(`/getAllMessagesOnlyTeachers`);
      setDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
        Cell: ({ row }) => (
          <IconButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent the row click event
              setMenuAnchor(e.currentTarget);
              setSelectedMessage(row.original);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
      {
        accessorKey: "senderName",
        header: "Sender Name",
        size: 20,
      },
      {
        accessorKey: "receiverName",
        header: "Receiver Name",
        size: 20,
      },
      {
        accessorKey: "message",
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
    },
  });

  const handleMenuClose = () => setMenuAnchor(null);

  // const handleViewClick = () => {
  //   navigate(
  //     `/othermessaging/view/${selectedMessage.receiverId}?senderId=${selectedMessage.senderId}`
  //   );
  // };

  const handleRowClick = (row) => {
    setSelectedMessage(row.original); // Set selectedMessage dynamically
    navigate(
      `/othermessaging/view/${row.original.receiverId}?senderId=${row.original.senderId}`
    );
  };

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
          <li className="breadcrumb-item active">Other Messages</li>
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
                  Other Messages
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
                muiTableBodyRowProps={({ row }) => ({
                  onClick: () => handleRowClick(row), // Pass the row object to the function
                  style: { cursor: "pointer" }, // Add pointer cursor for better UX
                })}
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
          {/* <MenuItem onClick={() => handleViewClick()}>View</MenuItem> */}
          <MenuItem>
            <GlobalDelete
              path={`/deleteMessage/${selectedMessage?.id}`}
              onDeleteSuccess={getData}
            />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default OtherMessages;
