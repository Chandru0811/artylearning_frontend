import React, { useEffect, useRef, useState } from "react";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import document from "../../../assets/images/Blue and Peach Gradient Facebook Profile Picture.png";

function OtherMessagesView() {
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");
  const { id } = useParams();
  console.log("data", data);

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
        isSender: msg.senderRole == "SMS_TEACHER",
        attachments: msg.attachments,
      }));

      setMessages(combinedMessages);
      console.log("Messages:", combinedMessages);
    } catch (error) {
      toast.error(`Error Fetching Data: ${error.message}`);
    }
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
            <a href={fileUrl} download>
              <button className="btn ">
                <LuDownload size={24} color="#e60504" />
              </button>
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
                className="img-fluid"
              />
            </a>
            <a href={fileUrl} download style={{ textAlign: "end" }}>
              <button className="btn ">
                <LuDownload size={24} color="#e60504" />
              </button>
            </a>
          </div>
        </div>
      );
    } else if (["mp4", "mov", "avi", "mkv"].includes(extension)) {
      return (
        <div key={index} className="message-bubble w-75">
          <div style={{ textAlign: "end" }}>
            <video width="100%" height="auto" controls>
              <source src={fileUrl} type={`video/${extension}`} />
              Your browser does not support the video tag.
            </video>
            <div>
              <a href={fileUrl} download>
                <button className="btn">
                  <LuDownload size={24} color="#e60504" />
                </button>
              </a>
            </div>
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

  return (
    <section className="chat-section">
      <div className="container-fluid">
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
              {messages.map((msg, index) => (
                <div key={index}>
                  <div className={`message ${msg.isSender ? "right" : ""}`}>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OtherMessagesView;
