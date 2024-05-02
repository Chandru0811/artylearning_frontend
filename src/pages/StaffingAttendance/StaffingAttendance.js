import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../components/common/Delete";

const StaffingAttendance = () => {
  const tableRef = useRef(null);
  //   const [status, setStatus] = useState({});

  const datas = [
    {
      id: 1,
      centername: "Arty Learning @HG",
      employeeid: "ECS10",
      employeetype: "Part Time",
      date: "2024-2-11",
      email: "Chandru@gmail.com",
      status: "Present",
    },
    {
      id: 2,
      centername: "Arty Beleivers",
      employeeid: "ECS15",
      employeetype: "Full Time",
      date: "2024-2-11",
      email: "Rohini@gmail.com",
      status: "Absent",
    },
    {
      id: 3,
      centername: "Arty Dreamers",
      employeeid: "ECS20",
      employeetype: "Part Time",
      date: "2024-2-11",
      email: "KishoreKumar@gmail.com",
      status: "Present",
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

  //   const handleStatusChange = (id, value) => {
  //     setStatus({ ...status, [id]: value });
  //   };

  return (
    <div className="container my-4">
      <div className="my-3 d-flex align-items-end justify-content-end">
        <Link to="/staffing/attendance/add">
          <button type="button" className="btn btn-button btn-sm">
            Add <i className="bx bx-plus"></i>
          </button>
        </Link>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Centre Name</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Employee Type</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.centername}</td>
              <td>{data.employeeid}</td>
              <td>{data.employeetype}</td>
              <td>{data.date}</td>
              <td>
                {data.status === "Present" ? (
                  <span
                    className="badge badges-Green"
                  >
                    Present
                  </span>
                ) : (
                  <span
                    className="badge badges-Red"
                  >
                    Absent
                  </span>
                )}
              </td>
              <td>{data.email}</td>
              <td>
                <Link to={`/staffing/attendance/view`}>
                  <button className="btn btn-sm">
                    <FaEye />
                  </button>
                </Link>
                <Link to={`/staffing/attendance/edit`}>
                  <button className="btn btn-sm">
                    <FaEdit />
                  </button>
                </Link>
                <Delete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffingAttendance;
