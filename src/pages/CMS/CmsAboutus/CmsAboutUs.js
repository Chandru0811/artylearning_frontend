import React, { useState } from "react";
import logo from "../../../assets/clientimage/Arty_Learning_Logo-2023-tp-400.png";
import Glass from "../../../assets/clientimage/glass-painting.png";
import AdminImg from "../../../assets/clientimage/IMG_6872-scaled.jpg";
import { FaEdit, FaSave } from "react-icons/fa";
// import CmsAboutSupport from "./CmsAboutSupport";

function CmsAboutUs() {
  const [editingField, setEditingField] = useState(null);
  const [adminImgUrl, setAdminImgUrl] = useState(AdminImg);
  const [glassImgUrl, setGlassImgUrl] = useState(Glass);

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  return (
    <>
      {/* Header */}
      <div className="container card my-2 py-2">
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4>About Us</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            <button className="btn btn-sm btn-outline-primary border ms-2">
              Save
            </button>
            <button className="btn btn-sm btn-outline-danger border ms-2">
              Save & Publish
            </button>
          </div>
        </div>
      </div>

      {/* About Section1 */}
      <div className="container-fluid about">
        <div className="row py-5 about2">
          <div className="offset-md-1 col-md-10 col-12">
            <div className="row">
              <div className="col-md-6 col-12  py-5 d-flex flex-column align-items-center justify-content-center">
                <h1
                  className="fw-bolder"
                  style={{ color: "white", fontSize: "75px" }}
                >
                  ABOUT <span style={{ color: "red" }}>US</span>
                </h1>
                <img src={logo} alt="Teacher" className="img-fluid" />
              </div>
              <div className="col-md-6 col-12 d-flex flex-column align-items-center justify-content-center">
                {editingField === "AdminImg" ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setAdminImgUrl(reader.result);
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
                    onClick={() => toggleEdit("AdminImg")}
                    style={{ border: "none !important" }}
                  >
                    <FaEdit />
                  </button>
                )}
                <img
                  src={adminImgUrl}
                  alt="Admins"
                  className="img-fluid image_border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Painting Glass */}
      {/* <section className="support">
      <div className="container-fluid backgound-imag-2">
        <div className="container pt-4" style={{ minHeight: "80vh" }}>
          <div className="row pt-5">
            <div
              className="col-md-5 col-12 d-flex align-items-center justify-content-end paint"
            >
              <img
                src={Glass}
                style={{
                  borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                }}
                alt="glass"
                className="img-fluid"
              ></img>
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
              <p>
                With <b>unwavering support</b> from their family, the{" "}
                <b>Wonder Sisters </b>
                embarked on their journey to establish Arty Learning.
              </p>
              <p>
                Rooted in a foundation of <b>strong family values,</b> they held
                a steadfast conviction in ensuring that every child, regardless
                of their background, had equal opportunities to acquire language
                skills and flourish.
              </p>
              <p>
                Their dedication to this cause not only resonated in their
                beliefs but was also demonstrated through the{" "}
                <b>unwavering support </b>
                they provided to ensure the success of each and every child, as
                well as their staff.
              </p>
              <p>
                In their relentless pursuit of growth and skill enhancement, the
                <b> Wonder Sisters</b> pursued a diverse array of
                certifications.
              </p>
              <p>
                These encompassed being First Aid Certified with CPR + AED
                provider, achieving the status of Certified Practitioners of
                Neuro-Linguistic Enneagram, and successfully completing the
                Positive Focus Impact Training for Educators.
              </p>
              <p>
                Amanda's credentials extended to a Certificate of Professional
                Practice in Phonics and a Diploma in Early Childhood Education.
                Similarly, Michelle's qualifications featured a Diploma in Early
                Literacy accredited by the London Teacher Training College. This
                comprehensive training underscored their steadfast commitment to
                delivering the utmost quality education through the platform of
                Arty Learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section> */}
      {/* <CmsAboutSupport/> */}
    </>
  );
}

export default CmsAboutUs;
