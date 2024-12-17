import React, { useEffect, useMemo, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";

import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { toast } from "react-toastify";
import profile from "../../assets/images/profile.png";
import CMSProductsItemAdd from "./CMSProductsitemAdd";
import CMSProductsItemEdit from "./CMSProductsItemEdit";
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
import { MdOutlineModeEdit } from "react-icons/md";
import GlobalDelete from "../../components/common/GlobalDelete";

const CMSProductsItem = () => {
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const getData = async () => {
    try {
      const response = await api.get("/getAllProductImageSaves");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
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
        accessorKey: "image",
        enableHiding: false,
        header: "Image Upload",
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
        accessorKey: "imageDetails",
        enableHiding: false,
        header: "Image Details",
        size: 50,
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

  const PublishProductImageSection = async () => {
    try {
      const response = await api.post(`/publishProductImageSave`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <div className="container center p-0">
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
          Product Item
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
                Product Item
              </span>
            </span>
          </div>
        </div>
        <div className="container cms-header shadow-sm py-2 mb-5">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Product Item</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.productImageSaveCreate && (
              <CMSProductsItemAdd onSuccess={getData} />
            )}
            {storedScreens?.productImageSavePublish && (
              <button
                type="button"
                className="btn btn-sm custom-outline-danger border ms-2"
                onClick={PublishProductImageSection}
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
                <CMSProductsItemEdit getData={getData} id={selectedId} />
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteProductImageSaves/${selectedId}`}
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

export default CMSProductsItem;
