import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const TeacherLeave = () => {
  const tableRef = useRef(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const datas = [
    {
      id: 1,
      leavetype: "Medical Leave",
      fromdate: "04-03-2022",
      todate: "06-03-2022",
      noofdays: "02",
      mobile: "9941286931",
      status: "Active",
    },
    {
      id: 1,
      leavetype: "Medical Leave",
      fromdate: "02-04-2023",
      todate: "06-04-2023",
      noofdays: "04",
      mobile: "9994128600",
      status: "Active",
    },
    {
      id: 1,
      leavetype: "Personal Leave",
      fromdate: "03-09-2022",
      todate: "09-09-2022",
      noofdays: "06",
      mobile: "98410086931",
      status: "Active",
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
    <div className="container my-4 mt-4 ">
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S No
            </th>
            <th scope="col">Leave Type</th>
            <th scope="col">From date</th>
            <th scope="col">To Date</th>
            <th scope="col">No.of.Days</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.leavetype}</td>
              <td>{data.fromdate}</td>
              <td>{data.todate}</td>
              <td>{data.noofdays}</td>

              <td>
                <div className="d-flex">
                  {storedScreens?.leaveRequestRead && (
                    <Link to={`/teacher/leave/view`}>
                      <button className="btn btn-sm">
                        <FaEye />
                      </button>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherLeave;
