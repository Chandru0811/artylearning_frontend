import React from "react";
import Believer from "../../../assets/clientimage/Arty-Believer.png";
import Dreamer from "../../../assets/clientimage/Arty-Dreamer.png";
import Pursuer from "../../../assets/clientimage/Arty-Pursuer.png";

function EnglishCourseListing({datas}) {
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
          {/* <p className="headbody">
            In our English Enrichment Class, children will embark on an exciting
            journey to enhance their language skills and foster a deep love for
            the English language. Through engaging activities, interactive
            discussions, and creative projects, students will develop their
            vocabulary, grammar, reading, writing, and communication skills. Our
            experienced educators will guide them in exploring various literary
            genres, analyzing texts, and expressing their thoughts articulately.
            From honing their comprehension abilities to refining their
            storytelling prowess, this class is designed to provide a holistic
            approach to English proficiency. Through a blend of educational
            games, multimedia resources, and collaborative exercises, children
            will not only build a strong foundation in English but also gain the
            confidence to navigate the world of words with enthusiasm and
            confidence.
          </p> */}
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={datas.card1Image||Believer} alt="..." className="img-fluid"></img>
            </div>
            <h1 className="">{datas.card1Heading}</h1>
            {datas.card1Content?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
            {/* <p className="headbody">
              Focuses on enhancing fine motor skills and pencil grip through
              engaging activities.
            </p>
            <p className="headbody">
              Main objective is for children to recognize the entire lowercase
              alphabet from a to z while also fostering interaction and social
              skills.
            </p> */}
          </div>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card p-3 h-100 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={datas.card2Image||Dreamer} alt="..." className="img-fluid mb-3"></img>
            </div>
            <h1 className=""> {datas.card2Heading}</h1>
            {datas.card2Content?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
            {/* <p className="headbody">
              Focuses on beginning sounds, word association, and independent
              writing skills, all of which are crucial for enhancing children's
              language development and literacy abilities.
            </p> */}
            {/* <p className="headbody">
              Provides a solid foundation for young learners to confidently move
              on towards the next stage and fosters a love for learning through
              the fun activities provided.
            </p> */}
          </div>
        </div>
        <div className="col-md-4 col-12 mt-3">
          <div className="card h-100 p-3 shadow mb-5 bg-white rounded">
            <div className="p-3">
              <img src={datas.card3Image||Pursuer} alt="..." className="img-fluid"></img>
            </div>
            <h1 className=""> {datas.card3Heading}</h1>
            {datas.card3Content?.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
            {/* <p className="headbody">
              Designed for children who already possess a strong foundation of
              the letter sound and independent writing skill
            </p>
            <p className="headbody">
              Focuses on cultivating essential skills like independent reading,
              blending, and spelling.
            </p>
            <p className="headbody">
              Will gain the confidence and preparedness to excel in primary
              school English, building a solid foundation for their language
              abilities and future education.
            </p>
            <p className="headbody">
              An excellent opportunity to enhance their learning journey and
              ensure they are well-prepared for the next level of education.
            </p> */}
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
            {/* <p className="headbody">
              Our children are placed into classes according to their language
              ability and not by standard educational age.
            </p>
            <p className="headbody">
              (Therefore we may ask you to bring your child down for a FREE
              observation/assessment, only if we have available and suitable
              slot; based on your waitlist questions answered)
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnglishCourseListing;
