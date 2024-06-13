import React, { useState } from "react";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import { FaEdit, FaFacebookF, FaInstagram, FaRegSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function CMSFooter() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [addressText, setAddressText] = useState(
    "806 Hougang Central, #04-146, Singapore 530806"
  );
  const [addressText1, setAddressText1] = useState(
    "728 Ang Mo Kio Ave 6, #01-4216, Singapore 560728"
  );

  const handleChange = (e) => {
    setAddressText(e.target.value);
  };

  const handleChange1 = (e) => {
    setAddressText1(e.target.value);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const toggleEditMode1 = () => {
    setIsEditing1(!isEditing1);
  };

  return (
    <section className="mt-5">
      <div className="container">
        <div className="row">
          <div className="text-end">
            <button className="btn btn-secondary me-2">Save</button>
            <button className="btn btn-danger">Save & Publish</button>
          </div>
        </div>
      </div>
      <div className="footer mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12 mt-3">
              <h4 style={{ fontWeight: "700" }}>
                <b>Arty Learning @ gang</b>
              </h4>
              {/* <FaEdit /> */}
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={addressText}
                    onChange={handleChange}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditMode}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditMode}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <p>
                  {addressText.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    onClick={toggleEditMode}
                  />
                </p>
              )}
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.673307615837!2d103.8430989749658!3d1.3727030986143165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da17835aa20b21%3A0x41c3c93369410510!2sArty%20Learning%20%40%20Ang%20Mo%20Kio%20%7C%20Enrichment%20Classes%20for%20Kids!5e0!3m2!1sen!2sin!4v1709642424960!5m2!1sen!2sin"
                width="90%"
                height="200"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="col-md-4 col-12 mt-3">
              <h4 style={{ fontWeight: "700" }}>
                <b>Arty Learning @ AMK</b>
              </h4>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={setAddressText1}
                    onChange={handleChange1}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditMode1}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditMode1}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <p>
                  {addressText1.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                  &nbsp;
                  <FaEdit
                    style={{ cursor: "pointer" }}
                    onClick={toggleEditMode1}
                  />
                </p>
              )}
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6759974761326!2d103.89156087496583!3d1.3710896986159518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da171a746bd625%3A0x1c735a076971a9a5!2sArty%20Learning%20%40%20Hougang%20%7C%20Enrichment%20Classes%20for%20Kids!5e0!3m2!1sen!2sin!4v1709641787810!5m2!1sen!2sin"
                width="90%"
                height="200"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="col-md-3 col-12 mt-3">
              <p style={{ fontSize: "20px", fontWeight: "500" }}>
                Subscribe to our newsletter
              </p>
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>

              <div className="row">
                <div className="col-md-8 col-12">
                  <input className="form-control mt-3 "></input>
                </div>
                <div className="col-md-4 col-12">
                  <button className="mt-3 btn btn-danger btn-danger-button">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-12 mt-3">
              <p>© 2017 ~ 2024 ArtyLearning. All rights reserved.</p>
            </div>
            <div className="col-md-4 col-12 mt-3">
              <a
                href="https://artylearning.com/privacypolicy/index.html"
                style={{ color: "#000" }}
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-center">Privacy Policy</p>
              </a>
            </div>
            <div className="col-md-4 col-12 mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <span>
                  <a
                    href="https://artylearning.com/termsandconditions/index.html"
                    style={{ color: "#000" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>Terms & Condition </p>
                  </a>
                </span>
                <span className="d-flex">
                  <Link to="#" className="mx-2" style={{ color: "red" }}>
                    <FaFacebookF />
                  </Link>
                  <Link to="#" className="mx-2" style={{ color: "red" }}>
                    <FaInstagram />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CMSFooter;