import React, { useState } from "react";
import Logo from "../../assets/clientimage/Logo.png";
import { FaYoutube, FaInstagram, FaEdit, FaSave } from "react-icons/fa";

const ContactSection = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleHoursChange = (e) => {
    setHours(e.target.value);
  };

  const handleYoutubeUrlChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const handleInstagramUrlChange = (e) => {
    setInstagramUrl(e.target.value);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveContent = () => {
    setIsEditing(false);
    // Here you might want to send the updated content to your backend or WordPress API
  };

  return (
    <section>
      <div className="container">
        <div className="row card  bg-dark-subtle my-1 p-1 d-flex justify-content-between">
          <div className="">Header</div>
          <div>
            {isEditing ? (
              <button
                className="btn rounded-circle btn-sm btn-success"
                onClick={saveContent}
              >
                <FaSave />
              </button>
            ) : (
              <button
                className="btn rounded-circle btn-sm btn-light"
                onClick={toggleEdit}
              >
                <FaEdit />
              </button>
            )}
          </div>
          <button className="btn btn-sm ">Save&publish</button>
        </div>
      </div>
      <div className="container-fluid pt-1 pb-2 px-3 mb-2 bg-dark text-white">
        <div className="row align-items-center">
          <div className="col-md-5 col-12 d-flex align-items-center">
            <span className=" me-2">
              {isEditing ? (
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={handleYoutubeUrlChange}
                  className="topbar-wordpress"
                  //   placeholder="YouTube URL"
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
            </span>
            <span className="">
              {isEditing ? (
                <input
                  type="text"
                  value={instagramUrl}
                  onChange={handleInstagramUrlChange}
                  className="topbar-wordpress"
                  //   placeholder="Instagram URL"
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
            </span>
          </div>
          <div className="col-md-7 col-12 d-flex align-items-center justify-content-between">
            <span className="me-3">
              <small>
                {isEditing ? (
                  <input
                    type="text"
                    value={hours}
                    onChange={handleHoursChange}
                    className="topbar-wordpress"
                  />
                ) : (
                  hours
                )}
              </small>
            </span>
            <span className="me-3">
              <small>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="topbar-wordpress"
                  />
                ) : (
                  phone
                )}
              </small>
            </span>
          </div>
        </div>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <div className="py-2">
            <img src={logoUrl} alt="WWG" width={150} className="img-fluid" />
          </div>
          {isEditing ? (
            <input
              type="file"
              onChange={handleLogoChange}
              className="topbar-wordpress form-control-sm w-50"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
