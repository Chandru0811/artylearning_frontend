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
} from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../../config/URL";

function CMSBlogEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName = localStorage.getItem("userName");

  const handleClose = () => setShow(false);
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
    validationSchema,
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
      <button className="btn btn-sm" onClick={handleShow}>
        <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      </button>

      <Dialog open={show} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="headColor">Edit Blog</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="mb-3">
              <label htmlFor="imagerOne" className="form-label">
                Upload Image
              </label>
              <input
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
            <TextField
              id="title"
              name="title"
              label="Blog Title"
              fullWidth
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              id="description"
              name="description"
              label="Blog Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
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
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CMSBlogEdit;
