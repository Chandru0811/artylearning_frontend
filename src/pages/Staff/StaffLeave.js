import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery"; // Import jQuery
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
function StaffLeave() {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const data = [
    {
      sno: 1,
      leavetype: "Medical leave",
      fromdate: "05-04-2022",
      todate: "07-04-2022",
      noofdays: "04",
      action: `<div><button className="btn"><i class="fa-solid fa-eye"></i></button>
        </div>`,
    },
    {
      sno: 2,
      leavetype: "personal leave",
      fromdate: "17-05-2022",
      todate: "21-05-2022",
      noofdays: "05",
      action: `<div><button className="btn"><i class="fa-solid fa-eye"></i></button>
        </div>`,
    },
    {
      sno: 3,
      leavetype: "Medical leave",
      fromdate: "17-06-2022",
      todate: "23-06-2022",
      noofdays: "07",
      action: `<div><button className="btn"><i class="fa-solid fa-eye"></i></button>
        </div>`,
    },
  ];
  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });

    return () => {
      table.destroy();
    };
  }, []);
  return (
    <div className="container my-4">
      <div className="my-3 d-flex justify-content-end"></div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S.NO
            </th>
            <th scope="col">Leave Type</th>
            <th scope="col">From Date</th>
            <th scope="col">To Date</th>
            <th scope="col">No.of.Days</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr Key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.leavetype}</td>
              <td>{data.fromdate}</td>
              <td>{data.todate}</td>
              <td>{data.noofdays}</td>
              <td className="d-flex">
                {storedScreens?.leaveRequestRead && (
                  <Link to="/staff/leave/view">
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffLeave;
