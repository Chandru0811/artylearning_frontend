import React from "react";
import Animation1 from "../../../assets/clientimage/about_animation1.png";
import Animation2 from "../../../assets/clientimage/about_animation2.png";
import Animation3 from "../../../assets/clientimage/about_animation3.png";
import Animation4 from "../../../assets/clientimage/about_animation4.png";

function Personalized() {
  return (
    <div className="container-fluid" style={{ backgroundColor: "#f9fafb" }}>
      <div className="container">
        <div className="row py-5">
          <div className="col-md-5 col-12 mt-5 mb-5">
            <p style={{ fontSize: "20px" }}>
              We take a personalized approach to education, placing children in
              classes based on their individual literacy development and
              learning pace, rather than adhering to age groups.
            </p>
            <p style={{ fontSize: "20px" }}>
              This approach creates the opportunity for children to build a
              stronger foundation and boosts their confidence, as the curriculum
              adapts to their unique learning needs and styles.
            </p>
            <p style={{ fontSize: "20px" }}>
              They firmly believe in the words of Robert John Meehan: "Every
              child has a different learning style and pace, and each child is
              unique, not only capable of learning but also capable of
              succeeding."
            </p>
          </div>
          <div className="col-md-7 col-12">
            <div className="row">
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  <img
                    src={Animation1}
                    style={{ transform: "rotate(10deg)", borderRadius: "20px" }}
                    alt="Animatioin1"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  <img
                    src={Animation2}
                    style={{
                      transform: "rotate(-10deg)",
                      borderRadius: "20px",
                    }}
                    alt="Animatioin1"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  <img
                    src={Animation3}
                    style={{
                      transform: "rotate(-10deg)",
                      borderRadius: "20px",
                    }}
                    alt="Animatioin1"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  <img
                    src={Animation4}
                    style={{ transform: "rotate(5deg)", borderRadius: "20px" }}
                    alt="Animatioin1"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personalized;
