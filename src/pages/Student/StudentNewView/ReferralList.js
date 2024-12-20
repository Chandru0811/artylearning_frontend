import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const ReferralList = ({ data }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
    });
    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div className="container my-3">
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Referral Student Name</th>
            <th scope="col">Referral Parent Name</th>
            <th scope="col">Referral Fee</th>
            <th scope="col">Attendance</th>
            <th scope="col">New Student Name</th>
            <th scope="col">New Student Start Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.referByStudent || "N/A"}</td> {/* Center Name */}
              <td>{item.referByParent || "N/A"}</td>{" "}
              <td>{item.referralFee || "N/A"}</td> {/* Center Name */}
              <td>{item.attendance || "N/A"}</td> {/* Center Name */}
              {/* Referral Student Name */}
              <td>{item.studentName || "N/A"}</td> {/* New Student Name */}
              <td>{item.enrollDate.substring(0, 10) || "N/A"}</td>{" "}
              {/* Start Date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralList;
