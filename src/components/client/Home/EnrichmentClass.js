import React, { useEffect, useState } from "react";
import PaperDraw from "../../../assets/clientimage/Paper-draw.jpg";
import { Link } from "react-router-dom";
import api from "../../../config/URL";
function EnrichmentClass() {
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
    <div className="container">
      <div className="row">
        <div className=" col-lg-6 col-md-12 col-sm-12 mt-5 ">
          <h1 className=" fw-bold d-flex">
            {data.learningTitle || "Arty Learning"}
          </h1>
          <h5 className="text-secondary fw-bold d-flex pt-3 pb-3 ">
            {data.learningSubtitle || "Enrichment Classes in Singapore"}
          </h5>
          {data.learningParagraph || (
            <>
              <p className="d-flex  mt-2 fs-5 lh-base">
                We believe that every child has the potential to shine and
                achieve great things. As a dynamic and innovative language
                education centre, we are dedicated to providing a nurturing
                environment that fosters the creativity and development of young
                minds.
              </p>
              <p className="text-secondary fs-5 mt-2 lh-base">
                Driven by a deep passion for education, we believe in the power
                of creativity and critical thinking. Children learn best when
                they are actively engaged, inspired and encouraged to explore
                their unique talents.
              </p>
              <p className="text-secondary fs-5 mt-2 lh-base">
                Discover Enrichment Classes Singapore for kids with Arty
                Learning and embark on a transformative educational journey
                where boundless potential meets inventive teaching methods.
              </p>
            </>
          )}
          <br/>
          <Link to={"/about"}>
            <button className="LearnMore mt-3">Learn More</button>
          </Link>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mt-5 p-4">
          <img
            className="rounded paper-draw ShadowLayer"
            src={data.learningImage  || PaperDraw}
            alt="arty learning"
          />
        </div>
      </div>
    </div>
  );
}

export default EnrichmentClass;
