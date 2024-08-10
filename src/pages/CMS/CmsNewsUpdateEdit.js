import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import api from "../../config/URL";
import Delete from "../../components/common/Delete.js";
import { FaTrash } from "react-icons/fa6";

function CmsNewsUpdateEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const storedScreens = JSON.parse(localStorage.getItem("screens") || "{}");
  const [datas, setDatas] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleShow = () => setShow(true);
  const currentData = new Date().toISOString().split("T")[0];

 

  const formik = useFormik({
    initialValues: {
      cardImg: "",
      heading: "",
      role: "",
      date: "",
      comment: "",
      para: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (data) => {
      console.log("data");
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("heading ", data.heading);
      formData.append("role ", "Admin");
      formData.append("date ", currentData);
      formData.append("comment ", data.comment);
      formData.append("para ", data.para);
      setLoadIndicator(true);
      try {
        const response = await api.put(
          `/updateNewsUpdatedSaveImages/${id}`,
          formData,
          {}
        );
        if (response.status === 201) {
          handleClose();
          onSuccess();
          toast.success(response.data.message);
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

  const handleClose = () => {
    setShow(false);
  };

  const getData = async () => {
    try {
      const response = await api.get(`/getNewsUpdatedSavesById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      toast.error("Error fetching data ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("file", file);
  };

  return (
    <div>
      <button className="btn" onClick={handleShow}>
        <MdEdit />
      </button>
      <Modal
       
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="headColor">Edit News</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div class=" col-12 mb-2">
                <lable className="form-lable">Upload Image File</lable>
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className={`form-control   ${
                      formik.touched.file && formik.errors.file
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
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
              <div class=" col-12 mb-2">
                <lable class="">Heading</lable>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control   ${
                      formik.touched.heading && formik.errors.heading
                        ? "is-invalid"
                        : ""
                    }`}
                    aria-label="heading"
                    aria-describedby="basic-addon1"
                    {...formik.getFieldProps("heading")}
                  />
                  {formik.touched.heading && formik.errors.heading && (
                    <div className="invalid-feedback">
                      {formik.errors.heading}
                    </div>
                  )}
                </div>
              </div>

              <div class=" col-12 mb-2">
                <lable class="">Comment</lable>
                <input
                  type="text"
                  className={`form-control   ${
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

              <div class=" col-12 mb-2">
                <lable class="">Paragraph</lable>
                <textarea
                  type="text"
                  className={`form-control   ${
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
          </form>
        </Modal.Body>
        <Modal.Footer className="mt-5">
        {storedScreens?.newsUpdatesDelete && (
          <Delete path={`/deleteNewsUpdatedSave/${id}`} onSuccess={onSuccess} />)}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={formik.handleSubmit}
            className="btn btn-button btn-sm"
            // disabled={loadIndicator}
          >
            {/* {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )} */}
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CmsNewsUpdateEdit;
