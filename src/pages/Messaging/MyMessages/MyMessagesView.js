import React, { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io";
import Student from "../../../assets/images/Documentimg_6.png";
import Pdf from "../../../assets/images/Pdf_Image.png";
import { CgAttachment } from "react-icons/cg";

function MyMessagesView() {
  const fileInputRef = useRef(null);
  const [fileCount, setFileCount] = useState(0);

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileCount(files.length);
    console.log(files);
    // Handle the selected files here
  };

  return (
    <section className="chat-section">
      <div className="container-fluid">
        <div className="row message-list">
          <div className="col-12">
            {/* Message List */}
            <div className="messages">
              <div className="message">
                <div className="message-bubble">
                  Hello! <br />
                  <img
                    className="img-fluid mt-4"
                    src={Student}
                    alt="file"
                  ></img>
                </div>
              </div>
              <div className="message right">
                <div className="message-bubble">
                  Hi there! <br />
                  <img
                    className="img-fluid mt-4"
                    style={{ width: "200px", height: "200px" }}
                    src={Pdf}
                    alt="file"
                  ></img>
                </div>
              </div>
              {/* Add more messages here */}
            </div>
          </div>
        </div>
        <div className="row pt-3" style={{ backgroundColor: "#fff" }}>
          <div className="col-md-9 col-12"></div>
          <div className="col-md-3 col-12">
            {fileCount > 0 && (
              <div className="file-count">
                <p style={{marginBottom: "0px"}}>{fileCount} file(s) selected</p>
              </div>
            )}
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "#fff" }}>
          <div className="col-md-11 col-11 px-2">
            <div className="mb-3">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
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
                  multiple
                />
              </div>
            </div>
          </div>
          <div
            className="col-md-1 col-1 d-flex align-items-start justify-content-start"
          >
            <IoMdSend className="send-icon" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyMessagesView;
