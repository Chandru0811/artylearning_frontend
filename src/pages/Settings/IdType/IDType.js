import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../../config/URL";
import Delete from "../../../components/common/Delete";
import IDTypeEdit from "./IDTypeEdit";
import IDTypeAdd from "./IDTypeAdd";
import { Link, useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
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

const IDType = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
    const [menuAnchor, setMenuAnchor] = useState(null);

  const getData = async () => {
    try {
      const response = await api.get("/getAllIdTypeSetting");
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
          accessorKey: "idType",
          enableHiding: false,
          header: "Id Type",
          size: 20,
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
      },
    });
  
    const handleMenuClose = () => setMenuAnchor(null);


  return (
    <div className="container-fluid my-4 center">
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
          &nbsp;Settings
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Id Type
        </li>
      </ol>
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
                Id Type
              </span>
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <span>
            <IDTypeAdd onSuccess={getData} />
          </span>
          {/* } */}
          {/* <p>        <button className="btn btn-light border-secondary mx-2" onClick={handleDataShow}>

          {extraData?"Hide":'Show'}
          <MdViewColumn className="fs-4 text-secondary"/>

        </button> </p> */}
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
              <IDTypeEdit onSuccess={getData} id={selectedId} handleMenuClose={handleMenuClose} />
            </MenuItem>
            <MenuItem>
              <GlobalDelete
                path={`/deleteIdTypeSetting/${selectedId}`}
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

export default IDType;
