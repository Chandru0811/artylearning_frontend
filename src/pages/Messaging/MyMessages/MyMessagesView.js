import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { Link, useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
// import { LuDownload } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";
// import { MdDelete } from "react-icons/md";
import document from "../../../assets/images/Blue and Peach Gradient Facebook Profile Picture.png";

function MyMessagesView() {
  const fileInputRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);
  const location = useLocation();
  const {
    senderId,
    receiverId,
    senderName,
    senderRole,
    receiverName,
    message,
  } = location.state || {};
  const [fileCount, setFileCount] = useState(0);
  const userId = localStorage.getItem("userId");
  const LoginUserName = localStorage.getItem("LoginUserName");
  const LoginUserRole = localStorage.getItem("userName");
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      message: "",
      files: [],
    },
    onSubmit: async (values) => {
      if (values.message || values.files.length > 0) {
        const formData = new FormData();

        formData.append("senderName", LoginUserName);
        formData.append("senderId", userId);
        formData.append("senderRole", LoginUserRole);
        formData.append("messageTo", "PARENT");

        if (senderId === userId) {
          formData.append("recipientId", data.receiverId);
          formData.append("recipientName", data.receiverName);
          formData.append("recipientRole", data.receiverRole);
        } else {
          formData.append("recipientId", senderId);
          formData.append("recipientName", senderName);
          formData.append("recipientRole", senderRole);
        }
        formData.append("message", values.message);

        if (values.files.length > 0) {
          values.files.forEach((file) => {
            formData.append("attachments", file);
          });
        }

        try {
          const response = await api.post("/sendMessage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.status === 201) {
            setFileCount("");
            formik.resetForm();
            getData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    },
  });

  const processMessages = (messages, currentUserId, currentRole) => {
    return messages.map((msg) => {
      if (msg.senderId === msg.receiverId) {
        return { ...msg, messageType: "Self-Message" };
      } else if (
        msg.senderId === currentUserId &&
        msg.senderRole === currentRole
      ) {
        return { ...msg, messageType: "Sent" };
      } else if (
        msg.receiverId === currentUserId &&
        msg.receiverRole === currentRole
      ) {
        return { ...msg, messageType: "Received" };
      } else {
        return { ...msg, messageType: "Other" };
      }
    });
  };

  const getData = async () => {
    try {
      const response = await api.get(
        `getSingleChatConversation?transcriptOne=${senderId}&transcriptTwo=${receiverId}`
      );
      setData(response.data);
      const messages = processMessages(response.data, userId, LoginUserRole); // Process Messages
      const combinedMessages = messages.map((msg) => ({
        content: msg.message,
        isSender: msg.messageType === "Sent",
        messageType: msg.messageType, // Add message type
        attachments: msg.attachments,
        senderRole: msg.senderRole,
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(combinedMessages);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileCount(files.length);
    formik.setFieldValue("files", files);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const renderAttachment = (attachment, index) => {
    if (!attachment) {
      return <span>No attachment available</span>;
    }

    const fileUrl = attachment.attachment;
    const extension = fileUrl.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "bmp"].includes(extension)) {
      return (
        <div key={index} className="message-bubble w-75">
          <div style={{ textAlign: "end" }}>
            <a href={fileUrl} download>
              <img
                src={fileUrl}
                alt=""
                style={{ width: "100%", maxHeight: "170px", cursor: "pointer" }}
                className="img-fluid"
              />
            </a>
          </div>
        </div>
      );
    } else if (extension === "pdf") {
      return (
        <div key={index} className="message-bubble w-75">
          <div style={{ textAlign: "end" }}>
            <a href={fileUrl} download>
              <img
                src={document}
                alt=""
                style={{ width: "100%", maxHeight: "170px", cursor: "pointer" }}
                className="img-fluid "
              />
            </a>
          </div>
        </div>
      );
    } else if (["mp4", "mov", "avi", "mkv"].includes(extension)) {
      return (
        <div key={index} className="message-bubble w-75">
          <div style={{ textAlign: "end" }}>
            <video width="100%" height="170px" controls>
              <source src={fileUrl} type={`video/${extension}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     getData(); // Trigger the getData function after 2 seconds
  //   }, 1000); // 2000ms = 2 seconds

  //   // Cleanup the timeout in case the component unmounts or the effect runs again
  //   return () => clearTimeout(timer);
  // }); 
  
  useEffect(() => {
    getData();
  },[id]);

  return (
    <>
      <section className="chat-section">
        <div className="container-fluid">
          {/* <div className="text-end bg-light p-1">
            <Link to={"/messaging"}>
              <button type="button" className="btn btn-border btn-sm">
                Back
              </button>
            </Link>
          </div> */}
          <div className="row message-list">
            <div className="col-12">
              {/* Message List */}
              <div
                className="messages mb-5"
                ref={messagesContainerRef}
                style={{
                  maxHeight: "450px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {/* {messages.map((msg, index) => (
                  <div key={index}>
                    <div className={`message ${msg.isSender ? "right" : "left"}`}>
                      <div className="message-bubble my-2 w-75">
                        {msg.content}
                      </div>
                      {msg.attachments.length > 0 ? (
                        msg.attachments.map((attachment, attIndex) => (
                          <div
                            key={attIndex}
                            className="message-bubble w-75 mt-2"
                          >
                            {renderAttachment(attachment, attIndex)}
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                      <div
                        className="message-bubble my-2 w-75"
                        style={{ fontSize: "11px", background: "transparent" }}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))} */}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${
                      msg.senderRole === "SMS_BRANCH_ADMIN" ? "right" : "left"
                    }`}
                  >
                    <div
                      className={`message-bubble my-2 w-75 ${
                        msg.senderRole === "SMS_BRANCH_ADMIN"
                          ? "align-self-end"
                          : "align-self-start"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.attachments?.length > 0 &&
                      msg.attachments.map((attachment, attIndex) => (
                        <div
                          key={attIndex}
                          className={`message-bubble w-75 mt-2 ${
                            msg.senderRole === "SMS_BRANCH_ADMIN" ||
                            msg.senderRole === "SMS_STAFF" ||
                            msg.senderRole === "SMS_TEACHER" ||
                            msg.senderRole === "SMS_FREELANCER"
                              ? "align-self-end"
                              : "align-self-start"
                          }`}
                        >
                          {renderAttachment(attachment, attIndex)}
                        </div>
                      ))}
                    <div
                      className={`message-bubble my-2 w-75 ${
                        msg.senderRole === "SMS_BRANCH_ADMIN"
                          ? "align-self-end"
                          : "align-self-start"
                      }`}
                      style={{ fontSize: "11px", background: "transparent" }}
                    >
                      {msg.time}
                    </div>
                    {/* {msg.senderRole === "SMS_BRANCH_ADMIN" && (
                      <div className="text-end message-bubble">
                        <MdDelete style={{ cursor: "pointer" }} onClick={() => handleDeleteMessage(msg.messageId)} />
                      </div>
                    )} */}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="sticky-input-container">
            <div
              className="row p-1 w-100 ms-1"
              style={{ backgroundColor: "#fff" }}
            >
              <div className="col-md-9 col-12"></div>
              <div className="col-md-3 col-12">
                {fileCount > 0 && (
                  <div className="file-count">
                    <p style={{ marginBottom: "0px" }}>
                      {fileCount} file(s) selected
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="row ms-1">
              <div className="col-md-1 col-1 d-flex align-items-start justify-content-end">
                <Link to={"/messaging"}>
                  <button type="button" className="btn btn-sm btn-border">
                    <IoChevronBackOutline className="fs-6" />
                  </button>
                </Link>
              </div>
              <div className="col-md-10 col-10 px-2">
                <div className="mb-3">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      placeholder="Type a message"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      {...formik.getFieldProps("message")}
                      className={`form-control ${
                        formik.touched.message && formik.errors.message
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <span
                      className="input-group-text"
                      id="basic-addon2"
                      onClick={handleAttachmentClick}
                    >
                      <CgAttachment style={{ cursor: "pointer" }} />
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="*"
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-1 col-1 d-flex align-items-start justify-content-start">
                <button
                  type="button"
                  className="btn btn-sm btn-button"
                  onClick={formik.handleSubmit}
                >
                  <IoMdSend className="fs-6 " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyMessagesView;
