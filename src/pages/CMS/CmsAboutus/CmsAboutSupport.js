import React, { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Glass from "../../../assets/clientimage/glass-painting.png";

function CmsAboutSupport() {
  const [editingField, setEditingField] = useState(false);
  const [glassImgUrl, setGlassImgUrl] = useState(Glass);
  const [content, setContent] = useState({
    paragraph1: "With unwavering support from their family, the Wonder Sisters embarked on their journey to establish Arty Learning.",
    paragraph2: "Rooted in a foundation of strong family values, they held a steadfast conviction in ensuring that every child, regardless of their background, had equal opportunities to acquire language skills and flourish.",
    paragraph3: "Their dedication to this cause not only resonated in their beliefs but was also demonstrated through the unwavering support they provided to ensure the success of each and every child, as well as their staff.",
    paragraph4: "In their relentless pursuit of growth and skill enhancement, the Wonder Sisters pursued a diverse array of certifications.",
    paragraph5: "These encompassed being First Aid Certified with CPR + AED provider, achieving the status of Certified Practitioners of Neuro-Linguistic Enneagram, and successfully completing the Positive Focus Impact Training for Educators.",
    paragraph6: "Amanda's credentials extended to a Certificate of Professional Practice in Phonics and a Diploma in Early Childhood Education. Similarly, Michelle's qualifications featured a Diploma in Early Literacy accredited by the London Teacher Training College. This comprehensive training underscored their steadfast commitment to delivering the utmost quality education through the platform of Arty Learning."
  });

  const handleContentChange = (e, field) => {
    setContent({ ...content, [field]: e.target.value });
  };

  const handleImageChange = (e) => {
    setGlassImgUrl(URL.createObjectURL(e.target.files[0]));
  };

  const toggleEdit = () => {
    setEditingField(!editingField);
  };

  const saveContent = () => {
    setEditingField(false);
  };

  return (
    <>
      <section className="support">
        <div className="container-fluid backgound-imag-2">
          <div className="container pt-4" style={{ minHeight: "80vh" }}>
            <div className="row pt-5">
              <div className="col-md-5 col-12 d-flex align-items-center justify-content-end paint">
                <div className="position-relative">
                  <img
                    src={glassImgUrl}
                    style={{
                      borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "20px",
                    }}
                    alt="glass"
                    className="img-fluid"
                  />
                  {editingField === "image" && (
                    <>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control mt-2"
                      />
                      <button
                        className="btn btn-success mt-2"
                        onClick={() => saveContent()}
                      >
                        <FaSave /> Save
                      </button>
                    </>
                  )}
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
                {Object.keys(content).map((key, index) => (
                  <p key={index}>
                    {editingField ? (
                      <textarea
                        value={content[key]}
                        onChange={(e) => handleContentChange(e, key)}
                        className="form-control mb-2"
                      />
                    ) : (
                      content[key]
                    )}
                  </p>
                ))}
                <div>
                  {editingField ? (
                    <button className="btn btn-success" onClick={saveContent}>
                      <FaSave /> Save
                    </button>
                  ) : (
                    <button className="btn btn-warning" onClick={toggleEdit}>
                      <FaEdit /> Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CmsAboutSupport;
