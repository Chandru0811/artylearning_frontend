import React, { useState } from "react";
import PaperDraw from "../../../assets/clientimage/Paper-draw.jpg";
import { FaEdit, FaSave } from "react-icons/fa";

function CmsHomeEnrichmentClass() {
  const [editingField, setEditingField] = useState(null);
  const [paperDraw, setPaperDrawUrl] = useState(PaperDraw);
  const [titlemsg, setTitlemsg] = useState(
    "We Help Children Build a Strong Language Foundation With Our Creative Touch."
  );
  const [content, setContent] = useState({
    header: "Arty Learning",
    subHeader: "Enrichment Classes in Singapore",
    paragraphs:
      "We believe that every child has the potential to shine and achieve great things. As a dynamic and innovative language education centre, we are dedicated to providing a nurturing environment that fosters the creativity and development of young minds.\n\nDriven by a deep passion for education, we believe in the power of creativity and critical thinking. Children learn best when they are actively engaged, inspired and encouraged to explore their unique talents.\n\nDiscover Enrichment Classes Singapore for kids with Arty Learning and embark on a transformative educational journey where boundless potential meets inventive teaching methods.",
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
    <div className="container edit-container">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
          {editingField === "header" ? (
            <>
              <input
                type="text"
                name="header"
                value={content.header}
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
              <h1 className="fw-bold d-flex">
                {content.header}
                <button
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("header")}
                >
                  <FaEdit />
                </button>
              </h1>
            </>
          )}
          {editingField === "subHeader" ? (
            <>
              <input
                type="text"
                name="subHeader"
                value={content.subHeader}
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
              <h5 className="text-secondary fw-bold d-flex pt-3 pb-3">
                {content.subHeader}
                <button
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("subHeader")}
                >
                  <FaEdit />
                </button>
              </h5>
            </>
          )}

          {editingField === "paragraphs" ? (
            <>
              <textarea
                name="paragraphs"
                value={content.paragraphs}
                onChange={handleChange}
                rows="12"
                className="form-control fs-5 lh-base"
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
              <p className="d-flex flex-column mt-2 mb-0 fs-5 lh-base">
                {content.paragraphs.split("\n\n").map((text, index) => (
                  <span key={index}>
                    {text}
                    <br />
                    <br />
                  </span>
                ))}
              </p>
              <button
                className="btn btn-sm border-transparent ms-2 edit-button"
                onClick={() => toggleEdit("paragraphs")}
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 mt-5 p-4">
          {editingField === "PaperDraw" ? (
            <>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPaperDrawUrl(reader.result);
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
              onClick={() => toggleEdit("PaperDraw")}
              style={{ border: "none !important" }}
            >
              <FaEdit />
            </button>
          )}
          <img
            className="rounded paper-draw ShadowLayer mt-2 img-fluid"
            src={paperDraw}
            alt="arty learning"
          />
        </div>
      </div>
    </div>
  );
}

export default CmsHomeEnrichmentClass;
