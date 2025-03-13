import React, { useEffect, useState } from "react";
import logo from "../../../assets/clientimage/Arty_Learning_Logo-2023-tp-400.png";
import AdminImg from "../../../assets/clientimage/IMG_6872-scaled.jpg";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import CmsAboutSupport from "./CmsAboutSupport";
import CmsAboutMichelleandAmanda from "./CmsAboutMichelleandAmanda";
import CmsAboutPersonalized from "./CmsAboutPersonalized";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

function CmsAboutUs() {
  const [editingField, setEditingField] = useState(null);
  const [datas, setDatas] = useState([]);
  const [adminImgUrl, setAdminImgUrl] = useState(null);
  const [bgImage, setBgImage] = useState(
    require("../../../assets/clientimage/aboutBackground.png")
  );
  const [bgImageFile, setBgImageFile] = useState(null);

  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllAboutUsSave`);
      setDatas(response.data);
      if (response.data?.backgroundImage) {
        setBgImage(response.data.backgroundImage);
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const formik = useFormik({
    initialValues: {
      files: null,
    },
    onSubmit: async (data) => {
      const formData = new FormData();
      formData.append("imageOne", data.files);
      formData.append("updatedBy", userName);

      try {
        const response = await api.put(`/updateAboutUsSaveImage`, formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
        }
      } catch (error) {
        toast.error("Error updating image");
      } finally {
        setEditingField(null);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAdminImgUrl(URL.createObjectURL(file));
    formik.setFieldValue("files", file);
  };

  const handleBgFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBgImageFile(file);
      setBgImage(URL.createObjectURL(file));
    }
  };

  const saveBackgroundImage = async () => {
    if (!bgImageFile) return;

    const formData = new FormData();
    formData.append("backgroundImage", bgImageFile);
    formData.append("updatedBy", userName);

    try {
      const response = await api.put(`/updateAboutUsBackground`, formData);
      if (response.status === 200) {
        toast.success("Background image updated successfully");
        getData();
      }
    } catch (error) {
      toast.error("Error updating background image");
    } finally {
      setEditingField(null);
    }
  };

  return (
    <>
      {/* Header */}
      <div>
        <div className="container cms-header shadow-sm py-2">
          <ol className="breadcrumb my-3 px-1">
            <li>
              <Link to="/" className="custom-breadcrumb">
                Home
              </Link>
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li>
              Content Management
              <span className="breadcrumb-separator"> &gt; </span>
            </li>
            <li className="breadcrumb-item active">About Us</li>
          </ol>
          <div className="row p-1">
            <div className="col-md-6 col-12">
              <h4 className="headColor">About Us</h4>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with Editable Background */}
      <div className="container-fluid about mt-2">
        <div
          className="row py-5 about2"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <div className="offset-md-1 col-md-10 col-12">
            {/* Background Image Edit Button */}
            {storedScreens?.aboutUpdate && (
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => setEditingField("BackgroundImage")}
                  style={{ border: "none !important" }}
                >
                  <FaEdit />
                </button>
              </div>
            )}

            {editingField === "BackgroundImage" && (
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={handleBgFileChange}
                  accept="image/*"
                />
                <button
                  className="btn btn-sm btn-outline-primary border ms-2"
                  type="submit"
                  onClick={saveBackgroundImage}
                >
                  <FaSave />
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary border ms-2"
                  type="button"
                  onClick={() => setEditingField(null)}
                >
                  <FaTimes />
                </button>
              </div>
            )}

            <div className="row">
              <div className="col-md-6 col-12 py-5 d-flex flex-column align-items-center justify-content-center">
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
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                      onBlur={formik.handleBlur}
                    />
                    <button
                      className="btn btn-sm btn-outline-primary border ms-2"
                      type="submit"
                    >
                      <FaSave />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary border ms-2"
                      type="button"
                      onClick={() => setEditingField(null)}
                    >
                      <FaTimes />
                    </button>
                  </form>
                ) : (
                  storedScreens?.aboutUpdate && (
                    <button
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => setEditingField("AdminImg")}
                      style={{ border: "none !important" }}
                    >
                      <FaEdit />
                    </button>
                  )
                )}
                <img
                  src={adminImgUrl || AdminImg}
                  alt="Admins"
                  className="img-fluid image_border"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Painting Glass */}
      <CmsAboutSupport getData={getData} datas={datas} />

      {/* About Michelle and Amanda */}
      <CmsAboutMichelleandAmanda getData={getData} datas={datas} />

      {/* About Personalized */}
      <CmsAboutPersonalized getData={getData} datas={datas} />
    </>
  );
}

export default CmsAboutUs;
