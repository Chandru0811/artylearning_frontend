import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Michelle from "../../../assets/clientimage/Michelle-1-e1691309669627.png";
import Amanda from "../../../assets/clientimage/Amanda-e1691309466166.png";

function CmsAboutMichelleandAmanda() {
  const [editingField, setEditingField] = useState(null);
  const [michelleimg, setMischelleimg] = useState(Michelle);
  const [ammandaimg, setAmandaimg] = useState(Amanda);
  const [content, setContent] = useState({
    name1: "Michelle",
    name2: "Amanda",
    michelle: `Michelle, the co-founder of Arty Learning, possesses a wealth of experience and expertise in education and childcare. Her dedication and passion for teaching have driven her to become a driving force behind the success of Arty Learning. With close to a decade of teaching experience, Michelle has honed her skills in introducing language skills to young children and constantly seeks innovative ways to enhance their learning experiences.

    Beyond her role in the classroom, Michelle's contributions to Arty Learning extend to ensuring the centre's financial stability and efficiently handling corporate responsibilities. She is adept at building and maintaining the business framework, which plays a crucial role in keeping the centre running smoothly.

    Michelle's journey in education began as a relief teacher, where she closely observed children in childcare settings. These observations motivated her to support each child's unique learning pace, leading her to pursue a Bach Degree in Science (Psychology) with a focus on Behavioral Studies. This educational background equipped her with valuable insights into child development and effective modification techniques to better cater to children's needs.

    Her role as a devoted mother to her 3-year-old Preschooler, LeAnne, has provided Michelle with a personal understanding of the significance of early childhood education. This profound connection fuels her commitment to providing the best possible education and support for all the children at Arty Learning. Her dedication and unique perspective contribute to creating a nurturing and enriching environment within the centre.

    Overall, Michelle's passion, expertise, and personal commitment make her an invaluable asset to Arty Learning, ensuring that the centre thrives as a place of exceptional early childhood education.`,
    amanda: `Amanda is the visionary behind Arty Learning, a language enrichment centre that integrates arts and creativity into language learning.

    Drawing on her 15 years of teaching experience, Amanda has developed an innovative curriculum that seamlessly integrates SAM (science, art, maths). This dynamic approach creates an engaging and effective learning environment that caters to different learning styles and behaviours, ensuring that each child receives the support they need.

    Amanda's expertise lies in identifying and addressing children's learning barriers, enabling countless students to overcome their challenges and reach their full potential. Under Amanda's guidance, Arty Learning has positively impacted the lives of over 1000 students over the past 8 years.`,

    addtionalparagraph: `Her role as a devoted mother to her 3-year-old Preschooler, LeAnne, has provided Michelle with a personal understanding of the significance of early childhood education. This profound connection fuels her commitment to providing the best possible education and support for all the children at Arty Learning. Her dedication and unique perspective contribute to creating a nurturing and enriching environment within the centre. \n\n Overall, Michelle's passion, expertise, and personal commitment make her an invaluable asset to Arty Learning, ensuring that the centre thrives as a place of exceptional early childhood education.`,
  });

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container-fluid bgimage_aboutus edit-container">
      <div className="container ">
        <div className="row py-5" style={{ marginTop: "100px" }}>
          <div className="col-md-6 col-12">
            {editingField === "Michelle" ? (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setMischelleimg(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="topbar-wordpress form-control-sm w-50"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <button
                className="btn btn-sm border-transparent ms-2 edit-button"
                onClick={() => toggleEdit("Michelle")}
                style={{ border: "none !important" }}
              >
                <FaEdit />
              </button>
            )}
            <img className="img-fluid" src={michelleimg} alt="michelleimg" />
          </div>
          <div className="col-md-6 col-12">
            <h5 className="fw-bold text-white bg text-center mt-5">ABOUT</h5>
            {editingField === "name1" ? (
              <>
                <input
                  type="text"
                  name="name1"
                  value={content.name1}
                  onChange={handleChange}
                  className="form-control fw-bold"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <h1
                  className="fw-bold"
                  style={{ color: "#173067", fontSize: "8vw" }}
                >
                  <button
                    className="btn btn-sm border-transparent ms-2 edit-button"
                    onClick={() => toggleEdit("name1")}
                  >
                    <FaEdit />
                  </button>
                  {content.name1}
                </h1>
              </>
            )}
            {editingField === "michelle" ? (
              <>
                <textarea
                  name="michelle"
                  value={content.michelle}
                  onChange={handleChange}
                  rows="30"
                  className="form-control"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: "20px" }}>
                  {content.michelle.split("\n\n").map((text, index) => (
                    <span key={index}>
                      {text}
                      <br />
                      <br />
                    </span>
                  ))}
                  <button
                    className="btn btn-sm border-transparent ms-2 edit-button"
                    onClick={() => toggleEdit("michelle")}
                  >
                    <FaEdit />
                  </button>
                </p>
              </>
            )}
          </div>
          <div className="col-12 mt-2">
            {editingField === "addtionalparagraph" ? (
              <>
                <textarea
                  name="addtionalparagraph"
                  value={content.addtionalparagraph}
                  onChange={handleChange}
                  rows="10"
                  className="form-control"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: "20px" }}>
                  {content.addtionalparagraph
                    .split("\n\n")
                    .map((text, index) => (
                      <span key={index}>
                        {text}
                        <br />
                        <br />
                      </span>
                    ))}
                  <button
                    className="btn btn-sm border-transparent ms-2 edit-button"
                    onClick={() => toggleEdit("addtionalparagraph")}
                  >
                    <FaEdit />
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12 order-md-1 order-1">
            <div className="d-flex flex-column align-items-end">
              <h5 className="fw-bold text-white bg text-center mt-5">ABOUT</h5>
              {editingField === "name2" ? (
                <>
                  <input
                    type="text"
                    name="name2"
                    value={content.name2}
                    onChange={handleChange}
                    className="form-control fw-bold"
                  />
                  <button
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <>
                  <h1
                    className="fw-bold"
                    style={{ color: "#173067", fontSize: "8vw" }}
                  >
                    <button
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("name2")}
                    >
                      <FaEdit />
                    </button>
                    {content.name2}
                  </h1>
                </>
              )}
            </div>
            {editingField === "amanda" ? (
              <>
                <textarea
                  name="amanda"
                  value={content.amanda}
                  onChange={handleChange}
                  rows="20"
                  className="form-control"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: "20px" }}>
                  {content.amanda.split("\n\n").map((text, index) => (
                    <span key={index}>
                      {text}
                      <br />
                      <br />
                    </span>
                  ))}
                </p>
                <button
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("amanda")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          <div className="col-md-6 col-12 order-md-2 ">
            {editingField === "Amanda" ? (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAmandaimg(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="topbar-wordpress form-control-sm w-50"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </>
            ) : (
              <div className="text-end">
                <button
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("Amanda")}
                  style={{ border: "none !important" }}
                >
                  <FaEdit />
                </button>
              </div>
            )}
            <img src={ammandaimg} alt="ammandaimg" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CmsAboutMichelleandAmanda;
