import React, { useState } from "react";
import logo from "../../../assets/clientimage/Arty_Learning_Logo-2023-tp-400.png";
import Glass from "../../../assets/clientimage/glass-painting.png";
import AdminImg from "../../../assets/clientimage/IMG_6872-scaled.jpg";
import { FaEdit, FaSave } from "react-icons/fa";
import CmsAboutSupport from "./CmsAboutSupport";
import CmsAboutMCmsAboutMichelleandAmandaichelle from "./CmsAboutMichelleandAmanda";
import CmsAboutPersonalized from "./CmsAboutPersonalized";

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
      <CmsAboutSupport/>

      {/* About Michelle and Amanda*/}
      <CmsAboutMCmsAboutMichelleandAmandaichelle />

      {/* About Personalized */}
      <CmsAboutPersonalized/>

    </>
  );
}

export default CmsAboutUs;
