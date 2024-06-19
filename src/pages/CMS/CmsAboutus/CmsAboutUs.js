import React, { useEffect, useState } from "react";
import logo from "../../../assets/clientimage/Arty_Learning_Logo-2023-tp-400.png";
import Glass from "../../../assets/clientimage/glass-painting.png";
import AdminImg from "../../../assets/clientimage/IMG_6872-scaled.jpg";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import CmsAboutSupport from "./CmsAboutSupport";
import CmsAboutMCmsAboutMichelleandAmandaichelle from "./CmsAboutMichelleandAmanda";
import CmsAboutPersonalized from "./CmsAboutPersonalized";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { useFormik } from "formik";
import * as Yup from "yup";

function CmsAboutUs() {
  const [editingField, setEditingField] = useState(null);
  const [datas, setDatas] = useState([]);
  const [adminImgUrl, setAdminImgUrl] = useState(null);
  const toggleEdit = (field) => {
    setEditingField(field);
  };
  const cancelEdit = () => {
    setEditingField(null);
    getData();
  };

  useEffect(() => {
    if (datas && datas.imageOne) {
      setAdminImgUrl(datas.imageOne);
    }
  }, [datas]);

  const formik = useFormik({
    initialValues: {
      files: null,
    },
    // validationSchema,
    onSubmit: async (data) => {
      console.log(data);
      const formData = new FormData();
      formData.append("imageOne", data.files);

      try {
        const response = await api.put(
          `/updateAboutUsSaveImage`,
          formData
          // headers: {
          //   "Content-Type": "application/json",
          // },
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setEditingField(null);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllAboutUsSave`);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAdminImgUrl(URL.createObjectURL(file));
    formik.setFieldValue("files", file); // Update Formik's form state with the file
  };

  const publish = async () => {
    try {
      const response = await api.post(`/publishAboutUs`);
      if(response.status === 201){ 
        toast.success("successfully Teacher published ");
      }
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
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
            <button className="btn btn-sm btn-outline-danger border ms-2" onClick={publish}>
              Publish
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
                    <form onSubmit={formik.handleSubmit}>
                      {/* <input
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
                    /> */}
                      <input
                        type="file"
                        id="files"
                        name="files"
                        className="form-control"
                        onChange={handleFileChange}
                        onBlur={formik.handleBlur}
                      />

                      <button
                        className="btn btn-sm btn-outline-primary border ms-2"
                        onClick={formik.handleSubmit}
                      >
                        <FaSave />
                      </button>
                      <button
                    className="btn btn-sm btn-outline-secondary border ms-2"
                    type="button"
                    onClick={cancelEdit}
                  >
                    <FaTimes />
                  </button>
                    </form>
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
                  src={adminImgUrl ||AdminImg}
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

      {/* About Michelle and Amanda*/}
      <CmsAboutMCmsAboutMichelleandAmandaichelle getData={getData} datas={datas}/>

      {/* About Personalized */}
      <CmsAboutPersonalized getData={getData} datas={datas}/>
    </>
  );
}

export default CmsAboutUs;
