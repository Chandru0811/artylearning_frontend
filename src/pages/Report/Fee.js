import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const Datatable2 = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      invoiceNumber: "ALHG/IV/24/0074",
      parentName: "Tan MingKhai",
      studentName: "Jovern Tanwei En",
      paidAmount: "760.00",
      paidDate: "2024-01-05",
      paymentType: "Cash",
    },
    {
      id: 2,
      invoiceNumber: "ALHG/IV/24/0075",
      parentName: "Dean Tan",
      studentName: "Evelyn Tan Aishan",
      paidAmount: "520.00",
      paidDate: "2024-01-10",
      paymentType: "Paynow Qr",
    },
    {
      id: 3,
      invoiceNumber: "ALHG/IV/24/0076",
      parentName: "Alicia Ong",
      studentName: "Hazel Tiang Yawen",
      paidAmount: "400.00",
      paidDate: "2024-01-09",
      paymentType: "Paynow",
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
            <option selected>Arty Learning @ HG</option>
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
            <th scope="col">
              S No
            </th>
            <th scope="col">Invoice Number</th>
            <th scope="col">Parent Name</th>
            <th scope="col">Student Name</th>
            <th scope="col">Paid Amount</th>
            <th scope="col">Paid Date</th>
            <th scope="col">Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.invoiceNumber}</td>
              <td>{data.parentName}</td>
              <td>{data.studentName}</td>
              <td>{data.paidAmount}</td>
              <td>{data.paidDate}</td>
              <td>{data.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable2;
