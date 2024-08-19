import React, { useEffect, useState } from "react";
import Hero_Img from "../../../assets/clientimage/Hero_Img.jpg";
import api from "../../../config/URL";

function Hero() {
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
    <section className="heroSection">
      <div className="container-fluid p-0">
        <div style={{ position: "relative" }} className="heroPicture">
          <img
            src={data.heroBackGround || Hero_Img}
            alt="home-img"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "120vh",
              opacity: "0.3",
            }}
          />
          <h1
            className="text-center d-flex flex-column justify-content-center align-items-center position-absolute fw-bold hero_heading"
            style={{
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90%",
              fontSize: "clamp(16px, 4vw, 46px)",
            }}
          >
            {data.heroTitle || (
              <>
                <span>
                  We Help Children Build a <br /> Strong Language Foundation
                </span>
                <span className="mt-lg-4">
                  <span>With </span>
                  <span style={{ backgroundColor: "#eb0505", color: "#fff" }}>
                    Our Creative Touch.
                  </span>
                </span>
              </>
            )}
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
