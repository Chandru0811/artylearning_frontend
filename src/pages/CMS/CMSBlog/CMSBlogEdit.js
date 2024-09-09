import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import api from "../../../config/URL";

function CMSBlogEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName  = localStorage.getItem('userName');


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialValues = {
    file: null,
    description: "",
    title: "",
  };

  const validationSchema = Yup.object().shape({
    file: Yup.mixed().required("Image file is required"),
    description: Yup.string().required("Image details are required"),
    title: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("description", values.description);
      formData.append("title", values.title);
      formData.append("updatedBy ", userName);

      try {
        const response = await api.put(
          `/updateUpdateBlogSave/${id}`,
          formData
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          getData(); // Reload the data to show the updated image
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getBlogSaveById/${id}`);
      formik.setValues({
        file: response.data.file,
        description: response.data.description,
        title: response.data.title,
      });
      setSelectedFile(response.data.file);
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  useEffect(() => {
    if (show) {
      getData();
    }
  }, [show]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("file", file);
  };

  return (
    <div className="container">
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>

      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.file className="headColor">Edit Blog</Modal.file>
        </Modal.Header>
         <form onSubmit={formik.handleSubmit} onKeyDown={(e) => {
          if (e.key === 'Enter' && !formik.isSubmitting) {
            e.preventDefault();  // Prevent default form submission
          }
        }}>
          <Modal.Body>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file && (
                  <div className="text-danger">{formik.errors.file}</div>
                )}
              </div>
              {selectedFile && (
                <div>
                  {typeof selectedFile === "string" ? (
                    <img
                      src={selectedFile}
                      alt="Selected File"
                      style={{ maxHeight: "200px" }}
                    />
                  ) : selectedFile.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected File"
                      style={{ maxHeight: "200px" }}
                    />
                  ) : null}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Blog file
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-danger">{formik.errors.title}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Blog Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description &&
                  formik.errors.description && (
                    <div className="text-danger">
                      {formik.errors.description}
                    </div>
                  )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant="secondary" onClick={handleClose}>
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
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default CMSBlogEdit;
