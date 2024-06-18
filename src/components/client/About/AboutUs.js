import React from "react";
import logo from "../../../assets/clientimage/Arty_Learning_Logo-2023-tp-400.png";
import image from "../../../assets/clientimage/IMG_6872-scaled.jpg";
function AboutUs({datas}) {
  // console.log("object",datas)
  return (
    <div className="container-fluid about">
      <div className="row py-5 about2">
        <div className="offset-md-1 col-md-10 col-12">
          <div className="row">
            <div className="col-md-6 col-12  py-5 d-flex flex-column align-items-center justify-content-center">
              <h1
                className="fw-bolder"
                style={{ color: "white", fontSize: "75px" }}
              >
                ABOUT <span style={{ color: "red" }}>US</span>
              </h1>
              <img src={logo} alt="Teacher" className="img-fluid" />
            </div>
            <div className="col-md-6 col-12 d-flex align-items-center justify-content-center">
              <img src={datas.imageOne ||image} alt="Anna" className="img-fluid image_border" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
