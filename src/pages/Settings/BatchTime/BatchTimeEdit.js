import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";

function BatchTimeEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);
  const [fields, setFields] = useState([
    {
      id: 1,
      batchTimes: "",
    },
  ]);

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
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (
        Object.values(values).some(
          (value) => typeof value === "string" && value.trim() !== ""
        )
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  const addFields = () => {
    setFields([
      ...fields,
      {
        id: fields.length + 1,
        batchTimes: "",
      },
    ]);
  };

  const deleteFields = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);

    const updatedBatchTime = formik.values.batchTimes.filter(
      (_, index) => fields[index].id !== id
    );
    formik.setFieldValue("batchTimes", updatedBatchTime);
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

      const updatedFields = fetchedData.batchTimes.map((time, index) => ({
        id: index + 1,
        batchTimes: time,
      }));
      setFields(updatedFields);
    } catch (error) {
      console.error("Error fetching data", error?.message);
    }
  };

  return (
    <>
      <button
        style={{
          whiteSpace: "nowrap",
          width: "100%",
        }}
        className="btn btn-sm btn-normal text-start"
        onClick={handleShow}
      >
        <MdOutlineModeEdit /> &nbsp;&nbsp;Edit
      </button>
      <Dialog
        open={show}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="batch-time-edit-dialog"
      >
        <DialogTitle className="headColor">Batch Time Edit</DialogTitle>
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
                  {fields.map((row, index) => (
                    <div key={row.id}>
                      <div className="d-flex justify-content-between mt-3">
                        <span>
                          <label className="form-label">
                            Batch Time<span className="text-danger">*</span>
                          </label>
                        </span>
                        <span>
                          <button
                            type="button"
                            className="btn btn-sm pb-2"
                            onClick={() => deleteFields(row.id)}
                          >
                            <IoCloseCircleOutline
                              style={{ color: "red", fontSize: "18px" }}
                            />
                          </button>
                        </span>
                      </div>
                      <input
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
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default BatchTimeEdit;
