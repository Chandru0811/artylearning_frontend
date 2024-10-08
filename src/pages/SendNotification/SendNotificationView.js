import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../config/URL";
import AttactmentPdf from "../../assets/images/Attactmentpdf.jpg";
import AttactmentExcel from "../../assets/images/AttactmentExcel.jpg";
import AttactmentOther from "../../assets/images/Attactmentothers.jpg";
import AttactmentWord from "../../assets/images/AttactmentWord.jpg";
import AttactmentPpt from "../../assets/images/AttachmentPpt.png";
import { IoMdDownload } from "react-icons/io";

function SendNotificationView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  console.log("Data", data);

  const renderAttachment = (attachment) => {
    if (!attachment || !attachment.fileUrl) {
      return <span>No attachment available</span>;
    }
    // console.log("firstAttachment", attachment)
    const url = attachment.fileUrl;
    const extension = url.split(".").pop().toLowerCase();
    const fileName = url.split("/").pop();

    const downloadFile = () => {
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    // const deletedId = data.smsPushNotificationAttachments[0]?.id;

    const renderCard = (src, label, attachmentId, isVideo = false) => (
      <div className="position-relative d-flex align-items-center mb-3">
        <div className="card" style={{ width: "18rem", marginTop: "20px" }}>
          {isVideo ? (
            <video
              width="100%"
              height="auto"
              controls
              style={{ maxHeight: "150px" }}
            >
              <source src={src} type="video/mp4" />
              <source src={src} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={src}
              alt={label}
              style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <div className="row">
              <div className="col-md-8 col-12 text-end">
                <p>{fileName}</p>
              </div>
              <div className="col-md-4 col-12 text-end">
                <p>
                  <IoMdDownload
                    onClick={downloadFile}
                    style={{ cursor: "pointer" }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className="delete-icon-container"
          style={{ marginLeft: "10px", marginBottom: "8rem" }}
        >
          <Delete path={`/deleteSmsPushNotifications/${deletedId}`} id={attachmentId} onSuccess={getData} />
          <Delete id={attachmentId} onSuccess={getData} />
        </div> */}

      </div>
    );

    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return renderCard(url, "Image", attachment.id);
      case "pdf":
        return renderCard(AttactmentPdf, "PDF", attachment.id);
      case "xls":
      case "xlsx":
      case "csv":
        return renderCard(AttactmentExcel, "Excel", attachment.id);
      case "mp4":
      case "ogg":
        return renderCard(url, "Video", attachment.id, true);
      case "doc":
      case "docx":
        return renderCard(AttactmentWord, "Word", attachment.id);
      case "ppt":
      case "pptx":
        return renderCard(AttactmentPpt, "PPT", attachment.id);
      default:
        return renderCard(AttactmentOther, "Other", attachment.id);
    }
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getAllSmsPushNotificationsById/${id}`);
      console.log("first", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container ">
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/sendNotification">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>
      <div>
        <div className="container">
          {/* <h1 className="headColor">View Announcement</h1> */}
          <div className="row mt-2 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6">
                  <p className="fw-medium">Recipient </p>
                </div>
                <div className="col-6 text-start">
                  <p className="text-muted text-sm">
                    {" "}
                    : {data.recipient}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6">
                  <p className="fw-medium">Title </p>
                </div>
                <div className="col-6 text-start">
                  <p className="text-muted text-sm">
                    {" "}
                    : {data.messageTitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-12 mb-3">
          <div className="row">
            <div className="col-6">
              <p className="fw-medium">Centre</p>
            </div>
            <div className="col-6 text-start">
              <p className="text-muted">: {data?.centerIds?.map(center => center.centerName).join(", ")}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12 mb-3">
          <div className="row">
            <div className="col-6">
              <p className="fw-medium">Course</p>
            </div>
            <div className="col-6 text-start">
              <p className="text-muted">: {data?.courseIds?.map(course => course.courseName).join(", ")}</p>
            </div>
          </div>
        </div>

            <div className="col-md-6 col-12 mb-3">
          <div className="row">
            <div className="col-6">
              <p className="fw-medium">Class</p>
            </div>
            <div className="col-6 text-start">
              <p className="text-muted">: {data?.classIds?.map(cls => cls.className).join(", ")}</p>
            </div>
          </div>
        </div>

            <div className="col-md-6 col-12">
              <div className="row mb-2">
                <div className="col-6">
                  <p className="fw-medium">Day </p>
                </div>
                <div className="col-6 text-start">
                  <p className="text-muted text-sm">
                     : {data.days}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 mb-3">
          <div className="row">
            <div className="col-6">
              <p className="fw-medium">Message</p>
            </div>
            <div className="col-6">
              <p className="text-muted">: {data.messageDescription}</p>
            </div>
          </div>
        </div>
          
            <div className="col-md-12 col-12 mb-3">
              <div className="row mb-2">
                <div className="col-12">
                  <p className="fw-medium">Attachments :</p>
                </div>
                {data.attachments && data.attachments.length > 0 ? (
                  <div className="col-6">
                  <p className="my-2 d-flex">
                    {data.attachments.map((attachment, index) => (
                      <div key={index} className="col-md-6 col-12 mb-2">
                        {renderAttachment(attachment)}
                      </div>
                    ))}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">No attachments available</p>
                )}

              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendNotificationView;
