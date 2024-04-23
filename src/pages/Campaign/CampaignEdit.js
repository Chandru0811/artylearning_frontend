import React from "react";
import Student from "../../assets/images/chinese_student.png";
import { GoX } from "react-icons/go";
import { Link } from "react-router-dom";

function CampaignEdit() {
  return (
    <section className="container py-3">
      <div className="container  py-3 px-4">
        <div className="row d-flex justify-content-start  align-items-center ">
          <div className="col-3  text-center ">
            <label className="form-label mx-auto headColor">Topic </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              value="Today Holiday"
              className="form-control mx-3"
              style={{ width: "60%" }}
            />
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-start  align-items-center ">
          <div className="col-3  text-center ">
            <label className="form-label mx-auto headColor">Subject</label>
          </div>
          <div className="col-9">
            <input
              type="text"
              value="Due to heavy rain today is holiday for all"
              className="form-control mx-3"
              style={{ width: "60%" }}
            />
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-start  align-items-start ">
          <div className="col-3 text-center my-2">
            <label className="form-label mx-auto headColor">Teacher </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              value="Tan LeAnne"
              className="form-control mx-3 my-2"
              style={{ width: "60%" }}
            />
            <input
              type="email"
              value="tanleanne@gmail.com"
              className="form-control mx-3 my-2"
              style={{ width: "60%" }}
            />
            <input
              type="text"
              value="65432578"
              className="form-control mx-3 my-2"
              style={{ width: "60%" }}
            />
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-start  align-items-center ">
          <div className="col-3  text-center ">
            <label className="form-label mx-auto headColor">Student </label>
          </div>
          <div className="col-7 d-flex justify-content-start align-items-start ">
            <button
              type="button"
              className="btn btn-sm border"
              style={{ backgroundColor: "#fce6cf" }}
            >
              Arty Dreamer <GoX />
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm border"
              style={{ backgroundColor: "#fce6cf" }}
            >
              Arty Dreamer <GoX />
            </button>
            <br />
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-sm border"
              style={{ backgroundColor: "#fce6cf" }}
            >
              Arty Dreamer <GoX />
            </button>
          </div>
          <div className="col-2">
            <button className="btn  btn-border btn-sm">Add Student</button>
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-start align-items-start ">
          <div className="col-3 text-center ">
            <label className="form-label mx-auto headColor">Content</label>
          </div>
          <div className="col-9">
            <div>
              <button className="btn btn-border btn-sm mx-3 ">
                <div className="d-flex">Message</div>
              </button>
              <button className="btn btn-border btn-sm mx-3 ">
                <div className="d-flex">
                  Image <box-icon type="" name="cloud-upload"></box-icon>
                </div>
              </button>
              <button
                className="btn btn-border btn-sm mx-3"
                style={{ backgroundColor: "#e99e5e" }}
              >
                <div className="d-flex">
                  Message & Image
                  <box-icon type="" name="cloud-upload"></box-icon>
                </div>
              </button>
            </div>
            <div className="container">
              <div className="col-7 mt-3 mb-4">
                <p>
                  your favorite time to play your favorite time to play your
                  favorite time to play
                </p>

                <img
                  src={Student}
                  alt="img"
                  style={{ width: 400, height: 250 }}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/campaign">
            <button type="button " className="btn btn-sm btn-border">
              Back
            </button>
          </Link>
          &nbsp;&nbsp;
          <Link to="/campaign">
            <button type="submit" className="btn btn-button btn-sm">
              Save
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CampaignEdit;
