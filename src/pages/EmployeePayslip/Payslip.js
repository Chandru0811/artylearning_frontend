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
  const userId = sessionStorage.getItem("userId");
  // console.log("kishore", userId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentMonth = format(new Date(), "yyyy-MM");
    setSelectedMonth(currentMonth);
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(
        `getPaySlipByUserId/${userId}?payrollMonth=${selectedMonth}`
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMonth !== "") {
      getData();
    }
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

    doc.line(10, 87, 200, 87); // Line above the table

    const headers = ["EARNING", "AMOUNT", "DEDUCTION", "AMOUNT"];

    const earningData = [
      ["BASIC SALARY", data.basicSalary],
      ["BONUS", data.bonus],
      // Add other earning categories as needed
    ];

    const deductionData = [
      data.deductions.map((deduction) => deduction.detectionName),
      data.deductions.map((deduction) => deduction.amount),
    ];

    const numRows = deductionData[0].length;

    const tableBody = [...earningData];
    const tableColumn = [["", ""], ...deductionData];

    const startX = 10;
    const startXX = 60;
    const startY = 95;
    const cellWidth = 50;
    const cellHeight = 10;
    const fontSize = 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);
    headers.forEach((header, index) =>
      doc.text(header, startX + index * cellWidth, startY)
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    tableBody.forEach((row, rowIndex) => {
      const rowX = startY + (rowIndex + 1) * cellHeight;
      row.forEach((cell, colIndex) => {
        const colX = startX + colIndex * cellWidth;
        doc.text(cell.toString(), colX, rowX);
      });
    });

    tableColumn.forEach((col, colIndex) => {
      const colX = startXX + colIndex * cellWidth;
      col.forEach((cell, rowIndex) => {
        const rowX = startY + (rowIndex + 1) * cellHeight;
        doc.text(cell.toString(), colX, rowX);
      });
    });

    // Calculate Y position for "GROSS PAY" text and "DEDUCTION TOTAL" text
    const totalY = startY + (numRows + 2) * cellHeight; // numRows + 1 for deduction rows, +1 for space

    // Draw line above the "GROSS PAY" section
    const lineAboveGrossPayY = totalY - 5;
    doc.line(startX, lineAboveGrossPayY, 200, lineAboveGrossPayY);

    // Draw "GROSS PAY" text along with its value in bold
    doc.setFont("helvetica", "bold");
    doc.text(`GROSS PAY: ${data.grossPay}`, startX, totalY);

    // Draw line below the "GROSS PAY" section
    const lineBelowGrossPayY = totalY + 5;
    doc.line(startX, lineBelowGrossPayY, 200, lineBelowGrossPayY);

    // Draw "DEDUCTION TOTAL" text along with its value in bold
    const deductionTotalWidth = cellWidth; // Assuming the same width as other deduction columns
    const deductionTotalX = startXX + deductionTotalWidth; // Align with the "DEDUCTION" column
    doc.text(
      `DEDUCTION TOTAL: ${data.deductionTotal}`,
      deductionTotalX,
      totalY
    );

    // Draw "NET PAY" text along with its value in bold
    const netPayY = totalY + cellHeight; // Offset it from the "GROSS PAY" text
    doc.text(`NET PAY : ${data.netPay}`, startX, netPayY);

    // Draw "IN WORDS" text along with its value in bold
    const inWordsY = netPayY + cellHeight; // Offset it from the "NET PAY" text
    doc.text(`IN WORDS : ${data.netPayInWords}`, startX, inWordsY);

    // Restore default font settings
    doc.setFont("helvetica", "normal");

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
        {loading ? (
          <div className="loader-container">
            <div class="loading">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div>
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
                                <th
                                  scope="col"
                                  style={{ borderRight: "2px solid black" }}
                                >
                                  AMOUNT
                                </th>
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

                                <td style={{ borderRight: "2px solid black" }}>
                                  <div className="mb-2">{data.basicSalary}</div>
                                  <div>{data.bonus}</div>
                                </td>
                                <td>
                                  {data.deductions &&
                                    data.deductions.map((data, index) => (
                                      <tr key={index + 1}>
                                        <td>
                                          <div className="mb-2">
                                            {data.detectionName}
                                          </div>
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
                                <td style={{ borderRight: "2px solid black" }}>
                                  {data.grossPay}
                                </td>
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
                              <p className="text-muted text-sm">
                                : {data.netPay}
                              </p>
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
          </div>
        )}
      </div>
    </section>
  );
}

export default Payslip;
