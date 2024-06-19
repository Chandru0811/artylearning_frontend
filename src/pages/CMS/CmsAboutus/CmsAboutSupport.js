import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Glass from "../../../assets/clientimage/glass-painting.png";
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { useFormik } from "formik";

function CmsAboutSupport({ getData, datas }) {
  const [editingField, setEditingField] = useState(null);
  const [glassImgUrl, setGlassImgUrl] = useState(null);
  console.log("object", datas);
  // const [content, setContent] = useState({
  //   paragraphs: datas.contentOne,
  //   // "With unwavering support from their family, the Wonder Sisters embarked on their journey to establish Arty Learning.\n\nRooted in a foundation of strong family values, they held a steadfast conviction in ensuring that every child, regardless of their background, had equal opportunities to acquire language skills and flourish.\n\nTheir dedication to this cause not only resonated in their beliefs but was also demonstrated through the unwavering support they provided to ensure the success of each and every child, as well as their staff. \n\n In their relentless pursuit of growth and skill enhancement, the Wonder Sisters pursued a diverse array of certifications.\n\n These encompassed being First Aid Certified with CPR + AED provider, achieving the status of Certified Practitioners of Neuro-Linguistic Enneagram, and successfully completing the Positive Focus Impact Training for Educators.\n\n Amanda's credentials extended to a Certificate of Professional Practice in Phonics and a Diploma in Early Childhood Education. Similarly, Michelle's qualifications featured a Diploma in Early Literacy accredited by the London Teacher Training College. This comprehensive training underscored their steadfast commitment to delivering the utmost quality education through the platform of Arty Learning.",
  // });

  useEffect(() => {
    if (datas && datas.imageTwo) {
      setGlassImgUrl(datas.imageTwo);
    }
  }, [datas]);

  const toggleEdit = (field) => {
    setEditingField(field);
  };
  const cancelEdit = () => {
    setEditingField(null);
    getData();
  };

  // const saveContent = async() => {
  //   const formData =new FormData()
  //   if(changeImg){
  //     formData.append("imageTwo",glassImgUrl)
  //   }
  //     formData.append("contentOne",content.paragraphs)

  //     try {
  //       const response = await api.put(`/updateAboutUsSaveImage/${4}`, formData,
  //         // headers: {
  //         //   "Content-Type": "application/json",
  //         // },
  //     );
  //       if (response.status === 200) {
  //         toast.success(response.data.message);
  //         getData();
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }finally{
  //       setEditingField(null);
  //     }
  // };

  const formik = useFormik({
    initialValues: {
      files: null,
      paragraphs: datas.contentOne,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.files) {
        formData.append("imageTwo", values.files);
      }
      formData.append("contentOne", values.paragraphs);

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setContent((prevState) => ({ ...prevState, [name]: value }));
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setGlassImgUrl(URL.createObjectURL(file));
    formik.setFieldValue("files", file);
  };
  return (
    <>
      <section className="support">
        <div className="container-fluid backgound-imag-2 edit-container">
          <div className="container pt-4" style={{ minHeight: "80vh" }}>
            <form onSubmit={formik.handleSubmit}>
              <div className="row pt-5">
                <div className="col-md-5 col-12 d-flex align-items-center justify-content-end paint">
                  <div className="position-relative">
                    {editingField === "image" && (
                      <>
                        {/* <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setGlassImgUrl(reader.result);
                              };
                              setChangeImg(true);
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
                          type="submit"
                          className="btn btn-sm btn-outline-primary border ms-2"
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
                    )}
                    {editingField !== "image" && (
                      <div className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm border-transparent ms-2 edit-button"
                          onClick={() => toggleEdit("image")}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                    <img
                      src={glassImgUrl || Glass}
                      style={{
                        borderRight: "10px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "20px",
                      }}
                      alt="glass"
                      className="img-fluid"
                    />
                  </div>
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
                  {editingField === "paragraphs" ? (
                    <>
                      <textarea
                        name="paragraphs"
                        value={formik.values.paragraphs}
                        onChange={formik.handleChange}
                        rows="12"
                        className="form-control fs-5 lh-base"
                      />
                      <span
                        onClick={formik.handleSubmit}
                        className="btn btn-sm btn-outline-primary border ms-2"
                      >
                        <FaSave />
                      </span>
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
                      <p className="d-flex flex-column mt-2 mb-0 fs-5 lh-base">
                        {formik.values.paragraphs
                          ?.split("\n\n")
                          .map((text, index) => (
                            <span key={index}>
                              {text}
                              <br />
                              <br />
                            </span>
                          ))}
                      </p>
                      <button
                        className="btn btn-sm border-transparent ms-2 edit-button"
                        onClick={() => toggleEdit("paragraphs")}
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CmsAboutSupport;
