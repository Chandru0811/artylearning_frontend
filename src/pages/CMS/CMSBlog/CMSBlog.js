import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import CMSBlogAdd from "./CMSBlogAdd";
import CMSBlogEdit from "./CMSBlogEdit";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import { MaterialReactTable } from "material-react-table";
import { createTheme, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import GlobalDelete from "../../../components/common/GlobalDelete";

const CMSBlog = () => {
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/getAllBlogSave");
      setDatas(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error Fetching Data: ", error.message);
    }
  };
  useEffect(() => {
    fetchData();
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
        accessorKey: "imagerOne",
        enableHiding: false,
        header: "Blog Image",
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
        accessorKey: "description",
        enableHiding: false,
        header: "Blog Description",
        size: 50,
      },
      {
        accessorKey: "title",
        header: " Blog Title",
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
    },
  });
  const blogsPublish = async () => {
    let isPublished = false;

    for (const data of datas) {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("title", data.title);
      formData.append("file", data.imagerOne);

      try {
        const response = await api.post("/publishBlogSave", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          isPublished = true; // Set flag if at least one blog is published successfully
        }
      } catch (error) {
        console.error("Error publishing blog:", error);
      }
    }

    // Show the toast only once after all blogs are processed
    if (isPublished) {
      toast.success("Blogs Published Successfully.");
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
          Blog
        </li>
      </ol>
      <div className="container cms-header shadow-sm py-2 mb-4">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>Blogs</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.testimonialCreate && (
              <CMSBlogAdd onSuccess={fetchData} />
            )}
            {storedScreens?.testimonialIndex && (
              <button
                onClick={blogsPublish}
                className="btn btn-sm btn-outline-danger border ms-2"
                style={{ whiteSpace: "nowrap" }}
              >
                Publish
              </button>
            )}
          </div>
        </div>
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
                Blog
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
              <MenuItem >
                <CMSBlogEdit onSuccess={fetchData} id={selectedId}/>
              </MenuItem>
              <MenuItem>
                <GlobalDelete
                  path={`/deleteBlogSave/${selectedId}`}
                  onDeleteSuccess={fetchData}
                />
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};

export default CMSBlog;
