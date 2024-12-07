import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import Delete from "../../../components/common/Delete";
import AbsentReasonAdd from "./AbsentReasonAdd";
import AbsentReasonEdit from "./AbsentReasonEdit";
import { Link } from "react-router-dom";

const AbsentReason = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      reason: "Medical Appointment",
      remarks: "Provided a doctor's note.",
    },
    {
      id: 2,
      reason: "Family Emergency",
      remarks: "Informed via parent call.",
    },
    {
      id: 3,
      reason: "Travel for Competition",
      remarks: "Participating in inter-school sports event.",
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
          Settings
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Absent Reason
        </li>
      </ol>
      <div className="my-3 d-flex justify-content-end mb-5">
        <AbsentReasonAdd />
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Absent Reason</th>
            <th scope="col">Remark</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.reason}</td>
              <td>{data.remarks}</td>
              <td>
                <AbsentReasonEdit />
                <Delete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsentReason;
