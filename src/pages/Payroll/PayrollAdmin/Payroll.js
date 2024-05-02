import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";

const Payroll = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centreName: "Arty Learning @HG",
      employeeName: "Nalini Sri",
      bonus: "$500",
      grossPay: "$5100",
      deduction: "$150",
      netPay: "$5350",
      status: "active",
    },
    {
      id: 2,
      centreName: "Arty Learning @ AMK",
      employeeName: "Deepak Kumar",
      bonus: "$0",
      grossPay: "$6000",
      deduction: "$50",
      netPay: "$5050",
      status: "in_active",
    },
    {
      id: 3,
      centreName: "ArtyLearning@In",
      employeeName: "Dinesh",
      bonus: "$500",
      grossPay: "$5100",
      deduction: "$150",
      netPay: "$5350",
      status: "Pending",
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
    <div className="container">
      <div className="col-12 text-end my-3">
        <Link to={`/payrolladmin/add`}>
          <button type="button" className="btn btn-button btn-sm">
            Add <i class="bx bx-plus"></i>
          </button>
        </Link>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Centre Name</th>
            <th scope="col">Emplopee Name</th>
            <th scope="col">Bonus</th>
            <th scope="col">Gross Pay</th>
            {/* <th scope="col">Deduction</th> */}
            <th scope="col">Net Pay</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.centreName}</td>
              <td>{data.employeeName}</td>
              <td>{data.bonus}</td>
              <td>{data.grossPay}</td>
              {/* <td>{data.deduction}</td> */}
              <td>{data.netPay}</td>
              <td>
                {data.status === "active" ? (
                  <span className="badge badges-Green">Approved</span>
                ) : data.status === "Pending" ? (
                  <span className="badge badges-Yellow">Pending</span>
                ) : (
                  <span className="badge badges-Red">Rejected</span>
                )}
              </td>
              <td>
                <Link to={`/payrolladmin/view`}>
                  <button className="btn btn-sm">
                    <FaEye />
                  </button>
                </Link>
                <Link to={`/payrolladmin/edit`}>
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

export default Payroll;
