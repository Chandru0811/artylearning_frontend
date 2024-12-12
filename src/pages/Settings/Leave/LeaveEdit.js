import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import * as Yup from "yup";
import api from "../../../config/URL";
import { toast } from "react-toastify";
import { MdOutlineModeEdit } from "react-icons/md";

function LeaveEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const userName = localStorage.getItem("userName");
  const [isModified, setIsModified] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get(`/getAllLeaveSettingById/${id}`);
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
  const validationSchema = Yup.object({
    leaveType: Yup.string().required("*Leave Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      leaveType: "",
      updatedBy: userName,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateLeaveSetting/${id}`, values, {
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

  // useEffect(() => {
  //   getData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Leave Type Edit </Modal.Title>
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
              <div className="row">
                <div className="col-md-6 col-12 mb-2">
                  <label className="form-label">
                    Leave Type<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.leaveType && formik.errors.leaveType
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("leaveType")}
                  />
                  {formik.touched.leaveType && formik.errors.leaveType && (
                    <div className="invalid-feedback">
                      {formik.errors.leaveType}
                    </div>
                  )}
                </div>
              </div>
            </div>
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
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default LeaveEdit;
