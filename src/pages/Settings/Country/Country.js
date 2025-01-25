import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../config/URL";
import CountryAdd from "./CountryAdd";
import CountryEdit from "./CountryEdit";
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

const Country = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getData = async () => {
    try {
      const response = await api.get("/getAllCountrySetting");
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
      {
        accessorKey: "country",
        enableHiding: false,
        header: "Country",
        size: 20,
      },
      {
        accessorKey: "nationality",
        enableHiding: false,
        header: "Nationality",
        size: 20,
      },
      {
        accessorKey: "citizenship",
        enableHiding: false,
        header: "Citizenship",
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
          &nbsp;Country & Nationality
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
                Country & Nationality
              </span>
            </span>
          </div>
        </div>
        {/* <div className="d-flex justify-content-end align-items-center">
          <span>
            <CountryAdd onSuccess={getData} />
          </span>
        </div> */}
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
            {/* <MenuItem>
              <CountryEdit onSuccess={getData} id={selectedId} handleMenuClose={handleMenuClose}/>
            </MenuItem> */}
            <MenuItem>
              <GlobalDelete
                path={`/deleteCountrySetting/${selectedId}`}
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

export default Country;
