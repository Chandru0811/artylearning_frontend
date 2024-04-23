import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const Sales = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      studentName: "Tan MingKhai",
      studentId: "500041",
      paymentRefNo: "OR23456",
      courseName: "Arty Belivers 1",
      courseFees: "20.00",
      subTotal: "20.00",
    },
    {
      id: 2,
      studentName: "Dean Tan",
      studentId: "500036",
      paymentRefNo: "OR23458",
      courseName: "Arty Pursuers",
      courseFees: "780.00",
      subTotal: "780.00",
    },
    {
      id: 3,
      studentName: "Alicia Ong",
      studentId: "500021",
      paymentRefNo: "OR23459",
      courseName: "Arty Belivers 1",
      courseFees: "500.00",
      subTotal: "500.00",
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
      <div className="row my-5">
        <div className="col-md-4 col-12">
          <select className="form-select " aria-label="Default select example">
            <option selected>Select a Centre</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-4 col-12">
          <select className="form-select " aria-label="Default select example">
            <option selected>Select a course</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-4 col-12">
          <select className="form-select " aria-label="Default select example">
            <option selected>Select payment method</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Student Name</th>
            <th scope="col">Student ID</th>
            <th scope="col">Payment Ref No</th>
            <th scope="col">Course Name</th>
            <th scope="col">Course Fees</th>
            <th scope="col">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.studentName}</td>
              <td>{data.studentId}</td>
              <td>{data.paymentRefNo}</td>
              <td>{data.courseName}</td>
              <td>{data.courseFees}</td>
              <td>{data.subTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
