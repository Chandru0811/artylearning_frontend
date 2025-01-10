import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../../config/URL";

function CMSBlogEdit({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    handleMenuClose();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const initialValues = {
    imagerOne: null,
    description: "",
    title: "",
  };

  const validationSchema = Yup.object().shape({
    imagerOne: Yup.mixed().required("Image is required"),
    description: Yup.string().required("Description is required"),
    title: Yup.string().required("Title is required"),
  });

  const formik = useFormik({
    initialValues,
    // validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("file", values.imagerOne);
      formData.append("description", values.description);
      formData.append("title", values.title);
      formData.append("updatedBy", userName);

      try {
        const response = await api.put(`/updateUpdateBlogSave/${id}`, formData);
        if (response.status === 201) {
          toast.success(response.data.message);
          onSuccess();
          getData();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadIndicator(false);
        handleClose();
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getBlogSaveById/${id}`);
      formik.setValues({
        imagerOne: response.data.imagerOne,
        description: response.data.description,
        title: response.data.title,
      });
      setSelectedFile(response.data.imagerOne);
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
    formik.setFieldValue("imagerOne", file);
  };

  return (
    <>
      <p className="text-start mb-0 menuitem-style" onClick={handleShow}>
        Edit
      </p>

      <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="headColor">
          Edit Blog{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="mb-3">
              <label htmlFor="imagerOne" className="form-label">
                Upload Image
              </label>
              <input
                onKeyDown={(e) => e.stopPropagation()}
                type="file"
                id="imagerOne"
                name="imagerOne"
                className="form-control"
                accept=".jpeg,.jpg,.png,.gif,.bmp,.webp"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.imagerOne && formik.errors.imagerOne && (
                <div className="text-danger">{formik.errors.imagerOne}</div>
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
                Blog Title
              </label>
              <input
                onKeyDown={(e) => e.stopPropagation()}
                type="text"
                id="title"
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
                className="form-control"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
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
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Save
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CMSBlogEdit;
