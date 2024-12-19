import React, { useEffect, useRef, useState } from "react";
import "../../styles/custom.css";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";
import { format } from "date-fns"; // Import format function from date-fns
import api from "../../config/URL";
import { FaDownload } from "react-icons/fa6";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { toast } from "react-toastify";

function Payslip() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState({});
  const userId = localStorage.getItem("userId");
  // console.log("kishore", data);
  const table1Ref = useRef();
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

  // const downloadPdf = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(12);
  //   doc.text(`PAYSLIP MONTH : ${selectedMonth || ""}`, 10, 10); // Using || for null or empty
  //   doc.addImage(Logo, "Logo", 13, 25, 40, 25);
  //   doc.setFontSize(15);
  //   doc.setFont("helvetica", "bold");
  //   doc.text(data.centerName || "Arty Learning @HG", 60, 25); // Using || for null or empty

  //   doc.setFont("helvetica", "normal");
  //   doc.text("Tel No : 87270752", 60, 35);
  //   doc.text("Email : Artylearning@gmail.com", 60, 45);

  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(11);
  //   doc.text("EMPLOYEE NAME ", 10, 70);
  //   doc.text("PAYSLIP ", 10, 80);
  //   doc.text("DATE OF JOINING ", 120, 70);
  //   doc.text("DESIGNATION ", 120, 80);

  //   // Using || for each value to handle null or empty
  //   doc.setFont("helvetica", "normal");
  //   doc.text(`: ${data.employeeName || ""}`, 45, 70);
  //   doc.text(`: ${data.payslipMonth || ""}`, 45, 80);
  //   doc.text(`: ${data.dateOfJoining?.substring(0, 10) || ""}`, 155, 70);
  //   doc.text(`: ${data.designation || ""}`, 155, 80);

  //   doc.line(10, 87, 200, 87); // Line above the table

  //   const headers = ["EARNING", "AMOUNT", "DEDUCTION", "AMOUNT"];

  //   const earningData = [
  //     ["BASIC SALARY", data.basicSalary || ""], // Handling null or empty
  //     ["BONUS", data.bonus || ""],
  //     ["SHG", data.shgContribution || ""],
  //     ["CPF", data.cpfContribution || ""],
  //     // Add other earning categories as needed
  //   ];

  //   const deductionData = [
  //     data.deductions
  //       ? data.deductions.map((deduction) => deduction?.detectionName || "")
  //       : [""],
  //     data.deductions
  //       ? data.deductions.map((deduction) => deduction?.amount || "")
  //       : [""],
  //   ];

  //   const numRows = Math.max(earningData.length, deductionData[0].length);

  //   const tableBody = [...earningData];
  //   const tableColumn = [["", ""], ...deductionData];

  //   const startX = 10;
  //   const startXX = 60;
  //   const startY = 95;
  //   const cellWidth = 50;
  //   const cellHeight = 10;
  //   const fontSize = 10;

  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(fontSize);
  //   headers.forEach((header, index) =>
  //     doc.text(header, startX + index * cellWidth, startY)
  //   );

  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(fontSize);
  //   tableBody.forEach((row, rowIndex) => {
  //     const rowX = startY + (rowIndex + 1) * cellHeight;
  //     row.forEach((cell, colIndex) => {
  //       const colX = startX + colIndex * cellWidth;
  //       const cellText = cell ? cell.toString() : ""; // Convert to string and provide a fallback
  //       doc.text(cellText, colX, rowX);
  //     });
  //   });

  //   tableColumn.forEach((col, colIndex) => {
  //     const colX = startXX + colIndex * cellWidth;
  //     col.forEach((cell, rowIndex) => {
  //       const rowX = startY + (rowIndex + 1) * cellHeight;
  //       const cellText = cell ? cell.toString() : ""; // Convert to string and provide a fallback
  //       doc.text(cellText, colX, rowX);
  //     });
  //   });

  //   console.log(`Employee Name: ${data.employeeName || ""}`);
  //   console.log(`Payslip Month: ${data.payslipMonth || ""}`);
  //   console.log(`Deductions:`, deductionData);

  //   // Calculate Y position for "GROSS PAY" text and "DEDUCTION TOTAL" text
  //   const totalY = startY + (numRows + 2) * cellHeight - 5; // numRows + 1 for deduction rows, +1 for space

  //   // Draw line above the "GROSS PAY" section
  //   const lineAboveGrossPayY = totalY - 8;
  //   doc.line(startX, lineAboveGrossPayY, 200, lineAboveGrossPayY);

  //   // Draw "GROSS PAY" text along with its value in bold
  //   doc.setFont("helvetica", "bold");
  //   doc.text(`GROSS PAY`, startX, totalY);
  //   doc.text(`${data.grossPay || ""}`, startXX, totalY); // Adjust the position for the value

  //   // Draw line below the "GROSS PAY" section
  //   const lineBelowGrossPayY = totalY + 5;
  //   doc.line(startX, lineBelowGrossPayY, 200, lineBelowGrossPayY);

  //   // Draw "DEDUCTION TOTAL" text along with its value in bold
  //   const deductionTotalWidth = cellWidth; // Assuming the same width as other deduction columns
  //   const deductionTotalX = startXX + deductionTotalWidth; // Align with the "DEDUCTION" column
  //   doc.text(`DEDUCTION TOTAL`, deductionTotalX, totalY);
  //   doc.text(`${data.deductionTotal || ""}`, deductionTotalX + 50, totalY); // Adjust the position for the value

  //   //  Draw "NET PAY" text along with its value in bold
  //   const netPayY = totalY + cellHeight + 5; // Offset it from the "GROSS PAY" text
  //   doc.setFont("helvetica", "bold");
  //   doc.text(`NET PAY`, startX, netPayY);
  //   doc.setFont("helvetica", "normal"); // Change font to normal
  //   doc.text(`: ${data.netPay || ""}`, startX + 20, netPayY); // Adjust the position for the value

  //   // Draw "IN WORDS" text along with its value in bold
  //   const inWordsY = netPayY + cellHeight; // Offset it from the "NET PAY" text
  //   doc.setFont("helvetica", "bold");
  //   doc.text(`IN WORDS`, startX, inWordsY);
  //   doc.setFont("helvetica", "normal"); // Change font to normal
  //   doc.text(`: ${data.netPayInWords || ""}`, startX + 20, inWordsY); // Adjust the position for the value

  //   doc.save("Payslip.pdf");
  // };

  const handleGeneratePDF = async () => {
    // setLoadIndicator(true);
    const pdf = new jsPDF({
      orientation: "p", // 'p' for portrait, 'l' for landscape
      unit: "px",
      format: "a3", // page format
    });

    const addTableToPDF = async (tableRef, pageNumber) => {
      const table = tableRef.current;
      try {
        const canvas = await html2canvas(table, { scale: 2 });
        const imgData = canvas.toDataURL();

        // Calculate PDF dimensions based on canvas
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // Add image to PDF
        if (pageNumber > 1) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };

    await addTableToPDF(table1Ref, 1);

    pdf.save(`PayRole.pdf`);
    // setLoadIndicator(false);
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
            <button
              className="btn btn-success mx-2 btn-sm m-2"
              onClick={handleGeneratePDF}
            >
              <FaDownload />
            </button>
            <Link to="/">
              <button className="btn btn-sm btn-border mx-2 mt-2">Back</button>
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
                {/* <div className="row mt-4">
                  <div className="offset-md-1 col-md-3 col-12">
                    <img
                      src={Logo}
                      width={150}
                      alt="Logo"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-8 col-12 mt-4">
                    <h5 className="ms-5">
                      {data.centerName || "ARTY LEARNING"}
                    </h5>
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
                                  <div className="mb-2">BONUS</div>
                                  <div className="mb-2">SHG</div>
                                  <div>CPF</div>
                                </td>

                                <td style={{ borderRight: "2px solid black" }}>
                                  <div className="mb-2">{data.basicSalary}</div>
                                  <div className="mb-2">{data.bonus}</div>
                                  <div className="mb-2">
                                    {data.shgContribution}
                                  </div>
                                  <div>{data.cpfContribution}</div>
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

                      <div className="d-flex justify-content-end align-item-end mt-4"></div>
                    </div>
                  </div>
                </div> */}
                <div
                  ref={table1Ref}
                  className="container-fluid p-3 rounded mb-5"
                  // style={{
                  //   visibility: "hidden",
                  //   position: "absolute",
                  //   left: "-9999px",
                  //   display: "none",
                  // }}
                >
                  <div className="payslip-container">
                    <div className="text-center">
                      <h2>{data.centerName || "ARTY LEARNING"}</h2>
                    </div>
                    <div className="row mt-5">
                      <div className="col-2 text-center p-0">
                        <img
                          src={Logo}
                          alt="Arty Learning Logo"
                          className="img-fluid w-50"
                        />
                      </div>
                      <div className="col-5">
                        <div className="row">
                          <dvi className="col-4">
                            <p>
                              <strong>Employee Name</strong>
                            </p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.employeeName}</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>
                              <strong>Birth Date</strong>
                            </p>
                          </dvi>
                          <dvi className="col-8">
                            <p>:{data.dob || "--"}</p>
                          </dvi>
                        </div>
                      </div>
                      <div className="col-5">
                        <div className="row">
                          <dvi className="col-4">
                            <p>
                              <strong>NRIC/FIN No</strong>
                            </p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.nric || "--"}</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>
                              <strong>Pay Period</strong>
                            </p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.payPeriod || "--"}</p>
                          </dvi>
                        </div>
                      </div>
                    </div>

                    <div className="content-section">
                      <div className="row " style={{ minHeight: "20rem" }}>
                        <div className="col-6 d-flex flex-column justify-content-between">
                          <p className="d-flex justify-content-between">
                            <strong>BASIC PAY</strong>
                            <p>{data.basicSalary || "--"}</p>
                          </p>
                          <div className="row ">
                            <dvi className="col-4">
                              <p>
                                EMPLOYER CPF &nbsp; &nbsp; :{" "}
                                {data.cpfContribution || "--"}
                              </p>
                            </dvi>
                            <dvi className="col-8 text-center">
                              <p> SGD </p>
                            </dvi>
                          </div>
                        </div>
                        <div
                          className="col-6 "
                          style={{ borderLeft: "2px solid #000" }}
                        >
                          <p>MBMF</p>
                          <p>EMPLOYEE CPF</p>

                          {/* <p>EMPLOYER CPF: SGD</p>
                <p>Gross Wages: SGD</p>
                <p>
                  <strong>Salary Credited To:</strong> CASH
                </p>
                <p>This is a system-generated payslip</p>
                <p>No signature is required</p> */}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <div className="row">
                          <dvi className="col-4">
                            <p>Gross Wages</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.basicSalary}</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>Salary Credited To</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: CASH</p>
                          </dvi>
                        </div>
                        <p>This is a system-generated payslip</p>
                        <p>No signature is required</p>
                      </div>
                      <div
                        className="col-6"
                        style={{ borderLeft: "2px solid #000" }}
                      >
                        <div className="row">
                          <dvi className="col-4">
                            <p>Net Wages</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.netPay || "--"}</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>CPF Wages</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.cpfContribution || "--"}</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>Total CPF</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: SGD</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>AL/YTD/Bal</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: 00.0</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>ML/YTD/Bal</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: 00.0</p>
                          </dvi>
                        </div>
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
