import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { format } from "date-fns"; // Import format function from date-fns
import api from "../../config/URL";
import { FaDownload } from "react-icons/fa6";

// import { toast } from "react-toastify";

function Payslip() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState({});
  console.log("kishore", data);
  const userId = sessionStorage.getItem("userId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentMonth = format(new Date(), "yyyy-MM");
    setSelectedMonth(currentMonth);
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(
        `getPaySlipByUserId/${1}?payrollMonth=${selectedMonth}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      if (error?.response?.status === 404) {
        setData({});
        console.log("Error Fetching Data ", error);
      } else {
        console.log("Error Fetching Data ", error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // console.log("Selected month:", event.target.value);
  };
  const downloadPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text(`PAYSLIP MONTH : ${selectedMonth}`, 10, 10);
    doc.addImage(Logo, "Logo", 13, 25, 40, 25);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("Arty Learning @HG", 60, 25);

    doc.setFont("helvetica", "normal");
    doc.text("Tel No : 87270752", 60, 35);
    doc.text("Email : Artylearning@gmail.com", 60, 45);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("EMPLOYEE NAME ", 10, 70);
    doc.text("PAYSLIP ", 10, 80);
    doc.text("DATE OF JOINING ", 120, 70);
    doc.text("DESIGNATION ", 120, 80);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${data.employeeName}`, 45, 70);
    doc.text(`: ${data.payslipMonth}`, 45, 80);
    doc.text(`: ${data.dateOfJoining.substring(0, 10)}`, 155, 70);
    doc.text(`: ${data.designation}`, 155, 80);
    // doc.text("PAID DAYS : JANUARY", 14, 90);
    // doc.text("LOP : 0", 125, 90);

    // doc.line(10, 95, 200, 95);

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(11);
    // doc.text("EARNING", 10, 105);
    // // doc.text("HOURS", 40, 130);
    // doc.text("AMOUNT", 70, 105);
    // doc.text("DEDUCTION", 120, 105);
    // doc.text("AMOUNT", 165, 105);

    // doc.setFont("helvetica", "normal");
    // doc.setFontSize(10);
    // doc.text("BASIC SALARY", 10, 115);
    // // doc.text("224", 40, 140);
    // doc.text(`: ${data.basicSalary}`, 70, 115);
    // doc.text(`${data.deductions.map(deduction => [deduction.detectionName, deduction.amount])}`, 120, 115);
    // doc.text(`: ${data.deductions.amount}`, 165, 115);

    // // doc.text("OVERTIME", 10, 150);
    // // doc.text("5", 40, 150);
    // // doc.text("$100.00", 70, 150);
    // doc.text(`${data.detectionName}`, 120, 125);
    // doc.text(`: ${data.amount}`, 165, 125);

    // doc.text("BONUS", 10, 125);
    // // doc.text("-", 40, 160);
    // doc.text(`: ${data.bonus}`, 70, 125);

    // doc.line(10, 129, 200, 129);
    // doc.line(10, 140, 200, 140);
    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(10);
    // doc.text("GROSS PAY", 10, 135);
    // // doc.text("265", 40, 170);
    // doc.text(`: ${data.grossPay}`, 70, 135);
    // doc.text("DEDUCTION TOTAL", 120, 135);
    // doc.text(`: ${data.deductionTotal}`, 165, 135);

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(11);
    // doc.text("NET PAY", 12, 150);
    // doc.setFont("helvetica", "normal");
    // doc.text(`: ${data.netPay}`, 70, 150);

    // doc.setFont("helvetica", "bold");
    // doc.setFontSize(11);
    // doc.text("IN WORDS", 12, 160);
    // doc.setFont("helvetica", "normal");
    // doc.text(`: ${data.netPayInWords}`, 70, 160);

    // doc.save("Payslip.pdf");

    // Assuming data.deductions is an array of objects with properties detectionName and amount

// Define table headers
// Define headers for the table
const headers = ["EARNING", "AMOUNT", "DEDUCTION", "AMOUNT"];

// Define earning data
const earningData = [
    ["BASIC SALARY", data.basicSalary],
    ["BONUS", data.bonus],
    // Add other earning categories as needed
];

// Define deduction data
const deductionData =[ [data.deductions.map(deduction => [deduction.detectionName])],
[data.deductions.map(deduction =>  [deduction.amount])]
];
// Calculate gross pay by summing all earning amounts
const grossPay = earningData.reduce((total, [_, amount]) => total + amount, 0);

// Calculate deduction total by summing all deduction amounts
const deductionTotal = deductionData.reduce((total, [, amount]) => total + amount, 0);

// Define table body by concatenating earning and deduction data
const tableBody = [...earningData];
const tableColumn = [["", "",], ...deductionData]

// Define table dimensions and styles
const startX = 10;
const startXX = 60;
const startY = 95;
const cellWidth = 50;
const cellHeight = 10;
const fontSize = 10;

// Draw table headers
doc.setFont("helvetica", "bold");
doc.setFontSize(fontSize);
headers.forEach((header, index) => doc.text(header, startX + index * cellWidth, startY));

// Draw table body
doc.setFont("helvetica", "normal");
doc.setFontSize(fontSize);
// Iterate over rows
tableBody.forEach((row, rowIndex) => {
  // Calculate Y position for the current row
  const rowX = startY + (rowIndex + 1) * cellHeight;
  
  // Iterate over cells in the row
  row.forEach((cell, colIndex) => {
      // Calculate X position for the current cell
      const colX = startX + colIndex * cellWidth;
      
      // Draw the cell content
      doc.text(cell.toString(), colX, rowX);
  });   
});


tableColumn.forEach((col, colIndex) => {
  
  const colX = startXX + colIndex * cellWidth;
  
  // Iterate over cells in the column
  col.forEach((cell, rowIndex) => {
      // Calculate Y position for the current cell
      const rowX = startY + (rowIndex + 1) * cellHeight;
      
      // Draw the cell content
      doc.text(cell.toString(), colX, rowX);
  });
});

// Save document
doc.save("Payslip.pdf");

  };

  return (
    <section>
      <div className="container">
        <div className="row mt-4">
          <div className="offset-md-1 col-md-5 col-12">
            <lable className="form-lable fw-medium">PAYSLIP MONTH</lable>
            <input
              type="month"
              className="form-control"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </div>
          <div className="col-md-5 col-12 d-flex justify-content-end mt-4">
            <Link to="/">
              <button className="btn btn-sm btn-border mx-2">Back</button>
            </Link>
          </div>
        </div>
        {/* {loading ? (
          <div className="loader-container">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (  */}
        {data && Object.keys(data).length > 0 ? (
          <div>
            <div className="row mt-4">
              <div className="offset-md-1 col-md-3 col-12">
                <img src={Logo} alt="Logo" className="img-fluid" />
              </div>
              <div className="col-md-8 col-12 mt-4">
                <h5 className="ms-5">ARTY LEARNING</h5>
              </div>
            </div>
            <div className="row mt-2">
              <div className="offset-md-1 col-md-10 col-12 mb-4 ">
                <div
                  className="px-3 py-3 bg-white"
                  style={{ width: "100%", border: "2px solid #000" }}
                >
                  <div className="row ">
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="col-6">
                          <p className="fw-medium d-flex justify-content-end">
                            EMPLOYEE NAME
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {data.employeeName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="col-6">
                          <p className="fw-medium d-flex justify-content-end">
                            DATE OF JOINING
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            :{" "}
                            {data.dateOfJoining &&
                              data.dateOfJoining.substring(0, 10)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="col-6">
                          <p className="fw-medium d-flex justify-content-end">
                            PAYSLIP MONTH
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {data.payslipMonth}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="col-6">
                          <p className="fw-medium d-flex justify-content-end">
                            DESIGNATION
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {data.designation}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-md-6 col-12">
                  <div className="row">
                    <div className="col-6">
                      <p className="fw-medium d-flex justify-content-end">
                        PAID DAYS
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: 31</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row">
                    <div className="col-6">
                      <p className="fw-medium d-flex justify-content-end">
                        LOP
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: 0</p>
                    </div>
                  </div>
                </div> */}
                  </div>
                  <div className="row paysliptable ">
                    <div className="col-12">
                      <table class="table ">
                        <thead className="table-bordered">
                          <tr>
                            <th scope="col">EARNING</th>
                            <th scope="col" style={{borderRight : "2px solid black"}}>AMOUNT</th>
                            <th scope="col">DEDUCTION</th>
                            <th scope="col">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="mb-2">BASIC SALARY</div>
                              <div>BONUS</div>
                            </td>

                            <td  style={{borderRight : "2px solid black"}}>
                              <div className="mb-2">{data.basicSalary}</div>
                              <div>{data.bonus}</div>
                            </td>
                            <td>
                              {data.deductions &&
                                data.deductions.map((data, index) => (
                                  <tr key={index + 1}>
                                    <td>
                                      <div className="mb-2">{data.detectionName}</div>
                                    </td>
                                  </tr>
                                ))}
                            </td>
                            <td>
                              {data.deductions &&
                                data.deductions.map((data, index) => (
                                  <tr key={index + 1}>
                                    <td>
                                      <div className="mb-2">
                                      {data.amount}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </td>
                            {/* <td>{data.amount}</td> */}
                          </tr>

                          <tr className="table-bordered">
                            <td>GROSS PAY</td>
                            <td style={{borderRight : "2px solid black"}}>{data.grossPay}</td>
                            <td>DEDUCTION TOTAL</td>
                            <td>{data.deductionTotal}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="col-6">
                          <p className="fw-medium">NET PAY</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">: {data.netPay}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3">
                          <p className="fw-medium">IN WORDS</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm">
                            : {data.netPayInWords}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end align-item-end mt-4">
                    <button
                      className="btn btn-success mx-2"
                      onClick={downloadPdf}
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "70vh" }}
            >
              <p className="text-danger">
                No payslip generated for the selected month
              </p>
            </div>
          </div>
        )}
        {/* )}  */}
      </div>
    </section>
  );
}

export default Payslip;
