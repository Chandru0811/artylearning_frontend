import React from "react";
import Glass from "../../../assets/clientimage/glass-painting.png";

function Support({datas}) {
  return (
    <section className="support">
      <div className="container-fluid backgound-imag-2">
        <div className="container pt-4" style={{ minHeight: "80vh" }}>
          <div className="row pt-5">
            <div
              className="col-md-5 col-12 d-flex align-items-center justify-content-end paint"
            >
              <img
                src={datas.imageTwo ||Glass}
                style={{
                  borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                }}
                alt="glass"
                className="img-fluid"
              ></img>
            </div>
            <div
              className="col-md-7 col-12 p-5"
              style={{
                backgroundColor: "#dab25a",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                borderRight: "10px solid #000",
              }}
            >
              <p style={{ fontSize: "20px" }} className="preserve-whitespace">
                    {datas.contentOne?.split("\n").map((text, index) => (
                      <span key={index}>
                        {text}
                        <br />
                      </span>
                    ))}
                  </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Support;
