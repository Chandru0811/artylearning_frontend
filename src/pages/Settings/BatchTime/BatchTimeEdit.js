import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import CloseIcon from "@mui/icons-material/Close";

function BatchTimeEdit({ id, onSuccess, handleMenuClose }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);
  const [fields, setFields] = useState([]); // No default field

  const validationSchema = Yup.object({
    batchTimes: Yup.array()
      .of(Yup.string().required("Batch time is required"))
      .min(1, "At least one batch time is required"),
  });

  const formik = useFormik({
    initialValues: {
      batchDay: "",
      batchTimes: [],
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateBatchDays/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          onSuccess();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error?.response?.status === 409) {
          toast.warning(error?.response?.data?.message);
        } else if (error?.response?.status === 404) {
          toast.warning(error?.response?.data?.message);
        } else {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        handleClose();
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleClose = () => {
    handleMenuClose();
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  const addFields = () => {
    setFields([
      ...fields,
      {
        id: null, // null indicates a new field
        batchTimes: "",
      },
    ]);
  };

  const deleteFields = async (field) => {
    if (field.id) {
      // Existing field: make API call
      try {
        const response = await api.delete(
          `/deleteBatchTime/${id}?batchTime=${field.batchTimes}`
        );
        if (response.status === 200) {
          const updatedFields = fields.filter((f) => f !== field);
          setFields(updatedFields);
          // toast.success(response.data.message);
          // Update formik values
          const updatedBatchTimes = formik.values.batchTimes.filter(
            (time) => time !== field.batchTimes
          );
          formik.setFieldValue("batchTimes", updatedBatchTimes);
        } else {
          toast.error("Failed to delete batch time.");
        }
      } catch (error) {
        // Handle specific cases and show appropriate error messages
        if (error?.response?.status === 409) {
          toast.warning(error?.response?.data?.message || "Conflict detected. Cannot delete this batch time.");
        } else if (error?.response?.status === 404) {
          toast.warning(error?.response?.data?.message || "Batch time not found.");
        } else {
          toast.error(error?.response?.data?.message || "Error deleting batch time.");
        }
      }
    } else {
      // Remove new fields (id is null) directly
      const updatedFields = fields.filter((f) => f !== field);
      setFields(updatedFields);
  
      // Update formik values
      const updatedBatchTimes = formik.values.batchTimes.filter(
        (time) => time !== field.batchTimes
      );
      formik.setFieldValue("batchTimes", updatedBatchTimes);
    }
  };

  
  const getData = async () => {
    try {
      const response = await api.get(`/getBatchForSingleDay/${id}`);
      const fetchedData = response.data;

      formik.setValues({
        batchDay: fetchedData.batchDay,
        batchTimes: fetchedData.batchTimes,
        updatedBy: userName,
      });

      const updatedFields = fetchedData.batchTimes.map((time) => ({
        id: Math.random(), // Use unique ID if not available
        batchTimes: time,
      }));
      setFields(updatedFields);
    } catch (error) {
      console.error("Error fetching data", error?.message);
    }
  };

  return (
    <>
      <p
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
        className=" text-start mb-0 menuitem-style"
        onClick={handleShow}
      >
        Edit
      </p>
      <Dialog
        open={show}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="batch-time-edit-dialog"
      >
        <DialogTitle className="headColor">
          Batch Time Edit{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12">
                  <label className="form-label">
                    Day<span className="text-danger">*</span>
                  </label>
                  <input
                    onKeyDown={(e) => e.stopPropagation()}
                    type="text"
                    className={`form-control  ${
                      formik.touched.batchDay && formik.errors.batchDay
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("batchDay")}
                    readOnly
                  />
                  {formik.touched.batchDay && formik.errors.batchDay && (
                    <div className="invalid-feedback">
                      {formik.errors.batchDay}
                    </div>
                  )}
                </div>

                <div className="col-md-12 col-12 mb-2">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between mt-3">
                        <span>
                          <label className="form-label">
                            Batch Time<span className="text-danger">*</span>
                          </label>
                        </span>
                        <span>
                          <button
                            type="button"
                            className="btn btn-sm pb-2 me-2"
                            onClick={() => deleteFields(field)}
                          >
                            <IoCloseCircleOutline
                              style={{ color: "red", fontSize: "18px" }}
                            />
                          </button>
                        </span>
                      </div>
                      <input
                        onKeyDown={(e) => e.stopPropagation()}
                        type="time"
                        className={`form-control  ${
                          formik.touched.batchTimes?.[index] &&
                          formik.errors.batchTimes?.[index]
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps(`batchTimes[${index}]`)}
                      />
                      {formik.touched.batchTimes?.[index] &&
                        formik.errors.batchTimes?.[index] && (
                          <div className="invalid-feedback">
                            {formik.errors.batchTimes[index]}
                          </div>
                        )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-button btn-sm mt-3"
                    onClick={addFields}
                  >
                    Add more
                  </button>
                </div>
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
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
export default BatchTimeEdit;
