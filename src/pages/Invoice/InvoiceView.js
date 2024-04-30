import React, { useEffect, useState } from "react";
import QR from "../../assets/images/view.png";
import Logo from "../../assets/images/Logo.png";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import fetchAllCoursesWithIds from "../List/CourseList";
import fetchAllStudentsWithIds from "../List/StudentList";
import { BsFillSendFill } from "react-icons/bs";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import SendAndPublish from "../../components/SendAndPublish";

function InvoiceView() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log("data", data);
  const [courseData, setCourseData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");

  const fetchData = async () => {
    try {
      const courseData = await fetchAllCoursesWithIds();
      const studentData = await fetchAllStudentsWithIds();
      setCourseData(courseData);
      setStudentData(studentData);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getGenerateInvoiceById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
    fetchData();
  }, [id]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(Logo, "Logo", 13, 25, 40, 25); // x, y, width, height

    doc.setFontSize(15);
    doc.text("Arty Learning @HG", 60, 25, { bold: true }); // Incorrect formatting, bold should be part of the options object

    doc.text("Tel No:87270752", 60, 40);
    doc.text("Email:Artylearning@gmail.com", 60, 50);

   
    doc.text(`Official Receipt`, 14, 70, { bold: true }); // Incorrect formatting, bold should be part of the options object
    doc.line(16, 70, 45, 70); // x, y, width, height

     doc.setFontSize(13);
    // Add invoice data
    doc.text(`Received From : ${data.invoiceNumber}`, 14, 80);
    doc.text(`Amount :${data.studentName}`, 14, 90);
    doc.text(`Payment Method : ${data.studentUniqueId}`, 14, 100);
    doc.text(`Being Payment Of : ${data.studentUniqueId}`, 14, 110);
    doc.text(`Receipt No : ${data.courseName}`, 135, 80);
    doc.text(
      `Date : ${data.dueDate ? data.dueDate.substring(0, 10) : "--"}`,
      140,
      90
    );

    doc.line(10, 150, 200, 150);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11)
    doc.text(`Payment Amount Specification`, 10, 126); // Add x, y coordinates for this line
    doc.text(`NO`, 10, 140);
    // doc.text(`Date`, 10, 145);
    doc.text(`27-01-2024`, 10, 155);

    doc.text(`Item`, 35, 140);
    // doc.text(`Type`, 35, 145);
    doc.text(`27-01-2024`, 35, 155);

    doc.text(`Item Amount`, 60, 140);
    // doc.text(` No`, 60, 145);
    doc.text(`27-01-2024`, 60, 155);

    doc.text(`Tax Type`, 87, 140);
    doc.text(`27-01-2024`, 87, 155);

    doc.text(`GST Amount`, 148, 140);
    // doc.text(` Amount`, 150, 145);
    doc.text(`27-01-2024`, 148, 155);

    doc.text(`Total Amount`, 175, 140);
    // doc.text(` Amount`, 175, 145);
    doc.text(`27-01-2024`, 175, 155);

    doc.line(10, 120, 200, 120); // x1, y1, x2, y2
    
    
   

    // Add the table
    // const tableData =
    //   data.invoiceItemsDtoList &&
    //   data.invoiceItemsDtoList.map((invoiceItem, index) => [
    //     index + 1,
    //     invoiceItem.item,
    //     invoiceItem.itemAmount,
    //     invoiceItem.taxType,
    //     invoiceItem.gstAmount,
    //     invoiceItem.totalAmount,
    //   ]);
    // doc.autoTable({
    //   startY: 120,
    //   head: [
    //     ["NO", "Item", "Item Amount", "Tax Type", "GST Amount", "Total Amount"],
    //   ],
    //   body: tableData,
    //   foot: [["", "", "", "", "Total", `${data.totalAmount || "--"}`]],
    // });

    // // Add Credit Advice Offset, GST, Total Amount
    // doc.text(
    //   `Credit Advice Offset: ${data.creditAdviceOffset || "--"}`,
    //   145,
    //   doc.autoTable.previous.finalY + 10
    // );
    // doc.text(
    //   `GST: ${data.gst || "--"}`,
    //   145,
    //   doc.autoTable.previous.finalY + 20
    // );
    // doc.text(
    //   `Total Amount: ${data.totalAmount || "--"}`,
    //   145,
    //   doc.autoTable.previous.finalY + 30
    // );

    // // Add Remark
    // doc.text(
    //   `Remark: ${data.remark || "--"}`,
    //   14,
    //   doc.autoTable.previous.finalY + 10
    // );

    // // Add QR code
    // doc.addImage(QR, "PNG", 160, doc.autoTable.previous.finalY + 40, 40, 40);
    // doc.text(`Send To Pay`, 190, doc.autoTable.previous.finalY + 85, {
    //   align: "right",
    //   fontWeight: "bold",
    // });

    // Save the PDF
    doc.save("invoice.pdf");
  };
  // const SendMail = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("from", "keerthickvasan08@gmail.com");
  //     formData.append("to", "keerthickvasan08@gmail.com");
  //     formData.append("from", "keerthickvasan08@gmail.com");
  //     formData.append("from", "keerthickvasan08@gmail.com");

  //     const payload = {
  //       from: "keerthickvasan08@gmail.com",
  //       to: "premvp24@gmail.com",
  //       subject: "string",
  //       body: "string"
  //       // files: []
  //     };
  //     const response = await api.post("/sendMailWithAttachment",  {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 201) {
  //       toast.success(response.data.message);
  //       // navigate("/invoice");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.message || "An error occurred while submitting the form"
  //     );
  //   }
  // };

  return (
    <div className="container-fluid mb-2 minHeight">
      <div className=" row">
        <div className="col-12 d-flex justify-content-end my-3 ">
          <Link to="/invoice">
            <button className="btn btn-border btn-sm me-1 ">Back</button>
          </Link>
          <Link to="#">
            <button className="btn btn-border btn-sm me-1 ">
              Void Invoice
            </button>
          </Link>
          {/* <Link to="/sendAndPublish"> */}
          <SendAndPublish data={data} id={id} />
          {/* </Link> */}
          <button className="btn btn-border btn-sm me-1 " onClick={generatePDF}>
            Generate Pdf
          </button>
          {storedScreens?.paymentCreate && (
            <Link to="/invoice/payment">
              <button className="btn btn-button btn-sm">Pay Now</button>
            </Link>
          )}
        </div>
      </div>
      <div className="card shadow border-0 minHeight">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 p-3">
              <div className="d-flex justify-content-center flex-column align-items-start">
                <img src={Logo} alt=".." />
                <p className="text-center fw-small">
                  Learning Languages The Creative Way
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 p-3 d-flex justify-content-center flex-column align-items-start">
              <h5>Arty Learning @HG</h5>
              <span>Tel No:87270752</span>
              <span>Email:Artylearning@gmail.com</span>
            </div>
            <div className="card-header my-5">
              <h5>Voided Invoice</h5>
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
                <div className="col-6">
                  - &nbsp;&nbsp;
                  {data.studentName || "--"}{" "}
                </div>
              </div>
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Student Id</p>
                </div>
                <div className="col-6">
                  - &nbsp; {data.studentUniqueId || "--"}
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
            </div>
            <div className="col-lg-6 col-md-6 col-12">
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
              <div className="row my-1">
                <div className="col-6 ">
                  <p>Course Id</p>
                </div>
                <div className="col-6">- &nbsp; {data.courseId || "--"}</div>
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
                    <td>{InvoiceItemRow.taxType}</td>
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
          <h5>Remark</h5>
          <div className="col-lg-8 col-md-8 col-12 mt-5">
            <div>
              <h5>Notes:</h5>
              <div className="container">
                <p>{data.remark || "--"}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-8 col-12">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <img src={QR} alt=".." />
              <p className="text-center">
                Arty Learning Pte.Ltd. <br />
                UEN:202042173K{" "}
              </p>
            </div>
          </div>
          {/* <div className="col-12 text-end my-5 pe-3">
            <button className="btn btn-sm  btn-danger me-5">
              Generate PDF
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default InvoiceView;
