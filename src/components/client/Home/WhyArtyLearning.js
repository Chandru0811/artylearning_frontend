import React from "react";
import Glass from "../../../assets/clientimage/glass-painting.png";
import { Link } from "react-router-dom";

function WhyArtyLearning() {
  return (
    // <div className="container mt-5">
    //   <div className="row">
    //     <div className="col-lg-4 col-md-10 col-sm-12 ms-5 center-align-content">
    //       <div className="d-flex justify-content-center align-items-center mt-4 ms-4 position-absolute">
    //         <img
    //           className="img-fluid rounded"
    //           style={{ width: "450px", height: "500px" }}
    //           src={Glass}
    //           alt="Slide 2"
    //         />
    //       </div>
    //     </div>
    //     <div className="col-8 center-align-content ms-5 ">
    //       <div
    //         className="rounded"
    //         style={{
    //           boxShadow: "10px -5px 2px 5px #000",
    //           background: "#fff2f2",
    //           height: "550px",
    //           width: "900px",
    //           marginLeft: "19rem",
    //         }}
    //       >
    //         <div style={{ marginLeft: "13rem" }}>
    //           <div>
    //             <h1 className="text-danger m-1">Why Arty Learning</h1>
    //             <h5
    //               className="text-start mt-5 text-secondary"
    //               style={{ width: "560px" }}
    //             >
    //               We provide free academic assessment for every child, to
    //               understand their academic progress and match them to our
    //               enrichment classes that will benefit the child the most.
    //             </h5>
    //             <h5
    //               className="text-start mt-5 text-secondary"
    //               style={{ width: "560px" }}
    //             >
    //               Our assessment recognises that each child is unique, and with
    //               our individualised assessments we can help identify students'
    //               diverse learning styles, strengths, and needs.
    //             </h5>
    //             <button className="btn btn-outline-danger mt-5">
    //               Learn More
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className="whyArty my-5">
      {/* <div className="container">
        <div className="row position-relative">
          <div className="col-lg-8 col-md-12 col-12 cardCol order-1 order-md-0">
            <div className="card w-100 mb-3 py-5">
              <div className="card-body ms-5">
                <h1 className="card-title">Why Arty Learning</h1>
                <p className="card-text">
                  We provide free academic assessment for every child, to
                  understand their academic progress and match them to our
                  enrichment classes that will benefit the child the most.
                </p>
                <p className="card-text">
                  Our assessment recognises that each child is unique, and with
                  our individualised assessments we can help identify students'
                  diverse learning styles, strengths, and needs.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-danger learnMoreBtn my-3"
                >
                  LEARN MORE
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-12 mt-4 position-absolute top-0 ms-4 order-0 order-md-1 glassPicture">
            <img src={Glass} alt="glass" className="img-fluid"></img>
          </div>
        </div>
      </div> */}

      <div className="container-fluid">
        <div className="container pt-4" style={{ minHeight: "80vh" }}>
          <div className="row pt-5">
            <div className="col-md-5 col-12 d-flex align-items-center justify-content-end paint">
              <img
                src={Glass}
                style={{
                  // borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                }}
                alt="glass"
                className="img-fluid"
              ></img>
            </div>
            <div
              className="col-md-7 col-12 p-5"
              style={{
                backgroundColor: "#fffdec",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                borderRight: "10px solid #000",
              }}
            >
              <h1 className="card-title">Why Arty Learning</h1>
              <p className="card-text">
                We provide free academic assessment for every child, to
                understand their academic progress and match them to our
                enrichment classes that will benefit the child the most.
              </p>
              <p className="card-text">
                Our assessment recognises that each child is unique, and with
                our individualised assessments we can help identify students'
                diverse learning styles, strengths, and needs.
              </p>
              <Link to={"/about"}>
                <button
                  type="button"
                  className="btn btn-outline-danger learnMoreBtn my-3"
                >
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <section className="ladybossBC">
    //   <div className="container">
    //     <div className="row">
    //       <div
    //         className="col-lg-7 col-md-7 col-12 py-3"
    //         style={{
    //           background:
    //             "linear-gradient(to left, #DE3163 80%, rgba(222, 49, 99, 0.2) 20%)",
    //         }}
    //       >
    //         <div className="row">
    //           <div className="LadybossBCImg2 d-flex align-items-center justify-content-center col-lg-6 col-md-6 col-12">
    //             <img
    //               src={Glass}
    //               className="img-fluid"
    //               alt="ladybossbcImg_1"
    //             ></img>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default WhyArtyLearning;
