import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { MaterialReactTable } from "material-react-table";
import {
  ThemeProvider,
  createTheme,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import GlobalDelete from "../../components/common/GlobalDelete";
import ReferalFeesAdd from "./ReferalFeesAdd";
import ReferalFeesEdit from "./ReferalFeesEdit";
import fetchAllCentersWithIds from "../List/CenterList";
import { toast } from "react-toastify";

const ReferalFees = ({ selectedCenter }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [centerId, setCenterId] = useState("");
  const [isClearFilterClicked, setIsClearFilterClicked] = useState(false);
  const [centerData, setCenterData] = useState([]);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const centerLocalId = localStorage.getItem("selectedCenterId");
  const [filters, setFilters] = useState({
    centerId: "",
  });

  console.log("selectedCenter", selectedCenter);

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: true,
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "id",
        header: "",
        enableHiding: true,
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
        accessorKey: "status",
        enableHiding: true,
        header: "Status",
        Cell: ({ row }) =>
          row.original.status === "ACTIVE" ? (
            <span className="badge badges-Green fw-light">Active</span>
          ) : (
            <span className="badge badges-Red fw-light">Inactive</span>
          ),
      },
      { accessorKey: "center", enableHiding: true, header: "Centre Name" },
      {
        accessorKey: "effectiveDate",
        enableHiding: true,
        header: "Effective Date",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "referralFee",
        header: "Referal fee",
        enableHiding: true,
        size: 40,
      },
      { accessorKey: "createdBy", enableHiding: true, header: "Created By" },
      {
        accessorKey: "createdAt",
        enableHiding: true,
        header: "Created Date",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      {
        accessorKey: "updatedBy",
        header: "Updated By",
        enableHiding: true,
        Cell: ({ cell }) => cell.getValue() || "",
      },
      // {
      //   accessorKey: "createdAt",
      //   header: "Created At",
      //   Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      // },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10) || "",
      },
    ],
    []
  );

  const fetchReferalData = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (!isClearFilterClicked) {
        // Only append centerId if it's NOT 0
        if (filters.centerId && filters.centerId !== "0") {
          queryParams.append("centerId", filters.centerId);
        } else if (
          centerLocalId &&
          centerLocalId !== "undefined" &&
          centerLocalId !== "0"
        ) {
          queryParams.append("centerId", centerLocalId);
        }
      }
      // Loop through other filters and add key-value pairs if they have a value
      for (let key in filters) {
        if (filters[key] && key !== "centerId") {
          queryParams.append(key, filters[key]);
        }
      }

      const response = await api.get(
        `/getReferralFeeByCenterId?${queryParams.toString()}`
      );
      setData(response.data);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    } finally {
      setLoading(false);
      setIsClearFilterClicked(false);
    }
  };

  const fetchCenterData = async () => {
    try {
      const centerData = await fetchAllCentersWithIds();
      if (centerLocalId !== null && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
      } else if (centerData !== null && centerData.length > 0) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
      }
      setCenterData(centerData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCenterData(); // Fetch center data and subjects

      // Check if local storage has center ID
      if (centerLocalId && centerLocalId !== "undefined") {
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerLocalId,
        }));
      } else if (centerData && centerData.length > 0) {
        // Use the first center's ID as the default if no center is in local storage
        setFilters((prevFilters) => ({
          ...prevFilters,
          centerId: centerData[0].id,
        }));
      }
    };
    fetchData();
  }, [selectedCenter]);

  useEffect(() => {
    fetchReferalData();
  }, [filters, selectedCenter]);

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

  const clearFilter = () => {
    localStorage.removeItem("selectedCenterId"); // Clear center ID from local storage
    setFilters({
      centerId: "",
    });
    setCenterId(""); // Clear local state for center ID
    setIsClearFilterClicked(true); // Trigger fetch with no filters
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    console.log("null");
  };

  return (
    <div className="container-fluid px-2 my-4 center">
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
          &nbsp;Referal Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Referal Fees
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>Referal Fees</strong>
          </span>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="individual_fliters d-lg-flex ">
            <div className="form-group mb-0 mb-1">
              <input type="hidden" name="centerId" value={filters.centerId} />
            </div>
          </div>
          {storedScreens?.referalFeesCreate && (
            <ReferalFeesAdd onSuccess={fetchReferalData} />
          )}
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
                data={data}
                enableColumnActions={false}
                enableColumnFilters={false}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                initialState={{
                  columnVisibility: {
                    // createdAt: false,
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
              {storedScreens?.referalFeesUpdate && (
                <MenuItem>
                  <ReferalFeesEdit
                    id={selectedId}
                    onSuccess={fetchReferalData}
                    onOpen={handleMenuClose}
                  />
                </MenuItem>
              )}
              {storedScreens?.referalFeesDelete && (
                <MenuItem>
                  <GlobalDelete
                    path={`/deleteReferralFees/${selectedId}`}
                    onDeleteSuccess={fetchReferalData}
                    onOpen={handleMenuClose}
                  />
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default ReferalFees;
