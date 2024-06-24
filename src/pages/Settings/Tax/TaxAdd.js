import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import { toast } from "react-toastify";

function TaxAdd({ onSuccess }) {
    const [show, setShow] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);

    const handleClose = () => {
        setShow(false);
        formik.resetForm();
    };

    const handleShow = () => setShow(true);

    const validationSchema = Yup.object({
        taxType: Yup.string().required("*Tax Type is required"),
        rate: Yup.string().required("*Rate is required"),
        effectiveDate: Yup.string().required("*Effective Date is required"),
        status: Yup.string().required("*Status is required"),
    });

    const formik = useFormik({
        initialValues: {
            taxType: "",
            rate: "",
            effectiveDate: "",
            status: "",
        },
        validationSchema: validationSchema, // Assign the validation schema
        onSubmit: async (values) => {
            setLoadIndicator(true);
            // console.log(values);
            try {
                const response = await api.post("/createTaxSetting", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 201) {
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
    });

    return (
        <>
            <div className="mb-5 mt-3 d-flex justify-content-end">
                <button
                    type="button"
                    className="btn btn-button btn-sm"
                    onClick={handleShow}
                >
                    Add <i class="bx bx-plus"></i>
                </button>
            </div>
            <Modal show={show} size="lg" onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="headColor">Add Tax</Modal.Title>
                </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <div className="container">
                            <div className="row py-4">
                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Tax Type<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...formik.getFieldProps("taxType")}
                                        class={`form-select  ${formik.touched.taxType && formik.errors.taxType
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        aria-label="Default select example"
                                    >
                                        <option selected></option>
                                        <option value="Purchase">Purchase</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    {formik.touched.taxType && formik.errors.taxType && (
                                        <div className="invalid-feedback">
                                            {formik.errors.taxType}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Rate<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control  ${formik.touched.rate && formik.errors.rate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("rate")}
                                    />
                                    {formik.touched.rate && formik.errors.rate && (
                                        <div className="invalid-feedback">
                                            {formik.errors.rate}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Effective Date<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className={`form-control  ${formik.touched.effectiveDate && formik.errors.effectiveDate
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        {...formik.getFieldProps("effectiveDate")}
                                    />
                                    {formik.touched.effectiveDate && formik.errors.effectiveDate && (
                                        <div className="invalid-feedback">
                                            {formik.errors.effectiveDate}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label className="form-label">
                                        Status<span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...formik.getFieldProps("status")}
                                        class={`form-select  ${formik.touched.status && formik.errors.status
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                        aria-label="Default select example"
                                    >
                                        <option selected></option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">InActive</option>
                                    </select>
                                    {formik.touched.status && formik.errors.status && (
                                        <div className="invalid-feedback">
                                            {formik.errors.status}
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
                                Submit
                            </Button>
                            {/* <Button variant="danger" type="submit">
                Submit
              </Button> */}
                        </Modal.Footer>
                    </Modal.Body>
                </form>
            </Modal>
        </>
    );
}

export default TaxAdd;
