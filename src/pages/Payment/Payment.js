import React, { useEffect, useRef } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";

const Payment = () => {
  const tableRef = useRef(null);

  const datas = [
    {
      id: 1,
      invoiceNo: "ALHG/IV/24/0074",
      receiptNo: "OR2400039",
      name: "Astraea Chua",
      // customerCode: "S000481",
      receiptDate: "05-01-2024",
      paymentType: "Paynow",
      status: "paid",
    },
    {
      id: 2,
      invoiceNo: "ALHG/IV/24/0013",
      receiptNo: "OR2400038",
      name: "LIM ZHE RUI SHANNON",
      // customerCode: "S000295",
      receiptDate: "05-01-2024",
      paymentType: "Paynow",
      status: "rejected",
    },
    {
      id: 3,
      invoiceNo: "ALHG/IV/24/0073",
      receiptNo: "OR2400036",
      name: "Ariel Chen Ya'En",
      // customerCode: "S000270",
      receiptDate: "15-12-2023",
      paymentType: "Paynow",
      status: "cancelled",
    },
    {
      id: 4,
      invoiceNo: "ALHG/IV/23/1637",
      receiptNo: "OR2400037",
      name: "Suon Joseph",
      // customerCode: "S000165",
      receiptDate: "05-01-2024",
      paymentType: "PayNow QR",
      status: "paid",
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
      {/* <div className="my-3 d-flex justify-content-end mb-5">
        <button type="button" className="btn btn-button btn-sm">
          Add <i class="bx bx-plus"></i>
        </button>
      </div> */}
      <table ref={tableRef} className="display">
        <thead>
          <tr>
            <th scope="col" style={{ whiteSpace: "nowrap" }}>
              S.No
            </th>
            <th scope="col">Invoice No.</th>
            <th scope="col">Receipt No.</th>
            <th scope="col">Name</th>
            {/* {/ <th scope="col">Customer Code</th> /} */}
            <th scope="col">Receipt Date</th>
            <th scope="col">Payment Type</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.invoiceNo}</td>
              <td>{data.receiptNo}</td>
              <td>{data.name}</td>
              {/* {/ <td>{data.customerCode}</td> /} */}
              <td>{data.receiptDate}</td>
              <td>{data.paymentType}</td>
              <td>
                {data.status === "paid" ? (
                  <span className="badge badges-Green">Paid</span>
                ) : data.status === "rejected" ? (
                  <span className="badge badges-Yellow">Rejected</span>
                ) : (
                  <span className="badge badges-Red">Cancelled</span>
                )}
              </td>
              {/* <td>
                <div className="d-flex">
                  <Link to={`/teacher/view`}>
                    <button className="btn btn-sm">
                      <FaEye />
                    </button>
                  </Link>
                  <Link to={`/teacher/edit`}>
                    <button className="btn btn-sm">
                      <FaEdit />
                    </button>
                  </Link>
                  <Delete />
                </div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payment;