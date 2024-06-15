import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Glass from "../../../assets/clientimage/glass-painting.png";

function CmsAboutSupport() {
  const [editingField, setEditingField] = useState(null);
  const [glassImgUrl, setGlassImgUrl] = useState(Glass);
  const [content, setContent] = useState({
    paragraphs:
      "With unwavering support from their family, the Wonder Sisters embarked on their journey to establish Arty Learning.\n\nRooted in a foundation of strong family values, they held a steadfast conviction in ensuring that every child, regardless of their background, had equal opportunities to acquire language skills and flourish.\n\nTheir dedication to this cause not only resonated in their beliefs but was also demonstrated through the unwavering support they provided to ensure the success of each and every child, as well as their staff. \n\n In their relentless pursuit of growth and skill enhancement, the Wonder Sisters pursued a diverse array of certifications.\n\n These encompassed being First Aid Certified with CPR + AED provider, achieving the status of Certified Practitioners of Neuro-Linguistic Enneagram, and successfully completing the Positive Focus Impact Training for Educators.\n\n Amanda's credentials extended to a Certificate of Professional Practice in Phonics and a Diploma in Early Childhood Education. Similarly, Michelle's qualifications featured a Diploma in Early Literacy accredited by the London Teacher Training College. This comprehensive training underscored their steadfast commitment to delivering the utmost quality education through the platform of Arty Learning.",
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
    <>
      <section className="support">
        <div className="container-fluid backgound-imag-2 edit-container">
          <div className="container pt-4" style={{ minHeight: "80vh" }}>
            <div className="row pt-5">
              <div className="col-md-5 col-12 d-flex align-items-center justify-content-end paint">
                <div className="position-relative">
                  {editingField === "image" && (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setGlassImgUrl(reader.result);
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
                  )}
                  {editingField !== "image" && (
                    <div className="text-end">
                      <button
                        className="btn btn-sm border-transparent ms-2 edit-button"
                        onClick={() => toggleEdit("image")}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                  <img
                    src={glassImgUrl}
                    style={{
                      borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "20px",
                    }}
                    alt="glass"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div
                className="col-md-7 col-12 p-5"
                style={{
                  backgroundColor: "#dab25a",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  borderRight: "10px solid #000",
                }}
              >
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CmsAboutSupport;
