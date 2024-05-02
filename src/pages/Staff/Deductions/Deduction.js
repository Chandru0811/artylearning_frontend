import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { Link } from "react-router-dom";
import { FaEye, FaEdit } from "react-icons/fa";
import Delete from "../../../components/common/Delete";

const Deduction = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      centreName: "Arty Learning @ AKM",
      employeeName: "Suriya",
      deductionName: "Loss Of Pay",
      deductionAmount: "$20",
    },
    {
        id: 2,
        centreName: "Arty Learning @ AKM",
        employeeName: "Chandru",
        deductionName: "CPF",
        deductionAmount: "$10",
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
       <div className="col-12 text-end mb-3">
            <Link to="/deduction/add">
              <button type="button" className="btn btn-sm btn-button">
                Add <i class="bx bx-plus"></i>
              </button>
            </Link>
          </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th>S No</th>
            <th>Centre Name</th>
            <th>Employee Name</th>
            <th>Deduction Name</th>
            <th>Deduction Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.centreName}</td>
              <td>{data.employeeName}</td>
              <td>{data.deductionName}</td>
              <td>{data.deductionAmount}</td>
            
              <td>
              <td>
                <div className="d-flex">
                  <Link to="/deduction/list">
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>
                  </Link>
                  <Link to="/deduction/edit">
                    <button className="btn btn-sm">
                      <FaEdit/>
                    </button>
                  </Link>
                  <Delete 
                  //  onSuccess={refreshData}
                  />
                </div>
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Deduction;
