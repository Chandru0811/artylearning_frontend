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
    doc.text(`: hi`, 45, 70);
    doc.text(`: hi`, 45, 80);
    doc.text(`: hi`, 155, 70);
    doc.text(`: hi`, 155, 80);
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
    doc.text(`: hi`, 70, 115);
    doc.text("HEALTH", 120, 115);
    doc.text(`: hi`, 165, 115);

    // doc.text("OVERTIME", 10, 150);
    // doc.text("5", 40, 150);
    // doc.text("$100.00", 70, 150);
    doc.text("LOSS OF PAY", 120, 125);
    doc.text("$160.00", 165, 125);

    doc.text("BONUS", 10, 125);
    // doc.text("-", 40, 160);
    doc.text(`: hi`, 70, 125);

    doc.line(10, 129, 200, 129);
    doc.line(10, 140, 200, 140);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("GROSS PAY", 10, 135);
    // doc.text("265", 40, 170);
    doc.text(`: hi`, 70, 135);
    doc.text("DEDUCTION TOTAL", 120, 135);
    doc.text(`: hi`, 165, 135);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("NET PAY", 12, 150);
    doc.setFont("helvetica", "normal");
    doc.text(`: hi`, 70, 150);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("IN WORDS", 12, 160);
    doc.setFont("helvetica", "normal");
    doc.text(`: hi}`, 70, 160);

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
                            <td>{data.basicSalary}</td>
                          </tr>
                          {/* <tr>
                        <td>OVERTIME</td>
                        <td>5</td>
                        <td>$100.00</td>
                      </tr> */}
                          <tr>
                            <td>BONUS</td>
                            {/* <td>-</td> */}
                            <td>{data.bonus}</td>
                          </tr>
                          <tr>
                            <td style={{ visibility: "hidden" }}>jjk</td>
                            <td style={{ visibility: "hidden" }}>fvbg</td>
                          </tr>
                          <tr className="table-bordered">
                            <td>GROSS PAY</td>
                            {/* <td>265</td> */}
                            <td>{data.grossPay}</td>
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
                          {data.deductions &&
                            data.deductions.map((data, index) => (
                              <tr key={index + 1}>
                                <td>{data.detectionName}</td>
                                <td>{data.amount}</td>
                              </tr>
                            ))}
                          <tr>
                            <td style={{ visibility: "hidden" }}>jjk</td>
                            <td style={{ visibility: "hidden" }}>fvbg</td>
                          </tr>
                          <tr className="table-bordered">
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
