import React, { useState } from "react";
import img from "../../../assets/clientimage/eng.png";
import { FaEdit, FaSave } from "react-icons/fa";
import bgimg from "../../../assets/clientimage/IMG_195.png";

function CmsEnglishBanner() {
  const [editingField, setEditingField] = useState(null);
  const [content, setContent] = useState({
    img: img,
    bgImg: bgimg,
    heading: "English Enrichment Class",
    paragraphs: [
      "With our <b>small ratio</b> of 1 teacher to 4 students, each student will receive a more <b>personalised</b> attention from their teacher. This allows the teacher to better understand the specific needs, strengths, and challenges of each student, enabling them to provide tailored instruction and support.",
      "We believe learning should be fun for all!",
      "All our teachers are specially trained by our curriculum specialist. They are skilled to <b>analyse</b> specific needs, strengths and every challenge that each student faces.",
      "Parents’ involvement in a child’s learning journey is crucial.",
      "We take <b>Videos and pictures</b> of every student and deliver them to parents through our very own <b>Arty Parents’ Portal</b>. Conveniently developed to reinforce learning while enhancing parents’ involvement.",
      "Regular communication with teachers provides a supportive environment for learning and can contribute to academic successes. By showing interest and actively participating in their child's education, parents instil a positive attitude towards learning and helps to encourage children to strive for excellence.",
    ].join("\n\n"),
  });

  const toggleEdit = () => {
    setEditingField((prevEditingField) =>
      prevEditingField === "paragraphs" ? null : "paragraphs"
    );
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
    // Here you might want to send the updated content to your backend or CMS
  };

  const handleChange = (e) => {
    setContent({
      ...content,
      paragraphs: e.target.value,
    });
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({
          ...content,
          [field]: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row remove-padding">
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
                onClick={() => handleEdit("bgImg")}
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
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
                  onClick={() => handleEdit("img")}
                >
                  <FaEdit />
                </button>
              )}
            </div>
            <h1>{content.heading}</h1>
          </div>
        </div>
        <div className="col-md-4 col-12 p-5">
          <div className="edit-container">
            {editingField === "heading" ? (
              <>
                <input
                  type="text"
                  value={content.heading}
                  onChange={(e) => setContent({ ...content, heading: e.target.value })}
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
                  onClick={() => handleEdit("heading")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          {editingField === "paragraphs" ? (
            <>
              <textarea
                value={content.paragraphs}
                onChange={handleChange}
                className="form-control mb-3"
                rows="10"
                
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
              {content.paragraphs.split("\n\n").map((paragraph, index) => (
                <div key={index} className="edit-container mb-3">
                  <p
                    className="headbody preserve-whitespace"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></p>
                </div>
              ))}
              <button
                className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                onClick={toggleEdit}
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CmsEnglishBanner;
