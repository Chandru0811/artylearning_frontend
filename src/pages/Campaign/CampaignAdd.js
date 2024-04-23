import React from "react";
import { Link } from "react-router-dom";

function CampaignAdd() {
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
              value=""
              className="form-control mx-3"
              style={{ width: "60%" }}
            />
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-start  align-items-center ">
          <div className="col-3  text-center ">
            <label className="form-label mx-auto headColor">Subject </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              value=""
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
              value=""
              className="form-control mx-3 my-2"
              style={{ width: "60%" }}
            />
            <input
              type="email"
              value=""
              className="form-control mx-3 my-2"
              style={{ width: "60%" }}
            />
            <input
              type="text"
              value=""
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
          <div className="col-7">
            {/* <span className="badge bg-secondary"><h6>Arty Dreamer</h6></span> &nbsp;&nbsp;
          <span className="badge bg-secondary"><h6>Arty Dreamer</h6></span> &nbsp;&nbsp;
          <span className="badge bg-secondary"><h6>Arty Dreamer</h6></span> &nbsp;&nbsp; */}
          </div>
          <div className="col-2">
            <Link to="/campaign/student/add">
              <button className="btn  btn-border btn-sm">Add Student</button>
            </Link>
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-start align-items-start ">
          <div className="col-3 text-center ">
            <label className="form-label mx-auto headColor">Content</label>
          </div>
          <div className="col-9">
            <div>
              <button className="btn btn-border btn-sm mx-3">
                <div className="d-flex">Message</div>
              </button>
              <button className="btn btn-border btn-sm mx-3">
                <div className="d-flex">
                  Image <box-icon type="" name="cloud-upload"></box-icon>
                </div>
              </button>
              <button className="btn btn-border btn-sm mx-3">
                <div className="d-flex">
                  Message & Image
                  <box-icon type="" name="cloud-upload"></box-icon>
                </div>
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className="my-3 d-flex justify-content-end align-items-end  mb-5">
          <Link to="/campaign">
            <button type="button" className="btn btn-sm btn-border">
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

export default CampaignAdd;
