import React, { useState } from "react";
import "../../styles/custom.css";
import Logo from "../../assets/images/Logo.png";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

function Payslip() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    console.log("Selected month:", event.target.value);
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
    doc.text(": CHANDRU R", 45, 70);
    doc.text(": JANUARY", 45, 80);
    doc.text(": 01/01/2024", 155, 70);
    doc.text(": JUNIOR DEVELOPER", 155, 80);
    // doc.text("PAID DAYS : JANUARY", 14, 90);
    // doc.text("LOP : 0", 125, 90);

    doc.line(10, 95, 200, 95);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("EARNING", 10, 105);
    // doc.text("HOURS", 40, 130);
    doc.text("AMOUNT", 70, 105);
    doc.text("DEDUCTION", 120, 105);
    doc.text("AMOUNT", 165, 105);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("BASIC SALARY", 10, 115);
    // doc.text("224", 40, 140);
    doc.text("$4480.00", 70, 115);
    doc.text("HEALTH", 120, 115);
    doc.text("$100.00", 165, 115);

    // doc.text("OVERTIME", 10, 150);
    // doc.text("5", 40, 150);
    // doc.text("$100.00", 70, 150);
    doc.text("LOSS OF PAY", 120, 125);
    doc.text("$160.00", 165, 125);

    doc.text("BONUS", 10, 125);
    // doc.text("-", 40, 160);
    doc.text("$100.00", 70, 125);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("GROSS PAY", 10, 135);
    // doc.text("265", 40, 170);
    doc.text("$4580.00", 70, 135);
    doc.text("DEDUCTION TOTAL", 120, 135);
    doc.text("$260.00", 165, 135);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("NET PAY", 12, 150);
    doc.setFont("helvetica", "normal");
    doc.text(": $4320.00", 70, 150);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("IN WORDS", 12, 160);
    doc.setFont("helvetica", "normal");
    doc.text(": Four Thousand Three Hundred Twenty Dollars Only", 70, 160);

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
        ) : ( */}
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
            <div className="offset-md-1 col-md-10 col-12 pb-4">
              <div
                className="px-3 py-3"
                style={{ width: "100%", border: "2px solid #000" }}
              >
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="row">
                      <div className="col-6">
                        <p className="fw-medium d-flex justify-content-end">
                          EMPLOYEE NAME
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="text-muted text-sm">: CHANDRU R</p>
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
                        <p className="text-muted text-sm">: 01/01/2024</p>
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
                        <p className="text-muted text-sm">: JANUARY</p>
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
                        <p className="text-muted text-sm">: JUNIOR DEVELOPER</p>
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
                  <div className="col-md-6 col-12">
                    <table class="table table-end-border table-borderless">
                      <thead className="table-bordered">
                        <tr>
                          <th scope="col">EARNING</th>
                          {/* <th scope="col">HOURS</th> */}
                          <th scope="col">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>BASIC SALARY</td>
                          {/* <td>224</td> */}
                          <td>$4480.00</td>
                        </tr>
                        {/* <tr>
                        <td>OVERTIME</td>
                        <td>5</td>
                        <td>$100.00</td>
                      </tr> */}
                        <tr>
                          <td>BONUS</td>
                          {/* <td>-</td> */}
                          <td>$100.00</td>
                        </tr>
                        <tr>
                          <td style={{ visibility: "hidden" }}>jjk</td>
                          <td style={{ visibility: "hidden" }}>fvbg</td>
                        </tr>
                        <tr className="table-bordered">
                          <td>GROSS PAY</td>
                          {/* <td>265</td> */}
                          <td>$4580.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6 col-12">
                    <table class="table table-borderless">
                      <thead className="table-bordered">
                        <tr>
                          <th scope="col">DEDUCTION</th>
                          <th scope="col">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>HEALTH</td>
                          <td>$100.00</td>
                        </tr>
                        <tr>
                          <td>LOSS OF PAY</td>
                          <td>$160.00</td>
                        </tr>
                        <tr>
                          <td style={{ visibility: "hidden" }}>jjk</td>
                          <td style={{ visibility: "hidden" }}>fvbg</td>
                        </tr>
                        <tr className="table-bordered">
                          <td>DEDUCTION TOTAL</td>
                          <td>$260.00</td>
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
                        <p className="text-muted text-sm">: $4320.00</p>
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
                          : Four Thousand Three Hundred Twenty Dollars Only
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end align-item-end mt-4">
                  <Link to="/">
                    <button className="btn btn-sm btn-border mx-2">Back</button>
                  </Link>
                  <button
                    className="btn btn-success mx-2"
                    onClick={downloadPdf}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </section>
  );
}

export default Payslip;