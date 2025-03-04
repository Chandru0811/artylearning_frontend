import React, { useEffect } from "react";
import Believer from "../../../assets/clientimage/Arty-Believer.png";
import Dreamer from "../../../assets/clientimage/Arty-Dreamer.png";
import Pursuer from "../../../assets/clientimage/Arty-Pursuer.png";

function CoursesListing({ datas, getData }) {
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-5">
          {datas.contentTwo?.split("\n\n").map((paragraph, index) => (
            <div key={index} className="edit-container mb-3">
              <p
                className="headbody preserve-whitespace"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            </div>
          ))}
        </div>

        {[
          { img: datas.cardOneImage || Believer, heading: datas.cardOneHeading, content: datas.cardOneContent },
          { img: datas.cardTwoImage || Dreamer, heading: datas.cardTwoHeading, content: datas.cardTwoContent },
          { img: datas.cardThreeImage || Pursuer, heading: datas.cardThreeHeading, content: datas.cardThreeContent }
        ].map((card, index) => (
          <div key={index} className="col-md-4 col-12 mt-3">
            <div className="card h-100 p-3 shadow mb-5 bg-white rounded d-flex flex-column align-items-center">
              <div className="p-3 img-container">
                <img src={card.img} alt="course img" className="img-fluid p-3" />
              </div>
              <h2 className="text-center heading">{card.heading}</h2>
              <div className="flex-grow-1 d-flex flex-column justify-content-start">
                {card.content?.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="headbody preserve-whitespace text-start">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="row py-5">
          <div className="col-12">
            {datas.finalContent?.split("\n\n").map((paragraph, index) => (
              <div key={index} className="edit-container mb-3">
                <p
                  className="headbody preserve-whitespace"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesListing;
