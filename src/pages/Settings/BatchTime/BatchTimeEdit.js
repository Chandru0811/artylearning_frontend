import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

function BatchTimeEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);
  const [paymentTerm, setPaymentTerm] = useState(null);
  const [fields, setFields] = useState([
    {
      id: 1,
      batchTime: "",
    },
  ]);

  const validationSchema = Yup.object({
    batchTime: Yup.string().required("*Batch Time is required"),
  });

  // const getData = async () => {
  //   try {
  //     const response = await api.get(`/getAllSHGSettingById/${id}`);
  //     formik.setValues(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data ", error);
  //   }
  // };

  const getData = async () => {
    try {
      const hardcodedData = {
        id: 1,
        day: "Monday",
        batchTime: "10:00",
      };

      formik.setValues(hardcodedData);
    } catch (error) {
      console.error("Error setting data ", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      day: "",
      batchTime: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateSHGSetting/${id}`, values, {
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

  // useEffect(() => {
  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const addFields = () => {
    setFields([
      ...fields,
      {
        id: fields.length + 1,
        batchTime: "",
      },
    ]);
  };

  const deleteFields = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Batch Time Edit</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-6 col-12 mt-3">
                  <label className="form-label">
                    Day<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.day && formik.errors.day
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("day")}
                  />
                  {formik.touched.day && formik.errors.day && (
                    <div className="invalid-feedback">{formik.errors.day}</div>
                  )}
                </div>

                <div className="col-md-6 col-12 mb-2">
                  {fields.map((row, index) => (
                    <div key={row.id}>
                      <div className="d-flex justify-content-between mt-3">
                        <span>
                          <label className="form-label">
                            Batch Time<span className="text-danger">*</span>
                          </label>
                        </span>
                        {row.id > 1 && (
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
                        )}
                      </div>
                      <input
                        type="time"
                        className={`form-control  ${
                          formik.touched.batchTime && formik.errors.batchTime
                            ? "is-invalid"
                            : ""
                        }`}
                        {...formik.getFieldProps("batchTime")}
                      />
                      {formik.touched.batchTime && formik.errors.batchTime && (
                        <div className="invalid-feedback">
                          {formik.errors.batchTime}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger mt-3"
                    onClick={addFields}
                  >
                    Add more
                  </button>
                </div>
              </div>
            </div>
            <Modal.Footer>
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
                onClick={formik.handleSubmit}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default BatchTimeEdit;
