import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import api from "../../../config/URL";

// Custom toolbar handlers
const toolbarHandlers = {
  undo: function () {
    this.quill.history.undo();
  },
  redo: function () {
    this.quill.history.redo();
  },
  maximize: function () {
    const editorContainer = document.querySelector(".ql-container");
    if (!document.fullscreenElement) {
      editorContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  },
};

// Toolbar configuration with Undo, Redo, and Maximize
const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
      ["undo", "redo", "maximize"], // Added buttons
    ],
    handlers: toolbarHandlers,
  },
  clipboard: {
    matchVisual: false,
  },
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true,
  },
};

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
//   "image",
//   "video",
];

function EmailTemplateAdd() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("*Subject is required"),
  });

  const formik = useFormik({
    initialValues: {
      subject: "",
      descriptions: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Email:", values);
      try {
        const formData = new FormData();
        formData.append("subject", values.subject);
        formData.append("descriptions", values.descriptions);
        const response = await api.post(`/emailTemp`, formData);
        if (response.status === 201) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (e) {
        toast.error(e);
      }
    },
  });

  const handleDescriptionChange = (value) => {
    formik.setFieldValue("descriptions", value);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-button btn-sm"
        onClick={handleShow}
      >
        Add <i className="bx bx-plus"></i>
      </button>
      <Modal show={show} centered onHide={handleClose} size="lg">
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Add Email Template</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
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
              <div className="col-12 mb-3">
                <label>Description</label>
                <ReactQuill
                  value={formik.values.descriptions}
                  onChange={handleDescriptionChange}
                  modules={modules}
                  formats={formats}
                  className={`${
                    formik.touched.descriptions && formik.errors.descriptions
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

export default EmailTemplateAdd;
