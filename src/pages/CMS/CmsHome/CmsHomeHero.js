import React, { useState } from "react";
import HeroImg from "../../../assets/clientimage/Hero_Img.jpg";
import { FaEdit, FaSave } from "react-icons/fa";

function CmshomeHero() {
  const [editingField, setEditingField] = useState(null);
  const [HeroImgUrl, setLogoUrl] = useState(HeroImg);
  const [titlemsg, setTitlemsg] = useState(
    "We Help Children Build a Strong Language Foundation With Our Creative Touch."
  );
  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  return (
    <>
      <section className="heroSection">
        <div className="container-fluid p-0 edit-container">
          <div style={{ position: "relative" }} className="heroPicture">
            {editingField === "HeroImg" ? (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setLogoUrl(reader.result);
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
                onClick={() => toggleEdit("HeroImg")}
              >
                <FaEdit />
              </button>
            )}
            <img
              src={HeroImgUrl}
              alt="home-img"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "120vh",
                opacity: "0.3",
              }}
            />
          </div>
        </div>
        <div
          className="text-center d-flex flex-column justify-content-center align-items-center position-absolute fw-bold edit-container"
          style={{
            top: "17%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90%",
            fontSize: "clamp(16px, 4vw, 46px)",
          }}
        >
          {editingField === "titlemsg" ? (
            <>
              <input
                value={titlemsg}
                onChange={(e) => setTitlemsg(e.target.value)}
                style={{
                  width: "100%",
                  fontSize: "clamp(18px, 4vw, 48px)",
                  textAlign: "center",
                  background: "transparent",
                  border: "none",
                  fontWeight: "bolder",
                }}
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
              <h1
                style={{
                  width: "100%",
                  fontSize: "clamp(18px, 4vw, 48px)",
                  textAlign: "center",
                  background: "transparent",
                  border: "none",
                  fontWeight: "bolder",
                  minHeight:"50%"
                }}
              >
                {titlemsg.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </h1>
              <button
                className="btn btn-sm border-transparent ms-2 edit-button"
                onClick={() => toggleEdit("titlemsg")}
              >
                <FaEdit />
              </button>
            </>
          )}
        </div>
      </section>

    </>
  );
}

export default CmshomeHero;
