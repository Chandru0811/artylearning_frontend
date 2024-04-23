import React from "react";
import { Link } from "react-router-dom";
import DocImg from "../../assets/images/DocumentImage.png";
// import DocImg_1 from "../../assets/images/Documentimg_1.png";
// import DocImg_2 from "../../assets/images/Documentimg_ 2.png";
import DocImg_3 from "../../assets/images/Documentimg_ 3.png";
import DocImg_4 from "../../assets/images/Documentimg_4.png";
import DocImg_5 from "../../assets/images/Documentimg_5.png";
import DocImg_6 from "../../assets/images/Documentimg_6.png";
// import DocImg_7 from "../../assets/images/Documentimg_7.png";
// import DocImg_8 from "../../assets/images/Documentimg_8.png";
// import DocImg_9 from "../../assets/images/Documentimg_9.png";
import DocImg_10 from "../../assets/images/Documentimg_10.png";

function DocumentReportView() {
  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-end align-item-end mt-4">
        <Link to="/report/document">
          <button type="button" className="btn btn-sm btn-border">
            Back
          </button>
        </Link>
      </div>
      <div>
        <div className="container">
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-12">
              <div className="row mt-3  mb-2">
                <div className="col-6 ">
                  <p className="fw-medium">Course Name </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: Arty Pursuers</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2 mt-3">
                <div className="col-6  ">
                  <p className="fw-medium">Class Listing</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: FRI_7PM-DAISY</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Date</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 2022-07-01</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Day / Time</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : Fri(19:00:00 - 20:30:00)
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Total Files</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 17</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Image Files</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 8</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="row  mb-2">
                <div className="col-6  ">
                  <p className="fw-medium">Video Files</p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: 9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-5">
          <h4>Videos</h4>
          <div className="row">
            <div className=" col-md-4 col-12">
              <video width={"100%"} controls>
                <source src="your_video_url.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className=" col-md-4 col-12">
              <video width={"100%"} controls>
                <source src="your_video_url.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className=" col-md-4 col-12">
              <video width={"100%"} controls>
                <source src="your_video_url.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <div className="container">
          <h4>Images</h4>
          <div className="row">
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg_6} alt="pic_1" />
            </div>
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg_10} alt="pic_2" />
            </div>
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg} alt="pic_3" />
            </div>
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg_4} alt="pic_4" />
            </div>
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg_3} alt="pic_5" />
            </div>
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg_5} alt="pic_6" />
            </div>
            <div className=" col-md-4 col-12 mb-2">
              <img className="img-fluid" src={DocImg_6} alt="pic_7" />
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentReportView;
