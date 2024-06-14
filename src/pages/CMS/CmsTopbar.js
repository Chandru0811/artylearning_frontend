import React, { useState } from "react";
import Logo from "../../assets/clientimage/Logo.png";
import { FaYoutube, FaInstagram, FaEdit, FaSave } from "react-icons/fa";

const ContactSection = () => {
  const [editingField, setEditingField] = useState(null);
  const [logoUrl, setLogoUrl] = useState(Logo);
  const [phone, setPhone] = useState("+65 8821 4153");
  const [hours, setHours] = useState(
    "Tue - Fri, 2.30pm - 8.30pm | Sat - Sun, 9am - 6pm"
  );
  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://www.youtube.com/yourchannel"
  );
  const [instagramUrl, setInstagramUrl] = useState(
    "https://www.instagram.com/yourprofile"
  );

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
   };

  return (
    <section>
    <div className="container card my-2 py-2">
      <div className="row p-1">
        <div className="col-md-6 col-12">
          <h4>Header</h4>
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

    <div className="container-fluid pt-1 pb-2 px-3 mb-2 bg-dark text-white">
      <div className="row align-items-center">
        <div className="col-md-5 col-12 d-flex align-items-center">
          <span className="me-2 edit-container">
            {editingField === "youtubeUrl" ? (
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="topbar-wordpress"
              />
            ) : (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="topbar-wordpress"
              >
                <FaYoutube />
              </a>
            )}
            {editingField === "youtubeUrl" ? (
              <button
                className="btn btn-sm btn-outline-primary border ms-2"
                onClick={saveContent}
              >
                <FaSave />
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                onClick={() => toggleEdit("youtubeUrl")}
              >
                <FaEdit />
              </button>
            )}
          </span>
          <span className="edit-container">
            {editingField === "instagramUrl" ? (
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="topbar-wordpress"
              />
            ) : (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="topbar-wordpress"
              >
                <FaInstagram />
              </a>
            )}
            {editingField === "instagramUrl" ? (
              <button
                className="btn btn-sm btn-outline-primary border ms-2"
                onClick={saveContent}
              >
                <FaSave/>
              </button>
            ) : (
              <button
                className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                onClick={() => toggleEdit("instagramUrl")}
              >
                <FaEdit />
              </button>
            )}
          </span>
        </div>
        <div className="col-md-7 col-12 d-flex align-items-center justify-content-between">
          <span className="me-3 edit-container">
            <small>
              {editingField === "hours" ? (
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="topbar-wordpress"
                />
              ) : (
                hours
              )}
              {editingField === "hours" ? (
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                   <FaSave/>
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("hours")}
                >
                  <FaEdit />
                </button>
              )}
            </small>
          </span>
          <span className="me-3 edit-container">
            <small>
              {editingField === "phone" ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="topbar-wordpress"
                />
              ) : (
                phone
              )}
              {editingField === "phone" ? (
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  onClick={saveContent}
                >
                   <FaSave/>
                </button>
              ) : (
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  onClick={() => toggleEdit("phone")}
                >
                  <FaEdit />
                </button>
              )}
            </small>
          </span>
        </div>
      </div>
    </div>
    <div className="row m-2">
      <div className="col-12">
        
        <div className="edit-container">
        <div className="py-2">
          <img src={logoUrl} alt="WWG" width={150} className="img-fluid" />
        </div>
          {editingField === "logo" ? (
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
                 <FaSave/>
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm btn-outline-warning border ms-2 edit-button"
              onClick={() => toggleEdit("logo")}
            >
              <FaEdit />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
