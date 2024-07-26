import React from "react";
import { IoMdSend } from "react-icons/io";
import Student from "../../../assets/images/Documentimg_6.png";
import Pdf from "../../../assets/images/Pdf_Image.png";
import { CgAttachment } from "react-icons/cg"; // Adjust the import path as needed
// import "./custom.css";  // Import the custom CSS file

function MyMessagesView() {
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
        <div className="row mt-3">
          <div className="col-md-11 col-11 px-2">
            <div className="mb-3" style={{ marginTop: "20px" }}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type a message"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                <CgAttachment />
                </span>
              </div>
              {/* <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Type a message"
                style={{ borderRadius: "20px" }}
              /> */}
            </div>
          </div>
          <div
            className="col-md-1 col-1 d-flex align-items-start justify-content-start"
            style={{ marginTop: "18px" }}
          >
            <IoMdSend className="send-icon" />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </section>
  );
}

export default MyMessagesView;
