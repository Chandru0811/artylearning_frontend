import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../config/URL";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MdOutlineModeEdit } from "react-icons/md";

function CMSTestMonialEdit({ id, onSuccess, handleMenuClose }) {
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
    parentImage: null,
    parentDescription: "",
    parentName: "",
  };

  const validationSchema = Yup.object().shape({
    parentImage: Yup.mixed().required("Image file is required"),
    parentDescription: Yup.string().required("Image details are required"),
    parentName: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("file", values.parentImage);
      formData.append("parentDescription", values.parentDescription);
      formData.append("parentName", values.parentName);
      formData.append("updatedBy", userName);

      try {
        const response = await api.put(
          `/updateTestimonialSaveWithProfileImages/${id}`,
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
        handleClose();
        setLoadIndicator(false);
      }
    },
  });

  const getData = async () => {
    try {
      const response = await api.get(`/getAllTestimonialSaveById/${id}`);
      formik.setValues({
        parentImage: response.data.parentImage,
        parentDescription: response.data.parentDescription,
        parentName: response.data.parentName,
      });
      setSelectedFile(response.data.parentImage);
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
    formik.setFieldValue("parentImage", file);
  };

  return (
    <>
      <p className="text-start mb-0" onClick={handleShow}>
        Edit
      </p>

      <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle className="headColor">
            Edit Testimonial{" "}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="mb-3">
                <label htmlFor="parentImage" className="form-label">
                  Upload Image
                </label>
                <input
                  onKeyDown={(e) => e.stopPropagation()}
                  type="file"
                  id="parentImage"
                  name="parentImage"
                  className="form-control"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.parentImage && formik.errors.parentImage && (
                  <div className="text-danger">{formik.errors.parentImage}</div>
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
                <label htmlFor="parentName" className="form-label">
                  Parent Name
                </label>
                <input
                  onKeyDown={(e) => e.stopPropagation()}
                  id="parentName"
                  name="parentName"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentName}
                />
                {formik.touched.parentName && formik.errors.parentName && (
                  <div className="text-danger">{formik.errors.parentName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="parentDescription" className="form-label">
                  Parent Description
                </label>
                <textarea
                  id="parentDescription"
                  name="parentDescription"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentDescription}
                />
                {formik.touched.parentDescription &&
                  formik.errors.parentDescription && (
                    <div className="text-danger">
                      {formik.errors.parentDescription}
                    </div>
                  )}
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
              disabled={loadIndicator}
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

export default CMSTestMonialEdit;
