import React from "react";
import Michelle from "../../../assets/clientimage/Michelle-1-e1691309669627.png";
import Amanda from "../../../assets/clientimage/Amanda-e1691309466166.png";

function AboutAmanda({datas}) {
  return (
    <div className="container-fluid bgimage_aboutus">
      <div className="container">
        <div className="row  py-5" style={{ marginTop: "100px" }}>
          <div className="col-md-6 col-12">
            <img src={datas.imageThree || Michelle} alt="Michelle" className="img-fluid" />
          </div>
          <div className="col-md-6 col-12">
            <h5 className="fw-bold text-white bg text-center mt-5">ABOUT</h5>

            <h1
              className="fw-bold"
              style={{ color: "#173067", fontSize: "8vw" }}
            >
              {datas.michelleName }
            </h1>
            <p style={{ fontSize: "20px" }}>
                    {datas.contentTwo?.split("\n\n").map((text, index) => (
                      <span key={index}>
                        {text}
                        <br />
                        <br />
                      </span>
                    ))}
                    </p>
            {/* <p style={{ fontSize: "20px" }}>
              Michelle, the co-founder of Arty Learning, possesses a wealth of
              experience and expertise in education and childcare. Her
              dedication and passion for teaching have driven her to become a
              driving force behind the success of Arty Learning. With close to a
              decade of teaching experience, Michelle has honed her skills in
              introducing language skills to young children and constantly seeks
              innovative ways to enhance their learning experiences.
            </p>
            <p style={{ fontSize: "20px" }}>
              Beyond her role in the classroom, Michelle's contributions to Arty
              Learning extend to ensuring the centre's financial stability and
              efficiently handling corporate responsibilities. She is adept at
              building and maintaining the business framework, which plays a
              crucial role in keeping the centre running smoothly.
            </p>
            <p style={{ fontSize: "20px" }}>
              Michelle's journey in education began as a relief teacher, where
              she closely observed children in childcare settings. These
              observations motivated her to support each child's unique learning
              pace, leading her to pursue a Bach Degree in Science (Psychology)
              with a focus on Behavioral Studies. This educational background
              equipped her with valuable insights into child development and
              effective modification techniques to better cater to children's
              needs.
            </p> */}
          </div>
          <div className="col-12 mt-2">
          <p style={{ fontSize: "20px" }}>
                    {datas.contentThree
                      ?.split("\n\n")
                      .map((text, index) => (
                        <span key={index}>
                          {text}
                          <br />
                          <br />
                        </span>
                      ))}
                      </p>
            {/* <p style={{ fontSize: "20px" }}>
              Her role as a devoted mother to her 3 year old Preschooler ,
              LeAnne, has provided Michelle with a personal understanding of the
              significance of early childhood education. This profound
              connection fuels her commitment to providing the best possible
              education and support for all the children at Arty Learning. Her
              dedication and unique perspective contribute to creating a
              nurturing and enriching environment within the centre.
            </p>
            <p style={{ fontSize: "20px" }}>
              Overall, Michelle's passion, expertise, and personal commitment
              make her an invaluable asset to Arty Learning, ensuring that the
              centre thrives as a place of exceptional early childhood
              education.
            </p> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12 order-md-1 order-1">
            <div className="d-flex flex-column align-items-end">
              <h5 className="fw-bold text-white bg text-center mt-5">ABOUT</h5>
              <h1
                className="fw-bold"
                style={{ color: "#173067", fontSize: "8vw" }}
              >
                {datas.amandaName||Amanda}
              </h1>
            </div>
            <p style={{ fontSize: "20px" }}>
                    {datas.contentFour?.split("\n\n").map((text, index) => (
                      <span key={index}>
                        {text}
                        <br />
                        <br />
                      </span>
                    ))}
                  </p>
            {/* <p style={{ fontSize: "20px" }}>
              Amanda is the visionary behind Arty Learning, a language
              enrichment centre that integrates arts and creativity into
              language learning.
            </p>
            <p style={{ fontSize: "20px" }}>
              Drawing on her 15 years of teaching experience, Amanda has
              developed an innovative curriculum that seamlessly integrates SAM
              (science, art, maths). This dynamic approach creates an engaging
              and effective learning environment that caters to different
              learning styles and behaviours, ensuring that each child receives
              the support they need.
            </p>
            <p style={{ fontSize: "20px" }}>
              Amanda's expertise lies in identifying and addressing children's
              learning barriers, enabling countless students to overcome their
              challenges and reach their full potential. Under Amanda's
              guidance, Arty Learning has positively impacted the lives of over
              1000 students over the past 8 years.
            </p> */}
          </div>
          <div className="col-md-6 col-12 order-md-2 ">
            <img src={datas.imageFour} alt="Amanda" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAmanda;
