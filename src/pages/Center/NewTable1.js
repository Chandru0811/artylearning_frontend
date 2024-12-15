import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/URL";
import { MaterialReactTable } from "material-react-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { CiViewColumn } from "react-icons/ci";
import AddRegister from "./Add/AddRegister";
import AddBreak from "./Add/AddBreak";
import AddClass from "./Add/AddClass";
import AddPackage from "./Add/AddPackage";
import { MdOutlineModeEdit } from "react-icons/md";
import { Delete } from "@mui/icons-material";
const NewTable1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true, 
        size: 40,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      // {
      //   header: "Actions",
      //   enableSorting: false,
      //   size: 100,
      //   cell: ({ row }) => {
      //     const data = row.original;
      //     return (
      //       <div className="dropdown">
      //         <button
      //           className="btn btn-button btn-sm dropdown-toggle"
      //           type="button"
      //           data-bs-toggle="dropdown"
      //           aria-expanded="false"
      //         >
      //           {/* <IoIosAddCircle
      //             className="text-light"
      //             style={{ fontSize: "16px" }}
      //           />  */} 00
      //         </button>
      //         <ul
      //           className="dropdown-menu"
      //         >
      //           <li>
      //             <AddRegister id={data.id} onSuccess={fetchData} />
      //           </li>
      //           <li>
      //             <AddBreak id={data.id} onSuccess={fetchData} />
      //           </li>
      //           <li>
      //             <AddClass id={data.id} onSuccess={fetchData} />
      //           </li>
      //           <li>
      //             <AddPackage id={data.id} onSuccess={fetchData} />
      //           </li>
      //           <li>
      //               <Link to={`/center/edit/${data.id}`}>
      //                 <button
      //                   style={{
      //                     whiteSpace: "nowrap",
      //                     width: "100%",
      //                   }}
      //                   className="btn btn-sm btn-normal text-start"
      //                 >
      //                   <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      //                 </button>
      //               </Link>
      //           </li>
      //           <li>
      //               <span>
      //                 <Delete
      //                   onSuccess={fetchData}
      //                   path={`/deleteCenter/${data.id}`}
      //                 />
      //               </span>
      //           </li>
      //         </ul>
      //       </div>
      //     );
      //   },
      // },
      { accessorKey: "centerName", header: "Centre Name" },
      { accessorKey: "centerManager", header: "Centre Manager" },
      { accessorKey: "code", header: "Code" ,size:40},
      { accessorKey: "uenNumber", header: "UEN Number" ,size:50},
      { accessorKey: "email", header: "Email" },
      { accessorKey: "mobile", header: "Mobile" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "invoiceNotes", header: "Invoice Notes" },
      { accessorKey: "openingDate", header: "Opening Date" },
      { accessorKey: "bankAccountName", header: "Bank A/C Name" },
      { accessorKey: "bankAccountNumber", header: "Bank A/C Number" },
      { accessorKey: "bankBranch", header: "Bank Branch" },
      { accessorKey: "bankName", header: "Bank Name" },
      { accessorKey: "gst", header: "GST" },
      { accessorKey: "taxRegistrationNumber", header: "Tax Reg Number" },
      { accessorKey: "zipCode", header: "Zip Code" },
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

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/getCenterWithCustomInfo`);
      setData(response.data); // Ensure response contains an array matching the column keys
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const CustomIcon = () => (
    <CiViewColumn />
  );
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
          &nbsp;Centre Management
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Centre Listing
        </li>
      </ol>
      <div className="card">
        <div
          className="mb-3 d-flex justify-content-between align-items-center p-1"
          style={{ background: "#f5f7f9" }}
        >
          <span className="text-muted">
            This database shows the list of{" "}
            <strong style={{ color: "#287f71" }}>Centre</strong>
          </span>
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
              data={data}
              icons={{
                ViewColumnIcon: CustomIcon,
              }}
              enableColumnActions={false}
              enableColumnFilters={false}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              initialState={{
                columnVisibility: {
                  mobile: false,
                  gst: false,
                  address: false,
                  bankAccountName: false,
                  bankAccountNumber: false,
                  bankBranch: false,
                  bankName: false,
                  createdBy: false,
                  createdAt: false,
                  updatedBy: false,
                  updatedAt:false,
                  invoiceNotes: false,
                  openingDate: false,
                  taxRegistrationNumber: false,
                  zipCode: false,
                },
              }}
              muiTableBodyRowProps={({ row }) => ({
                onClick: () => navigate(`/center/view/${row.original.id}`),
                style: { cursor: "pointer" },
              })}
            />
          </ThemeProvider>
        )}
      </div>
    </div>
  );
};

export default NewTable1;
