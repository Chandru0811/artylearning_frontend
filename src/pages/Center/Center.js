import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";
import api from "../../config/URL";
import { toast } from "react-toastify";
const columnHelper = createColumnHelper();

export default function Center() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getAllCenter");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching data: " + error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (val) =>
        val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const columns = [
    columnHelper.accessor(
      (_, rowIndex) => rowIndex + 1 + pageIndex * pageSize,
      {
        id: "index",
        header: () => (
          <span className="flex items-center text-nowrap">S.No</span>
        ),
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      }
    ),
    columnHelper.accessor("actions", {
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="dropdown text-center">
          <button
            className="btn btn-link p-0"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ textDecoration: "none", color: "black", fontSize: "20px" }}
          >
            &#8942;
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button className="dropdown-item">Edit</button>
            </li>
            <li>
              <button className="dropdown-item">Delete</button>
            </li>
            <li>
              <button className="dropdown-item">View</button>
            </li>
          </ul>
        </div>
      ),
    }),
    columnHelper.accessor("centerName", {
      header: "Center Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("centerManager", {
      header: "Center Manager",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("code", {
      header: "Code",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("uenNumber", {
      header: "UEN Number",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => <span className="flex items-center">Email</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: () => <span className="flex items-center">Address</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("mobile", {
      header: () => <span className="flex items-center">Mobile</span>,
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    pageCount: Math.ceil(filteredData.length / pageSize),
    state: {
      pagination: { pageIndex, pageSize },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="container my-4">
      {loading ? (
        <div className="loader-container">
          <div className="loading">Loading...</div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center">
          <p>No records found.</p>
        </div>
      ) : (
        <div className="card">
          <style>
            {`
  .table.table-bordered {
    border-collapse: collapse;
  }

  .table.table-bordered th, 
  .table.table-bordered td {
    border: none;
  }

  .table.table-bordered tr {
    border-bottom: 1px solid #dee2e6;
  }
`}
          </style>

          <div
            className="d-flex justify-content-between align-items-center p-1"
            style={{ background: "#edeef0" }}
          >
            <div class="d-flex align-items-center">
              <div class="d-flex">
                <div class="dot active"></div>
              </div>
              <span class="me-2">
                This Database Show at of your{" "}
                <span className="bold" style={{ color: "#287f71" }}>
                  Center
                </span>
              </span>
            </div>

            <div>
              <Link to="/center/add">
                <button
                  type="button"
                  className="btn btn-button btn-sm"
                  style={{ fontWeight: "600px !important" }}
                >
                  Add <i className="bx bx-plus"></i>
                </button>
              </Link>
            </div>
          </div>
          <div className="table-container">
            <div className="search-input p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3 searchInputG"
              />
            </div>
            <table className="table table-bordered">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        style={{ background: "#edeef0" }}
                        className="fw-medium text-secondary"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-start">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-controls mt-3">
              <button
                onClick={() => setPageIndex(0)}
                disabled={pageIndex === 0}
                className="btn border-0 mx-1"
              >
                <i className="fas fa-angle-double-left"></i>
              </button>
              <button
                onClick={() => setPageIndex(pageIndex - 1)}
                disabled={pageIndex === 0}
                className="btn border-0 mx-1"
              >
                <i className="fas fa-angle-left"></i>
              </button>
              <span>
                Page <strong>{pageIndex + 1}</strong> of{" "}
                <strong>{Math.ceil(filteredData.length / pageSize)}</strong>
              </span>
              <button
                onClick={() => setPageIndex(pageIndex + 1)}
                disabled={
                  pageIndex + 1 >= Math.ceil(filteredData.length / pageSize)
                }
                className="btn border-0 mx-1"
              >
                <i className="fas fa-angle-right"></i>
              </button>
              <button
                onClick={() =>
                  setPageIndex(Math.ceil(filteredData.length / pageSize) - 1)
                }
                disabled={
                  pageIndex + 1 >= Math.ceil(filteredData.length / pageSize)
                }
                className="btn border-0 mx-1"
              >
                <i className="fas fa-angle-double-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
