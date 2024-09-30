import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { FaEdit } from "react-icons/fa";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function EditRegisteration({ id, onSuccess }) {
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [taxData, setTaxData] = useState([]);
  const [isModified, setIsModified] = useState(false);

  const fetchData = async () => {
    try {
      const taxResponse = await api.get("getAllTaxSetting");
      setTaxData(taxResponse.data);

      const response = await api.get(`/getAllCenterRegistrationsById/${id}`);
      const formattedData = {
        ...response.data,
        registrationDate: response.data.registrationDate
          ? response.data.registrationDate.substring(0, 10)
          : null,
        effectiveDate: response.data.effectiveDate
          ? response.data.effectiveDate.substring(0, 10)
          : null,
      };
      formik.setValues(formattedData); // Set form data to fetched values
    } catch (error) {
      toast.error("Error Fetching Data");
    }
  };

  const handleClose = () => {
    fetchData();
    setShow(false);
  };

  const handleShow = async () => {
    setShow(true);
    setIsModified(false);
    fetchData();
    try {
      const response = await api.get("getAllTaxSetting");
      setTaxData(response.data);
    } catch (error) {
      toast.error("Error fetching tax data:", error);
    }
  };

  const validationSchema = yup.object().shape({
    effectiveDate: yup.string().required("*Effective Date is required"),
    amount: yup
      .string()
      .typeError("Amount must be a number")
      .required("*Amount is required")
      .matches(/^\d+(\.\d{1,2})?$/, "*Amount must be a valid number without special characters"),
    taxId: yup.string().required("*Tax Type is required"),
    status: yup.string().required("*Status is required"),
  });

  const formik = useFormik({
    initialValues: {
      registrationDate: "",
      effectiveDate: "",
      amount: "",
      taxId: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/updateCenterRegistrations/${id}`, values, {
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
        toast.error(error);
      } finally {
        setLoadIndicator(false);
      }
    },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validate: (values) => {
      if (Object.values(values).some((value) => typeof value === "string" && value.trim() !== "")) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    },
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const selectedTaxType = formik.values.taxId;

    const activeTaxTypes = taxData.filter((tax) => tax.status === "ACTIVE");

    const isValidTaxType = activeTaxTypes.some((tax) => tax.id === parseInt(selectedTaxType));

    if (!isValidTaxType) {
      formik.setFieldValue("taxId", "");
      formik.handleSubmit();
    } else {
      formik.handleSubmit();
    }
  };

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
              <p className="headColor">Edit Registration Fees</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 col-12 mb-2">
                <label className="">
                  Effective Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className={`form-control ${
                    formik.touched.effectiveDate && formik.errors.effectiveDate ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("effectiveDate")}
                />
                {formik.touched.effectiveDate && formik.errors.effectiveDate && (
                  <div className="invalid-feedback">{formik.errors.effectiveDate}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="form-lable">
                  Amount (Including GST)<span className="text-danger">*</span>
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.amount && formik.errors.amount ? "is-invalid" : ""
                    }`}
                    {...formik.getFieldProps("amount")}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="invalid-feedback">{formik.errors.amount}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="">
                  Tax Type<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.taxId && formik.errors.taxId ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("taxId")}
                  style={{ width: "100%" }}
                >
                  <option value=""></option>
                  {taxData &&
                    taxData.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.taxType}
                      </option>
                    ))}
                </select>
                {formik.touched.taxId && formik.errors.taxId && (
                  <div className="invalid-feedback">{formik.errors.taxId}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-2">
                <label className="">
                  Status<span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${
                    formik.touched.status && formik.errors.status ? "is-invalid" : ""
                  }`}
                  {...formik.getFieldProps("status")}
                  style={{ width: "100%" }}
                >
                  <option value=""></option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <div className="invalid-feedback">{formik.errors.status}</div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="btn btn-button btn-sm"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              )}
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditRegisteration;
