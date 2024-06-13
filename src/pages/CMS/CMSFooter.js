import React, { useState } from "react";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import { FaEdit, FaFacebookF, FaInstagram, FaRegSave } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function CMSFooter() {
  const [headingGang, setHeadingGang] = useState("Arty Learning @ gang");
  const [isEditingHeadGang, setIsEditingHeadGang] = useState(false);

  const handleChangeHeadgang = (e) => {
    setHeadingGang(e.target.value);
  };

  const toggleEditHeadGang = () => {
    setIsEditingHeadGang(!isEditingHeadGang);
  };

  const [headingAmk, setHeadingAmk] = useState("Arty Learning @ AMK");
  const [isEditingHeadAmk, setIsEditingHeadAmk] = useState(false);

  const handleChangeHeadAmk = (e) => {
    setHeadingAmk(e.target.value);
  };

  const toggleEditHeadAmk = () => {
    setIsEditingHeadAmk(!isEditingHeadAmk);
  };

  const [addressTextGang, setAddressTextGang] = useState(
    "806 Hougang Central, #04-146, Singapore 530806"
  );
  const [isEditingGang, setIsEditingGang] = useState(false);

  const handleChangeGang = (e) => {
    setAddressTextGang(e.target.value);
  };

  const toggleEditModeGang = () => {
    setIsEditingGang(!isEditingGang);
  };

  const [addressTextAmk, setAddressTextAmk] = useState(
    "728 Ang Mo Kio Ave 6, #01-4216, Singapore 560728"
  );
  const [isEditingAmk, setIsEditingAmk] = useState(false);

  const handleChangeAmk = (e) => {
    setAddressTextAmk(e.target.value);
  };

  const toggleEditModeAmk = () => {
    setIsEditingAmk(!isEditingAmk);
  };

  const [newsletter, setNewsletter] = useState("Subscribe to our newsletter");
  const [editNews, setEditNews] = useState(false);

  const handleChangeNews = (e) => {
    setNewsletter(e.target.value);
  };

  const toggleEditModeNews = () => {
    setEditNews(!editNews);
  };

  const [newsletterContent, setNewsletterContent] = useState(
    "The latest news, articles, and resources, sent to your inbox weekly."
  );
  const [editNewsContent, setEditNewsContent] = useState(false);

  const handleChangeNewsContent = (e) => {
    setNewsletterContent(e.target.value);
  };

  const toggleEditModeNewsContent = () => {
    setEditNewsContent(!editNewsContent);
  };

  const [allRights, setAllRights] = useState(
    "© 2017 ~ 2024 ArtyLearning. All rights reserved."
  );
  const [editAllRights, setEditAllRights] = useState(false);

  const handleChangeAllRights = (e) => {
    setAllRights(e.target.value);
  };

  const toggleEditModeAllRights = () => {
    setEditAllRights(!editAllRights);
  };

  const [hougangMap, setHougangMap] = useState(
    "© 2017 ~ 2024 ArtyLearning. All rights reserved."
  );
  const [editHougangMap, setEditHougangMap] = useState(false);

  const handleChangeHougangMap = (e) => {
    setHougangMap(e.target.value);
  };

  const toggleEditModeHougangMap = () => {
    setEditHougangMap(!editHougangMap);
  };

  const [privacyPolicy, setPrivacyPolicy] = useState(
    "https://artylearning.com/privacypolicy/index.html"
  );
  const [editPrivacyPolicy, setEditPrivacyPolicy] = useState(false);

  const handleChangePrivacyPolicy = (e) => setPrivacyPolicy(e.target.value);

  const toggleEditModePrivacyPolicy = () =>
    setEditPrivacyPolicy(!editPrivacyPolicy);

  const [termsandconditions, setTermsandconditions] = useState(
    "https://artylearning.com/privacypolicy/index.html"
  );
  const [editTeamsandcondition, setEditTeamsandcondition] = useState(false);

  const handleChangeTeamsandcondition = (e) =>
    setTermsandconditions(e.target.value);

  const toggleEditModeTeamsandcondition = () =>
    setEditTeamsandcondition(!editTeamsandcondition);

  return (
    <section className="cmsfooter mt-5">
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
              {isEditingHeadGang ? (
                <div>
                  <input
                    type="text"
                    value={headingGang}
                    onChange={handleChangeHeadgang}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditHeadGang}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditHeadGang}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {headingGang.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        <h4 style={{ fontWeight: "700" }}>
                          <b>{line}</b>
                        </h4>
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditHeadGang}
                      className="edit-icon-head"
                    />
                  </p>
                </div>
              )}
              {/* <FaEdit /> */}
              {isEditingGang ? (
                <div>
                  <input
                    type="text"
                    value={addressTextGang}
                    onChange={handleChangeGang}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditModeGang}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditModeGang}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {addressTextGang.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditModeGang}
                      className="edit-icon"
                    />
                  </p>
                </div>
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
              {isEditingHeadAmk ? (
                <div>
                  <input
                    type="text"
                    value={headingAmk}
                    onChange={handleChangeHeadAmk}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditHeadAmk}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditHeadAmk}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {headingAmk.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        <h4 style={{ fontWeight: "700" }}>
                          <b>{line}</b>
                        </h4>
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditHeadAmk}
                      className="edit-icon-head"
                    />
                  </p>
                </div>
              )}
              {isEditingAmk ? (
                <div>
                  <input
                    type="text"
                    value={addressTextAmk}
                    onChange={handleChangeAmk}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditModeAmk}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditModeAmk}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {addressTextAmk.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditModeAmk}
                      className="edit-icon"
                    />
                  </p>
                </div>
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
              {/* <p style={{ fontSize: "20px", fontWeight: "500" }}>
                Subscribe to our newsletter
              </p> */}
              {editNews ? (
                <div>
                  <input
                    type="text"
                    value={newsletter}
                    onChange={handleChangeNews}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditModeNews}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditModeNews}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {newsletter.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        <p style={{ fontSize: "20px", fontWeight: "500" }}>
                          {line}
                        </p>
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditModeNews}
                      className="edit-icon-news"
                    />
                  </p>
                </div>
              )}
              {/* <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p> */}
              {editNewsContent ? (
                <div>
                  <input
                    type="text"
                    value={newsletterContent}
                    onChange={handleChangeNewsContent}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditModeNewsContent}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditModeNewsContent}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {newsletterContent.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        <p>{line}</p>
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditModeNewsContent}
                      className="edit-icon-newscontent"
                    />
                  </p>
                </div>
              )}
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
              {/* <p>© 2017 ~ 2024 ArtyLearning. All rights reserved.</p> */}
              {editAllRights ? (
                <div>
                  <input
                    type="text"
                    value={allRights}
                    onChange={handleChangeAllRights}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditModeAllRights}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditModeAllRights}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    {allRights.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        <p>{line}</p>
                      </React.Fragment>
                    ))}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditModeAllRights}
                      className="edit-icon-allrights"
                    />
                  </p>
                </div>
              )}
            </div>

            <div className="col-md-4 col-12 mt-3">
              {editPrivacyPolicy ? (
                <div>
                  <input
                    type="text"
                    value={privacyPolicy}
                    onChange={handleChangePrivacyPolicy}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary btn-sm my-2"
                    onClick={toggleEditModePrivacyPolicy}
                  >
                    <FaRegSave />
                  </button>
                  <button
                    className="btn btn-danger btn-sm my-2 ms-2"
                    onClick={toggleEditModePrivacyPolicy}
                  >
                    <IoClose />
                  </button>
                </div>
              ) : (
                <div className="editable-text">
                  <p>
                    Privacy Policy{" "}
                    {/* <a href={privacyPolicy} target="_blank" rel="noopener noreferrer">
                      {privacyPolicy}
                    </a> */}
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      onClick={toggleEditModePrivacyPolicy}
                      className="edit-icon-privacy"
                    />
                  </p>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <span>
                  {/* <a
                    href="https://artylearning.com/termsandconditions/index.html"
                    style={{ color: "#000" }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p>Terms & Condition </p>
                  </a> */}
                  {editTeamsandcondition ? (
                    <div>
                      <input
                        type="text"
                        value={termsandconditions}
                        onChange={handleChangeTeamsandcondition}
                        className="form-control"
                      />
                      <button
                        className="btn btn-primary btn-sm my-2"
                        onClick={toggleEditModeTeamsandcondition}
                      >
                        <FaRegSave />
                      </button>
                      <button
                        className="btn btn-danger btn-sm my-2 ms-2"
                        onClick={toggleEditModeTeamsandcondition}
                      >
                        <IoClose />
                      </button>
                    </div>
                  ) : (
                    <div className="editable-text">
                      <p>
                        Teams and Condition{" "}
                        <FaEdit
                          style={{ cursor: "pointer" }}
                          onClick={toggleEditModeTeamsandcondition}
                          className="edit-icon-teams"
                        />
                      </p>
                    </div>
                  )}
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
