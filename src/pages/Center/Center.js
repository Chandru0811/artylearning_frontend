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
import { BiEditAlt } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import Delete from "../../components/common/Delete";
import { FaEye } from "react-icons/fa";
const columnHelper = createColumnHelper();

export default function Center() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [centerName, setCenterName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const refreshData = async () => {
    try {
      const response = await api.get("/getAllCenter");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching data: " + error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshData();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      (!centerName ||
        item.centerName?.toLowerCase().includes(centerName.toLowerCase())) &&
      (!code || item.code?.toLowerCase().includes(code.toLowerCase())) &&
      (!email || item.email?.toLowerCase().includes(email.toLowerCase())) &&
      (!address || item.address?.toLowerCase().includes(address.toLowerCase()))
    );
  });

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
      cell: (info) => {
        const rowId = info.row.original.id;
        return (
          <div className="dropdown text-center">
            <button
              className="btn btn-link p-0"
              type="button"
              id={`dropdownMenuButton-${rowId}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
              }}
            >
              &#8942;
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby={`dropdownMenuButton-${rowId}`}
            >
              <li className="dropdown">
                <button
                  className="btn dropdown-toggle w-100 text-start"
                  type="button"
                  id={`nestedDropdownMenuButton-${rowId}`}
                  aria-expanded="false"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  <BsThreeDotsVertical /> Others
                </button>
                <ul
                  className="dropdown-menu dropdown-hover"
                  aria-labelledby={`nestedDropdownMenuButton-${rowId}`}
                >
                  <li>
                    <AddRegister id={rowId} onSuccess={refreshData} />
                  </li>
                  <li>
                    <AddBreak id={rowId} onSuccess={refreshData} />
                  </li>
                  <li>
                    <AddClass id={rowId} onSuccess={refreshData} />
                  </li>
                  <li>
                    <AddPackage id={rowId} onSuccess={refreshData} />
                  </li>
                </ul>
              </li>
              <li>
                <Link to={`/center/edit/${rowId}`} className="dropdown-item">
                  <BiEditAlt /> Edit
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() =>
                    Delete({
                      onSuccess: refreshData,
                      path: `/deleteCenter/${rowId}`,
                    })
                  }
                >
                  Delete
                </button>
              </li>
              <li>
                <Link to={`/center/view/${rowId}`} className="dropdown-item">
                  <FaEye /> View
                </Link>
              </li>
            </ul>
          </div>
        );
      },
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
      header: "UEN",
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
            <div className="search-input p-2 d-flex gap-2">
              <input
                type="text"
                placeholder="Center Name"
                value={centerName}
                onChange={(e) => setCenterName(e.target.value)}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
              <button
                className="btn btn-border"
                onClick={() => {
                  setCenterName("");
                  setCode("");
                  setEmail("");
                  setAddress("");
                }}
              >
                Clear
              </button>
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
                      <td key={cell.id} className="fw-medium text-dark">
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
