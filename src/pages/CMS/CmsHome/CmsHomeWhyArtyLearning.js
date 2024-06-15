import React, { useState } from "react";
import Glass from "../../../assets/clientimage/glass-painting.png";
import { FaEdit, FaSave } from "react-icons/fa";

function CmsHomeWhyArtyLearning() {
  const [editingField, setEditingField] = useState(null);
  const [imageUrl, setImageUrl] = useState(Glass);
  const [content, setContent] = useState({
    title: "Why Arty Learning",
    paragraphs:
      "We provide free academic assessment for every child, to understand their academic progress and match them to our enrichment classes that will benefit the child the most.\n\nOur assessment recognises that each child is unique, and with our individualised assessments we can help identify students' diverse learning styles, strengths, and needs.",
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
    <section className="whyArty my-1">
      <div className="container-fluid">
        <div
          className="container edit-container pt-4"
          style={{ minHeight: "80vh" }}
        >
          <div className="row">
            <div className="col-md-5 col-12 d-flex flex-column align-items-center justify-content-center paint">
              {editingField === "Glass" ? (
                <>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImageUrl(reader.result);
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
                  onClick={() => toggleEdit("Glass")}
                  style={{ border: "none !important" }}
                >
                  <FaEdit />
                </button>
              )}
              <img
                src={imageUrl}
                style={{ borderRadius: "20px" }}
                alt="glass"
                className="img-fluid"
              />
            </div>
            <div
              className="col-md-7 col-12 p-5"
              style={{
                backgroundColor: "#fffdec",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                borderRight: "10px solid #000",
              }}
            >
              {editingField === "title" ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={content.title}
                    onChange={handleChange}
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
                  <h1 className="card-title">
                    {content.title}
                    <button
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("title")}
                    >
                      <FaEdit />
                    </button>
                  </h1>
                </>
              )}

              {editingField === "paragraphs" ? (
                <>
                  <textarea
                    name="paragraphs"
                    value={content.paragraphs}
                    onChange={handleChange}
                    rows="8"
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
                  <p className="card-text my-4">
                    {content.paragraphs.split("\n\n").map((text, index) => (
                      <span key={index}>
                        {text}
                        <br />
                        <br />
                      </span>
                    ))}
                    <button
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("paragraphs")}
                    >
                      <FaEdit />
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CmsHomeWhyArtyLearning;
