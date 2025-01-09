import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";
import NewsUpdateUpdateEdit from "../CMS/CmsNewsUpdateEdit";
import { Link } from "react-router-dom";

const CmsNewsUpdate = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentData = new Date().toISOString().split("T")[0];
  const [selectedFile, setSelectedFile] = useState(null);
  const role = localStorage.getItem("userName")?.replace(/_/g, " ");

  console.log("role", role);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    formik.resetForm();
    setSelectedFile(null);
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const validationSchema = yup.object().shape({
    // file: yup.string().required("*Package Name is required"),
    // heading: yup.string().required("*Heading is required"),
    // role: yup.string().required("*Role is required"),
    // date: yup.string().required("*Date is required"),
    // comment: yup.string().required("*comment is required"),
  });
  console.log("object", datas);
  const formik = useFormik({
    initialValues: {
      file: "",
      heading: "",
      role: role || "",
      date: "",
      comment: "",
      para: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (data) => {
      // console.log(data);
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("heading ", data.heading);
      if (role) {
        formData.append("role", role);
      }
      formData.append("date ", currentData);
      formData.append("comment ", data.comment);
      formData.append("para ", data.para);
      setLoadIndicator(true);
      try {
        const response = await api.post(
          `/createNewsUpdatedSaveImages`,
          formData
        );
        if (response.status === 201) {
          setShowAddModal(false);
          formik.resetForm();
          toast.success(response.data.message);
          refreshData();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/getAllNewsUpdatedSave");
      setDatas(response.data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
    setLoading(false);
  };
  const handleClose = () => {
    setShow(false);
  };

  const publish = async () => {
    try {
      const response = await api.post(`/publishNewsUpdated`);
      // formik.setValues(response.data);
      // setDatas(response.data)
      if (response.status === 201) {
        toast.success("successfully Teacher published ");
      }
    } catch (error) {
      toast.error("Error Fetch Data ", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("file", file); // Update Formik's form state with the file
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="news p-2">
      <div className="container-fluid cms-header shadow-sm p-2">
        <ol
          className="breadcrumb my-3 px-1"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
        >
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
          <li className="breadcrumb-item active" aria-current="page">
            News & Updates
          </li>
        </ol>
        <div className="row p-1">
          <div className="col-md-6 col-12">
            <h4 className="headColor">News & Updates</h4>
          </div>
          <div className="col-md-6 col-12 d-flex justify-content-end">
            {storedScreens?.newsUpdatesPublish && (
              <button
                className="btn btn-sm custom-outline-danger border ms-2"
                onClick={publish}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid py-3">
        <div className="d-flex align-content-end justify-content-end">
          {storedScreens?.newsUpdatesCreate && (
            <button className="btn btn-button" onClick={handleShowAddModal}>
              Add News <IoMdAdd />
            </button>
          )}
        </div>

        <div className="row">
          {datas.map((item, index) => (
            <div className="col-md-4 col-12 my-2 calendar-item" key={index}>
              <div className="custom-card shadow-lg h-100 d-flex flex-column align-items-center mx-3 mt-2 pt-3 position-relative">
                {storedScreens?.newsUpdatesUpdate && (
                  <span
                    className="btn custom-edit-button"
                    onClick={handleClose}
                  >
                    <NewsUpdateUpdateEdit
                      id={item.id}
                      onSuccess={refreshData}
                    />
                  </span>
                )}
                <img
                  src={item.cardImg}
                  alt="view"
                  style={{ height: "45%", width: "96%" }}
                  className="custom-img-fluid"
                />
                <div className="custom-card-body d-flex flex-column p-2">
                  <div className="custom-content">
                    <h6 className="custom-card-title">{item.heading}</h6>
                    <p>
                      {item.role}/{item.date}/{item.comment}
                    </p>
                  </div>
                  {/* <div className="mt-auto">
                    <button className="custom-button mt-4">Read More</button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={showAddModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseAddModal}
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Add News</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="mb-2">
                <label className="form-label">Upload Image File</label>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className={`form-control ${
                      formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleFileChange}
                  />
                  {formik.touched.file && formik.errors.file && (
                    <div className="invalid-feedback">{formik.errors.file}</div>
                  )}
                </div>
              </div>
              {selectedFile && (
                <div className="mb-2">
                  {selectedFile.type.startsWith("image") && (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxHeight: "200px" }}
                    />
                  )}
                </div>
              )}

              <div className="mb-2">
                <label className="form-label">Heading</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.heading && formik.errors.heading
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("heading")}
                />
                {formik.touched.heading && formik.errors.heading && (
                  <div className="invalid-feedback">
                    {formik.errors.heading}
                  </div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Comment</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.comment && formik.errors.comment
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("comment")}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <div className="invalid-feedback">
                    {formik.errors.comment}
                  </div>
                )}
              </div>

              <div className="mb-2">
                <label className="form-label">Paragraph</label>
                <textarea
                  className={`form-control ${
                    formik.touched.para && formik.errors.para
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("para")}
                />
                {formik.touched.para && formik.errors.para && (
                  <div className="invalid-feedback">{formik.errors.para}</div>
                )}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer className="mt-5">
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleCloseAddModal}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default CmsNewsUpdate;
