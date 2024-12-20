import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const StudentViewCourse = ({ data }) => {
  const formatTimeTo12Hour = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":").map(Number);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(0, 0, 0, hours, minutes));
    return formattedTime;
  };
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
        accessorKey: "status",
        enableHiding: false,
        size: 50,
        header: "Status",
        Cell: ({ row }) =>
          row.original.status === "Pending" ||
          row.original.status === "pending" ||
          row.original.status === "PENDING" ? (
            <span
              className="badge text-light fw-light"
              style={{ backgroundColor: "#eb862a" }}
            >
              Pending
            </span>
          ) : row.original.status !== "pending" ||
            row.original.status !== "pending" ||
            row.original.status !== "pending" ? (
            <span
              className="badge text-light fw-light"
              style={{ backgroundColor: "#287f71" }}
            >
              Active
            </span>
          ) : null,
      },
      { accessorKey: "centerName", enableHiding: false, header: "Center Name" },
      {
        accessorKey: "course",
        enableHiding: false,
        header: "Course",
      },
      {
        accessorKey: "classId",
        enableHiding: false,
        size: 50,
        header: "Class Code",
      },
      {
        accessorKey: "teacher",
        enableHiding: false,
        header: "Teacher",
      },
      {
        accessorKey: "startDate",
        enableHiding: false,
        size: 50,
        header: "Start Date",
      },
      {
        accessorKey: "endDate",
        enableHiding: false,
        size: 50,
        header: "End Date",
      },
      {
        accessorKey: "startTime",
        header: "Start Time",
        Cell: ({ cell }) => formatTimeTo12Hour(cell.getValue()),
      },
      {
        accessorKey: "endTime",
        header: "End Time",
        Cell: ({ cell }) => formatTimeTo12Hour(cell.getValue()),
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnActions={false}
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
        />
      </ThemeProvider>
    </>
  );
};

export default StudentViewCourse;
