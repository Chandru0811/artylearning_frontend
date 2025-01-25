import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import Delete from "../../../components/common/Delete";
import { IoIosAddCircle } from "react-icons/io";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import GlobalDelete from "../../../components/common/GlobalDelete";

const Level = () => {
  const navigate = useNavigate();
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactedName, setContactedName] = useState("");
  const [messageData, setMessageData] = useState("");
  const [email, setEmail] = useState("");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  // console.log("data",datas)
  // const clearFilters = () => {
  //   setContactedName("");
  //   setMessageData("");
  //   setEmail("");

  //   $(tableRef.current).DataTable().search("").draw();
  // };

  const getData = async () => {
    try {
      const response = await api.get("/getAllContactUs");
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

  // new table
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
      // {
      //   accessorKey: "id",
      //   header: "",
      //   enableHiding: false,
      //   enableSorting: false,
      //   size: 20,
      //   Cell: ({ cell }) => (
      //     <IconButton
      //       onClick={(e) => {
      //         setMenuAnchor(e.currentTarget);
      //         setSelectedId(cell.getValue());
      //       }}
      //     >
      //       <MoreVertIcon />
      //     </IconButton>
      //   ),
      // },
      { accessorKey: "name", enableHiding: false, header: "Name" },
      {
        accessorKey: "email",
        enableHiding: false,
        header: "Email",
      },
      { accessorKey: "message", header: "Message", enableHiding: false },
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
    },
  });
  const handleMenuClose = () => setMenuAnchor(null);
  return (
    <div className="container-fluid my-4 center">
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
          Lead Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Contact
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
                Contact
              </span>
            </span>
          </div>
        </div>
        {/* <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Name"
                value={contactedName}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setContactedName(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1">
              <input
                type="text"
                className="form-control form-control-sm center_list"
                style={{ width: "160px" }}
                placeholder="Message"
                value={messageData}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  setMessageData(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-0 ms-2 mb-1 ">
              <button
                type="button"
                className="btn btn-sm btn-border"
                // onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div> */}
        {loading ? (
          <div className="loader-container">
            <div className="loading">
              <span></span>
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
              {/* <MenuItem onClick={() => navigate(`/view/${selectedId}`)}>
                View
              </MenuItem>
              <MenuItem onClick={() => navigate(`/edit/${selectedId}`)}>
                Edit
              </MenuItem> */}
              {/* {storedScreens?.centerListingDelete && (
              <MenuItem>
                <GlobalDelete
                  path={`/deleteContactUs/${selectedId}`}
                  onDeleteSuccess={getData}
                />
              </MenuItem>)} */}
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default Level;
