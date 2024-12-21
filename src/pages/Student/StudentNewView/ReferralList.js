import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { MaterialReactTable } from "material-react-table";

const ReferralList = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        header: "S.NO",
        enableSorting: true,
        enableHiding: false,
        size: 20,
        cell: ({ cell }) => (
          <span style={{ textAlign: "center" }}>{cell.getValue()}</span>
        ),
      },
      {
        accessorKey: "referByStudent",
        enableHiding: false,
        header: "Referal Student Name",
        size: 200,
      },
      {
        accessorKey: "referByParent",
        enableHiding: false,
        header: "Referal Parent Name",
      },
      {
        accessorKey: "referralFee",
        enableHiding: false,
        header: "Referal Fee",
      },
      {
        accessorKey: "attendance",
        enableHiding: false,
        header: "Attendance",
      },
      {
        accessorKey: "studentName",
        enableHiding: false,
        header: "New Student Name",
      },
      {
        accessorKey: "enrollDate",
        enableHiding: false,
        header: "New Student Start Date",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
      },
      { accessorKey: "createdBy", header: "Created By" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) => cell.getValue()?.substring(0, 10),
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
            },
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default ReferralList;
