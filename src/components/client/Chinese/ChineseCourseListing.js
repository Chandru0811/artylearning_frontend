import React from "react";
import believer from "../../../assets/clientimage/Arty-(Believer).png";
import dreamer from "../../../assets/clientimage/Arty-(Dreamer).png";
import pursuer from "../../../assets/clientimage/Arty-(Prusuers).png";

function ChineseCourseListing({datas}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 my-5 ">
        {datas.content2?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={datas.card1Image||believer} alt="..." className="img-fluid"></img>
            </div>
            <h1 className="text-center">{datas.card1Heading}</h1>
            {datas.card1Content?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card p-3 h-100 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img  src={datas.card2Image||dreamer}  alt="..." className="img-fluid mb-3"></img>
            </div>
            <h1 className="text-center"> {datas.card2Heading}</h1>
            {datas.card2Content?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
          </div>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={datas.card3Image||pursuer} alt="..." className="img-fluid"></img>
            </div>
            <h1 className="text-center">{datas.card3Heading}</h1>
            {datas.card3Content?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
          </div>
        </div>
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

export default ChineseCourseListing;
