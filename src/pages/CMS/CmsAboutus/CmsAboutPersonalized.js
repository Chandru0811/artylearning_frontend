import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Animation1 from "../../../assets/clientimage/about_animation1.png";
import Animation2 from "../../../assets/clientimage/about_animation2.png";
import Animation3 from "../../../assets/clientimage/about_animation3.png";
import Animation4 from "../../../assets/clientimage/about_animation4.png";

function CmsAboutPersonalized() {
  const [editingField, setEditingField] = useState(null);
  const [animation1, setAnimation1] = useState(Animation1);
  const [animation2, setAnimation2] = useState(Animation2);
  const [animation3, setAnimation3] = useState(Animation3);
  const [animation4, setAnimation4] = useState(Animation4);

  const [paragraph, setParagraph] =
    useState(`We take a personalized approach to education, placing children in
    classes based on their individual literacy development and
    learning pace, rather than adhering to age groups.\n\n This approach creates the opportunity for children to build a stronger foundation and boosts their confidence, as the curriculum adapts to their unique learning needs and styles.\n\n They firmly believe in the words of Robert John Meehan: "Every child has a different learning style and pace, and each child is unique, not only capable of learning but also capable of succeeding."`);

  const toggleEdit = (index) => {
    setEditingField(index);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  const handleChange = (e) => {
    setParagraph(e.target.value);
  };

  return (
    <div
      className="container-fluid edit-container"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <div className="container">
        <div className="row py-5">
          <div className="col-md-5 col-12 ">
            {editingField === "paragraph" ? (
              <>
                <textarea
                  value={paragraph}
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
                  {paragraph.split("\n").map((text, index) => (
                    <span key={index}>
                      {text}
                      <br />
                    </span>
                  ))}
                </p>
                <button
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("paragraph")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
          <div className="col-md-7 col-12">
            <div className="row">
              <div className="col-md-6 col-12 mb-5">
                <div
                  className="p-2"
                  style={{ backgroundColor: "#d1d2d3" }}
                >
                  {editingField === "Animation1" ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAnimation1(reader.result);
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
                      onClick={() => toggleEdit("Animation1")}
                      style={{ border: "none !important" }}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <img
                    className="img-fluid"
                    style={{
                      transform: "rotate(10deg)",
                      borderRadius: "20px",
                      width: "200px",
                    }}
                    src={animation1}
                    alt="animation1"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  {editingField === "Animation2" ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAnimation2(reader.result);
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
                      onClick={() => toggleEdit("Animation2")}
                      style={{ border: "none !important" }}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <img
                    className="img-fluid"
                    style={{
                      transform: "rotate(-10deg)",
                      borderRadius: "20px",
                      width: "200px",
                    }}
                    src={animation2}
                    alt="animation2"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  {editingField === "Animation3" ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAnimation3(reader.result);
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
                      onClick={() => toggleEdit("Animation3")}
                      style={{ border: "none !important" }}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <img
                    className="img-fluid"
                    style={{
                      transform: "rotate(-10deg)",
                      borderRadius: "20px",
                      width: "200px",
                    }}
                    src={animation3}
                    alt="animation3"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12 mb-5">
                <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                  {editingField === "Animation4" ? (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setAnimation4(reader.result);
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
                      onClick={() => toggleEdit("Animation4")}
                      style={{ border: "none !important" }}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <img
                    className="img-fluid"
                    style={{
                      transform: "rotate(5deg)",
                      borderRadius: "20px",
                      width: "200px",
                    }}
                    src={animation4}
                    alt="animation4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CmsAboutPersonalized;
