import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
// import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { MdOutlineModeEdit } from "react-icons/md";

function CMSProductsItemEdit({ id, getData }) {
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName = localStorage.getItem("userName");

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
    setSelectedFile(null); // Clear file state on close
  };

  const handleOpen = () => setOpen(true);

  const validationSchema = Yup.object({
    files: Yup.mixed()
      .nullable()
      .required("Image file is required")
      .test(
        "fileType",
        "Only image files are allowed",
        (value) => !value || (value && value.type.startsWith("image"))
      ),
    imageDetails: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues: {
      files: null,
      imageDetails: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("files", data.files);
      formData.append("imageDetails", data.imageDetails);
      formData.append("updatedBy", userName);

      try {
        const response = await api.put(
          `/updateProductImageSave/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          getData();
          handleClose();
        } else {
          toast.error(response.data.message || "Update failed.");
        }
      } catch (error) {
        toast.error("Error: " + error.message);
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    formik.setFieldValue("files", file);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/getProductImageSaveById/${id}`);
      if (response.status === 200) {
        formik.setFieldValue("imageDetails", response.data.imageDetails || "");
      }
    } catch (error) {
      toast.error("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  return (
    <>
      <button className="btn btn-sm" onClick={handleOpen}>
        Edit
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="headColor">Edit Product Item  <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton></DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent accidental form submission
            }
          }}
        >
          <DialogContent>
            <div className="mb-3">
              <label htmlFor="files" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                id="files"
                name="files"
                className="form-control"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.files && formik.errors.files && (
                <div className="text-danger">{formik.errors.files}</div>
              )}
            </div>
            {selectedFile && (
              <div className="mb-3">
                {selectedFile.type.startsWith("image") && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected File"
                    style={{ maxWidth: "100%", marginTop: "10px" }}
                  />
                )}
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="imageDetails" className="form-label">
                Image Details
              </label>
              <textarea
                id="imageDetails"
                name="imageDetails"
                className="form-control"
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.imageDetails}
              />
              {formik.touched.imageDetails && formik.errors.imageDetails && (
                <div className="text-danger">{formik.errors.imageDetails}</div>
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
              disabled={loadIndicator || formik.isSubmitting}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CMSProductsItemEdit;
