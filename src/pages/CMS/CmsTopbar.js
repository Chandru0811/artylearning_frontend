import React, { useEffect, useState } from "react";
import { FaYoutube, FaInstagram, FaEdit, FaSave } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
  logoUrl: Yup.mixed(),
  phone: Yup.string(),
  footer: Yup.string(),
  hours: Yup.string(),
  youtubeUrl: Yup.string(),
  instagramUrl: Yup.string(),
});

const ContactSection = () => {
  const id = 1; // Assuming this is the ID you are fetching data for
  const [editingField, setEditingField] = useState(null);
  const [data, setData] = useState({
    facebookLink: "",
    instagramLink: "",
    dateTime: "",
    phone: "",
    copyRight: "",
    artyLogo: "",
  });
  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getAllHeaderSaveById/${id}`);
      setData(response.data);
      formik.setValues({
        youtubeUrl: response.data.facebookLink,
        instagramUrl: response.data.instagramLink,
        phone: response.data.phone,
        footer: response.data.copyRight,
        hours: response.data.dateTime,
        logoUrl: response.data.artyLogo,
      });
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      logoUrl: null,
      phone: "",
      footer: "",
      hours: "",
      youtubeUrl: "",
      instagramUrl: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("facebookLink", values.youtubeUrl);
      formData.append("instagramLink", values.instagramUrl);
      formData.append("dateTime", new Date().toISOString());
      formData.append("phone", values.phone);
      if (values.logoUrl) {
        formData.append("file", values.logoUrl); // Append the file object directly
      }
      formData.append("copyRight", values.footer);

      try {
        const response = await api.put(
          `/updateHeaderSaveWithProfileImages/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          toast.success(response.data.message);
          getData();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
        toast.error("Error saving data: " + error.message);
      }
    },
  });

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="container cms-header shadow-sm py-2">
          <div className="row p-1">
            <div className="col-md-6 col-12">
              <h4>Header</h4>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
              <button
                className="btn btn-sm btn-outline-primary border ms-2"
                type="submit"
              >
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
                    value={formik.values.youtubeUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="youtubeUrl"
                    className={`form-control ${
                      formik.touched.youtubeUrl && formik.errors.youtubeUrl
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                ) : (
                  <a
                    href={data.facebookLink}
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
                    type="button"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                    type="button"
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
                    value={formik.values.instagramUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="instagramUrl"
                    className={`form-control ${
                      formik.touched.instagramUrl && formik.errors.instagramUrl
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                ) : (
                  <a
                    href={data.instagramLink}
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
                    type="button"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                    type="button"
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
                      value={formik.values.hours}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="hours"
                      className={`form-control ${
                        formik.touched.hours && formik.errors.hours
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  ) : (
                    data.dateTime
                  )}
                  {editingField === "hours" ? (
                    <button
                      className="btn btn-sm btn-outline-primary border ms-2"
                      type="button"
                      onClick={saveContent}
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                      type="button"
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
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="phone"
                      className={`form-control ${
                        formik.touched.phone && formik.errors.phone
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                  ) : (
                    data.phone
                  )}
                  {editingField === "phone" ? (
                    <button
                      className="btn btn-sm btn-outline-primary border ms-2"
                      type="button"
                      onClick={saveContent}
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                      type="button"
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
          <div className="col-6 ">
            <div className="edit-container">
              <div className="py-2">
                <img
                  src={data.artyLogo}
                  alt="Logo"
                  width={150}
                  className="img-fluid"
                />
              </div>
              {editingField === "logoUrl" ? (
                <>
                  <input
                    type="file"
                    onChange={(e) => {
                      formik.setFieldValue("logoUrl", e.currentTarget.files[0]);
                    }}
                    className={`form-control w-50 ${
                      formik.touched.logoUrl && formik.errors.logoUrl
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <button
                    className="btn btn-sm btn-outline-primary border ms-2"
                    type="button"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                  type="button"
                  onClick={() => toggleEdit("logoUrl")}
                >
                  <FaEdit />
                </button>
              )}
            </div>
          </div>
          <div className="col-6">
            <span className="me-3 edit-container">
              <small>
                {editingField === "footer" ? (
                  <input
                    type="text"
                    value={formik.values.footer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="footer"
                    className={`form-control ${
                      formik.touched.footer && formik.errors.footer
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                ) : (
                  data.copyRight
                )}
                {editingField === "footer" ? (
                  <button
                    className="btn btn-sm btn-outline-primary border ms-2"
                    type="button"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                    type="button"
                    onClick={() => toggleEdit("footer")}
                  >
                    <FaEdit />
                  </button>
                )}
              </small>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ContactSection;
