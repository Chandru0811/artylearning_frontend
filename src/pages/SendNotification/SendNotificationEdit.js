import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaEdit } from "react-icons/fa";
import api from "../../config/URL";
import { toast } from "react-toastify";

function SendNotificationEdit({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  console.log(id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validationSchema = Yup.object({
    messageTitle: Yup.string().required("*Message Title is required"),
    messageDescription: Yup.string().required("*Message Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      messageTitle: "",
      messageDescription: "",
    },
    validationSchema: validationSchema, // Assign the validation schema
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(
          `/updateSmsPushNotifications/${id}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          onSuccess();
          handleClose();
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }finally {
        setLoadIndicator(false);
      }
    },
  });
  const getData = async () => {
    try {
      const response = await api.get(`/getAllSmsPushNotificationsById/${id}`);
      formik.setValues(response.data);
    } catch (error) {
      console.error("Error fetching data ", error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <button className="btn btn-sm" onClick={handleShow}>
        <FaEdit />
      </button>
      <Modal show={show} size="lg" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="headColor">Edit Notification</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="container">
              <div className="row py-4">
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">
                    Title<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control  ${
                      formik.touched.messageTitle && formik.errors.messageTitle
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("messageTitle")}
                  />
                  {formik.touched.messageTitle &&
                    formik.errors.messageTitle && (
                      <div className="invalid-feedback">
                        {formik.errors.messageTitle}
                      </div>
                    )}
                </div>
                <div className="col-md-12 col-12 mb-2">
                  <label className="form-label">
                    Message<span className="text-danger">*</span>
                  </label>
                  <textarea
                    type="text"
                    rows={5}
                    className={`form-control  ${
                      formik.touched.messageDescription &&
                      formik.errors.messageDescription
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("messageDescription")}
                  />
                  {formik.touched.messageDescription &&
                    formik.errors.messageDescription && (
                      <div className="invalid-feedback">
                        {formik.errors.messageDescription}
                      </div>
                    )}
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
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
            </Modal.Footer>
          </Modal.Body>
        </form>
      </Modal>
    </>
  );
}

export default SendNotificationEdit;
