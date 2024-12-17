import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styling for React-Quill
import { toast } from "react-toastify";
import api from "../../../config/URL";
import { MdOutlineModeEdit } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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

function EmailTemplateEdit({ id, onSuccess }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  const handleOpen = async () => {
    try {
      const response = await api.get(`/getEmailTemplateById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setOpen(true);
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
      try {
        const response = await api.put(`/updateEmailTemplate/${id}`, values);
        if (response.status === 200) {
          toast.success("The email template has been successfully updated");
          onSuccess();
          setOpen(false);
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
      <button
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
        className="btn btn-sm btn-normal text-start"
        onClick={handleOpen}
      >
        <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="headColor">
            Edit Email Template
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
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
          </DialogContent>
          <DialogActions>
            <button
            type="button"
              className="btn btn-border btn-sm"
              style={{ fontSize: "12px" }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-button btn-sm"
            >
              {/* {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )} */}
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default EmailTemplateEdit;
