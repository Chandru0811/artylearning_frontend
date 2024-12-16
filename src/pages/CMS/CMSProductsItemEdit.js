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
} from "@mui/material";
import Button from "@mui/material/Button";
import { MdOutlineModeEdit } from "react-icons/md";

function CMSProductsItemEdit({ id, getData }) {
  console.log("Id", id);
  const [open, setOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const userName = localStorage.getItem("userName");

  const [data, setDatas] = useState();

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleOpen = () => setOpen(true);

  const validationSchema = Yup.object().shape({
    files: Yup.mixed().required("Image file is required"),
    imageDetails: Yup.string().required("Image details are required"),
  });

  const formik = useFormik({
    initialValues: {
      files: null,
      imageDetails: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      console.log(data);
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
          formik.resetForm();
          setOpen(false);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
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
      formik.setValues(response.data);
      setDatas(response.data);
    } catch (error) {
      toast.error("Error Fetch Data: " + error.message);
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
        <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="headColor">Edit Product Item</DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <DialogContent>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
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
              <div>
                {selectedFile.type.startsWith("image") && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected File"
                    style={{ maxWidth: "100%" }}
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

export default CMSProductsItemEdit;
