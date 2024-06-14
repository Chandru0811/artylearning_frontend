import React, { useState } from "react";
import img from "../../../assets/clientimage/eng.png";
import { FaEdit, FaSave } from "react-icons/fa";
import bgimg from "../../../assets/clientimage/IMG_195.png";

function CmsEnglishBanner() {
  const [editingField, setEditingField] = useState(null);
  const [content, setContent] = useState({
    img: img,
    bgImg: bgimg, // Initial background image
    heading: "English Enrichment Class",
    paragraph1:
      "With our <b>small ratio</b> of 1 teacher to 4 students, each student will receive a more <b>personalised</b> attention from their teacher. This allows the teacher to better understand the specific needs, strengths, and challenges of each student, enabling them to provide tailored instruction and support.",
    paragraph2: "We believe learning should be fun for all!",
    paragraph3:
      "All our teachers are specially trained by our curriculum specialist. They are skilled to <b>analyse</b> specific needs, strengths and every challenge that each student faces.",
    paragraph4: "Parents’ involvement in a child’s learning journey is crucial.",
    paragraph5:
      "We take <b>Videos and pictures</b> of every student and deliver them to parents through our very own <b>Arty Parents’ Portal</b>. Conveniently developed to reinforce learning while enhancing parents’ involvement.",
    paragraph6:
      "Regular communication with teachers provides a supportive environment for learning and can contribute to academic successes. By showing interest and actively participating in their child's education, parents instil a positive attitude towards learning and helps to encourage children to strive for excellence.",
  });

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
    // Here you might want to send the updated content to your backend or CMS
  };

  const handleChange = (field, value) => {
    setContent((prevContent) => ({
      ...prevContent,
      [field]: value,
    }));
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent((prevContent) => ({
          ...prevContent,
          [field]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row remove-padding">
        <div
          className="col-md-8 col-12 bgimage"
          style={{ backgroundImage: `url(${content.bgImg})` }}
        >
          <div className="py-5 firsthead d-flex flex-column justify-content-center align-items-center">
            <div className="edit-container">
              <img src={content.img} alt="english" className="img-fluid"></img>
              {editingField === "img" ? (
                <>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e, "img")}
                    className="form-control mb-3"
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
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("img")}
                >
                  <FaEdit />
                </button>
              )}
            </div>
            <h1>English Course</h1>
          </div>
        </div>
        <div className="col-md-4 col-12 p-5">
          <div className="edit-container mb-3">
            {editingField === "bgImg" ? (
              <>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, "bgImg")}
                  className="form-control mb-3"
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
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("bgImg")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          <div className="edit-container">
            {editingField === "heading" ? (
              <>
                <input
                  type="text"
                  value={content.heading}
                  onChange={(e) => handleChange("heading", e.target.value)}
                  className="form-control mb-3"
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
                <h3 className="mb-3 headcolor">{content.heading}</h3>
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("heading")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          {Object.keys(content).map(
            (key, index) =>
              key !== "heading" &&
              key !== "img" &&
              key !== "bgImg" && (
                <div key={index} className="edit-container">
                  {editingField === key ? (
                    <>
                      <textarea
                        value={content[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="form-control mb-3"
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
                      <p
                        className="headbody"
                        dangerouslySetInnerHTML={{ __html: content[key] }}
                      ></p>
                      <button
                        className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                        onClick={() => toggleEdit(key)}
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}


export default CmsEnglishBanner;
