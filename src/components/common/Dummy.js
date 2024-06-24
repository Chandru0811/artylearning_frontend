import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../config/URL";
import fetchAllCentersWithIds from "../pages/List/CenterList";
import BlockImg from "../path/to/your/default-image.png"; // Adjust this import to the actual path

function SendAndPublish({ data }) {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [centerData, setCenterData] = useState(null);

  // Function to get the QR code URL dynamically
  const getQRCodeUrl = () => {
    if (centerData && data.centerId) {
      const center = centerData.find(
        (center) => center.id === parseInt(data.centerId)
      );
      return center ? center.qrCode : "https://example.com/default-qr.png";
    }
    return "https://example.com/default-qr.png";
  };

  // Fetch center data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoadIndicator(true);
      try {
        const centers = await fetchAllCentersWithIds();
        setCenterData(centers);
      } catch (error) {
        toast.error(error.message || "Error fetching data");
      } finally {
        setLoadIndicator(false);
      }
    };
    fetchData();
  }, []);

  // Function to send email
  const sendEmail = async () => {
    const qrCodeUrl = getQRCodeUrl();

    try {
      const mailContent = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Invoice</title>
          <style>
            .invoice-box {
              font-size: 12px;
              max-width: 600px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              line-height: 24px;
              font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
              color: #555;
              min-height: 100vh;
            }
            .invoice-box table {
              width: 100%;
              line-height: inherit;
              text-align: left;
            }
            .invoice-box table td {
              padding: 5px;
              vertical-align: top;
            }
            .invoice-box table td.third {
              text-align: right;
            }
            .invoice-box table tr.heading td {
              background: #eee;
              border-bottom: 1px solid #ddd;
              font-weight: bold;
            }
            .invoice-box table tr.item td {
              border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
              border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
              border-top: 2px solid #eee;
              font-weight: bold;
            }
            #scan {
              float: right;
            }
            #scan img {
              max-width: 100%;
              height: auto;
            }
            @media print {
              .invoice-box {
                border: 0;
              }
            }
            #LABEL1 label, #LABEL2 label {
              display: inline-block;
              width: 15%;
              padding: 5px;
            }
            #LABEL1 span, #LABEL2 span {
              display: inline-block;
              width: 20%;
              padding: 5px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <table>
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <img src="https://artylearning.com/static/media/Logo.f01b9cbb8e8f1d1c7792.png"
                          style="width: 75%; max-width: 180px" alt="Logo" />
                      </td>
                      <td class="third">
                        <b>Arty Learning @HG</b><br />
                        Tel No: 87270752<br />
                        Email: Artylearning@gmail.com
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
            <div id="LABEL1" style="width: 150% !important;">
              <strong>Voided Invoice</strong>
              <br />
              <div style="display: flex;">
                <label>Invoice</label>
                <span>: ${data.invoiceNumber}</span>
                <label>Due Date</label>
                <span>: ${data.dueDate ? data.dueDate.substring(0, 10) : "--"}</span>
              </div>
              <div style="display: flex;">
                <label>Student Name</label>
                <span>: ${data.studentName}</span>
                <label>Course Name</label>
                <span>: ${data.courseName}</span>
              </div>
              <div style="display: flex;">
                <label>Student Id</label>
                <span>: ${data.studentUniqueId}</span>
                <label>Course Id</label>
                <span>: ${data.courseId}</span>
              </div>
            </div>
            <br/>
            <div style="max-width: 590px; overflow: auto">
              <table>
                <tr class="heading">
                  <td>No</td>
                  <td>Item</td>
                  <td>Item Amount</td>
                  <td>Tax Type</td>
                  <td>GST Amount</td>
                  <td>Total Amount</td>
                </tr>
                ${data.invoiceItemsDtoList.map((product, index) => `
                  <tr>
                    <td>${index + 1 || "--"}</td>
                    <td>${product.item || "--"}</td>
                    <td>${product.itemAmount || "--"}</td>
                    <td>${product.taxType || "--"}</td>
                    <td>${product.gstAmount || "0"} %</td>
                    <td>${product.totalAmount}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            <table style="margin-top: 20px; border: 1px solid #eee">
              <tr>
                <td style="width: 75%">
                  <b>Credit Advice Offset</b>
                </td>
                <td>${data.creditAdviceOffset || "--"}</td>
              </tr>
            </table>
            <table style="margin-top: 20px; border: 1px solid #eee">
              <tr>
                <td style="width: 75%">
                  <b>GST</b>
                </td>
                <td>${data.gst || "--"}</td>
              </tr>
            </table>
            <table style="margin-top: 20px; border: 1px solid #eee">
              <tr>
                <td style="width: 75%">
                  <b>Grand Total</b>
                </td>
                <td>${data.totalAmount || "--"}</td>
              </tr>
            </table>
            <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
              <div style="width: 50%">
                <p><strong style="margin-right: 14px;">Remark</strong></p>
                <strong style="margin-right: 14px; margin-bottom: 50px;">Notes:</strong>
                <p style="margin-top: 0px; margin-left: 10px;">${data.remark || "--"}</p>
                <br />
              </div>
              <div style="width: 50%; text-align: end">
                <img src="${qrCodeUrl}" alt="QR Code" style="border-radius: 70%; width: 100px; height: 100px;" />
                <div><strong style="margin-right: 14px; margin-bottom: 10px;">Arty Learning Pte. Ltd.</strong></div>
                <div><strong style="margin-right: 34px; margin-bottom: 10px;">UEN: 202042173K</strong></div>
              </div>
            </div>
          </div>
        </body>
      </html>`;

      const formData = new FormData();
      formData.append("from", data.parentEmail);
      formData.append("to", data.parentEmail);
      formData.append("subject", "Invoice");
      formData.append("htmlContent", mailContent);

      setLoadIndicator(true);

      const response = await api.post("/sendMailWithAttachment", formData);

      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Error sending email");
    } finally {
      setLoadIndicator(false);
    }
  };

  return (
    <Button variant="border" size="sm" onClick={sendEmail} disabled={loadIndicator}>
      {loadIndicator && (
        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
      )}
      Send and Publish
    </Button>
  );
}

export default SendAndPublish;
