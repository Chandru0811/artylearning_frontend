import React, { useEffect, useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

function MyMessagesView() {
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const { id } = useParams();
  console.log("data", data);

  const formik = useFormik({
    initialValues: {
      message: "",
      files: [],
    },
    onSubmit: async (values) => {
      if (values.message || values.files.length > 1) {
        setLoadIndicator(true);
        const formData = new FormData();

        formData.append("senderName", "Cheryl");
        formData.append("senderId", userId);
        formData.append("senderRole", userName);
        formData.append("messageTo", "PARENT");
        formData.append("recipientId", id);
        formData.append("recipientName", data[0].receiverName);
        formData.append("recipientRole", data[0].receiverRole);
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
            fileCount("");
            formik.resetForm();
            getData();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setLoadIndicator(false);
        }
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileCount(files.length);
    formik.setFieldValue("files", files);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    getData();
  }, [userId, id]);

  const getData = async () => {
    try {
      const response = await api.get(
        `getSingleChatConversation?transcriptOne=${userId}&transcriptTwo=${id}`
      );
      setData(response.data);
      const messages = response.data;
      console.log("messages", messages);
      const combinedMessages = messages.map((msg) => ({
        content: msg.message,
        isSender: msg.senderId === 211,
        attachments: msg.attachments,
      }));

      setMessages(combinedMessages);
      console.log("Messages:", combinedMessages);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    }
  };

  return (
    <section className="chat-section">
      <div className="container-fluid">
        <div className="row message-list">
          <div className="col-12">
            {/* Message List */}
            <div className="messages mb-5">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div className={`message ${msg.isSender ? "right" : ""}`}>
                    <div className="message-bubble my-2 w-75">
                      {msg.content}
                    </div>
                    {msg.attachments.length > 0 ? (
                      <div className="message-bubble w-75">
                        {msg.attachments.map((attachment, attIndex) => (
                          <>
                            <img
                              key={attIndex}
                              src={attachment.attachment}
                              alt=""
                            />
                          </>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
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
            <div className="col-md-11 col-11 px-2">
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
                    accept="image/*, video/*"
                    multiple
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1 col-1 d-flex align-items-start justify-content-start">
              <span className="p-2 rounded-circle text-bg-danger">
                <IoMdSend onClick={formik.handleSubmit} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyMessagesView;
