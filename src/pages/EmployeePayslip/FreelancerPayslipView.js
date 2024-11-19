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
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait, millimeters, A4 size
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight(); // Get page height
    const margin = 10; // Margin for the document
    const logoHeight = 30; // Height of the logo
    const borderTopY = margin + logoHeight + 10; // Start border below logo (adjusted margin)
  
    const tableMarginX = 15; // Horizontal margin for the table
  
    // **Outer Border**
    pdf.setLineWidth(0.5);
    const contentHeight = pageHeight - borderTopY - margin;
    pdf.rect(
      margin,
      borderTopY,
      pageWidth - margin * 2,
      contentHeight - margin // Adjusted height dynamically
    );
  
    // **Header Section**
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.setTextColor("#000000");
    pdf.text(data.centerName || "", pageWidth / 2, margin + 15, {
      align: "center",
    });
  
    // **Add Logo**
    pdf.addImage(Logo, "PNG", margin + 5, margin + 5, 30, 30); // Logo in top left
  
    // **Employee Details**
    const employeeDetailsStartY = margin + 50;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text("EMPLOYEE NAME", margin + 5, employeeDetailsStartY);
    pdf.text(
      `: ${data.employeeName || ""}`,
      margin + 50,
      employeeDetailsStartY
    );
  
    pdf.text("DESIGNATION", pageWidth / 2 + 5, employeeDetailsStartY);
    pdf.text(": Teacher (FL)", pageWidth / 2 + 50, employeeDetailsStartY);
  
    pdf.text("Start Date", margin + 5, employeeDetailsStartY + 8);
    pdf.text(`: ${data.startDate || ""}`, margin + 50, employeeDetailsStartY + 8);
  
    pdf.text("End Date", pageWidth / 2 + 5, employeeDetailsStartY + 8);
    pdf.text(`: ${data.endDate || ""}`, pageWidth / 2 + 50, employeeDetailsStartY + 8);
  
    pdf.text("DATE OF JOINING", margin + 5, employeeDetailsStartY + 16);
    pdf.text(
      `: ${data?.dateOFJoining?.slice(0, 10) || ""}`,
      margin + 50,
      employeeDetailsStartY + 16
    );
  
// **Earnings Table**
const tableStartY = employeeDetailsStartY + 40;
const tableHeight = 15; // Height for vertical borders
const amountColumnX = pageWidth / 2 + 10; // X-coordinate for the Amount column

// Add Top Border for Earnings Section
pdf.setLineWidth(0.5);
pdf.line(tableMarginX, tableStartY - 10, pageWidth - tableMarginX, tableStartY - 10); // Top border
pdf.line(tableMarginX, tableStartY, pageWidth - tableMarginX, tableStartY); // Header bottom border

// Add Left and Right Borders
pdf.line(tableMarginX, tableStartY - 10, tableMarginX, tableStartY + tableHeight - 5); // Left border
pdf.line(pageWidth - tableMarginX, tableStartY - 10, pageWidth - tableMarginX, tableStartY + tableHeight - 5); // Right border

// Add Vertical Border for Amount Column
pdf.line(amountColumnX, tableStartY - 10, amountColumnX, tableStartY + tableHeight - 15); // Vertical line separating columns

// Add Row Bottom Border
pdf.line(tableMarginX, tableStartY + 10, pageWidth - tableMarginX, tableStartY + 10); // Row bottom border

// Table Header and Row
pdf.setFont("helvetica", "bold");
pdf.text("EARNING", tableMarginX + 5, tableStartY - 3); // Table header
pdf.text("AMOUNT", amountColumnX + 5, tableStartY - 3); // Table header

pdf.setFont("helvetica", "normal");
pdf.text("Net Pay", tableMarginX + 5, tableStartY + 7); // Table row
pdf.text(String(data.netPay || ""), amountColumnX + 5, tableStartY + 7); // Table row


  
    // **Details Section**
    const detailsStartY = tableStartY + 40;
    pdf.text("IN WORDS", margin + 5, detailsStartY);
    pdf.text(`: ${data.netPayInWords || ""}`, margin + 50, detailsStartY);
  
    pdf.text("Payroll Type", margin + 5, detailsStartY + 10);
    pdf.text(`: ${data.payrollType || ""}`, margin + 50, detailsStartY + 10);
  
    // Format the first letter as uppercase and the rest as lowercase
    const formattedPayrollType =
      data.payrollType
        ? data.payrollType.charAt(0).toUpperCase() + data.payrollType.slice(1).toLowerCase()
        : "";
  
    const textToDisplay = `${formattedPayrollType} Count`;
    pdf.text(textToDisplay, pageWidth / 2 + 5, detailsStartY + 10);
  
    pdf.text(
      `: ${String(data.freelanceCount || "")}`,
      pageWidth / 2 + 50,
      detailsStartY + 10
    );
  
    // **Save PDF**
    pdf.save("Payslip.pdf");
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
                    
                        {/* <div className="col-md-6 col-12">
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
                        </div> */}
                        <div className="col-md-6 col-12">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium d-flex justify-content-end">
                                DESIGNATION
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : Teacher(FL)
                              </p>
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
                        <div className="col-md-6 col-12">
                          <div className="row">
                            <div className="col-6">
                              <p className="fw-medium d-flex justify-content-end">
                                DATE OF JOINING
                              </p>
                            </div>
                            <div className="col-6">
                              <p className="text-muted text-sm">
                                : {data.dateOFJoining?.substring(0, 10)}
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
                              <p className="fw-medium">{data.payrollType} Count</p>
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
