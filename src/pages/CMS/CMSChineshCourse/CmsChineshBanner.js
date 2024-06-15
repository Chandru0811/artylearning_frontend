import React, { useState } from "react";
import Alphabet from "../../../assets/clientimage/Alphabet.png";
import bgImg from "../../../assets/clientimage/chinese_image.jpg";
import { FaEdit, FaSave } from "react-icons/fa";

function CmsChineseBanner() {
  const [editingField, setEditingField] = useState(null);
  const [editingAllParagraphs, setEditingAllParagraphs] = useState(false);
  const [content, setContent] = useState({
    heading: "Chinese Enrichment Class",
    bgImg: bgImg,
    paragraphs: [
      "我们希望每个孩子都能从老师那里得到更加个性化的关注，根据每个孩子的具体需求、优势和挑战，提供量身定制的指导和支持，所以各班师生比例限于1：4。",
      "学习应该对所有人来说都是有趣的！我们通过不同的游戏，儿歌，实验，手工等来激发孩子学习华文，促进孩子的听、说、读、写全方面的进步。并通过我们Arty Learning家园网站上传课堂的视频和照片，供家长参考，方便孩子在家中复习，为孩子学习提供支持性环境。",
      "我们希望在家园的共同努力下，促进孩子学习华文，追求卓越。",
      "With our <b>small ratio</b> of 1 teacher to 4 students, each student will receive a more <b>personalised</b> attention from their teacher. This allows the teacher to better understand the specific needs, strengths, and challenges of each student, enabling them to provide tailored instruction and support.",
      "We believe learning should be fun for all!",
      "All our teachers are specially trained by our curriculum specialist. They are skilled to <b>analyse</b> specific needs, strengths and every challenge that each student faces.",
      "Parents’ involvement in a child’s learning journey is crucial.",
      "We take <b>Videos and pictures</b> of every student and deliver them to parents through our very own <b> Arty Parents’ Portal</b>. Conveniently developed to reinforce learning while enhancing parents’ involvement.",
      "Regular communication with teachers provides a supportive environment for learning and can contribute to academic successes. By showing interest and actively participating in their child's education, parents instil a positive attitude towards learning and helps to encourage children to strive for excellence.",
    ],
  });

  const toggleEdit = () => {
    if (editingField === "paragraphs") {
      setEditingField(null);
      setEditingAllParagraphs(false);
    } else {
      setEditingField("paragraphs");
      setEditingAllParagraphs(true);
    }
  };

  const handleEdit = (index) => {
    setEditingField(index);
  };

  const saveContent = () => {
    setEditingField(null);
    setEditingAllParagraphs(false);
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
    <div className="container-fluid font-styles">
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
                className="btn btn-sm btn-outline-warning border edit-button"
                onClick={() => handleEdit("bgImg")}
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
        <div
          className="col-md-6 col-12 bgchimage"
          style={{ backgroundImage: `url(${content.bgImg})` }}
        >
          <div className="py-5 firsthead d-flex flex-column justify-content-center align-items-center">
            <img src={Alphabet} alt="english" width={80}></img>
            <h1>{content.heading}</h1>
          </div>
        </div>
        <div className="col-md-6 col-12 p-5">
          <div className="edit-container mb-3">
            {editingField === "heading" ? (
              <>
                <input
                  type="text"
                  value={content.heading}
                  onChange={(e) =>
                    setContent({ ...content, heading: e.target.value })
                  }
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

          {editingField === "paragraphs" || editingAllParagraphs ? (
            <>
              <textarea
                value={content.paragraphs.join("\n\n")}
                onChange={(e) =>
                  setContent({
                    ...content,
                    paragraphs: e.target.value.split("\n\n"),
                  })
                }
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
              {content.paragraphs.map((paragraph, index) => (
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

export default CmsChineseBanner;
