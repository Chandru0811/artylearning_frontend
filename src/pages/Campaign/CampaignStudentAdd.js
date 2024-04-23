import React from "react";
import Contactlist from "../../assets/images/Contactlist.png";
import AddContact from "../../assets/images/AddContact.png";
import { Link } from "react-router-dom";


function CampaignStudentAdd() {
  return (
    <section className="campaignStudentAdd">
    <div
      className="d-flex justify-content-around align-items-center p-5"
      style={{ minHeight: "80vh" }}
    >
      <div className="card1 mb-5 " style={{ maxWidth: "20rem" }}>
        <div
          className="card head align-items-center bg-head"
          style={{ minHeight: "140px" }}
        >
          <h5 className="m-3">List of Contacts</h5>
          <img
            src={Contactlist}
            style={{ width: "3rem", height: "3rem" }}
            alt="Contact List"
          />
        </div>
        <div
          className="card-body bg-body  align-item-center"
          style={{ minHeight: "120px" }}
        >
          <p className="card-text">Select an option to see all contacts</p>
          <div className="d-flex justify-content-center align-item-center pb-3">
            <Link to="/campaign/student/add/list">
              <button className="btn btn-button" type="button">
                Select
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card2 mb-5" style={{ maxWidth: "20rem" }}>
        <div
          className="card head align-items-center bg-head"
          style={{ minHeight: "140px" }}
        >
          <h5 className="m-3">Add Contacts</h5>
          <img
            src={AddContact}
            style={{ width: "3rem", height: "3rem" }}
            alt="Add Contacts"
          />
        </div>
        <div
          className="card-body bg-body align-items-center"
          style={{ minHeight: "120px" }}
        >
          <p className="card-text">Select an option to add contacts mutually</p>
          <div className="d-flex justify-content-center align-item-center pb-3">
            <Link to={'/campaign/contact'}>
              <button className="btn btn-button" type="button">
                Add New
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}

export default CampaignStudentAdd;
