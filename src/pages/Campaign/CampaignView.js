import React from "react";
import { Link } from "react-router-dom";
import DocImg from "../../assets/images/DocumentImage.png";

function CampaignView() {
  return (
    <div className="container-fluid mb-2 minHeight">
      <div className=" row">
        <div className="col-12 d-flex justify-content-end my-3 ">
          <Link to="/campaign">
            <button className="btn btn-border btn-sm me-1 ">Back</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-semibold ">Topic</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Today Holiday</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-semibold ">Subject</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : Due to heavy rain today is holiday for all
                </p>
              </div>
            </div>
          </div>
          <h5 className="mt-3 mb-5"> Teacher</h5>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-semibold ">Name</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Tan LeAnne</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-semibold ">Email</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: tanlenne@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-semibold ">Mobile</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 65432578</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row mb-2">
              <div className="col-3 d-flex  align-items-center">
                <h5 className="mt-4 ">Student</h5>
              </div>
              <div className="col-9">
                <p className="text-muted text-sm mt-4">
                  : Arty Dreamer Arty Believer Arty Pursuer
                </p>
              </div>
            </div>
          </div>
          <h5 className="mt-3 mb-5"> Content</h5>
          <div className="col-md-6 col-12">
            <div className="row mb-2">
              <div className="col-6 d-flex  align-items-center">
                <p className="text-sm fw-semibold ">Message</p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">
                  : your favorite time to play
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="text-sm fw-medium">File</p>
              </div>
              <div className="col-6 d-flex">
                <p className="text-muted text-sm">:</p>
                <img src={DocImg} className="img-fluid  p-1" alt="hhh" />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row  mb-2">
              <div className="col-6  ">
                <p className="text-sm fw-medium"> Message & Image</p>
              </div>
              <div className="col-6  d-flex">
                <p className="text-muted text-sm">:</p>
                <img src={DocImg} className="img-fluid p-1" alt="hhh" />
              </div>
              <div className="col-6  "></div>
              <div className="col-6  ">
                <p className="text-dark bg-body-secondary text-sm p-1">
                  {" "}
                  Dear parents this week we give practice in the words si/lm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignView;
