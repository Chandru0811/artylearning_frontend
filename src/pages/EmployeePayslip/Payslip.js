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

    pdf.save(`Payslip_${data.employeeName}_${selectedMonth}.pdf`);

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
                <div
                  ref={table1Ref}
                  className="container-fluid p-3 rounded mb-5"
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
                            <p>:{data.dateOfBirth || "--"}</p>
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
                        <div className="col-6 d-flex flex-column justify-content-evenly">
                          <p className="d-flex justify-content-between">
                            <strong>BASIC PAY</strong>
                            <p>{data.basicSalary || "--"}</p>
                          </p>
                          <p className="d-flex justify-content-between">
                            <strong>Bonus</strong>
                            <p>{data.bonus || "--"}</p>
                          </p>
                          <p className="d-flex justify-content-between">
                            <strong>EMPLOYER CPF</strong>
                            <p>
                              {data.cpfContribution !== undefined
                                ? data.cpfContribution.toFixed(2)
                                : "--"}
                            </p>
                          </p>
                          {/* <div className="row ">
                            <dvi className="col-4">
                              <p>EMPLOYER CPF </p>
                            </dvi>
                            <dvi className="col-8 text-center">
                              <p> {data.cpfContribution || "--"}</p>
                            </dvi>
                          </div> */}
                        </div>
                        <div
                          className="col-6 d-flex flex-column justify-content-evenly"
                          style={{ borderLeft: "2px solid #000" }}
                        >
                          <strong>Deduction </strong>
                          {data.deductions && data.deductions.length > 0 ? (
                            data.deductions.map((deduct, index) => (
                              <div
                                key={index}
                                className="d-flex justify-content-between"
                              >
                                <p>
                                  <strong>
                                    {deduct.detectionName || "--"}
                                  </strong>
                                </p>
                                <p>{deduct.amount || "--"}</p>
                              </div>
                            ))
                          ) : (
                            <p>--</p>
                          )}
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
                            <p>: {data.grossPay}</p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>Salary Credited To</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.salaryCreditedTo}</p>
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
                            <p>CPF Wages</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>
                              :
                              {data.cpfContribution !== undefined
                                ? data.cpfContribution.toFixed(2)
                                : "--"}
                            </p>
                          </dvi>
                        </div>
                        <div className="row">
                          <dvi className="col-4">
                            <p>Total CPF</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>
                              :
                              {data.totalCpf !== undefined
                                ? data.totalCpf.toFixed(2)
                                : "--"}
                            </p>
                          </dvi>
                        </div>
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
                            <p>Net Wages In Words</p>
                          </dvi>
                          <dvi className="col-8">
                            <p>: {data.netPayInWords || "--"}</p>
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
