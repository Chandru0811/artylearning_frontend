import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Animation1 from "../../../assets/clientimage/about_animation1.png";
import Animation2 from "../../../assets/clientimage/about_animation2.png";
import Animation3 from "../../../assets/clientimage/about_animation3.png";
import Animation4 from "../../../assets/clientimage/about_animation4.png";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { useFormik } from "formik";

function CmsAboutPersonalized({ getData, datas }) {
  const [editingField, setEditingField] = useState(null);
  const [animation1, setAnimation1] = useState(null);
  const [animation2, setAnimation2] = useState(null);
  const [animation3, setAnimation3] = useState(null);
  const [animation4, setAnimation4] = useState(null);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const userName = localStorage.getItem('userName');


  // const [paragraph, setParagraph] =
  //   useState(`We take a personalized approach to education, placing children in
  //   classes based on their individual literacy development and
  //   learning pace, rather than adhering to age groups.\n\n This approach creates the opportunity for children to build a stronger foundation and boosts their confidence, as the curriculum adapts to their unique learning needs and styles.\n\n They firmly believe in the words of Robert John Meehan: "Every child has a different learning style and pace, and each child is unique, not only capable of learning but also capable of succeeding."`);

  const toggleEdit = (index) => {
    setEditingField(index);
  };
  const cancelEdit = () => {
    setEditingField(null);
    getData();
  };

  // const saveContent = () => {
  //   setEditingField(null);
  // };
  useEffect(() => {
    if (datas) {
      setAnimation1(datas.imageFive);
      setAnimation2(datas.imageSix);
      setAnimation3(datas.imageSeven);
      setAnimation4(datas.imageEight);
    }
  }, [datas]);

  // const handleChange = (e) => {
  //   setParagraph(e.target.value);
  // };

  const formik = useFormik({
    initialValues: {
      animation1: null,
      animation2: null,
      animation3: null,
      animation4: null,
      paragraph: datas.contentFive,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.animation4) {
        formData.append("imageEight", values.animation4);
      }
      if (values.animation3) {
        formData.append("imageSeven", values.animation3);
      }
      if (values.animation2) {
        formData.append("imageSix ", values.animation2);
      }
      if (values.animation1) {
        formData.append("imageFive ", values.animation1);
      }
      formData.append("contentFive ", values.paragraph);
      formData.append("updatedBy ", userName);

      // formData.append("contentFour ", values.amanda);
      // formData.append("imageEight ", values.name1);

      try {
        const response = await api.put(`/updateAboutUsSaveImage`, formData);
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
        }
      } catch (error) {
        toast.error("Error updating data: " + error.message);
      } finally {
        setEditingField(null);
      }
    },
  });
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setAnimation1(URL.createObjectURL(file));
    formik.setFieldValue("animation1", file);
  };
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setAnimation2(URL.createObjectURL(file));
    formik.setFieldValue("animation2", file);
  };
  const handleFileChange3 = (event) => {
    const file = event.target.files[0];
    setAnimation3(URL.createObjectURL(file));
    formik.setFieldValue("animation3", file);
  };
  const handleFileChange4 = (event) => {
    const file = event.target.files[0];
    setAnimation4(URL.createObjectURL(file));
    formik.setFieldValue("animation4", file);
  };
  return (
    <div
      className="container-fluid edit-container"
      style={{ backgroundColor: "#f9fafb" }}
    >
      <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
        if (e.key === 'Enter' && !formik.isSubmitting) {
          e.preventDefault();  // Prevent default form submission
        }
      }}>
        <div className="container">
          <div className="row py-5">
            <div className="col-md-5 col-12 ">
              {editingField === "paragraph" ? (
                <>
                  <textarea
                    name="paragraph"
                    value={formik.values.paragraph}
                    onChange={formik.handleChange}
                    rows="20"
                    className="form-control"
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter") {
                    //     e.preventDefault(); // Prevent default "new line" behavior
                    //     console.log("Enter key pressed, but no new line created.");
                    //   }
                    // }}
                  />
                  <span
                    className="btn btn-sm btn-outline-primary border ms-2"
                    onClick={formik.handleSubmit}
                  >
                    <FaSave />
                  </span>
                  <span
                    className="btn btn-sm btn-outline-secondary border ms-2"
                    type="button"
                    onClick={cancelEdit}
                  >
                    <FaTimes />
                  </span>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "20px" }} className="preserve-whitespace">
                    {formik.values.paragraph?.split("\n").map((text, index) => (
                      <span key={index}>
                        {text}
                        <br />
                      </span>
                    ))}
                  </p>
                  {storedScreens?.aboutUpdate && (
                    <button
                      className="btn btn-sm border-transparent ms-2 edit-button"
                      onClick={() => toggleEdit("paragraph")}
                    >
                      <FaEdit />
                    </button>)}
                </>
              )}
            </div>
            <div className="col-md-7 col-12">
              <div className="row">
                <div className="col-md-6 col-12 mb-5">
                  <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                    {editingField === "Animation1" ? (
                      <>
                        {/*<input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setAnimation1(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="topbar-wordpress form-control-sm w-50"
                        />*/}

                        <input
                          type="file"
                          id="animation1"
                          name="animation1"
                          className="form-control"
                          onChange={(e) => handleFileChange1(e, "animation1")}
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
                      </>
                    ) : (
                      <>
                        {storedScreens?.aboutUpdate && (
                          <button
                            className="btn btn-sm border-transparent ms-2 edit-button"
                            onClick={() => toggleEdit("Animation1")}
                            style={{ border: "none !important" }}
                          >
                            <FaEdit />
                          </button>)}
                      </>
                    )}
                    <img
                      className="img-fluid"
                      style={{
                        transform: "rotate(10deg)",
                        borderRadius: "20px",
                        width: "200px",
                      }}
                      src={animation1 || Animation1}
                      alt="animation1"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-5">
                  <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                    {editingField === "Animation2" ? (
                      <>
                        {/* <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setAnimation2(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="topbar-wordpress form-control-sm w-50"
                        /> */}
                        <input
                          type="file"
                          id="animation2"
                          name="animation2"
                          className="form-control"
                          onChange={(e) => handleFileChange2(e, "animation2")}
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
                      </>
                    ) : (
                      <>
                        {storedScreens?.aboutUpdate && (
                          <button
                            className="btn btn-sm border-transparent ms-2 edit-button"
                            onClick={() => toggleEdit("Animation2")}
                            style={{ border: "none !important" }}
                          >
                            <FaEdit />
                          </button>)}
                      </>
                    )}
                    <img
                      className="img-fluid"
                      style={{
                        transform: "rotate(-10deg)",
                        borderRadius: "20px",
                        width: "200px",
                      }}
                      src={animation2 || Animation2}
                      alt="animation2"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-5">
                  <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                    {editingField === "Animation3" ? (
                      <>
                        {/* <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setAnimation3(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="topbar-wordpress form-control-sm w-50"
                        /> */}
                        <input
                          type="file"
                          id="animation3"
                          name="animation3"
                          className="form-control"
                          onChange={(e) => handleFileChange3(e, "animation3")}
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
                      </>
                    ) : (
                      <>
                        {storedScreens?.aboutUpdate && (
                          <button
                            className="btn btn-sm border-transparent ms-2 edit-button"
                            onClick={() => toggleEdit("Animation3")}
                            style={{ border: "none !important" }}
                          >
                            <FaEdit />
                          </button>
                        )}</>
                    )}
                    <img
                      className="img-fluid"
                      style={{
                        transform: "rotate(-10deg)",
                        borderRadius: "20px",
                        width: "200px",
                      }}
                      src={animation3 || Animation3}
                      alt="animation3"
                    />
                  </div>
                </div>
                <div className="col-md-6 col-12 mb-5">
                  <div className="p-2" style={{ backgroundColor: "#d1d2d3" }}>
                    {editingField === "Animation4" ? (
                      <>
                        {/* <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setAnimation4(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="topbar-wordpress form-control-sm w-50"
                        /> */}
                        <input
                          type="file"
                          id="animation4"
                          name="animation4"
                          className="form-control"
                          onChange={(e) => handleFileChange4(e, "animation4")}
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
                      </>
                    ) : (
                      <>
                        {storedScreens?.aboutUpdate && (
                          <button
                            className="btn btn-sm border-transparent ms-2 edit-button"
                            onClick={() => toggleEdit("Animation4")}
                            style={{ border: "none !important" }}
                          >
                            <FaEdit />
                          </button>
                        )}</>
                    )}
                    <img
                      className="img-fluid"
                      style={{
                        transform: "rotate(5deg)",
                        borderRadius: "20px",
                        width: "200px",
                      }}
                      src={animation4 || Animation4}
                      alt="animation4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CmsAboutPersonalized;
