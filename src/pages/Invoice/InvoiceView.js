import React, { useEffect, useState } from "react";
import QR from "../../assets/images/view.png";
import Logo from "../../assets/images/Logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllStudentsWithIds from "../List/StudentList";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SendAndPublish from "../../components/SendAndPublish";
import fetchAllCentersWithIds from "../List/CenterList";

function InvoiceView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [invoiceItem, setInvoiceItem] = useState([]);
  console.log("data", data);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [centerData, setcenterData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [taxData, setTaxData] = useState([]);
  console.log("Tax Type:", taxData);

  const fetchData = async () => {
    setLoadIndicator(true);
    try {
      const courseData = await fetchAllCoursesWithIds();
      const studentData = await fetchAllStudentsWithIds();
      const centerData = await fetchAllCentersWithIds();
      setCourseData(courseData);
      setStudentData(studentData);
      setcenterData(centerData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.message || "Error fetching data");
    } finally {
      setLoadIndicator(false);
    }
  };

  const fetchTaxData = async () => {
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const qrCodeUrl = centerData
    ? centerData.reduce((src, center) => {
        return parseInt(data.centerId) === center.id
          ? center.qrCode || "--"
          : src;
      }, "")
    : "";
  console.log("QR Code:", qrCodeUrl);

  const uenNumber = centerData
    ? centerData.find((center) => parseInt(data.centerId) === center.id)
        ?.uenNumber || "--"
    : "";
  const invoiceNotes = centerData
    ? centerData.find((center) => parseInt(data.centerId) === center.id)
        ?.invoiceNotes || "--"
    : "";

  const generatePDF = async (qrCodeUrl) => {
    try {
      const doc = new jsPDF();
      doc.addImage(Logo, "PNG", 13, 25, 40, 25); // x, y, width, height

      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text(`${data.center}`, 130, 25);

      doc.setFont("helvetica", "normal");
      doc.text("Tel No:87270752", 130, 35);
      doc.text("Email:Artylearning@gmail.com", 130, 45);

      doc.line(16, 70, 50, 70); // x, y, width, height

      doc.setFontSize(13);
      doc.text(`Invoice Number : ${data.invoiceNumber || " "}`, 14, 80);
      doc.text(`Student Name :${data.studentName || " "}`, 14, 90);
      doc.text(`Student Id : ${data.studentUniqueId || " "}`, 14, 100);
      doc.text(`Course Name : ${data.courseName || " "}`, 120, 80);
      doc.text(
        `Invoice Date : ${
          data.invoiceDate ? data.invoiceDate.substring(0, 10) : "--"
        }`,
        120,
        90
      );
      doc.text(
        `Due Date : ${data.dueDate ? data.dueDate.substring(0, 10) : "--"}`,
        120,
        100
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Payment Amount Specification`, 10, 126); // Add x, y coordinates for this line

      doc.line(10, 120, 200, 120); // x1, y1, x2, y2

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(`Official Receipt`, 14, 70);

      const tableData =
        data.invoiceItemsDtoList &&
        data.invoiceItemsDtoList.map((invoiceItem, index) => [
          index + 1,
          invoiceItem.item,
          invoiceItem.itemAmount,
          taxData.find((tax) => parseInt(invoiceItem.taxType) === tax.id)
            ?.taxType || "--",
          invoiceItem.gstAmount,
          invoiceItem.totalAmount,
        ]);
      doc.autoTable({
        startY: 130,
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontStyle: "underline",
        },
        bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        head: [
          [
            "NO",
            "Item",
            "Item Amount",
            "Tax Type",
            "GST Amount",
            "Total Amount",
          ],
        ],
        body: tableData,
      });

      // Add Credit Advice Offset, GST, Total Amount below the table aligned to the right
      const rightAlignX = 185;
      const nextLineY = doc.autoTable.previous.finalY + 20;

      doc.setFontSize(11);

      // Credit Advice Offset
      doc.setFont("helvetica", "bold");
      doc.text(`Credit Advice Offset:`, rightAlignX - 20, nextLineY, {
        align: "right",
      });
      doc.setFont("helvetica", "normal");
      doc.text(`${data.creditAdviceOffset || "--"}`, rightAlignX, nextLineY, {
        align: "right",
      });

      // GST
      doc.setFont("helvetica", "bold");
      doc.text(`GST:`, rightAlignX - 20, nextLineY + 10, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.text(`${data.gst || "--"}`, rightAlignX, nextLineY + 10, {
        align: "right",
      });

      // Total Amount
      doc.setFont("helvetica", "bold");
      doc.text(`Total Amount:`, rightAlignX - 20, nextLineY + 20, {
        align: "right",
      });
      doc.setFont("helvetica", "normal");
      doc.text(`${data.totalAmount || "--"}`, rightAlignX, nextLineY + 20, {
        align: "right",
      });

      // Load QR code image
      const qrCodeImage = await loadImage(qrCodeUrl);

      // Add QR code to PDF
      if (qrCodeImage) {
        doc.addImage(qrCodeImage, "PNG", 145, nextLineY + 30, 40, 40);
        doc.text(`Send To Pay`, 175, nextLineY + 75, {
          align: "right",
          fontWeight: "bold",
        });
      } else {
        doc.addImage(QR, "PNG", 145, nextLineY + 30, 40, 40);
      }

      // Add Remarks at the end
      const finalY = nextLineY + 80;

      // "Invoice Notes" in bold
      doc.setFont("helvetica", "bold");
      doc.text("Invoice Notes:", 14, finalY);

      const invoiceNotesY = finalY + 10; // Adjust the 10 value to set the desired gap between the label and the notes

      // Invoice Notes text in normal (light) style
      doc.setFont("helvetica", "normal");
      const invoiceNote = doc.splitTextToSize(
        invoiceNotes || "--",
        170 // Width of the text area where you want to wrap the text
      );

      // Display the invoiceNotes text starting on the next line
      doc.text(invoiceNote, 14, invoiceNotesY);

      // Save the PDF
      doc.save(`${data.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Error generating PDF");
    }
  };

  const handleGeneratePDF = async () => {
    const qrCodeUrl = centerData
      ? centerData.reduce((src, center) => {
          return parseInt(data.centerId) === center.id ? center.qrCode : src;
        })
      : "";

    generatePDF(qrCodeUrl);
  };

  const VoidInvoice = async () => {
    try {
      const response = await api.put(`/convertToVoidInvoiceByInvoiceId/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // toast.success(response.data.message);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/invoice");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Can't be Cancelled");
    }
  };

  // Utility function to load image
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Enable CORS if needed
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getGenerateInvoiceById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getData();
    fetchData();
    fetchTaxData();
  }, [id]);

  return (
    <div className="container-fluid mb-2 minHeight">
      <ol
        className="breadcrumb my-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          Invoice and Payment
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/invoice" className="custom-breadcrumb">
            Invoice
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Invoice View
        </li>
      </ol>
      <div className=" row">
        <div className="col-12 d-flex justify-content-end my-3 ">
          <Link to="/invoice">
            <button className="btn btn-border btn-sm me-1 ">Back</button>
          </Link>

          <button
            type="button"
            className="btn btn-border btn-sm me-1"
            onClick={VoidInvoice}
          >
            Void Invoice
          </button>

          {/* <Link to="/sendAndPublish"> */}
          <SendAndPublish data={data} id={id} qr={qrCodeUrl} />
          {/* </Link> */}
          <button
            onClick={handleGeneratePDF}
            className="btn btn-border btn-sm me-1"
            disabled={loadIndicator}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Generate PDF
          </button>
        </div>
      </div>
      <div className="card shadow border-0 minHeight">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 p-3">
              <div className="d-flex justify-content-center flex-column align-items-start">
                <img src={Logo} className="img-fluid" width={150} alt=".." />
                <p className="text-center fw-small">
                  Learning Languages The Creative Way
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 p-3 d-flex justify-content-center flex-column align-items-start">
              <h5>
                {centerData &&
                  centerData.map((center) =>
                    parseInt(data.centerId) === center.id
                      ? center.centerNames || "--"
                      : ""
                  )}
              </h5>
              <span>Tel No : 87270752</span>
              <span>Email &nbsp;: Artylearning@gmail.com</span>
            </div>
            <div className="card-header my-5">
              <h5>Official Receipt</h5>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Invoice </p>
                </div>
                <div className="col-6">
                  - &nbsp; {data.invoiceNumber || "--"}{" "}
                </div>
              </div>
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Student Name </p>
                </div>
                <div className="col-6">- &nbsp; {data.studentName || "--"}</div>
              </div>
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Student Id</p>
                </div>
                <div className="col-6">
                  - &nbsp; {data.studentUniqueId || "--"}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Invoice Date</p>
                </div>
                <div className="col-6">
                  - &nbsp;{" "}
                  {data.invoiceDate ? data.invoiceDate.substring(0, 10) : "--"}
                </div>
              </div>
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Due Date</p>
                </div>
                <div className="col-6">
                  - &nbsp; {data.dueDate ? data.dueDate.substring(0, 10) : "--"}
                </div>
              </div>
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Course Name</p>
                </div>
                <div className="col-6">- &nbsp; {data.courseName || "--"}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-responsive px-3 mt-5">
          <table id="invoice-table" className="table table-nowrap ">
            <thead className="table-secondary">
              <tr>
                <th>NO</th>
                <th>Item</th>
                <th>Item Amount</th>
                <th>Tax Type</th>
                <th>GST Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.invoiceItemsDtoList &&
                data.invoiceItemsDtoList.map((InvoiceItemRow, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{InvoiceItemRow.item}</td>
                    <td>{InvoiceItemRow.itemAmount}</td>
                    <td>
                      {taxData &&
                        taxData.map((tax) =>
                          parseInt(InvoiceItemRow.taxType) === tax.id
                            ? `${tax.taxType + " " + tax.rate} %` || "--"
                            : ""
                        )}
                    </td>

                    <td>{InvoiceItemRow.gstAmount}</td>
                    <td>{InvoiceItemRow.totalAmount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="container mt-5">
          <div className="card-header border-1 rounded">
            <div className="d-flex justify-content-between">
              <div className="">Credit Advice Offset</div>
              <div className="">{data.creditAdviceOffset || "--"}</div>
            </div>
          </div>
          <div className="card-header border-1 rounded mt-5">
            <div className="d-flex justify-content-between">
              <div className="">GST</div>
              <div className="">{data.gst || "--"}</div>
            </div>
          </div>
          <div className="card-header border-1 rounded mt-5">
            <div className="d-flex justify-content-between">
              <div className="">Total Amount</div>
              <div className="">{data.totalAmount || "--"}</div>
            </div>
          </div>
        </div>
        <div className="row mt-5 ms-2">
          {/* <h5>Remark</h5> */}
          <div className="col-lg-8 col-md-8 col-12 mt-5">
            <div>
              <h5>Remarks:</h5>
              <div className="container">
                <p>{data.remark || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12 mt-5">
            <div>
              <h5>Notes:</h5>
              <div className="container">
                <p>{invoiceNotes || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-8 col-12">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <img src={qrCodeUrl} alt="Teacher" width="100" height="100" />
              {/* {data.qrCode ? (
                <img
                  src={
                    centerData
                      ? centerData.reduce((src, center) => {
                          return parseInt(data.centerId) === center.id
                            ? center.qrCode || "--"
                            : src;
                        }, "")
                      : BlockImg
                  }
                  onError={(e) => {
                    e.target.src = BlockImg;
                  }}
                  style={{ borderRadius: 70 }}
                  width="100"
                  height="100"
                  alt="Teacher"
                />
              ) : (
                <img
                  src={BlockImg}
                  alt="Teacher"
                  style={{ borderRadius: 70 }}
                  width="100"
                  height="100"
                />
              )} */}
              <p className="text-center">
                Arty Learning Pvt.Ltd <br />
                UEN : {uenNumber || " "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
