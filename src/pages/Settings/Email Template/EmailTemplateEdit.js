import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styling for React-Quill
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { FaEdit } from "react-icons/fa";

// Define custom toolbar modules
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }], // Text color and background color
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "video"], // Link, image, and video options
    ["clean"], // Remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  },
};

// Define formats to enable the editor to accept these types
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "video",
];

function EmailTemplateEdit({ id, onSuccess}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  const handleShow = async() => {
    try {
      const response = await api.get(`/getEmailTemplateById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setShow(true);
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("*Subject is required"),
  });

  const formik = useFormik({
    initialValues: {
      subject: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Email:", values);
      try {
        // const formData = new FormData();
        // formData.append("subject", values.subject);
        // formData.append("description", values.description);
        const response = await api.put(`/updateEmailTemplate/${id}`, values);
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess();
          setShow(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error(e);
      }
    },
  });

  // Handle `ReactQuill` value change
  const handleDescriptionChange = (value) => {
    formik.setFieldValue("description", value);
  };

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow} >
        <FaEdit />
      </button>
      <Modal show={show} centered onHide={handleClose} size="lg">
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Edit Email Template</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              {/* Subject Input */}
              <div className="col-12 mb-3">
                <label>
                  Subject<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.subject && formik.errors.subject
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("subject")}
                />
                {formik.touched.subject && formik.errors.subject && (
                  <div className="invalid-feedback">
                    {formik.errors.subject}
                  </div>
                )}
              </div>
              {/* Rich Text Editor for Description */}
              <div className="col-12 mb-3">
                <label>Description</label>
                <ReactQuill
                  value={formik.values.description}
                  onChange={handleDescriptionChange}
                  modules={modules} // Add custom toolbar modules
                  formats={formats} // Define formats allowed
                  className={`${
                    formik.touched.description && formik.errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn btn-button btn-sm">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EmailTemplateEdit;
