import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { FaEdit } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function AbsentReasonEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllAbsentReasonById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = () => {
    setShow(true);
    setIsModified(false);
    getData();
  };

  const validationSchema = yup.object().shape({
    absentReason: yup.string().required("*Absent Reason is required"),
  });

  const formik = useFormik({
    initialValues: {
      absentReason: "",
      remarks: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateAbsentReason/${id}`, values, {
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
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        {" "}
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Edit Absent Reason</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">
                  Absent Reason<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.absentReason && formik.errors.absentReason
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("absentReason")}
                />
                {formik.touched.absentReason && formik.errors.absentReason && (
                  <div className="invalid-feedback">{formik.errors.absentReason}</div>
                )}
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Remarks</label>
                <textarea
                  rows={5}
                  className={`form-control`}
                  {...formik.getFieldProps("remarks")}
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <button
              type="submit"
              onSubmit={formik.handleSubmit}
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
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AbsentReasonEdit;
