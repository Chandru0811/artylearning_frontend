import React, { useEffect, useState } from "react";
import { FaYoutube, FaInstagram, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const ContactSection = () => {

  const [editingField, setEditingField] = useState(null);
  const storedScreens = JSON.parse(sessionStorage.getItem("screens") || "{}");
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

  const cancelEdit = () => {
    setEditingField(null);
    getData();
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getAllHeaderSave`);
      setData(response.data);
      formik.setValues({
        facebookLink: response.data.facebookLink,
        instagramLink: response.data.instagramLink,
        phone: response.data.phone,
        copyRight: response.data.copyRight,
        dateTime: response.data.dateTime,
        file: response.data.artyLogo,
      });
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      file: null || "",
      phone: "",
      copyRight: "",
      dateTime: "",
      facebookLink: "",
      instagramLink: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("facebookLink", values.facebookLink);
      formData.append("instagramLink", values.instagramLink);
      formData.append("dateTime", new Date().toISOString());
      formData.append("phone", values.phone);
      if (values.file) {
        formData.append("file", values.file); // Append the file object directly
      }
      formData.append("copyRight", values.copyRight);

      try {
        const response = await api.put(
          `/updateHeaderSaveWithProfileImages`,
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

  // Save content logic for individual fields
  const saveContent = async (field) => {
    setEditingField(null);
    const formData = new FormData();

    // Add the specific field to formData
    formData.append(field, formik.values[field]);

    try {
      const response = await api.put(
        `/updateHeaderSaveWithProfileImages`,
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
    }
  };

  const PublishHeaderSection = async () => {
    try {
      const response = await api.post(`/publishHeader`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        getData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error saving data:", error.message);
    }
  };

  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="container cms-header shadow-sm py-2">
          <div className="row p-1">
            <div className="col-md-6 col-12">
              <h4>Header</h4>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
              {storedScreens?.headerPublish && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger border ms-2"
                  onClick={PublishHeaderSection}
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="container-fluid pt-1 pb-2 px-3 mb-2 bg-dark text-white">
          <div className="row align-items-center">
            <div className="col-md-5 col-12 d-flex align-items-center">
              <span className="me-2 edit-container">
                {editingField === "facebookLink" ? (
                  <>
                    <input
                      type="text"
                      value={formik.values.facebookLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="facebookLink"
                      className={`form-control ${formik.touched.facebookLink && formik.errors.facebookLink
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <button
                      className="btn btn-sm btn-outline-primary border ms-2"
                      type="button"
                      onClick={() => saveContent("facebookLink")}
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
                  </>
                ) : (
                  <>
                    <a
                      href={data.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="topbar-wordpress"
                    >
                      <FaYoutube />
                    </a>
                    {storedScreens?.headerUpdate && (
                      <button
                        className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                        type="button"
                        onClick={() => toggleEdit("facebookLink")}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </>
                )}
              </span>
              <span className="edit-container">
                {editingField === "instagramLink" ? (
                  <>
                    <input
                      type="text"
                      value={formik.values.instagramLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="instagramLink"
                      className={`form-control ${formik.touched.instagramLink &&
                        formik.errors.instagramLink
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <button
                      className="btn btn-sm btn-outline-primary border ms-2"
                      type="button"
                      onClick={() => saveContent("instagramLink")}
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
                  </>
                ) : (
                  <>
                    <a
                      href={data.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="topbar-wordpress"
                    >
                      <FaInstagram />
                    </a>
                    {storedScreens?.headerUpdate && (
                      <button
                        className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                        type="button"
                        onClick={() => toggleEdit("instagramLink")}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </>
                )}
              </span>
            </div>
            <div className="col-md-7 col-12 d-flex align-items-center justify-content-between">
              <span className="me-3 edit-container">
                <small>
                  {editingField === "dateTime" ? (
                    <>
                      <input
                        type="text"
                        value={formik.values.dateTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="dateTime"
                        className={`form-control ${formik.touched.dateTime && formik.errors.dateTime
                          ? "is-invalid"
                          : ""
                          }`}
                      />
                      <button
                        className="btn btn-sm btn-outline-primary border ms-2"
                        type="button"
                        onClick={() => saveContent("dateTime")}
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
                    </>
                  ) : (
                    <>
                      {data.dateTime}
                      {storedScreens?.headerUpdate && (
                        <button
                          className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                          type="button"
                          onClick={() => toggleEdit("dateTime")}
                        >
                          <FaEdit />
                        </button>
                      )}
                    </>
                  )}
                </small>
              </span>
              <span className="me-3 edit-container">
                <small>
                  {editingField === "phone" ? (
                    <>
                      <input
                        type="text"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="phone"
                        className={`form-control ${formik.touched.phone && formik.errors.phone
                          ? "is-invalid"
                          : ""
                          }`}
                      />
                      <button
                        className="btn btn-sm btn-outline-primary border ms-2"
                        type="button"
                        onClick={() => saveContent("phone")}
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
                    </>
                  ) : (
                    <>
                      {data.phone}
                      {storedScreens?.headerUpdate && (
                        <button
                          className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                          type="button"
                          onClick={() => toggleEdit("phone")}
                        >
                          <FaEdit />
                        </button>
                      )}
                    </>
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
              {editingField === "file" ? (
                <>
                  <input
                    type="file"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.currentTarget.files[0]);
                    }}
                    className={`form-control w-50 ${formik.touched.file && formik.errors.file
                      ? "is-invalid"
                      : ""
                      }`}
                  />
                  <button
                    className="btn btn-sm btn-outline-primary border ms-2"
                    type="button"
                    onClick={() => saveContent("file")}
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
                </>
              ) : (
                <>
                  {storedScreens?.headerUpdate && (
                    <button
                      className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                      type="button"
                      onClick={() => toggleEdit("file")}
                    >
                      <FaEdit />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-6">
            <span className="me-3 edit-container">
              <small>
                {editingField === "copyRight" ? (
                  <>
                    <input
                      type="text"
                      value={formik.values.copyRight}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="copyRight"
                      className={`form-control ${formik.touched.copyRight && formik.errors.copyRight
                        ? "is-invalid"
                        : ""
                        }`}
                    />
                    <button
                      className="btn btn-sm btn-outline-primary border ms-2"
                      type="button"
                      onClick={() => saveContent("copyRight")}
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
                  </>
                ) : (
                  <>
                    {data.copyRight}
                    {storedScreens?.headerUpdate && (
                      <button
                        className="btn btn-sm btn-outline-warning border ms-2 edit-button"
                        type="button"
                        onClick={() => toggleEdit("copyRight")}
                      >
                        <FaEdit />
                      </button>
                    )}
                  </>
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
