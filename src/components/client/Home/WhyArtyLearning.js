import React, { useEffect, useState } from "react";
import Glass from "../../../assets/clientimage/glass-painting.png";
import { Link } from "react-router-dom";
import api from "../../../config/URL";

function WhyArtyLearning() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllHomeSavePublish`);
        setData(response.data);
      } catch (error) {
        console.error("Error Fetching Data: " + error.message);
      }
    };
    getData();
  }, []);

  return (
    <section className="whyArty my-5">
      <div className="container-fluid">
        <div className="container pt-4" style={{ minHeight: "80vh" }}>
          <div className="row pt-5">
            <div className="col-md-5 col-12 d-flex align-items-center justify-content-center paint">
              <img
                src={data.childImage || Glass}
                style={{
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
              <h1 className="card-title">
                {data.childTitle || "Why Arty Learning"}
              </h1>
              <p className="preserve-whitespace">
                {data.childParagraph || (
                  <>
                    <p className="card-text">
                      We provide free academic assessment for every child, to
                      understand their academic progress and match them to our
                      enrichment classes that will benefit the child the most.
                    </p>
                    <p className="card-text">
                      Our assessment recognises that each child is unique, and
                      with our individualised assessments we can help identify
                      students' diverse learning styles, strengths, and needs.
                    </p>
                  </>
                )}
              </p>

              <br />
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
  );
}

export default WhyArtyLearning;
