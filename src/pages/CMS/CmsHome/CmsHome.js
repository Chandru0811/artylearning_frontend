import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import api from "../../../config/URL";
import * as Yup from "yup";
import { useFormik } from "formik";

// const validationSchema = Yup.object().shape({});

function CmsHome() {
  const id = 3;
  const [data, setData] = useState({
    heroBackground: "",
    heroTitle: "",
    learningTitle: "",
    learningSubtitle: "",
    learningParagraph: "",
    learningImage: "",
    childTitle: "",
    childParagraph: "",
    childImage: "",
    childVideo: "",
  });
  const [editingField, setEditingField] = useState(null);

  const toggleEdit = (field) => {
    setEditingField(field);
  };

  const saveContent = () => {
    setEditingField(null);
  };

  const formik = useFormik({
    initialValues: {
      heroBackground: "",
      heroTitle: "",

      learningTitle: "",
      learningSubtitle: "",
      learningParagraph: "",
      learningImage: "",

      childTitle: "",
      childParagraph: "",
      childImage: "",

      childVideo: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("heroTitle", values.heroTitle);
      formData.append("heroBackground", values.heroBackground);
      formData.append("learningTitle", values.learningTitle);
      formData.append("learningSubtitle", values.learningSubtitle);
      formData.append("learningParagraph", values.learningParagraph);
      formData.append("learningImage", values.learningImage);
      formData.append("learningImage", values.learningImage);

      formData.append("childTitle", values.childTitle);
      formData.append("childParagraph", values.childParagraph);
      formData.append("childImage", values.childImage);
      formData.append("childVideo", values.childVideo);

      for (let pair of formData.entries()) {
        if (pair[1] instanceof File) {
          console.log(pair[0] + ': ' + pair[1].name); // Log file name
        } else {
          console.log(pair[0] + ': ' + pair[1]);
        }
      }

      try {
        const response = await api.put(
          `/updateHomeSaveWithProfileImages`,
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
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllHomeSaveById/${id}`);
      setData(response.data);

      formik.setValues({
        heroTitle: response.data.heroTitle,
        heroBackground: response.data.heroBackground,
        learningTitle: response.data.learningTitle,
        learningSubtitle: response.data.learningSubtitle,
        learningParagraph: response.data.learningParagraph,
        learningImage: response.data.learningImage,
        childTitle: response.data.childTitle,
        childParagraph: response.data.childParagraph,
        childImage: response.data.childImage,
        childVideo: response.data.childVideo,
      });
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="container card my-2 py-2">
          <div className="row p-1">
            <div className="col-md-6 col-12">
              <h4>Home</h4>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-sm btn-outline-primary border ms-2"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger border ms-2"
              >
                Save & Publish
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="heroSection">
          <div className="container-fluid p-0 edit-container">
            <div style={{ position: "relative" }} className="heroPicture">
              {editingField === "heroBackground" ? (
                <>
                  <input
                    type="file"
                    name="heroBackground"
                    className="topbar-wordpress form-control-sm w-50"
                    onChange={(e) => {
                      formik.setFieldValue("heroBackground", e.currentTarget.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("heroBackground")}
                >
                  <FaEdit />
                </button>
              )}
              <img
                src={data.childImage}
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
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90%",
              fontSize: "clamp(16px, 4vw, 46px)",
            }}
          >
            {editingField === "heroTitle" ? (
              <>
                <input
                  name="heroTitle"
                  {...formik.getFieldProps("heroTitle")}
                  // onChange={(e) => {
                  //   setTitlemsg(e.target.value);
                  // }}
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
                  type="button"
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
                    minHeight: "50%",
                  }}
                >
                  {/* {data.heroTitle.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))} */}
                  {data.heroTitle}
                </h1>
                <button
                  type="button"
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("heroTitle")}
                >
                  <FaEdit />
                </button>
              </>
            )}
          </div>
        </section>

        {/* learning Section */}
        <div className="container edit-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 mt-5">
              {editingField === "learningTitle" ? (
                <>
                  <input
                    type="text"
                    name="learningTitle"
                    {...formik.getFieldProps("learningTitle")}
                    // onChange={handleChange}
                    className="form-control fw-bold"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <>
                  <h1 className="fw-bold d-flex">
                    {data.learningTitle}
                    <button
                      type="button"
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("learningTitle")}
                    >
                      <FaEdit />
                    </button>
                  </h1>
                </>
              )}
              {editingField === "learningSubtitle" ? (
                <>
                  <input
                    type="text"
                    name="learningSubtitle"
                    {...formik.getFieldProps("learningSubtitle")}
                    className="form-control fw-bold"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <>
                  <h5 className="text-secondary fw-bold d-flex pt-3 pb-3">
                    {data.learningSubtitle}
                    <button
                      type="button"
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("learningSubtitle")}
                    >
                      <FaEdit />
                    </button>
                  </h5>
                </>
              )}

              {editingField === "learningParagraph" ? (
                <>
                  <textarea
                    name="learningParagraph"
                    {...formik.getFieldProps("learningParagraph")}
                    // onChange={handleChange}
                    rows="12"
                    className="form-control fs-5 lh-base"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <>
                  <p className="d-flex flex-column mt-2 mb-0 fs-5 lh-base">
                    {/* {data.learningParagraph.split("\n\n").map((text, index) => (
                    <span key={index}>
                      {text}
                      <br />
                      <br />
                    </span>
                  ))} */}
                    {data.learningParagraph}
                  </p>
                  <button
                    type="button"
                    className="btn btn-sm border-transparent ms-2 edit-button"
                    onClick={() => toggleEdit("learningParagraph")}
                  >
                    <FaEdit />
                  </button>
                </>
              )}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 mt-5 p-4">
              {editingField === "learningImage" ? (
                <>
                  <input
                    type="file"
                    name="learningImage"
                    onChange={(e) => {
                      formik.setFieldValue(
                        "learningImage",
                        e.currentTarget.files[0]
                      );
                    }}
                    className="topbar-wordpress form-control-sm w-50"
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={saveContent}
                  >
                    <FaSave />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-sm border-transparent ms-2 edit-button"
                  onClick={() => toggleEdit("learningImage")}
                  style={{ border: "none !important" }}
                >
                  <FaEdit />
                </button>
              )}
              <img
                className="rounded paper-draw ShadowLayer mt-2 img-fluid"
                src={data.learningImage}
                alt="arty learning"
              />
            </div>
          </div>
        </div>

        {/* Child Section */}
        <section className="whyArty my-1">
          <div className="container-fluid">
            <div
              className="container edit-container pt-4"
              style={{ minHeight: "80vh" }}
            >
              <div className="row">
                <div className="col-md-5 col-12 d-flex flex-column align-items-center justify-content-center paint">
                  {editingField === "childImage" ? (
                    <>
                      <input
                        type="file"
                        // onChange={(e) => {
                        //   const file = e.target.files[0];
                        //   if (file) {
                        //     const reader = new FileReader();
                        //     reader.onloadend = () => {
                        //       setGlassUrl(reader.result);
                        //     };
                        //     reader.readAsDataURL(file);
                        //   }
                        // }}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "childImage",
                            e.currentTarget.files[0]
                          );
                        }}
                        className="topbar-wordpress form-control-sm w-50"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary border ms-2"
                        onClick={saveContent}
                      >
                        <FaSave />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("childImage")}
                      style={{ border: "none !important" }}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <img
                    src={data.childImage}
                    style={{ borderRadius: "20px" }}
                    alt="childImage"
                    className="img-fluid"
                  />
                </div>
                <div
                  className="col-md-7 col-12 p-5"
                  style={{
                    backgroundColor: "#fffdec",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                    borderRight: "10px solid #000",
                  }}
                >
                  {editingField === "childTitle" ? (
                    <>
                      <input
                        type="text"
                        name="childTitle"
                        {...formik.getFieldProps("childTitle")}
                        // onChange={handleChange}
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary border ms-2"
                        onClick={saveContent}
                      >
                        <FaSave />
                      </button>
                    </>
                  ) : (
                    <>
                      <h1 className="card-title">
                        {data.childTitle}
                        <button
                          type="button"
                          className="btn btn-sm border-transparent ms-2 edit-button"
                          onClick={() => toggleEdit("childTitle")}
                        >
                          <FaEdit />
                        </button>
                      </h1>
                    </>
                  )}

                  {editingField === "childParagraph" ? (
                    <>
                      <textarea
                        name="childParagraph"
                        {...formik.getFieldProps("childParagraph")}
                        // onChange={handleChange}
                        rows="8"
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary border ms-2"
                        onClick={saveContent}
                      >
                        <FaSave />
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="card-text my-4">
                        {/* {data.childParagraph.split("\n\n").map((text, index) => (
                        <span key={index}>
                          {text}
                          <br />
                          <br />
                        </span>
                      ))} */}
                        {data.childParagraph}
                        <button
                          type="button"
                          className="btn btn-sm border-transparent ms-2 edit-button"
                          onClick={() => toggleEdit("childParagraph")}
                        >
                          <FaEdit />
                        </button>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Youtube Section  child Vedio*/}
        <div className="container mt-3 edit-container">
          <div className="d-flex flex-column justify-content-center align-items-center m-3">
            {editingField ? (
              <div className="w-100">
                <input
                  type="text"
                  name="childVideo"
                  {...formik.getFieldProps("childVideo")}
                  className="form-control"
                  placeholder="Enter YouTube URL"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary border mt-2"
                  onClick={saveContent}
                >
                  <FaSave />
                </button>
              </div>
            ) : (
              <div className="position-relative w-100">
                <button
                  type="button"
                  className="btn btn-sm border-transparent position-absolute top-0 end-0 m-2"
                  onClick={toggleEdit}
                >
                  <FaEdit className="text-warning fs-6" />
                </button>
              </div>
            )}
            <ReactPlayer
              url={data.childVideo}
              width="100%"
              height="500px"
              controls
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default CmsHome;
