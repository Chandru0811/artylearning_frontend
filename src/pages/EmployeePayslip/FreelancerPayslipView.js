import React, { useEffect, useState } from "react";
import "../../styles/custom.css";
import Logo from "../../assets/images/Logo.png";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { format } from "date-fns"; // Import format function from date-fns
import api from "../../config/URL";
import { FaDownload } from "react-icons/fa6";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

function FreelancerPayslipView() {
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState({});
  console.log("Payslip Data", data);
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`getFreelancerInvoiceById/${id}`);
        setData(response.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

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
    doc.text(`: ${data.employeeName || ''}`, 45, 70);
    doc.text(`: ${data.payslipMonth || ''}`, 45, 80);
    doc.text(`: ${data.dateOFJoining.substring(0, 10) || ''}`, 155, 70);
    doc.text(`: Teacher`, 155, 80);

    console.log("doj", data.dateOFJoining)
    // Line above the table with validation
    const lineStartY = 87;
    if (!isNaN(lineStartY)) {
      doc.line(10, lineStartY, 200, lineStartY);
    }

    const headers = ["EARNING", "AMOUNT", "DEDUCTION", "AMOUNT"];
    const earningData = [
      ["BASIC SALARY", data.basicSalary],
      ["BONUS", data.bonus],
    ];

    const deductionData = [
      data.deductions?.map((deduction) => deduction?.detectionName || ''),
      data.deductions?.map((deduction) => deduction?.amount || 0),
    ];

    const numRows = Math.max(earningData.length, deductionData[0]?.length || 0);
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
    headers.forEach((header, index) => {
      doc.text(header, startX + index * cellWidth, startY);
    });

    doc.setFont("helvetica", "normal");
    tableBody.forEach((row, rowIndex) => {
      const rowY = startY + (rowIndex + 1) * cellHeight;
      row.forEach((cell, colIndex) => {
        const colX = startX + colIndex * cellWidth;
        const cellText = cell ? cell.toString() : '';
        doc.text(cellText, colX, rowY);
      });
    });

    (tableColumn || []).forEach((col, colIndex) => {
      if (Array.isArray(col)) {
        const colX = startXX + colIndex * cellWidth;
        col.forEach((cell, rowIndex) => {
          const rowY = startY + (rowIndex + 1) * cellHeight;
          const cellText = cell != null ? cell.toString() : '';
          if (cellText) {
            doc.text(cellText, colX, rowY);
          }
        });
      }
    });

    const totalY = startY + (numRows + 2) * cellHeight - 5;
    const lineAboveGrossPayY = totalY - 8;

    // Draw line above "GROSS PAY" section with validation
    if (!isNaN(lineAboveGrossPayY)) {
      doc.line(startX, lineAboveGrossPayY, 200, lineAboveGrossPayY);
    }

    doc.setFont("helvetica", "bold");
    doc.text(`GROSS PAY`, startX, totalY);
    doc.text(`${data.grossPay}`, startXX, totalY);

    const lineBelowGrossPayY = totalY + 5;
    if (!isNaN(lineBelowGrossPayY)) {
      doc.line(startX, lineBelowGrossPayY, 200, lineBelowGrossPayY);
    }

    const deductionTotalX = startXX + cellWidth;
    doc.text(`DEDUCTION TOTAL`, deductionTotalX, totalY);
    doc.text(`${data.deductionTotal}`, deductionTotalX + 50, totalY);

    const netPayY = totalY + cellHeight + 5;
    doc.text(`NET PAY`, startX, netPayY);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${data.netPay}`, startX + 20, netPayY);

    const inWordsY = netPayY + cellHeight;
    doc.setFont("helvetica", "bold");
    doc.text(`IN WORDS`, startX, inWordsY);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${data.netPayInWords}`, startX + 20, inWordsY);

    doc.save("Payslip.pdf");
  };

  return (
    <section>
      <div className="container">
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
                    <img
                      src={Logo}
                      width={150}
                      alt="Logo"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8 col-12 mt-4">
                    <h5 className="ms-5">{data.centerName}</h5>
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
                                {data.dateOFJoining?.substring(0, 10)}
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
                                : {data.payrollMonth}
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
                              <p className="text-muted text-sm">: Teacher</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium d-flex justify-content-end">
                                Start Date
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data.startDate}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium d-flex justify-content-end">
                                End Date
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data.endDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row paysliptable ">
                        <div className="col-12">
                          <table class="table ">
                            <thead className="table-bordered">
                              <tr>
                                <th
                                  scope="col"
                                  style={{
                                    borderRight: "2px solid black",
                                    borderLeft: "2px solid black",
                                  }}
                                >
                                  EARNING
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    borderRight: "2px solid black",
                                    borderLeft: "2px solid black",
                                  }}
                                >
                                  AMOUNT
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td style={{ borderLeft: "2px solid black" }}>
                                  <div className="mb-2">Net Pay</div>
                                </td>
                                <td style={{ borderRight: "2px solid black" }}>
                                  <div className="mb-2">{data.netPay}</div>
                                </td>
                              </tr>

                              <tr className="table-bordered"></tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-12">
                          <div className="row">
                            <div className="col-3">
                              <p className="fw-medium">IN WORDS</p>
                            </div>
                            <div className="col-9">
                              <p className="text-muted text-sm">
                                : {data.netPayInWords}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium">Payroll Type</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data.payrollType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium">Hourse Count</p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data.freelanceCount}
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

export default FreelancerPayslipView;
