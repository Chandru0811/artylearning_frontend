import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../../config/URL";

function EditBreak({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleClose = () => {
    // formik.resetForm();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setIsModified(false);
  };
  const validationSchema = yup.object().shape({
    breakName: yup.string().required("*Break Name is required"),
    fromDate: yup.string().required("*From Date is required"),
    toDate: yup
      .string()
      .required("*To Date is required")
      .test(
        "is-greater",
        "*To Date must be greater than From Date",
        function (value) {
          const { fromDate } = this.parent;
          return fromDate && value
            ? new Date(value) >= new Date(fromDate)
            : true;
        }
      ),
  });
  const formik = useFormik({
    initialValues: {
      breakName: "",
      fromDate: "",
      toDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateCenterBreaks/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess();
          handleClose();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response.status === 409) {
          toast.warning(error?.response?.data?.message);
        } else {
          toast.error(error.response.data.message);
        }
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
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`/getAllCenterBreaksById/${id}`);
        const formattedData = {
          ...response.data,
          fromDate: response.data.fromDate
            ? response.data.fromDate.substring(0, 10)
            : null,
          toDate: response.data.toDate
            ? response.data.toDate.substring(0, 10)
            : null,
        };
        formik.setValues(formattedData);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };

    if (id) {
      formik.resetForm();
      getData();
    }
  }, [id]);

  return (
    <>
      <button className="btn" onClick={handleShow}>
        <FaEdit />
      </button>

      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
        backdrop={isModified ? "static" : true}
        keyboard={isModified ? false : true}
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault(); // Prevent default form submission
            }
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <p className="headColor">Edit Centre Break</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  Break Name<span class="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <input
                    type="data"
                    value="New Year Chinese"
                    className={`form-control   ${
                      formik.touched.breakName && formik.errors.breakName
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("breakName")}
                  />
                  {formik.touched.breakName && formik.errors.breakName && (
                    <div className="invalid-feedback">
                      {formik.errors.breakName}
                    </div>
                  )}
                </div>
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable>
                  From Date<span class="text-danger">*</span>
                </lable>
                <input
                  type="date"
                  className={`form-control   ${
                    formik.touched.fromDate && formik.errors.fromDate
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("fromDate")}
                />
                {formik.touched.fromDate && formik.errors.fromDate && (
                  <div className="invalid-feedback">
                    {formik.errors.fromDate}
                  </div>
                )}
              </div>
              <div class="col-md-6 col-12 mb-2">
                <lable className="form-lable">
                  To Date<span class="text-danger">*</span>
                </lable>
                <div class="input-group mb-3">
                  <input
                    type="date"
                    className={`form-control   ${
                      formik.touched.toDate && formik.errors.toDate
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("toDate")}
                  />
                  {formik.touched.toDate && formik.errors.toDate && (
                    <div className="invalid-feedback">
                      {formik.errors.toDate}
                    </div>
                  )}
                </div>
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
            <Button
              type="button"
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
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditBreak;
