import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import { HiOutlineEye } from "react-icons/hi";
import Delete from "../../components/common/Delete";
import api from "../../config/URL";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleLine } from "react-icons/ri";
import { TbFilter } from "react-icons/tb";
import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";

const NewTable1 = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getAllCenter");
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "S.NO",
        cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
      },
      {
        accessorKey: "id",
        header: "ACTION",
        cell: (info) => (
          <>
            <div className="d-flex justify-content-center align-items-center">
              <div className="dropdown">
                <button
                  className="btn btn-light btn-sm "
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ boxShadow: "none" }}
                >
                  <SlOptionsVertical />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  {storedScreens?.centerListingRead && (
                    <li className="p-2">
                      <Link to={`/center/view/${info.getValue()}`}>
                        <FaEye className="me-2" />
                        View
                      </Link>
                    </li>
                  )}
                  {storedScreens?.centerListingUpdate && (
                    <li className="p-2">
                      <Link to={`/center/edit/${info.getValue()}`}>
                        <FaEdit className="me-2" />
                        Edit
                      </Link>
                    </li>
                  )}
                  {storedScreens?.centerListingDelete && (
                    <li className="p-2">
                      <Delete
                        onSuccess={refreshData}
                        path={`/deleteCenter/${info.getValue()}`}
                      />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </>
        ),
      },
      {
        accessorKey: "centerName",
        header: "Centre Name",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      },
      {
        accessorKey: "centerManager",
        header: "Centre Manager",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      },
      {
        accessorKey: "code",
        header: "Code",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      },
      {
        accessorKey: "uenNumber",
        header: "UEN Number",
        cell: (info) => <div className="text-center">{info.getValue()}</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: datas,
    columns,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanNextPage,
    getCanPreviousPage,
    nextPage,
    previousPage,
    setPageSize,
    getPageCount,
    getState,
  } = table;

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getAllCenter");
      setDatas(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container-fluid px-2 minHeight">
        <div className="card shadow border-0 mb-2 top-header">
          <div className="container-fluid py-4">
            <div className="row align-items-center justify-content-between">
              <div className="col">
                <h1 className="h4 ls-tight headingColor">New Table</h1>
              </div>
              <div className="col-auto">
                <button className="btn btn-sm btn-primary">
                  Add <FaPlus className="pb-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center p-2">
          <select
            value={getState().pagination.pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="form-select"
            style={{ width: "15%" }}
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="form-control w-25"
          />

          {/* Column Visibility Toggle */}
          <div className="dropdown">
            <button
              className="btn border-2 dropdown-toggle"
              type="button"
              id="columnDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <TbFilter className="fs-5" />
            </button>
            <ul className="dropdown-menu p-1" aria-labelledby="columnDropdown">
              <li>
                {table.getAllColumns().map((column) => (
                  <label key={column.id} className="me-2">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    />
                    {column.id}
                  </label>
                ))}
              </li>
            </ul>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow border-0 my-2">
          <div className="table-responsive p-2 minHeight">
            <table className="display table table-bordered">
              <thead className="text-center" style={{fontSize:"14px"}}>
                {getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {getRowModel().rows.map((row) => (
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
          </div>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn border-1 border-dark"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            <RiArrowLeftDoubleFill />
          </button>
          <span>
            Page {getState().pagination.pageIndex + 1} of {getPageCount()}
          </span>
          <button
            className="btn border-1 border-dark"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            <RiArrowRightDoubleLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTable1;
